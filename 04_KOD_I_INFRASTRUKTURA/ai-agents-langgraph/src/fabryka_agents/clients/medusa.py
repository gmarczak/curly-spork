"""Zapis do Medusy przez API z kluczem agenta. Każda metoda sprawdza uprawnienia (ADR-001)."""

from typing import Protocol

import httpx

from ..permissions import Agent, require


class Medusa(Protocol):
    def record_supplier_order(self, order_id: str, supplier_order_id: str) -> None: ...
    def create_return_request(self, order_id: str, reason: str) -> None: ...


class MedusaHttp:
    def __init__(self, base_url: str, api_key: str, agent: Agent):
        self._agent = agent
        self._client = httpx.Client(base_url=base_url, headers={"x-medusa-access-token": api_key}, timeout=30)

    def record_supplier_order(self, order_id: str, supplier_order_id: str) -> None:
        require(self._agent, "fulfillment.create")
        # Endpoint do potwierdzenia przy wdrożeniu Medusy (metadane zamówienia albo fulfillment).
        self._client.post(
            f"/admin/orders/{order_id}", json={"metadata": {"supplier_order_id": supplier_order_id}}
        ).raise_for_status()

    def create_return_request(self, order_id: str, reason: str) -> None:
        require(self._agent, "return_request.create")
        self._client.post("/admin/returns", json={"order_id": order_id, "metadata": {"reason": reason}}).raise_for_status()
