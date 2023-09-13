FROM node:18.16.1-bookworm as build

WORKDIR /usr/src/api

COPY package.json yarn.lock ./
RUN yarn install \
    && yarn cache clean

FROM node:18.16.1-bookworm-slim

COPY --from=build /usr/src/api/node_modules /usr/src/api/node_modules

WORKDIR /usr/src/api

COPY . .

CMD ["yarn", "dev"]
# CMD ["ls", "-la", "/usr/src/api/src"]