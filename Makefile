.PHONY: setup
setup:
	yarn install
	cp .env.local .env

.PHONY: dev
dev:
	docker compose down || true
	docker network create node-nw || true
	docker compose up --build

.PHONY: dev-down
dev-down:
	docker compose down -v || true

.PHONY: mock
mock:
	docker compose down || true
	docker network create node-nw || true
	docker compose -f docker-compose.mock.yaml up --build

.PHONY: api-gen
api-gen:
	yarn tsoa
	yarn openapi

.PHONY: migration-gen
migration-gen:
	docker compose exec api yarn migration:generate

.PHONY: migration-run
migration-run:
	docker compose exec api yarn migration:run

.PHONY: migration-revert
migration-revert:
	docker compose exec api yarn migration:revert

.PHONY: db-login
db-login:
	docker compose exec mysql mysql -u admin -p -h localhost local

.PHONY: e2e-up
e2e-up:
	docker compose -f docker-compose.e2e.yaml down || true
	docker network create node-nw || true
	docker compose -f docker-compose.e2e.yaml up --build

.PHONY: e2e-run
e2e-run:
	docker compose -f docker-compose.e2e.yaml exec api.e2e yarn e2e

.PHONY: e2e-down
e2e-down:
	docker compose -f docker-compose.e2e.yaml down -v || true