FROM node:18.16.1-bookworm as build

WORKDIR /usr/src/api

COPY ../../package.json ../../yarn.lock ./
RUN yarn --frozen-lockfile

COPY ../../ .

RUN yarn build

FROM node:18.16.1-bookworm-slim

ENV NODE_ENV production

RUN apt-get update && apt-get install -y --no-install-recommends \
    default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /usr/src/api /usr/src/api

WORKDIR /usr/src/api

EXPOSE 4000

CMD ["node", "dist/src/index.js"]