#!/bin/sh

# Wait for mysql

echo "waiting for $MYSQL_HOST is up ..."

while ! mysqladmin ping -h"$MYSQL_HOST" --silent; do
    echo "waiting for $MYSQL_HOST is up ..."
    sleep 1
done

echo "$MYSQL_HOST is up"

# Migration

echo "migration start"

yarn migration:dev:run
if [ $? != 0 ]; then
    echo "migration failed"
    exit 1
fi

echo "migration complete"

# Run server

echo "waiting for server is up ..."

sleep 3

node index.js
