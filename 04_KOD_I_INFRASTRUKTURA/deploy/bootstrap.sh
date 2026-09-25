#!/usr/bin/env bash
# Jednorazowa instalacja agentów na świeżym serwerze Ubuntu 24.04 (Hetzner).
# Użycie (jako root na serwerze):
#   curl -fsSL https://raw.githubusercontent.com/gmarczak/curly-spork/main/04_KOD_I_INFRASTRUKTURA/deploy/bootstrap.sh | bash
# Skrypt pyta o PANEL_API_TOKEN (ten sam co w Vercel) i opcjonalnie o klucz Anthropic.
# Sekrety zapisuje tylko na serwerze w deploy/.env.agents i deploy/.env.litellm (poza gitem).
set -euo pipefail

BRANCH="${BRANCH:-main}"
REPO="https://github.com/gmarczak/curly-spork.git"
DIR="/opt/curly-spork"

echo "==> Pakiety i zapora"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq docker.io docker-compose-v2 git ufw curl >/dev/null
ufw allow OpenSSH >/dev/null && ufw allow 80/tcp >/dev/null && ufw allow 443/tcp >/dev/null
ufw --force enable >/dev/null
systemctl enable --now docker >/dev/null

echo "==> Kod (gałąź: $BRANCH)"
if [ -d "$DIR/.git" ]; then
  git -C "$DIR" fetch -q origin "$BRANCH" && git -C "$DIR" checkout -q "$BRANCH" && git -C "$DIR" pull -q
else
  git clone -q -b "$BRANCH" "$REPO" "$DIR"
fi
cd "$DIR/04_KOD_I_INFRASTRUKTURA/deploy"

IP="$(curl -fsS4 https://api.ipify.org)"
DOMAIN="${AGENTS_DOMAIN:-${IP//./-}.sslip.io}"
echo "AGENTS_DOMAIN=$DOMAIN" > .env

if [ ! -f .env.agents ]; then
  echo "==> Sekrety"
  read -rsp "Wklej PANEL_API_TOKEN (ten sam co w Vercel): " PANEL_TOKEN </dev/tty; echo
  read -rsp "Klucz Anthropic API (Enter = pomiń na razie): " ANTHROPIC </dev/tty; echo
  MASTER="sk-$(openssl rand -hex 24)"
  umask 077
  cat > .env.agents <<EOF
WEBHOOK_SECRET=$(openssl rand -hex 32)
PANEL_API_TOKEN=$PANEL_TOKEN
LITELLM_KEY_ONBOARDING=$MASTER
LITELLM_KEY_SUPPORT=$MASTER
LITELLM_KEY_MARKETING=$MASTER
LITELLM_KEY_FULFILLMENT=$MASTER
SUPPORT_REFUND_ESCALATION_PLN=100
EOF
  cat > .env.litellm <<EOF
ANTHROPIC_API_KEY=$ANTHROPIC
LITELLM_MASTER_KEY=$MASTER
EOF
fi

echo "==> Start usług (pierwszy raz ok. 3–5 min)"
docker compose -f docker-compose.prod.yml up -d --build

echo "==> Czekam na HTTPS dla $DOMAIN"
for _ in $(seq 1 30); do
  if curl -fsS "https://$DOMAIN/health" >/dev/null 2>&1; then
    echo
    echo "GOTOWE. Adres API agentów: https://$DOMAIN"
    echo "Wklej ten adres do Vercel jako AGENTS_API_URL (albo podaj go Claude)."
    exit 0
  fi
  sleep 5
done
echo "Usługi działają, ale HTTPS jeszcze nie odpowiada. Sprawdź: docker compose -f docker-compose.prod.yml logs caddy agents-api"
exit 1
