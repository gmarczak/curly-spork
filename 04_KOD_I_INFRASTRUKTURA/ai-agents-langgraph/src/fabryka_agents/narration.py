"""Opis kroków grafów zrozumiały dla właściciela (to, co widać w panelu jako „myśli i działania”)."""

from typing import Any


def _fulfillment(node: str, u: dict) -> str | None:
    if node == "submit":
        if u.get("supplier_order_id"):
            return f"Przekazałem zamówienie do dostawcy. Numer u dostawcy: {u['supplier_order_id']}."
        return f"Dostawca nie przyjął zamówienia (próba {u.get('attempts')}): {u.get('last_error')}"
    if node == "record":
        return "Zapisałem numer dostawcy w zamówieniu w Medusie."
    if node == "ask_human":
        return "Decyzja właściciela: ponawiam." if u.get("status") == "retry" else "Decyzja właściciela: obsługa ręczna."
    return None


def _support(node: str, u: dict) -> str | None:
    if node == "triage":
        reason = u.get("escalation_reason")
        return f"Muszę eskalować: {reason}." if reason else "Standardowe pytanie — odpowiadam sam."
    if node in ("answer", "escalate"):
        return f"Odpowiedź dla klienta: {u.get('answer', '')}"
    return None


def _draft(node: str, u: dict) -> str | None:
    if node == "generate":
        draft = u.get("draft", "")
        return f"Przygotowałem szkic ({len(draft)} znaków): {draft[:160]}"
    if node == "approve":
        return "Właściciel zatwierdził." if u.get("approved") else f"Poprawki od właściciela: {u.get('notes') or 'odrzucone'}"
    if node == "done":
        return "Gotowe — zatwierdzone."
    if node == "rejected":
        return "Zadanie zakończone bez akceptacji."
    return None


_BY_GRAPH = {"fulfillment": _fulfillment, "support": _support, "onboarding": _draft, "marketing": _draft}


def describe(graph: str, node: str, update: Any) -> str | None:
    fn = _BY_GRAPH.get(graph)
    return fn(node, update or {}) if fn else None


def task_title(graph: str, state: dict) -> str:
    if graph == "fulfillment":
        return f"Zamówienie {state.get('order', {}).get('id', '?')} → dostawca"
    if graph == "support":
        return f"Rozmowa z klientem: {state.get('message', '')[:60]}"
    if graph == "onboarding":
        return "Pakiet marki i landing page"
    if graph == "marketing":
        return "Kreacje reklamowe"
    return graph
