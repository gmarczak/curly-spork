"""Stan agentów i dziennik zdarzeń dla panelu Biuro Agentów (na żywo).

Status agenta: working | waiting | error | idle. Pauza: flaga sprawdzana przez worker przed startem zadania.
"""

import json
import time
from typing import Protocol

from .permissions import Agent

AGENT_NAMES: dict[str, str] = {
    Agent.ONBOARDING: "Agent Onboardingu",
    Agent.SUPPORT: "Agent Wsparcia",
    Agent.MARKETING: "Agent Marketingowy",
    Agent.FULFILLMENT: "Agent Fulfillmentu",
}
ACTIVITY_LIMIT = 200


class Panel(Protocol):
    def set_status(self, agent: str, status: str, task: str = "", thread_id: str = "") -> None: ...
    def statuses(self) -> dict[str, dict]: ...
    def log(self, agent: str, kind: str, text: str, thread_id: str = "") -> None: ...
    def recent(self, n: int = 50) -> list[dict]: ...
    def pause(self, agent: str) -> None: ...
    def resume(self, agent: str) -> None: ...
    def is_paused(self, agent: str) -> bool: ...


def _entry(agent: str, kind: str, text: str, thread_id: str) -> dict:
    return {"ts": time.time(), "agent": agent, "kind": kind, "text": text[:500], "thread_id": thread_id}


class MemoryPanel:
    def __init__(self) -> None:
        self._status: dict[str, dict] = {}
        self._log: list[dict] = []
        self._paused: set[str] = set()

    def set_status(self, agent: str, status: str, task: str = "", thread_id: str = "") -> None:
        self._status[agent] = {"status": status, "task": task, "thread_id": thread_id, "updated_at": time.time()}

    def statuses(self) -> dict[str, dict]:
        return dict(self._status)

    def log(self, agent: str, kind: str, text: str, thread_id: str = "") -> None:
        self._log.insert(0, _entry(agent, kind, text, thread_id))
        del self._log[ACTIVITY_LIMIT:]

    def recent(self, n: int = 50) -> list[dict]:
        return self._log[:n]

    def pause(self, agent: str) -> None:
        self._paused.add(agent)

    def resume(self, agent: str) -> None:
        self._paused.discard(agent)

    def is_paused(self, agent: str) -> bool:
        return agent in self._paused


class RedisPanel:
    def __init__(self, redis) -> None:  # redis.Redis (sync)
        self._r = redis

    def set_status(self, agent: str, status: str, task: str = "", thread_id: str = "") -> None:
        value = {"status": status, "task": task, "thread_id": thread_id, "updated_at": time.time()}
        self._r.hset("agent:status", agent, json.dumps(value))

    def statuses(self) -> dict[str, dict]:
        return {k.decode(): json.loads(v) for k, v in self._r.hgetall("agent:status").items()}

    def log(self, agent: str, kind: str, text: str, thread_id: str = "") -> None:
        pipe = self._r.pipeline()
        pipe.lpush("activity", json.dumps(_entry(agent, kind, text, thread_id)))
        pipe.ltrim("activity", 0, ACTIVITY_LIMIT - 1)
        pipe.execute()

    def recent(self, n: int = 50) -> list[dict]:
        return [json.loads(x) for x in self._r.lrange("activity", 0, n - 1)]

    def pause(self, agent: str) -> None:
        self._r.sadd("agents:paused", agent)

    def resume(self, agent: str) -> None:
        self._r.srem("agents:paused", agent)

    def is_paused(self, agent: str) -> bool:
        return bool(self._r.sismember("agents:paused", agent))


def snapshot(panel: Panel, approvals: list[dict], n: int = 50) -> dict:
    """Stan dla panelu: wszyscy agenci (także bezczynni), kolejka akceptacji, ostatnie zdarzenia."""
    st = panel.statuses()
    agents = []
    for agent, name in AGENT_NAMES.items():
        s = st.get(agent, {"status": "idle", "task": "", "thread_id": "", "updated_at": None})
        agents.append({"id": agent, "name": name, **s, "paused": panel.is_paused(agent)})
    return {"agents": agents, "approvals": approvals, "activity": panel.recent(n), "server_time": time.time()}
