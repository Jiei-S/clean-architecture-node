# boilerplate-clean-architecture-node

This is a boilerplate for clean architecture and Node REST projects.

## Technology Stack

| Category              | Technology Stack                    |
| --------------------- | ----------------------------------- |
| Programming Languages | Node.js, TypeScript                                  |
| Frameworks/Libraries  | Express, TypeORM, OpenAPI, tsoa|
| Environment setup     | Docker                              |
| CI     | Husky, ESLint, Prettier, Jest                              |



# Architecture

## Directories
```bash
.
├── api # API Client
│   └── v1.0
│       ├── clients
│       │   └── <CONTEXT>-api.ts
│       └── models
│           ├── <CONTEXT>-create-params.ts
│           └── <CONTEXT>-response.ts
├── src
│   ├── adapters
│   │   ├── controllers
│   │   │   └── <CONTEXT>
│   │   │       ├── <CONTEXT>-model.ts
│   │   │       └── <CONTEXT>-controller.ts
│   │   └── gateways
│   │       └── repositories
│   │           └── typeorm
│   │               └── <CONTEXT>
│   │                   ├── <CONTEXT>-mapper.ts
│   │                   └── <CONTEXT>-repository.ts
│   ├── domain
│   │   └── models
│   │       └── <CONTEXT>
│   │           ├── <CONTEXT>-entity.ts
│   │           ├── <CONTEXT>-repository-interface.ts
│   │           └── <CONTEXT>-vo.ts
│   ├── index.ts # entrypoint
│   ├── infrastructure
│   │   ├── express
│   │   │   ├── app.ts
│   │   │   └── xxxxx
│   │   └── typeorm
│   │       └── xxxxx
│   ├── middlewares
│   │   └── xxxxx
│   └── usecases
│       └── <CONTEXT>
│           ├── <CONTEXT>-dto.ts
│           ├── <CONTEXT>-interface.ts
│           └── <CONTEXT>-usecase.ts
├── tests
│   └── e2e
・
```

For more details, see [Boilerplate Clean Architecture](https://github.com/Jiei-S/boilerplate-clean-architecture-go#architecture).


# Get Started

Run the following command. Server will start on http://localhost:4000.

```bash
$ make dev
```

# How To Use

## Create

```bash
$ curl --location 'http://localhost:4000/projects' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --data '{
    "name": "test",
    "status": "todo"
  }'
```

```json
{
  "id": "<ID>",
  "name": "test",
  "status": "todo"
}
```

## Find

```bash
$ curl --location 'http://localhost:4000/projects/<ID>'
```

```json
{
  "id": "<ID>",
  "name": "test",
  "status": "todo"
}
```


# How To Development

## Generate API Client and Router

You need to update api client and router by running the following command.  

```bash
$ make api-gen
```

API Client will be generated in `api/<VERSION>/**` and router will be generated in `src/infrastructure/express`.


## Migration

You need to run the following commands to update migration.  

```bash
# generate
$ make migration-gen

# up
$ make migration-run

# down
$ make migration-revert
```

Migration will be generated in `src/infrastructure/typeorm/migrations/**`.


## Test

### Lint & Format

Automatically run when you commit.

### E2E Test

To run E2E test, you need to run the following commands.

```bash
# e2e container up and migration run
$ make e2e-up

# e2e run
$ make e2e-run
```