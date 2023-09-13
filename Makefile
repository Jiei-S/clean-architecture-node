.PHONY: dev
dev:
	docker compose down || true
	docker network create node-nw || true
	docker compose up --build

.PHONY: api-gen
api-gen:
	yarn tsoa
	yarn openapi

.PHONY: migration-gen
migration-gen:
	docker exec node-api-1 yarn migration:generate

.PHONY: migration-run
migration-run:
	docker exec node-api-1 yarn migration:run

.PHONY: migration-revert
migration-revert:
	docker exec node-api-1 yarn migration:revert

.PHONY: db-login
db-login:
	docker exec -it node-mysql-1 mysql -u admin -p -h localhost local