# ----- Web builder
FROM node:17-alpine3.14 AS web

WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

# ----- Delivery
FROM caddy

WORKDIR /app
COPY --from=web /app/build .
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 3000
