FROM node:18.16.1-bookworm as build

WORKDIR /usr/src/api

COPY package.json yarn.lock ./
RUN yarn install \
    && yarn cache clean

COPY . .

RUN yarn build


FROM node:18.16.1-bookworm-slim

ENV NODE_ENV production

WORKDIR /usr/src/api

RUN apt-get update && apt-get install -y --no-install-recommends \
    default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /usr/src/api/dist .
COPY --from=build /usr/src/api/node_modules node_modules
COPY --from=build /usr/src/api/build/dev/entrypoint.sh entrypoint.sh
COPY --from=build /usr/src/api/package.json package.json

EXPOSE 4000

CMD ["/bin/sh", "./entrypoint.sh"]