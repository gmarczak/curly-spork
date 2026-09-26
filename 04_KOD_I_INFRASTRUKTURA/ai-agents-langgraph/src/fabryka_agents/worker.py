"""Worker kolejki (arq): wykonuje grafy agentów poza requestem HTTP.

Uruchomienie: arq fabryka_agents.worker.WorkerSettings
Checkpointer: w pamięci na start. Produkcja: langgraph-checkpoint-postgres (Supabase), żeby pauza na akceptację
przetrwała restart workera.
"""

import asyncio
from typing import Any

from arq import Retry
from arq.connections import RedisSettings
from langgraph.checkpoint.memory import InMemorySaver

from . import narration
from .activity import RedisPanel
from .clients.medusa import MedusaHttp
from .clients.supplier import SupplierError, SupplierOrderResult
from .config import Settings, get_settings
from .graphs import draft_approve, fulfillment, runner, support
from .llm import LiteLLMClient
from .permissions import Agent


class SupplierNotConfigured:
    """Do czasu wyboru dostawcy każde zamówienie trafia do właściciela jako eskalacja."""

    def submit_order(self, order: dict) -> SupplierOrderResult:
        raise SupplierError("Dostawca nie jest jeszcze skonfigurowany")


def build_graphs(settings: Settings, checkpointer=None) -> dict[str, Any]:
    cp = checkpointer or InMemorySaver()

    def llm(key: str) -> LiteLLMClient:
        return LiteLLMClient(settings.litellm_base_url, key)

    return {
        "fulfillment": fulfillment.build(
            SupplierNotConfigured(),
            MedusaHttp(settings.medusa_url, settings.medusa_agent_api_key, Agent.FULFILLMENT),
            max_attempts=settings.fulfillment_max_attempts,
            checkpointer=cp,
        ),
        "support": support.build(
            llm(settings.litellm_key_support), refund_threshold_pln=settings.support_refund_escalation_pln, checkpointer=cp
        ),
        "onboarding": draft_approve.onboarding(llm(settings.litellm_key_onboarding), checkpointer=cp),
        "marketing": draft_approve.marketing(llm(settings.litellm_key_marketing), checkpointer=cp),
    }


def route_event(event: dict) -> tuple[str, str, dict] | None:
    """Zdarzenie Medusy → (graf, thread_id, stan startowy). Nieobsługiwane zdarzenia → None."""
    if event["name"] == "order.placed":
        order = event["data"]
        return "fulfillment", f"fulfillment:{order['id']}", {"order": order, "attempts": 0}
    return None


PAUSE_RETRY_S = 60


def _observer(ctx: dict, graph: str, thread_id: str):
    panel = ctx["panel"]

    def observe(node: str, update: Any) -> None:
        text = narration.describe(graph, node, update)
        if text:
            panel.log(graph, "step", text, thread_id)

    return observe


def _run_tracked(ctx: dict, graph: str, thread_id: str, task: str, run) -> dict:
    panel = ctx["panel"]
    panel.set_status(graph, "working", task, thread_id)
    try:
        result: runner.RunResult = run(_observer(ctx, graph, thread_id))
    except Exception as exc:
        panel.set_status(graph, "error", task, thread_id)
        panel.log(graph, "error", f"Błąd: {exc}", thread_id)
        raise
    if result.waiting:
        ctx["approvals"].add(thread_id, graph, result.payload)
        panel.set_status(graph, "waiting", task, thread_id)
        panel.log(graph, "ask", f"Czekam na Twoją decyzję: {result.payload.get('title', '')}", thread_id)
        return {"status": "waiting", "thread_id": thread_id}
    panel.set_status(graph, "idle", "", "")
    panel.log(graph, "done", narration.done_text(graph, task, result.payload or {}), thread_id)
    return {"status": "done", "thread_id": thread_id}


async def handle_event(ctx: dict, event: dict) -> dict:
    routed = route_event(event)
    if routed is None:
        return {"status": "ignored", "event": event["name"]}
    graph, thread_id, state = routed
    if ctx["panel"].is_paused(graph):
        raise Retry(defer=PAUSE_RETRY_S)
    task = narration.task_title(graph, state)
    run = lambda obs: runner.start(ctx["graphs"][graph], thread_id, state, obs)  # noqa: E731
    return await asyncio.to_thread(_run_tracked, ctx, graph, thread_id, task, run)


async def resume_graph(ctx: dict, thread_id: str, graph: str, decision: Any) -> dict:
    task = ctx["panel"].statuses().get(graph, {}).get("task", thread_id)
    ctx["panel"].log(graph, "info", "Otrzymałem decyzję właściciela.", thread_id)
    run = lambda obs: runner.resume(ctx["graphs"][graph], thread_id, decision, obs)  # noqa: E731
    return await asyncio.to_thread(_run_tracked, ctx, graph, thread_id, task, run)


async def startup(ctx: dict) -> None:
    import redis

    from .store import RedisApprovals

    settings = get_settings()
    ctx["graphs"] = build_graphs(settings)
    r = redis.Redis.from_url(settings.redis_url)
    ctx["approvals"] = RedisApprovals(r)
    ctx["panel"] = RedisPanel(r)


class WorkerSettings:
    functions = [handle_event, resume_graph]
    on_startup = startup
    redis_settings = RedisSettings.from_dsn(get_settings().redis_url)
