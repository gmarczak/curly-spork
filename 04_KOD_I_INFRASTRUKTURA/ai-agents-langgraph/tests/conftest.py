import pytest
from langgraph.checkpoint.memory import InMemorySaver

from fabryka_agents.clients.supplier import SupplierError, SupplierOrderResult


class FakeLLM:
    def __init__(self, reply: str = "Tak, pasuje. Kąt 15° jest dla noży japońskich. Dostawa 10-14 dni. Coś jeszcze?"):
        self.reply = reply
        self.calls: list[tuple[str, str, str]] = []

    def complete(self, system: str, user: str, *, tier: str = "tani", max_tokens: int = 300) -> str:
        self.calls.append((system, user, tier))
        return self.reply


class FakeSupplier:
    def __init__(self, fail_times: int = 0):
        self.fail_times = fail_times
        self.calls = 0

    def submit_order(self, order: dict) -> SupplierOrderResult:
        self.calls += 1
        if self.calls <= self.fail_times:
            raise SupplierError("503 Service Unavailable")
        return SupplierOrderResult(supplier_order_id=f"CJ-{order['id']}")


class FakeMedusa:
    def __init__(self):
        self.recorded: list[tuple[str, str]] = []

    def record_supplier_order(self, order_id: str, supplier_order_id: str) -> None:
        self.recorded.append((order_id, supplier_order_id))

    def create_return_request(self, order_id: str, reason: str) -> None:
        pass


@pytest.fixture
def checkpointer():
    return InMemorySaver()
