# ----- Web builder
FROM node:17-alpine3.14 AS web

WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

# ----- Delivery
FROM node:17-alpine3.12

WORKDIR /app
COPY --from=web /app/dist .
COPY --from=web /app/package.json .

EXPOSE 3000
CMD ["node", "index.js"]
