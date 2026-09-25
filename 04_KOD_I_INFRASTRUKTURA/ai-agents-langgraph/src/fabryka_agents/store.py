"""Kolejka akceptacji i deduplikacja zdarzeń. Wersje w pamięci (dev/testy) i w Redis (produkcja)."""

import json
from typing import Any, Protocol

EVENT_TTL_S = 7 * 24 * 3600


class Approvals(Protocol):
    def add(self, thread_id: str, graph: str, payload: Any) -> None: ...
    def list(self) -> list[dict]: ...
    def pop(self, thread_id: str) -> dict | None: ...


class Dedup(Protocol):
    def first_time(self, event_id: str) -> bool: ...


class MemoryApprovals:
    def __init__(self) -> None:
        self._items: dict[str, dict] = {}

    def add(self, thread_id: str, graph: str, payload: Any) -> None:
        self._items[thread_id] = {"thread_id": thread_id, "graph": graph, "payload": payload}

    def list(self) -> list[dict]:
        return list(self._items.values())

    def pop(self, thread_id: str) -> dict | None:
        return self._items.pop(thread_id, None)


class MemoryDedup:
    def __init__(self) -> None:
        self._seen: set[str] = set()

    def first_time(self, event_id: str) -> bool:
        if event_id in self._seen:
            return False
        self._seen.add(event_id)
        return True


class RedisApprovals:
    KEY = "approvals"

    def __init__(self, redis) -> None:  # redis.Redis (sync)
        self._r = redis

    def add(self, thread_id: str, graph: str, payload: Any) -> None:
        self._r.hset(self.KEY, thread_id, json.dumps({"thread_id": thread_id, "graph": graph, "payload": payload}))

    def list(self) -> list[dict]:
        return [json.loads(v) for v in self._r.hvals(self.KEY)]

    def pop(self, thread_id: str) -> dict | None:
        raw = self._r.hget(self.KEY, thread_id)
        if raw is None:
            return None
        self._r.hdel(self.KEY, thread_id)
        return json.loads(raw)


class RedisDedup:
    def __init__(self, redis) -> None:
        self._r = redis

    def first_time(self, event_id: str) -> bool:
        return bool(self._r.set(f"event:{event_id}", 1, nx=True, ex=EVENT_TTL_S))
