#!/usr/bin/env bash
set -euo pipefail

CERTS_DIR="./certs"
CERT_DOWNLOAD_URL="https://gu-st.ru/content/downloads/Russian_Trusted_Root_CA.cer"
CERT_FILE="$CERTS_DIR/Russian_Trusted_Root_CA.cer"

if [ ! -d "$CERTS_DIR" ]; then
    mkdir $CERTS_DIR
fi

if [ ! -f "$CERT_FILE" ]; then
    echo "| No cert file present, downloading..."
    wget $CERT_DOWNLOAD_URL -qO $CERT_FILE;
    echo "| Cert file downloaded ✅"
fi

export NODE_EXTRA_CA_CERTS=$CERT_FILE

echo

pnpm exec tsc
node dist/bot.js
