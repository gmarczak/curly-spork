from conftest import FakeLLM

from fabryka_agents.graphs import draft_approve, runner


def test_marketing_waits_for_launch_approval(checkpointer):
    llm = FakeLLM("5 nagłówków...")
    g = draft_approve.marketing(llm, checkpointer=checkpointer)
    res = runner.start(g, "m1", {"spec": "Ostrzałka rolkowa, hook: pomidor"})
    assert res.waiting
    assert "campaign.launch" in res.payload["why"]
    assert llm.calls[0][2] == "kreatywny"


def test_rejection_with_notes_regenerates_then_approves(checkpointer):
    llm = FakeLLM("szkic")
    g = draft_approve.onboarding(llm, checkpointer=checkpointer)
    runner.start(g, "o1", {"spec": "spec"})
    again = runner.resume(g, "o1", {"approved": False, "notes": "krótsze nagłówki"})
    assert again.waiting and len(llm.calls) == 2
    assert "krótsze nagłówki" in llm.calls[1][1]
    done = runner.resume(g, "o1", {"approved": True})
    assert done.payload["status"] == "approved"


def test_rejection_without_notes_ends(checkpointer):
    g = draft_approve.onboarding(FakeLLM(), checkpointer=checkpointer)
    runner.start(g, "o2", {"spec": "spec"})
    assert runner.resume(g, "o2", {"approved": False}).payload["status"] == "rejected"
