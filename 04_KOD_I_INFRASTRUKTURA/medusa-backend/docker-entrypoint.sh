#!/bin/sh
set -e
npx medusa db:migrate
exec npx medusa start
