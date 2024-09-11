#!/bin/bash
set -e
psql -c "CREATE USER lbg WITH PASSWORD 'lbgtest2018';"
psql -d "$POSTGRES_DB" -U "$POSTGRES_USER" -f tmp/lbg.pgsql
