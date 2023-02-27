#!/usr/bin/env bash

set -eou pipefail

export COMPOSE_PROJECT_NAME=auth-api-test
dir=$(dirname "$0")
# if PORT is unset or null, then it will be set to a dummy value
# useful when running this script from the terminal due to docker compose config file
export POSTGRES_PORT=${POSTGRES_PORT:-5569}
docker compose -f "$dir"/docker-compose.test.yml down -v
