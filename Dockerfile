# Build
FROM node:22.14.0-alpine AS builder

WORKDIR /app

ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Copy entire project for building (includes mesh.config.ts)
COPY . .

# Build the project
RUN npm run build

# Producción
FROM node:22.14.0-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /home/appuser/app

# Copy only what's needed
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/supergraph.graphql ./supergraph.graphql

# Copy all of src except mesh.config.ts
COPY --from=builder /app/src ./src

USER appuser

EXPOSE 4000

CMD ["npm", "start"]
