#!/usr/bin/env bash
# Jednorazowa instalacja agentów i sklepu (Medusa) na świeżym serwerze Ubuntu 24.04 (Hetzner).
# Ponowne uruchomienie jest bezpieczne: istniejące sekrety i dane zostają.
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
SHOP="${SHOP_API_DOMAIN:-sklep.${IP//./-}.sslip.io}"
printf 'AGENTS_DOMAIN=%s\nSHOP_API_DOMAIN=%s\n' "$DOMAIN" "$SHOP" > .env

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

if [ ! -f .env.postgres ]; then
  umask 077
  echo "POSTGRES_PASSWORD=$(openssl rand -hex 24)" > .env.postgres
fi

if [ ! -f .env.medusa ]; then
  echo "==> Sekrety sklepu (Medusa)"
  read -rsp "Stripe Secret key sk_… (Enter = pomiń na razie): " STRIPE_SK </dev/tty; echo
  read -rsp "Stripe Webhook secret whsec_… (Enter = pomiń na razie): " STRIPE_WH </dev/tty; echo
  PG_PASS="$(sed -n 's/^POSTGRES_PASSWORD=//p' .env.postgres)"
  AGENTS_SECRET="$(sed -n 's/^WEBHOOK_SECRET=//p' .env.agents)"
  SHOPS="${STORE_CORS:-https://zkadru.pl,https://www.zkadru.pl}"
  umask 077
  cat > .env.medusa <<EOF
DATABASE_URL=postgres://postgres:$PG_PASS@postgres:5432/medusa
JWT_SECRET=$(openssl rand -hex 32)
COOKIE_SECRET=$(openssl rand -hex 32)
STORE_CORS=$SHOPS
ADMIN_CORS=https://$SHOP
AUTH_CORS=https://$SHOP,$SHOPS
STRIPE_API_KEY=$STRIPE_SK
STRIPE_WEBHOOK_SECRET=$STRIPE_WH
AGENTS_WEBHOOK_SECRET=$AGENTS_SECRET
FILE_S3_BUCKET=
FILE_S3_URL=
FILE_S3_REGION=
FILE_S3_ENDPOINT=
FILE_S3_ACCESS_KEY_ID=
FILE_S3_SECRET_ACCESS_KEY=
EOF
fi

echo "==> Start usług (pierwszy raz ok. 5–10 min)"
docker compose -f docker-compose.prod.yml up -d --build

echo "==> Czekam na sklep (Medusa) pod https://$SHOP"
for _ in $(seq 1 60); do
  curl -fsS "https://$SHOP/health" >/dev/null 2>&1 && break
  sleep 5
done

if [ ! -f .p002-seeded ] && curl -fsS "https://$SHOP/health" >/dev/null 2>&1; then
  echo "==> Konfiguracja sklepu P002 Z Kadru i konto admina"
  KEY="$(docker compose -f docker-compose.prod.yml exec -T medusa npx medusa exec ./src/scripts/seed-p002.js 2>&1 | grep -o 'pk_[0-9a-f]*' | head -1 || true)"
  read -rp "E-mail do panelu admina sklepu: " ADMIN_EMAIL </dev/tty
  ADMIN_PASS="$(openssl rand -base64 18)"
  docker compose -f docker-compose.prod.yml exec -T medusa npx medusa user -e "$ADMIN_EMAIL" -p "$ADMIN_PASS" >/dev/null
  touch .p002-seeded
  echo
  echo "SKLEP GOTOWY. Panel admina: https://$SHOP/app"
  echo "  login: $ADMIN_EMAIL   hasło: $ADMIN_PASS   (zapisz w menedżerze haseł — nie pokażę go ponownie)"
  echo "  Publishable key P002 (podaj Claude do stores.config.json): $KEY"
  echo "  Adres API sklepu (Vercel → MEDUSA_BACKEND_URL): https://$SHOP"
fi

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
