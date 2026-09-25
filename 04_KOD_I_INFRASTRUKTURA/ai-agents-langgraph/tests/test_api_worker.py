import asyncio

import pytest
from arq import Retry
from conftest import FakeMedusa, FakeSupplier
from fastapi.testclient import TestClient
from langgraph.checkpoint.memory import InMemorySaver

from fabryka_agents import worker
from fabryka_agents.activity import MemoryPanel
from fabryka_agents.api import create_app
from fabryka_agents.config import Settings
from fabryka_agents.graphs import fulfillment
from fabryka_agents.security import sign
from fabryka_agents.store import MemoryApprovals, MemoryDedup

SETTINGS = Settings(webhook_secret="whsec", panel_api_token="panel")
EVENT = b'{"id":"evt_1","name":"order.placed","data":{"id":"order_1"}}'


def make():
    jobs: list = []

    async def enqueue(job, *args, **kwargs):
        jobs.append((job, args, kwargs))

    approvals = MemoryApprovals()
    make.panel = MemoryPanel()
    return TestClient(create_app(SETTINGS, enqueue, MemoryDedup(), approvals, make.panel)), jobs, approvals


def test_webhook_requires_valid_signature():
    client, jobs, _ = make()
    assert client.post("/webhooks/medusa", content=EVENT, headers={"x-signature": "t=1,v1=bad"}).status_code == 401
    assert jobs == []


def test_webhook_queues_once_per_event():
    client, jobs, _ = make()
    h = {"x-signature": sign(EVENT, "whsec")}
    assert client.post("/webhooks/medusa", content=EVENT, headers=h).json() == {"status": "queued"}
    assert client.post("/webhooks/medusa", content=EVENT, headers=h).json() == {"status": "duplicate"}
    assert [j[0] for j in jobs] == ["handle_event"]


def test_panel_endpoints_require_token_and_resume():
    client, jobs, approvals = make()
    assert client.get("/approvals").status_code == 401
    approvals.add("fulfillment:order_1", "fulfillment", {"type": "supplier_error"})
    auth = {"Authorization": "Bearer panel"}
    assert len(client.get("/approvals", headers=auth).json()) == 1
    r = client.post("/approvals/fulfillment:order_1", json={"decision": "retry"}, headers=auth)
    assert r.status_code == 202
    assert jobs[-1][0] == "resume_graph" and jobs[-1][2]["decision"] == "retry"
    assert client.post("/approvals/brak", json={"decision": 1}, headers=auth).status_code == 404


def test_worker_order_placed_waits_then_resumes():
    approvals = MemoryApprovals()
    medusa = FakeMedusa()
    ctx = {
        "approvals": approvals,
        "panel": MemoryPanel(),
        "graphs": {"fulfillment": fulfillment.build(FakeSupplier(fail_times=2), medusa, checkpointer=InMemorySaver())},
    }
    event = {"id": "evt_1", "name": "order.placed", "data": {"id": "order_1"}}
    out = asyncio.run(worker.handle_event(ctx, event))
    assert out["status"] == "waiting" and approvals.list()[0]["thread_id"] == "fulfillment:order_1"
    approvals.pop("fulfillment:order_1")
    out = asyncio.run(worker.resume_graph(ctx, "fulfillment:order_1", "fulfillment", "retry"))
    assert out["status"] == "done" and medusa.recorded == [("order_1", "CJ-order_1")]


def test_unknown_event_ignored():
    ctx = {"approvals": MemoryApprovals(), "panel": MemoryPanel(), "graphs": {}}
    out = asyncio.run(worker.handle_event(ctx, {"id": "e", "name": "x", "data": {}}))
    assert out["status"] == "ignored"


def test_worker_logs_steps_and_status_for_panel():
    panel = MemoryPanel()
    ctx = {
        "approvals": MemoryApprovals(),
        "panel": panel,
        "graphs": {"fulfillment": fulfillment.build(FakeSupplier(fail_times=2), FakeMedusa(), checkpointer=InMemorySaver())},
    }
    asyncio.run(worker.handle_event(ctx, {"id": "e1", "name": "order.placed", "data": {"id": "o9"}}))
    st = panel.statuses()["fulfillment"]
    assert st["status"] == "waiting" and "o9" in st["task"]
    kinds = [e["kind"] for e in panel.recent()]
    assert kinds[0] == "ask" and kinds.count("step") == 2
    asyncio.run(worker.resume_graph(ctx, "fulfillment:o9", "fulfillment", "retry"))
    assert panel.statuses()["fulfillment"]["status"] == "idle"
    assert panel.recent()[0]["kind"] == "done"


def test_manual_decision_logged_as_manual_not_supplier():
    panel = MemoryPanel()
    ctx = {
        "approvals": MemoryApprovals(),
        "panel": panel,
        "graphs": {"fulfillment": fulfillment.build(FakeSupplier(fail_times=2), FakeMedusa(), checkpointer=InMemorySaver())},
    }
    asyncio.run(worker.handle_event(ctx, {"id": "e1", "name": "order.placed", "data": {"id": "o7"}}))
    asyncio.run(worker.resume_graph(ctx, "fulfillment:o7", "fulfillment", "manual"))
    last = panel.recent()[0]
    assert last["kind"] == "done"
    assert "o7" in last["text"] and "obsługa ręczna" in last["text"] and "→ dostawca" not in last["text"]


def test_paused_agent_defers_work():
    panel = MemoryPanel()
    panel.pause("fulfillment")
    ctx = {"approvals": MemoryApprovals(), "panel": panel, "graphs": {}}
    with pytest.raises(Retry):
        asyncio.run(worker.handle_event(ctx, {"id": "e", "name": "order.placed", "data": {"id": "o1"}}))


def test_panel_state_control_and_demo():
    client, jobs, approvals = make()
    auth = {"Authorization": "Bearer panel"}
    assert client.get("/panel/state").status_code == 401
    state = client.get("/panel/state", headers=auth).json()
    assert [a["id"] for a in state["agents"]] == ["onboarding", "support", "marketing", "fulfillment"]
    assert all(a["status"] == "idle" for a in state["agents"])
    assert client.post("/panel/agents/support/pause", headers=auth).json()["paused"] is True
    assert client.get("/panel/state", headers=auth).json()["agents"][1]["paused"] is True
    assert client.post("/panel/agents/nieznany/pause", headers=auth).status_code == 404
    r = client.post("/panel/demo/order", headers=auth)
    assert r.status_code == 202 and jobs[-1][0] == "handle_event"
    assert jobs[-1][1][0]["name"] == "order.placed"
