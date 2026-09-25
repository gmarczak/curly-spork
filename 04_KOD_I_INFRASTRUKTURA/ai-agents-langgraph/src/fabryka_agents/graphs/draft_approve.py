"""Wspólny wzorzec dla Agenta Onboardingu i Marketingowego: model przygotowuje szkic, właściciel akceptuje.

Onboarding: pakiet marki + landing → akceptacja przed publikacją produktu (`product.publish`).
Marketing: kreacje → akceptacja przed uruchomieniem kampanii (`campaign.launch`).
"""

from typing import TypedDict

from langgraph.graph import END, START, StateGraph
from langgraph.types import interrupt

from ..llm import LLM

ONBOARDING_SYSTEM = """Jesteś agentem brandingu. Na podstawie specyfikacji produktu przygotuj pełny pakiet marki:
nazwa marki, koncepcja logo, 3 nagłówki landing page, opis marki w 2-3 zdaniach, kolorystyka bazowa.
Bez twierdzeń o leczeniu i gwarantowanych efektach. Nie kopiuj znanych marek."""

MARKETING_SYSTEM = """Jesteś agentem kreacji reklamowych (Meta, TikTok). Na podstawie specyfikacji przygotuj:
5 nagłówków i 3 skrypty wideo 15-30 s z hookiem w pierwszych 3 sekundach.
Bez twierdzeń o leczeniu i gwarantowanych efektach. Bez alkoholu w kreacjach."""


class DraftState(TypedDict, total=False):
    spec: str
    draft: str
    approved: bool
    notes: str
    status: str  # approved | rejected


def build(llm: LLM, *, agent: str, system: str, action: str, title: str, checkpointer=None):
    def generate(state: DraftState) -> DraftState:
        user = state["spec"] + (f"\n\nUwagi właściciela: {state['notes']}" if state.get("notes") else "")
        return {"draft": llm.complete(system, user, tier="kreatywny", max_tokens=1200)}

    def approve(state: DraftState) -> DraftState:
        decision = interrupt(
            {
                "agent": agent,
                "type": "approval",
                "title": title,
                "detail": state["draft"][:2000],
                "why": f"Akcja tylko dla człowieka: {action} (ADR-001).",
                "options": [{"approved": True}, {"approved": False, "notes": "co poprawić"}],
            }
        )
        return {"approved": bool(decision.get("approved")), "notes": decision.get("notes", "")}

    def after(state: DraftState) -> str:
        if state.get("approved"):
            return "done"
        return "generate" if state.get("notes") else "rejected"

    def done(state: DraftState) -> DraftState:
        return {"status": "approved"}

    def rejected(state: DraftState) -> DraftState:
        return {"status": "rejected"}

    g = StateGraph(DraftState)
    for name, fn in (("generate", generate), ("approve", approve), ("done", done), ("rejected", rejected)):
        g.add_node(name, fn)
    g.add_edge(START, "generate")
    g.add_edge("generate", "approve")
    g.add_conditional_edges("approve", after, ["done", "generate", "rejected"])
    g.add_edge("done", END)
    g.add_edge("rejected", END)
    return g.compile(checkpointer=checkpointer)


def onboarding(llm: LLM, checkpointer=None):
    return build(
        llm,
        agent="onboarding",
        system=ONBOARDING_SYSTEM,
        action="product.publish",
        title="Pakiet marki i landing page do akceptacji",
        checkpointer=checkpointer,
    )


def marketing(llm: LLM, checkpointer=None):
    return build(
        llm,
        agent="marketing",
        system=MARKETING_SYSTEM,
        action="campaign.launch",
        title="Kreacje i start kampanii do akceptacji",
        checkpointer=checkpointer,
    )
