import asyncio

from conftest import FakeMedusa, FakeSupplier
from fastapi.testclient import TestClient
from langgraph.checkpoint.memory import InMemorySaver

from fabryka_agents import worker
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
    return TestClient(create_app(SETTINGS, enqueue, MemoryDedup(), approvals)), jobs, approvals


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
        "graphs": {"fulfillment": fulfillment.build(FakeSupplier(fail_times=2), medusa, checkpointer=InMemorySaver())},
    }
    event = {"id": "evt_1", "name": "order.placed", "data": {"id": "order_1"}}
    out = asyncio.run(worker.handle_event(ctx, event))
    assert out["status"] == "waiting" and approvals.list()[0]["thread_id"] == "fulfillment:order_1"
    approvals.pop("fulfillment:order_1")
    out = asyncio.run(worker.resume_graph(ctx, "fulfillment:order_1", "fulfillment", "retry"))
    assert out["status"] == "done" and medusa.recorded == [("order_1", "CJ-order_1")]


def test_unknown_event_ignored():
    out = asyncio.run(worker.handle_event({"approvals": MemoryApprovals(), "graphs": {}}, {"id": "e", "name": "x", "data": {}}))
    assert out["status"] == "ignored"
