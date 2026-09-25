from conftest import FakeLLM

from fabryka_agents.graphs import runner, support

BASE = {"brand": "Szlif", "product": "rolkowa ostrzałka do noży", "knowledge": "Kąty 15° i 20°. Zwrot 14 dni."}


def test_normal_question_answered_by_cheap_model(checkpointer):
    llm = FakeLLM("Zdanie jeden. Zdanie dwa. Zdanie trzy. Zdanie cztery.")
    g = support.build(llm, checkpointer=checkpointer)
    res = runner.start(g, "s1", {**BASE, "message": "Czy nada się do noży japońskich?"})
    assert not res.waiting
    assert res.payload["answer"] == "Zdanie jeden. Zdanie dwa. Zdanie trzy."
    assert llm.calls[0][2] == "tani"
    assert "Szlif" in llm.calls[0][0]


def test_refund_over_threshold_escalates_without_llm(checkpointer):
    llm = FakeLLM()
    g = support.build(llm, refund_threshold_pln=100, checkpointer=checkpointer)
    res = runner.start(g, "s2", {**BASE, "message": "Chcę zwrot pieniędzy", "refund_amount_pln": 139.99})
    assert res.waiting and res.payload["type"] == "escalation"
    assert llm.calls == []
    done = runner.resume(g, "s2", "Zwrot przyjęty, środki w 14 dni.")
    assert done.payload["status"] == "escalated"
    assert done.payload["answer"].startswith("Zwrot przyjęty")


def test_legal_threat_and_safety_escalate():
    assert support.escalation_reason("Zgłoszę to do UOKiK", None, 100)
    assert support.escalation_reason("Skaleczyłem się przy ostrzeniu", None, 100)
    assert support.escalation_reason("Zraniłam palec, krwawi", None, 100)
    assert support.escalation_reason("Jaki jest czas dostawy?", 50, 100) is None
