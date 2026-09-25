"""API serwisu agentów: webhook z Medusy + kolejka akceptacji dla panelu Biuro Agentów.

Uruchomienie: uvicorn fabryka_agents.api:app
"""

import secrets
from collections.abc import Awaitable, Callable
from typing import Any

from fastapi import Depends, FastAPI, Header, HTTPException, Request
from pydantic import BaseModel, ValidationError

from .config import Settings, get_settings
from .events import MedusaEvent
from .security import verify
from .store import Approvals, Dedup

Enqueue = Callable[..., Awaitable[Any]]


class Decision(BaseModel):
    decision: Any


def create_app(settings: Settings, enqueue: Enqueue, dedup: Dedup, approvals: Approvals) -> FastAPI:
    app = FastAPI(title="Fabryka — agenci AI")

    def panel_auth(authorization: str | None = Header(default=None)) -> None:
        token = settings.panel_api_token
        if not token or not authorization or not secrets.compare_digest(authorization, f"Bearer {token}"):
            raise HTTPException(status_code=401, detail="Brak dostępu")

    @app.get("/health")
    async def health() -> dict:
        return {"ok": True}

    @app.post("/webhooks/medusa", status_code=202)
    async def medusa_webhook(request: Request, x_signature: str | None = Header(default=None)) -> dict:
        body = await request.body()
        if not verify(body, x_signature, settings.webhook_secret, settings.webhook_tolerance_s):
            raise HTTPException(status_code=401, detail="Nieprawidłowy podpis")
        try:
            event = MedusaEvent.model_validate_json(body)
        except ValidationError as exc:
            raise HTTPException(status_code=422, detail="Nieprawidłowe zdarzenie") from exc
        if not dedup.first_time(event.id):
            return {"status": "duplicate"}
        await enqueue("handle_event", event.model_dump())
        return {"status": "queued"}

    @app.get("/approvals", dependencies=[Depends(panel_auth)])
    async def list_approvals() -> list[dict]:
        return approvals.list()

    @app.post("/approvals/{thread_id}", dependencies=[Depends(panel_auth)], status_code=202)
    async def decide(thread_id: str, body: Decision) -> dict:
        item = approvals.pop(thread_id)
        if item is None:
            raise HTTPException(status_code=404, detail="Brak takiej decyzji w kolejce")
        await enqueue("resume_graph", thread_id=thread_id, graph=item["graph"], decision=body.decision)
        return {"status": "resumed"}

    return app


def _default_app() -> FastAPI:
    import redis
    from arq import create_pool
    from arq.connections import RedisSettings

    from .store import RedisApprovals, RedisDedup

    settings = get_settings()
    r = redis.Redis.from_url(settings.redis_url)
    pool = None

    async def enqueue(job: str, *args, **kwargs):
        nonlocal pool
        if pool is None:
            pool = await create_pool(RedisSettings.from_dsn(settings.redis_url))
        return await pool.enqueue_job(job, *args, **kwargs)

    return create_app(settings, enqueue, RedisDedup(r), RedisApprovals(r))


def __getattr__(name: str):
    # Leniwe tworzenie `app`, żeby import modułu w testach nie wymagał Redisa.
    if name == "app":
        return _default_app()
    raise AttributeError(name)
