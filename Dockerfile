# Dockerfile para SAE-Frontend con Node.js 22 Alpine
FROM node:22-alpine AS base

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
# Generar el cliente Prisma ANTES del build
RUN npx prisma generate
RUN npm run build

# Stage de producción con cliente Prisma generado
FROM base AS runner
WORKDIR /app

# Crear usuario y grupo no root
RUN addgroup -g 1001 -S nodejs \
    && adduser -S -u 1001 -G nodejs nestjs

# Copiar archivos necesarios con los permisos correctos
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma

# Comando de inicio
CMD ["node", "dist/main"]