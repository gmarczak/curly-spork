"""Agent Fulfillmentu: opłacone zamówienie → dostawca → numer w Medusie. Bez LLM — przepływ deterministyczny.

Po `max_attempts` nieudanych próbach agent pauzuje i pyta właściciela: "retry" albo "manual".
"""

from typing import Any, TypedDict

from langgraph.graph import END, START, StateGraph
from langgraph.types import interrupt

from ..clients.medusa import Medusa
from ..clients.supplier import Supplier, SupplierError


class FulfillmentState(TypedDict, total=False):
    order: dict[str, Any]
    attempts: int
    supplier_order_id: str | None
    last_error: str | None
    status: str  # submitted | done | manual


def build(supplier: Supplier, medusa: Medusa, *, max_attempts: int = 2, checkpointer=None):
    def submit(state: FulfillmentState) -> FulfillmentState:
        try:
            res = supplier.submit_order(state["order"])
            return {"supplier_order_id": res.supplier_order_id, "status": "submitted", "last_error": None}
        except SupplierError as exc:
            return {"attempts": state.get("attempts", 0) + 1, "last_error": str(exc)}

    def after_submit(state: FulfillmentState) -> str:
        if state.get("supplier_order_id"):
            return "record"
        return "submit" if state.get("attempts", 0) < max_attempts else "ask_human"

    def ask_human(state: FulfillmentState) -> FulfillmentState:
        decision = interrupt(
            {
                "agent": "fulfillment",
                "type": "supplier_error",
                "title": f"Błąd dostawcy — zamówienie {state['order']['id']}",
                "detail": state.get("last_error"),
                "why": f"Eskalacja: błąd API dostawcy {max_attempts}× z rzędu (ADR-001).",
                "options": ["retry", "manual"],
            }
        )
        if decision == "retry":
            return {"attempts": 0, "status": "retry"}
        return {"status": "manual"}

    def after_human(state: FulfillmentState) -> str:
        return "submit" if state.get("status") == "retry" else END

    def record(state: FulfillmentState) -> FulfillmentState:
        medusa.record_supplier_order(state["order"]["id"], state["supplier_order_id"])
        return {"status": "done"}

    g = StateGraph(FulfillmentState)
    g.add_node("submit", submit)
    g.add_node("ask_human", ask_human)
    g.add_node("record", record)
    g.add_edge(START, "submit")
    g.add_conditional_edges("submit", after_submit, ["record", "submit", "ask_human"])
    g.add_conditional_edges("ask_human", after_human, ["submit", END])
    g.add_edge("record", END)
    return g.compile(checkpointer=checkpointer)
