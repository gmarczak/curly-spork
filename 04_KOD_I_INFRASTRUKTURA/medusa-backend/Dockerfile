# Medusa (sklep + panel admina) — produkcja. Build w obrazie, start z .medusa/server.
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npx medusa build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.medusa/server ./
RUN npm install --omit=dev --no-audit --no-fund
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
EXPOSE 9000
# Migracje przy każdym starcie (idempotentne), potem serwer.
ENTRYPOINT ["docker-entrypoint.sh"]
