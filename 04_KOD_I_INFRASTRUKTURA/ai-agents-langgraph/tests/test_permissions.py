import pytest

from fabryka_agents.permissions import HUMAN_ONLY, Agent, PermissionDenied, can, require


def test_agents_cannot_do_human_only_actions():
    for agent in Agent:
        for action in HUMAN_ONLY:
            assert not can(agent, action)


def test_support_can_create_return_but_not_refund():
    require(Agent.SUPPORT, "return_request.create")
    with pytest.raises(PermissionDenied):
        require(Agent.SUPPORT, "refund.approve")


def test_marketing_cannot_launch_campaign():
    assert not can(Agent.MARKETING, "campaign.launch")
