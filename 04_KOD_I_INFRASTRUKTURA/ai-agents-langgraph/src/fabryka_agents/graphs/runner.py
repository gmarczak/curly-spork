"""Uruchamianie grafu do końca albo do pauzy na akceptację człowieka (LangGraph `interrupt`)."""

from dataclasses import dataclass
from typing import Any

from langgraph.types import Command


@dataclass
class RunResult:
    thread_id: str
    waiting: bool
    payload: Any  # przy waiting: dane dla kolejki akceptacji; inaczej: końcowy stan


def _result(thread_id: str, out: dict) -> RunResult:
    interrupts = out.get("__interrupt__")
    if interrupts:
        return RunResult(thread_id, True, interrupts[0].value)
    return RunResult(thread_id, False, out)


def start(graph, thread_id: str, state: dict) -> RunResult:
    return _result(thread_id, graph.invoke(state, {"configurable": {"thread_id": thread_id}}))


def resume(graph, thread_id: str, decision: Any) -> RunResult:
    return _result(thread_id, graph.invoke(Command(resume=decision), {"configurable": {"thread_id": thread_id}}))
