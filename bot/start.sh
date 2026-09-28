#!/usr/bin/env bash
set -euo pipefail

bash download-certs.sh

pnpm exec tsc
node dist/bot.js
