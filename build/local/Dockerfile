FROM node:18.16.1-bookworm as build

WORKDIR /usr/src/api

COPY package.json yarn.lock ./
RUN yarn install \
    && yarn cache clean

FROM node:18.16.1-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /usr/src/api/node_modules /usr/src/api/node_modules

WORKDIR /usr/src/api

COPY . .

CMD ["/bin/sh", "./build/local/entrypoint.sh"]