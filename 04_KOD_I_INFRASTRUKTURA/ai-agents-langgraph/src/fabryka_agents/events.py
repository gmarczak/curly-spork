from typing import Any

from pydantic import BaseModel


class MedusaEvent(BaseModel):
    """Zdarzenie wysłane przez subscriber Medusy (medusa-backend/src/subscribers/agent-webhook.ts)."""

    id: str
    name: str
    data: dict[str, Any]
