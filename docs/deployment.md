# 🚀 Deployment - SAE Frontend

## Visión General

Esta guía cubre las diferentes opciones para desplegar SAE-Frontend en producción.

---

## 🎯 Opciones de Deployment

```
┌─────────────────────────────────────────────────────────┐
│                    DEPLOYMENT OPTIONS                       │
├─────────────────────────────────────────────────────────┤
│                                                            │
│  1. Vercel (Recomendado)    - Más fácil, zero-config       │
│  2. Docker                  - Portable, escalable           │
│  3. VPS/Server              - Control total                 │
│  4. AWS/GCP/Azure           - Enterprise                    │
│                                                            │
└─────────────────────────────────────────────────────────┘
```

---

## 1️⃣ Vercel (Recomendado)

### 🌟 Por qué Vercel?

- **Zero Configuration:** Detecta Next.js automáticamente
- **Edge Network:** CDN global ultra rápido
- **Automatic HTTPS:** SSL gratis y automático
- **Git Integration:** Deploy automático al hacer push
- **Preview URLs:** URL única para cada PR
- **Free Tier:** Generoso para proyectos pequeños/medianos

### 🚀 Deploy Paso a Paso

#### 1. Crear cuenta en Vercel

```bash
# Visitar: https://vercel.com/signup
# Conectar con GitHub/GitLab/Bitbucket
```

#### 2. Instalar Vercel CLI (Opcional)

```bash
npm install -g vercel
```

#### 3. Deploy desde CLI

```bash
# Desde el directorio del proyecto
cd sae-frontend

# Login
vercel login

# Deploy
vercel

# Seguir las instrucciones:
# - Setup and deploy? Yes
# - Which scope? (tu cuenta)
# - Link to existing project? No
# - Project name? sae-frontend
# - Directory? ./ (default)
```

#### 4. Deploy desde Git (Recomendado)

```bash
# 1. Push tu proyecto a GitHub
git push origin main

# 2. En Vercel Dashboard:
# - Click "New Project"
# - Import desde GitHub
# - Seleccionar repositorio sae-frontend
# - Click "Deploy"
```

### ⚙️ Configurar Variables de Entorno

```bash
# En Vercel Dashboard > Settings > Environment Variables

# Agregar estas variables:
NEXT_PUBLIC_API_BASE_URL=https://tu-backend.com
NEXTAUTH_URL=https://tu-app.vercel.app
NEXTAUTH_SECRET=tu-secret-key-generado
```

### 🔗 Dominios Personalizados

```bash
# En Vercel Dashboard > Settings > Domains

# Agregar dominio:
# 1. Escribir tu dominio: sae.tuempresa.com
# 2. Seguir instrucciones para configurar DNS:
#    - A record: 76.76.21.21
#    - CNAME: cname.vercel-dns.com
```

### 🔄 Auto-Deploy en Git Push

```bash
# Después de conectar con Git:

# Cada push a main → Deploy a producción
git push origin main

# Cada PR → Preview deployment
git push origin feature-branch
```

---

## 2️⃣ Docker

### 🐳 Por qué Docker?

- **Portable:** Corre en cualquier lugar
- **Consistente:** Mismo ambiente en dev/staging/prod
- **Escalable:** Fácil orquestación con Kubernetes
- **Isolation:** Dependencias encapsuladas

### 📦 Dockerfile (Ya incluido)

Ubicación: `/Dockerfile`

```dockerfile
# Multi-stage build para optimizar tamaño
FROM node:22-alpine AS base

# Instalar dependencias del sistema
RUN apk add --no-cache openssl ca-certificates curl
WORKDIR /app

# Stage 1: Instalar dependencias de producción
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --ignore-scripts

# Stage 2: Build de la aplicación
FROM base AS builder
WORKDIR /app

# Build-time environment variables
ARG NEXT_PUBLIC_API_URL
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# Stage 3: Imagen final de producción
FROM base AS runner
WORKDIR /app

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S -u 1001 -G nodejs nextjs

# Copiar archivos necesarios
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
ENV NODE_ENV=production
ENV PORT=3003
EXPOSE 3003

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3003', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

CMD ["npm", "start"]
```

### 🛠️ Build y Run

#### Build la imagen

```bash
# Build con variables de entorno
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.tuempresa.com \
  --build-arg NEXTAUTH_URL=https://app.tuempresa.com \
  --build-arg NEXTAUTH_SECRET=tu-secret-key \
  -t sae-frontend:latest \
  .
```

#### Ejecutar contenedor

```bash
# Run en puerto 3003
docker run -d \
  --name sae-frontend \
  -p 3003:3003 \
  -e NEXT_PUBLIC_API_URL=https://api.tuempresa.com \
  -e NEXTAUTH_URL=https://app.tuempresa.com \
  -e NEXTAUTH_SECRET=tu-secret-key \
  --restart unless-stopped \
  sae-frontend:latest
```

#### Verificar que funciona

```bash
# Ver logs
docker logs -f sae-frontend

# Verificar healthcheck
docker inspect --format='{{.State.Health.Status}}' sae-frontend

# Probar en navegador
open http://localhost:3003
```

### 🐳 Docker Compose

Crear `docker-compose.yml`:

```yaml
version: "3.8"

services:
  # Frontend Next.js
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NEXT_PUBLIC_API_URL: ${NEXT_PUBLIC_API_URL}
        NEXTAUTH_URL: ${NEXTAUTH_URL}
        NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
    ports:
      - "3003:3003"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    restart: unless-stopped
    depends_on:
      - backend
    networks:
      - sae-network
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3003"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # Backend NestJS (ejemplo)
  backend:
    image: sae-backend:latest
    ports:
      - "3305:3305"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/sae
    restart: unless-stopped
    depends_on:
      - db
    networks:
      - sae-network

  # PostgreSQL Database
  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=sae_user
      - POSTGRES_PASSWORD=secure_password
      - POSTGRES_DB=sae_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
    networks:
      - sae-network

volumes:
  postgres_data:

networks:
  sae-network:
    driver: bridge
```

Crear `.env.production`:

```env
NEXT_PUBLIC_API_URL=http://backend:3305
NEXTAUTH_URL=http://localhost:3003
NEXTAUTH_SECRET=tu-secret-key-de-32-caracteres-minimo
```

Ejecutar:

```bash
# Iniciar todo el stack
docker-compose --env-file .env.production up -d

# Ver logs
docker-compose logs -f frontend

# Detener todo
docker-compose down

# Reconstruir y reiniciar
docker-compose up -d --build
```

---

## 3️⃣ VPS/Server (Ubuntu)

### 🖥️ Requisitos del Servidor

- **OS:** Ubuntu 22.04 LTS o superior
- **RAM:** 2GB mínimo, 4GB recomendado
- **CPU:** 2 cores mínimo
- **Disco:** 20GB mínimo
- **Node.js:** 18.x o superior

### 🔧 Instalación en Servidor

#### 1. Actualizar sistema

```bash
sudo apt update && sudo apt upgrade -y
```

#### 2. Instalar Node.js

```bash
# Instalar Node.js 22.x
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar
node --version  # v22.x.x
npm --version   # 10.x.x
```

#### 3. Instalar PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

#### 4. Clonar y configurar proyecto

```bash
# Crear directorio
sudo mkdir -p /var/www
cd /var/www

# Clonar repositorio
sudo git clone <repository-url> sae-frontend
cd sae-frontend

# Cambiar permisos
sudo chown -R $USER:$USER /var/www/sae-frontend

# Instalar dependencias
npm ci --omit=dev

# Crear .env.production
cat > .env.production << EOF
NODE_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://api.tuempresa.com
NEXTAUTH_URL=https://app.tuempresa.com
NEXTAUTH_SECRET=$(openssl rand -hex 32)
EOF

# Build
npm run build
```

#### 5. Configurar PM2

Crear `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: "sae-frontend",
      script: "npm",
      args: "start",
      cwd: "/var/www/sae-frontend",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3003,
      },
      env_file: ".env.production",
      error_file: "/var/log/pm2/sae-frontend-error.log",
      out_file: "/var/log/pm2/sae-frontend-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      max_memory_restart: "500M",
      autorestart: true,
    },
  ],
};
```

Iniciar con PM2:

```bash
# Iniciar aplicación
pm2 start ecosystem.config.js

# Ver status
pm2 status

# Ver logs
pm2 logs sae-frontend

# Reiniciar
pm2 restart sae-frontend

# Auto-start en boot
pm2 startup
pm2 save
```

#### 6. Configurar Nginx como Reverse Proxy

```bash
# Instalar Nginx
sudo apt install nginx -y

# Crear configuración
sudo nano /etc/nginx/sites-available/sae-frontend
```

Agregar:

```nginx
server {
    listen 80;
    server_name app.tuempresa.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name app.tuempresa.com;

    # SSL certificates (configurar con Certbot)
    ssl_certificate /etc/letsencrypt/live/app.tuempresa.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app.tuempresa.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Next.js application
    location / {
        proxy_pass http://localhost:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3003;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }
}
```

Activar configuración:

```bash
# Crear symlink
sudo ln -s /etc/nginx/sites-available/sae-frontend /etc/nginx/sites-enabled/

# Test configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

#### 7. Configurar SSL con Certbot

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado
sudo certbot --nginx -d app.tuempresa.com

# Auto-renovación (ya está configurada automáticamente)
sudo certbot renew --dry-run
```

#### 8. Configurar Firewall

```bash
# Habilitar UFW
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable

# Verificar
sudo ufw status
```

### 🔄 Actualizar Aplicación

```bash
# Script de deploy
cat > /var/www/sae-frontend/deploy.sh << 'EOF'
#!/bin/bash
set -e

echo "Pulling latest changes..."
git pull origin main

echo "Installing dependencies..."
npm ci --omit=dev

echo "Building application..."
npm run build

echo "Restarting PM2..."
pm2 restart sae-frontend

echo "Deploy complete!"
EOF

chmod +x /var/www/sae-frontend/deploy.sh

# Ejecutar deploy
cd /var/www/sae-frontend
./deploy.sh
```

---

## 4️⃣ Cloud Providers

### AWS (EC2 + ECS/Fargate)

```bash
# 1. Crear ECR repository
aws ecr create-repository --repository-name sae-frontend

# 2. Build y push imagen
aws ecr get-login-password | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
docker build -t sae-frontend .
docker tag sae-frontend:latest <account-id>.dkr.ecr.<region>.amazonaws.com/sae-frontend:latest
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/sae-frontend:latest

# 3. Crear ECS cluster y service (via AWS Console o Terraform)
```

### Google Cloud Platform (Cloud Run)

```bash
# 1. Build y push a GCR
gcloud builds submit --tag gcr.io/<project-id>/sae-frontend

# 2. Deploy a Cloud Run
gcloud run deploy sae-frontend \
  --image gcr.io/<project-id>/sae-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "NEXT_PUBLIC_API_URL=https://api.tuempresa.com,NEXTAUTH_SECRET=tu-secret"
```

### Azure (Container Instances)

```bash
# 1. Login a Azure
az login

# 2. Crear resource group
az group create --name sae-rg --location eastus

# 3. Crear container registry
az acr create --resource-group sae-rg --name saecr --sku Basic

# 4. Build y push
az acr build --registry saecr --image sae-frontend:latest .

# 5. Deploy container
az container create \
  --resource-group sae-rg \
  --name sae-frontend \
  --image saecr.azurecr.io/sae-frontend:latest \
  --dns-name-label sae-frontend \
  --ports 3003 \
  --environment-variables \
    NEXT_PUBLIC_API_URL=https://api.tuempresa.com \
    NEXTAUTH_SECRET=tu-secret
```

---

## 📊 Monitoreo y Logging

### PM2 Monitoring

```bash
# Ver métricas en tiempo real
pm2 monit

# Dashboard web (pm2.io)
pm2 link <secret-key> <public-key>
```

### Nginx Access Logs

```bash
# Ver logs en tiempo real
sudo tail -f /var/log/nginx/access.log

# Analizar logs
sudo goaccess /var/log/nginx/access.log -o /var/www/html/report.html --log-format=COMBINED
```

### Docker Logs

```bash
# Ver logs del contenedor
docker logs -f sae-frontend

# Limitar líneas
docker logs --tail 100 sae-frontend
```

---

## ✅ Checklist de Deployment

### Pre-Deployment

- [ ] Tests pasando (cuando se implementen)
- [ ] Variables de entorno configuradas
- [ ] Build exitoso localmente
- [ ] NEXTAUTH_SECRET generado (mínimo 32 caracteres)
- [ ] URLs de API configuradas correctamente
- [ ] Backend API funcionando y accesible

### Post-Deployment

- [ ] Aplicación accesible en URL de producción
- [ ] SSL/HTTPS funcionando
- [ ] Login funciona correctamente
- [ ] Todas las páginas cargan sin errores
- [ ] API calls funcionan
- [ ] Imágenes y assets cargan
- [ ] Logs no muestran errores críticos
- [ ] Performance aceptable (Lighthouse > 80)
- [ ] Healthcheck endpoint responde

### Security

- [ ] HTTPS habilitado
- [ ] Security headers configurados
- [ ] Firewall configurado
- [ ] Puertos innecesarios cerrados
- [ ] Usuario no-root para la aplicación
- [ ] Secrets no commiteados en Git
- [ ] Backups configurados
- [ ] Monitoreo de errores activo

---

## 🔧 Troubleshooting

Ver [troubleshooting.md](./troubleshooting.md) para problemas comunes de deployment.

---

## 📚 Recursos

- **Vercel Docs:** https://vercel.com/docs
- **Docker Docs:** https://docs.docker.com
- **PM2 Docs:** https://pm2.keymetrics.io/docs
- **Nginx Docs:** https://nginx.org/en/docs
- **Let's Encrypt:** https://letsencrypt.org

---

**Siguiente:** [Troubleshooting →](./troubleshooting.md)
