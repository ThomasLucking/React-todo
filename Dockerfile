FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /src
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install
COPY . .

FROM base AS development

EXPOSE 3001

CMD ["pnpm", "run", "dev", "--host", "0.0.0.0", "--port", "3000"]