from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    webhook_secret: str = ""
    webhook_tolerance_s: int = 300
    redis_url: str = "redis://localhost:6379/0"
    litellm_base_url: str = "http://localhost:4000"
    litellm_key_onboarding: str = ""
    litellm_key_support: str = ""
    litellm_key_marketing: str = ""
    litellm_key_fulfillment: str = ""
    medusa_url: str = "http://localhost:9000"
    medusa_agent_api_key: str = ""
    panel_api_token: str = ""
    support_refund_escalation_pln: float = 100.0
    fulfillment_max_attempts: int = 2


@lru_cache
def get_settings() -> Settings:
    return Settings()
