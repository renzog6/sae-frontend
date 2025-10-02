# Dockerfile para SAE-Frontend con Node.js 22 Alpine
FROM node:22-alpine AS base

# Instalar dependencias del sistema necesarias
RUN apk add --no-cache \
    openssl \
    ca-certificates \
    curl \
    && corepack enable

WORKDIR /app

# Stage de dependencias de producción
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --ignore-scripts --loglevel=error

# Stage de dependencias de desarrollo para build
FROM base AS deps-dev
COPY package.json package-lock.json* ./
RUN npm install --include=dev --loglevel=error

# Stage de build
FROM base AS builder
WORKDIR /app
COPY --from=deps-dev /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage de producción
FROM base AS runner
WORKDIR /app

# Crear usuario y grupo no root
RUN addgroup -g 1001 -S nodejs \
    && adduser -S -u 1001 -G nodejs nextjs

# Copiar archivos necesarios con los permisos correctos
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Variables de entorno
USER nextjs
ENV NODE_ENV=production
ENV PORT=3003
EXPOSE 3003

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3003', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Comando de inicio
CMD ["npm", "start"]