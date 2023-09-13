# boilerplate-clean-architecture-node

This is a boilerplate for clean architecture and Node REST projects.

# Architecture

xxx

## Directories
```bash

```

# Get Started

Run the following command. Server will start on http://localhost:4000.

```bash
$ make dev
```

# How To Use

## Add project

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

## Find user

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
API Client will be generated in `api/<VERSION>/**` and router will be generated in `src/infrastructure/express`.

```bash
$ make api-gen
```

## Migration

You need to run the following commands to update migration.  
Migration will be generated in `src/infrastructure/typeorm/migrations/**`.

```bash
# generate
$ make migration-gen

# up
$ make migration-run

# down
$ make migration-revert
```