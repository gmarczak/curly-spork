"""Integracja z dostawcą dropshipping. Implementacja HTTP (np. CJ Dropshipping) — po wyborze dostawcy."""

from dataclasses import dataclass
from typing import Protocol


class SupplierError(Exception):
    pass


@dataclass
class SupplierOrderResult:
    supplier_order_id: str


class Supplier(Protocol):
    def submit_order(self, order: dict) -> SupplierOrderResult: ...
