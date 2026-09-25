"""Klient modeli przez LiteLLM proxy (API zgodne z OpenAI). Każdy agent używa własnego virtual key z budżetem."""

from typing import Protocol

import httpx


class LLM(Protocol):
    def complete(self, system: str, user: str, *, tier: str = "tani", max_tokens: int = 300) -> str: ...


class LiteLLMClient:
    def __init__(self, base_url: str, api_key: str, timeout_s: float = 60.0):
        self._client = httpx.Client(base_url=base_url, headers={"Authorization": f"Bearer {api_key}"}, timeout=timeout_s)

    def complete(self, system: str, user: str, *, tier: str = "tani", max_tokens: int = 300) -> str:
        resp = self._client.post(
            "/chat/completions",
            json={
                "model": tier,
                "max_tokens": max_tokens,
                "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}],
            },
        )
        resp.raise_for_status()
        return resp.json()["choices"][0]["message"]["content"]
