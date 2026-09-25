"""Model uprawnień agentów — odwzorowanie tabeli z ADR-001. Każda akcja w Medusie przechodzi przez `require`."""

from enum import StrEnum


class Agent(StrEnum):
    ONBOARDING = "onboarding"
    SUPPORT = "support"
    MARKETING = "marketing"
    FULFILLMENT = "fulfillment"


ALLOWED: dict[Agent, frozenset[str]] = {
    Agent.SUPPORT: frozenset({"order.read_own", "knowledge.read", "return_request.create"}),
    Agent.FULFILLMENT: frozenset({"order.read_paid", "fulfillment.create", "tracking.set"}),
    Agent.ONBOARDING: frozenset({"spec.read", "product.create_draft", "landing.write"}),
    Agent.MARKETING: frozenset({"campaign.read", "creative.draft"}),
}

# Akcje, których żaden agent nie wykona sam — zawsze przez kolejkę akceptacji właściciela.
HUMAN_ONLY = frozenset(
    {"refund.approve", "order.cancel", "product.publish", "campaign.launch", "campaign.budget_change", "price.change"}
)


class PermissionDenied(Exception):
    pass


def can(agent: Agent, action: str) -> bool:
    return action not in HUMAN_ONLY and action in ALLOWED[agent]


def require(agent: Agent, action: str) -> None:
    if not can(agent, action):
        raise PermissionDenied(f"{agent} nie ma uprawnienia: {action}")
