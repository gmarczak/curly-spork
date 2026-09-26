"""Agent Wsparcia: reguły eskalacji są deterministyczne (nie decyduje o nich model), odpowiedź pisze tani model."""

import re
from typing import TypedDict

from langgraph.graph import END, START, StateGraph
from langgraph.types import interrupt

from ..llm import LLM

LEGAL = ("uokik", "prawnik", "adwokat", "sąd", "pozew", "rzecznik", "media", "dziennikarz")
PRIVACY = ("rodo", "dane osobowe", "moich danych", "moje dane", "usuń", "usun", "wymaż", "wymaz", "zapomnian")
SAFETY = ("uraz", "skalecz", "zrani", "poparz", "krwaw", "alergi", "niebezpiecz", "zdrowi", "lekarz", "szpital")

SYSTEM = """Jesteś asystentem AI obsługi klienta sklepu {brand}. Przedstaw się jako asystent AI.
Odpowiadasz WYŁĄCZNIE w kontekście produktu: {product}.
Wiedza o produkcie, regulaminie, dostawie i zwrotach:
{knowledge}
Zasady: maks. 3 krótkie zdania. Bez obietnic zdrowotnych i porad medycznych.
Nie zatwierdzasz zwrotów pieniędzy — możesz tylko przyjąć wniosek o zwrot."""


class SupportState(TypedDict, total=False):
    brand: str
    product: str
    knowledge: str
    message: str
    refund_amount_pln: float | None
    escalation_reason: str | None
    answer: str
    status: str  # answered | escalated


def escalation_reason(message: str, refund_amount_pln: float | None, threshold_pln: float) -> str | None:
    text = message.lower()
    if refund_amount_pln is not None and refund_amount_pln > threshold_pln:
        return f"zwrot/rekompensata {refund_amount_pln:.2f} zł > {threshold_pln:.0f} zł"
    if any(k in text for k in LEGAL):
        return "groźba działań prawnych lub publicznych"
    if any(k in text for k in PRIVACY):
        return "żądanie dotyczące danych osobowych (RODO)"
    if any(k in text for k in SAFETY):
        return "możliwy problem zdrowia lub bezpieczeństwa"
    return None


def limit_sentences(text: str, n: int = 3) -> str:
    parts = re.split(r"(?<=[.!?])\s+", text.strip())
    return " ".join(parts[:n])


def build(llm: LLM, *, refund_threshold_pln: float = 100.0, checkpointer=None):
    def triage(state: SupportState) -> SupportState:
        return {"escalation_reason": escalation_reason(state["message"], state.get("refund_amount_pln"), refund_threshold_pln)}

    def route(state: SupportState) -> str:
        return "escalate" if state.get("escalation_reason") else "answer"

    def answer(state: SupportState) -> SupportState:
        system = SYSTEM.format(brand=state["brand"], product=state["product"], knowledge=state.get("knowledge", ""))
        text = llm.complete(system, state["message"], tier="tani", max_tokens=200)
        return {"answer": limit_sentences(text), "status": "answered"}

    def escalate(state: SupportState) -> SupportState:
        reply = interrupt(
            {
                "agent": "support",
                "type": "escalation",
                "title": "Eskalacja rozmowy z klientem",
                "detail": state["message"][:300],
                "why": f"Eskalacja: {state['escalation_reason']} (SOP zwrotów i reklamacji).",
                "options": ["odpowiedź właściciela (tekst)"],
            }
        )
        return {"answer": str(reply), "status": "escalated"}

    g = StateGraph(SupportState)
    g.add_node("triage", triage)
    g.add_node("answer", answer)
    g.add_node("escalate", escalate)
    g.add_edge(START, "triage")
    g.add_conditional_edges("triage", route, ["answer", "escalate"])
    g.add_edge("answer", END)
    g.add_edge("escalate", END)
    return g.compile(checkpointer=checkpointer)
