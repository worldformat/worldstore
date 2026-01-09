FROM node:22-alpine AS base
WORKDIR /app

FROM base AS builder
RUN corepack enable

COPY package.json pnpm-lock.yaml prod/
RUN cd prod && pnpm install --prod --frozen-lockfile

COPY package.json pnpm-lock.yaml dev/
RUN cd dev && pnpm install --frozen-lockfile

COPY . dev/
RUN cd dev && pnpm run check && pnpm run build

FROM base
COPY --from=builder /app/prod/node_modules node_modules
COPY --from=builder /app/dev/build build
COPY package.json ./

CMD [ "node", "build" ]
