from conftest import FakeMedusa, FakeSupplier

from fabryka_agents.graphs import fulfillment, runner

ORDER = {"id": "order_1031", "items": [{"sku": "P002", "qty": 1}]}


def test_happy_path_records_supplier_order(checkpointer):
    medusa = FakeMedusa()
    g = fulfillment.build(FakeSupplier(), medusa, checkpointer=checkpointer)
    res = runner.start(g, "t1", {"order": ORDER, "attempts": 0})
    assert not res.waiting
    assert res.payload["status"] == "done"
    assert medusa.recorded == [("order_1031", "CJ-order_1031")]


def test_retries_then_asks_owner(checkpointer):
    supplier = FakeSupplier(fail_times=2)
    g = fulfillment.build(supplier, FakeMedusa(), max_attempts=2, checkpointer=checkpointer)
    res = runner.start(g, "t2", {"order": ORDER, "attempts": 0})
    assert res.waiting
    assert res.payload["type"] == "supplier_error"
    assert supplier.calls == 2


def test_owner_retry_resumes_and_finishes(checkpointer):
    medusa = FakeMedusa()
    g = fulfillment.build(FakeSupplier(fail_times=2), medusa, max_attempts=2, checkpointer=checkpointer)
    runner.start(g, "t3", {"order": ORDER, "attempts": 0})
    res = runner.resume(g, "t3", "retry")
    assert not res.waiting and res.payload["status"] == "done"
    assert medusa.recorded


def test_owner_manual_ends_without_recording(checkpointer):
    medusa = FakeMedusa()
    g = fulfillment.build(FakeSupplier(fail_times=5), medusa, max_attempts=2, checkpointer=checkpointer)
    runner.start(g, "t4", {"order": ORDER, "attempts": 0})
    res = runner.resume(g, "t4", "manual")
    assert res.payload["status"] == "manual"
    assert medusa.recorded == []
