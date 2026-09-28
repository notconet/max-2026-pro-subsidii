FROM node:25-bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends wget ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm@12

WORKDIR /app

ENV CI=true

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN bash ./download-certs.sh
RUN pnpm exec tsc

ENV NODE_EXTRA_CA_CERTS="./certs/Russian_Trusted_Root_CA.cer"

CMD ["node", "./dist/bot.js"]