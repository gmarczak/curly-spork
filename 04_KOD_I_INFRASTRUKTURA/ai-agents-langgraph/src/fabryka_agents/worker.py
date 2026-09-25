"""Worker kolejki (arq): wykonuje grafy agentów poza requestem HTTP.

Uruchomienie: arq fabryka_agents.worker.WorkerSettings
Checkpointer: w pamięci na start. Produkcja: langgraph-checkpoint-postgres (Supabase), żeby pauza na akceptację
przetrwała restart workera.
"""

from typing import Any

from arq.connections import RedisSettings
from langgraph.checkpoint.memory import InMemorySaver

from .clients.medusa import MedusaHttp
from .clients.supplier import SupplierError, SupplierOrderResult
from .config import Settings, get_settings
from .graphs import draft_approve, fulfillment, runner, support
from .llm import LiteLLMClient
from .permissions import Agent
from .store import Approvals


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


def _track(approvals: Approvals, graph: str, result: runner.RunResult) -> dict:
    if result.waiting:
        approvals.add(result.thread_id, graph, result.payload)
        return {"status": "waiting", "thread_id": result.thread_id}
    return {"status": "done", "thread_id": result.thread_id}


async def handle_event(ctx: dict, event: dict) -> dict:
    routed = route_event(event)
    if routed is None:
        return {"status": "ignored", "event": event["name"]}
    graph, thread_id, state = routed
    return _track(ctx["approvals"], graph, runner.start(ctx["graphs"][graph], thread_id, state))


async def resume_graph(ctx: dict, thread_id: str, graph: str, decision: Any) -> dict:
    return _track(ctx["approvals"], graph, runner.resume(ctx["graphs"][graph], thread_id, decision))


async def startup(ctx: dict) -> None:
    import redis

    from .store import RedisApprovals

    settings = get_settings()
    ctx["graphs"] = build_graphs(settings)
    ctx["approvals"] = RedisApprovals(redis.Redis.from_url(settings.redis_url))


class WorkerSettings:
    functions = [handle_event, resume_graph]
    on_startup = startup
    redis_settings = RedisSettings.from_dsn(get_settings().redis_url)
