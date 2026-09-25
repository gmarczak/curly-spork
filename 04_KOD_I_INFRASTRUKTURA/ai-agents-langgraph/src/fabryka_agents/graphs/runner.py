"""Uruchamianie grafu do końca albo do pauzy na akceptację człowieka (LangGraph `interrupt`).

`observer(node, update)` dostaje każdy zakończony krok — z tego panel buduje dziennik „na żywo”.
"""

from collections.abc import Callable
from dataclasses import dataclass
from typing import Any

from langgraph.types import Command

Observer = Callable[[str, Any], None]


@dataclass
class RunResult:
    thread_id: str
    waiting: bool
    payload: Any  # przy waiting: dane dla kolejki akceptacji; inaczej: końcowy stan


def _run(graph, graph_input, thread_id: str, observer: Observer | None) -> RunResult:
    config = {"configurable": {"thread_id": thread_id}}
    pending = None
    for chunk in graph.stream(graph_input, config, stream_mode="updates"):
        for node, update in chunk.items():
            if node == "__interrupt__":
                pending = update[0].value
            elif observer:
                observer(node, update)
    if pending is not None:
        return RunResult(thread_id, True, pending)
    return RunResult(thread_id, False, graph.get_state(config).values)


def start(graph, thread_id: str, state: dict, observer: Observer | None = None) -> RunResult:
    return _run(graph, state, thread_id, observer)


def resume(graph, thread_id: str, decision: Any, observer: Observer | None = None) -> RunResult:
    return _run(graph, Command(resume=decision), thread_id, observer)
