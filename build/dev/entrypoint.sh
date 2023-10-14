#!/bin/sh

echo "waiting for $MYSQL_HOST is up ..."

while ! mysqladmin ping -h"$MYSQL_HOST" --silent; do
    echo "waiting for $MYSQL_HOST is up ..."
    sleep 1
done

echo "$MYSQL_HOST is up"

yarn dev
