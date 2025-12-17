# 🔧 Troubleshooting - SAE Frontend

## Visión General

Esta guía resuelve problemas comunes que puedes encontrar durante el desarrollo y deployment.

---

## 🚨 Problemas de Instalación

### Error: "Cannot find module 'next'"

**Síntoma:**

```
Error: Cannot find module 'next'
Require stack:
- /app/node_modules/.bin/next
```

**Solución:**

```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# O con cache limpia
npm cache clean --force
npm install
```

---

### Error: "EACCES: permission denied"

**Síntoma:**

```
npm ERR! code EACCES
npm ERR! syscall access
npm ERR! path /usr/local/lib/node_modules
```

**Solución:**

```bash
# Opción 1: Cambiar dueño de directorios npm
sudo chown -R $USER:$USER ~/.npm
sudo chown -R $USER:$USER /usr/local/lib/node_modules

# Opción 2: Usar npx en lugar de instalación global
npx next dev

# Opción 3: Usar nvm (recomendado)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 22
nvm use 22
```

---

### Error: "Versiones incompatibles de Node"

**Síntoma:**

```
engine node is incompatible with this module
Expected version: >=18.0.0
Got: 16.x.x
```

**Solución:**

```bash
# Verificar versión actual
node --version

# Actualizar con nvm
nvm install 22
nvm alias default 22

# O descargar de nodejs.org
# https://nodejs.org/
```

---

## 🔐 Problemas de Autenticación

### Error: "NEXTAUTH_SECRET is not defined"

**Síntoma:**

```
[next-auth][error][NO_SECRET]
https://next-auth.js.org/errors#no_secret
```

**Solución:**

```bash
# 1. Generar secret seguro
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 2. Agregar a .env.local
echo "NEXTAUTH_SECRET=<secret-generado>" >> .env.local

# 3. Reiniciar servidor
npm run dev
```

---

### Error: "Failed to fetch" al hacer login

**Síntoma:**

```
POST http://localhost:3003/api/auth/callback/credentials 500 (Internal Server Error)
```

**Diagnóstico:**

```bash
# 1. Verificar que el backend esté corriendo
curl http://localhost:3305/api/health
# Debe retornar: {"status":"ok"}

# 2. Verificar variables de entorno
cat .env.local | grep API
# Debe mostrar: NEXT_PUBLIC_API_BASE_URL=http://localhost:3305

# 3. Verificar logs del frontend
# En la consola de npm run dev
```

**Solución:**

```bash
# Si el backend no responde
cd ../sae-backend
npm run start:dev

# Si la URL está mal configurada
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:3305" > .env.local

# Reiniciar frontend
npm run dev
```

---

### Error: "Invalid credentials" con credenciales correctas

**Síntoma:**

```
Error: Credenciales inválidas. Verifica tu email y contraseña.
```

**Diagnóstico:**

```bash
# Test directo al backend
curl -X POST http://localhost:3305/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sae.com","password":"Admin123!"}'

# Debe retornar:
# {"accessToken":"...","refreshToken":"...","user":{...}}
```

**Soluciones:**

1. **Base de datos vacía:**

```bash
# Ejecutar seeds en el backend
cd ../sae-backend
npm run seed
```

2. **Hash de password incorrecto:**

```bash
# Verificar en DB que el password esté hasheado con bcrypt
# Si no, re-seedear la base de datos
```

3. **CORS bloqueando:**

```javascript
// En sae-backend/main.ts
app.enableCors({
  origin: "http://localhost:3003",
  credentials: true,
});
```

---

### Error: Token expirado constante

**Síntoma:**

```
Redirigido a /login inmediatamente después de iniciar sesión
```

**Diagnóstico:**

```bash
# Verificar tiempo de expiración del token en backend
# Debe ser al menos 15 minutos

# Verificar que refreshToken funcione
curl -X POST http://localhost:3305/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<tu-refresh-token>"}'
```

**Solución:**

```typescript
// En sae-backend: Aumentar expiración del token
// auth.module.ts o auth.service.ts
JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: "15m" }, // Aumentar si es necesario
});
```

---

## 🔌 Problemas de API

### Error: "CORS policy" bloqueando requests

**Síntoma:**

```
Access to fetch at 'http://localhost:3305/api/companies' from origin
'http://localhost:3003' has been blocked by CORS policy
```

**Solución Backend:**

```typescript
// En sae-backend/src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: ["http://localhost:3003", "https://tu-dominio.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  await app.listen(3305);
}
bootstrap();
```

**Solución Frontend (next.config.ts):**

```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};
```

---

### Error: "Network request failed" intermitente

**Síntoma:**

```
Fetch failed: TypeError: Network request failed
```

**Diagnóstico:**

```bash
# 1. Verificar que ambos servicios estén corriendo
ps aux | grep node

# 2. Verificar conectividad
ping localhost
telnet localhost 3305

# 3. Verificar logs del backend
cd ../sae-backend
npm run start:dev
```

**Soluciones:**

1. **Timeout muy corto:**

```typescript
// En apiClient.ts
const REQUEST_TIMEOUT = 30000; // Aumentar de 10s a 30s
```

2. **Backend caído:**

```bash
# Reiniciar backend
cd ../sae-backend
npm run start:dev
```

3. **Firewall bloqueando:**

```bash
# Desactivar firewall temporalmente (Mac)
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate off

# Linux
sudo ufw disable
```

---

### Error: "404 Not Found" en endpoints válidos

**Síntoma:**

```
GET http://localhost:3305/api/companies 404 (Not Found)
```

**Diagnóstico:**

```bash
# 1. Verificar que el endpoint existe en backend
curl http://localhost:3305/api/companies

# 2. Verificar la ruta completa
echo $NEXT_PUBLIC_API_BASE_URL
```

**Soluciones:**

1. **Path incorrecto:**

```typescript
// Verificar en el servicio
class CompanyService extends BaseApiService<Company> {
  protected basePath = "/companies"; // Debe coincidir con backend
}
```

2. **URL base incorrecta:**

```bash
# En .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:3305  # Sin /api al final
```

3. **Backend no tiene ese endpoint:**

```bash
# Verificar rutas disponibles en backend
cd ../sae-backend
grep -r "@Controller" src/
```

---

## 🎨 Problemas de UI

### Estilos de Tailwind no se aplican

**Síntoma:**

```
Componentes sin estilos, colores por defecto del navegador
```

**Solución:**

```bash
# 1. Verificar que globals.css esté importado
# En app/layout.tsx debe haber:
import "./globals.css";

# 2. Reiniciar servidor con cache limpia
rm -rf .next
npm run dev

# 3. Verificar tailwind.config.js
cat tailwind.config.js | grep content
# Debe incluir: "./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"
```

---

### Dark mode no funciona

**Síntoma:**

```
Botón de theme no cambia la apariencia
```

**Solución:**

```typescript
// 1. Verificar que ThemeProvider esté envolviendo la app
// En app/layout.tsx
import { Providers } from "@/components/providers/providers";

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// 2. Verificar tailwind.config.js
module.exports = {
  darkMode: ["class"], // Debe estar presente
  // ...
};
```

---

### Imágenes no cargan

**Síntoma:**

```
404 en /images/logo.png
```

**Solución:**

```bash
# 1. Verificar que la imagen existe en /public
ls -la public/images/

# 2. Usar ruta correcta (sin /public)
# ✅ Correcto:
<img src="/images/logo.png" />
# o con next/image:
import Image from 'next/image';
<Image src="/images/logo.png" width={200} height={100} alt="Logo" />

# ❌ Incorrecto:
<img src="/public/images/logo.png" />
```

---

## 🚀 Problemas de Build

### Error: "Type error" en build

**Síntoma:**

```
Type error: Property 'id' does not exist on type 'never'.
```

**Solución:**

```bash
# 1. Verificar tipos TypeScript
npx tsc --noEmit

# 2. Corregir tipos faltantes
# Asegurarse de que todos los componentes tengan props tipadas

# 3. Build de nuevo
npm run build
```

---

### Error: "Out of memory" durante build

**Síntoma:**

```
JavaScript heap out of memory
```

**Solución:**

```bash
# Aumentar memoria disponible para Node.js
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# O agregar a package.json
"scripts": {
  "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
}
```

---

### Build exitoso pero páginas en blanco

**Síntoma:**

```
Build completo sin errores, pero navegador muestra página en blanco
```

**Diagnóstico:**

```bash
# 1. Abrir consola del navegador (F12)
# Buscar errores JavaScript

# 2. Verificar que no haya import de "use client" faltantes
```

**Solución:**

```typescript
// Si usas hooks de React, agregar "use client"
"use client";

import { useState } from "react";

export function MyComponent() {
  const [state, setState] = useState();
  // ...
}
```

---

## 🐳 Problemas de Docker

### Error: "Cannot connect to Docker daemon"

**Síntoma:**

```
Cannot connect to the Docker daemon at unix:///var/run/docker.sock
```

**Solución:**

```bash
# Mac/Windows: Iniciar Docker Desktop
open -a Docker

# Linux: Iniciar servicio Docker
sudo systemctl start docker
sudo systemctl enable docker

# Agregar usuario a grupo docker
sudo usermod -aG docker $USER
newgrp docker
```

---

### Error: "COPY failed" en Dockerfile

**Síntoma:**

```
COPY failed: file not found in build context
```

**Solución:**

```bash
# 1. Verificar que estás en el directorio correcto
pwd
# Debe estar en /ruta/a/sae-frontend

# 2. Verificar .dockerignore
cat .dockerignore
# No debe ignorar archivos necesarios como package.json

# 3. Build desde el directorio raíz
docker build -t sae-frontend:latest .
```

---

### Contenedor se detiene inmediatamente

**Síntoma:**

```
Contenedor inicia pero se detiene después de 1-2 segundos
```

**Diagnóstico:**

```bash
# Ver logs del contenedor
docker logs sae-frontend

# Ver por qué se detuvo
docker inspect sae-frontend | grep -A 10 State
```

**Soluciones comunes:**

1. **Puerto ya en uso:**

```bash
# Verificar qué proceso usa el puerto
lsof -i :3003

# Usar otro puerto
docker run -p 3004:3003 sae-frontend:latest
```

2. **Variables de entorno faltantes:**

```bash
# Pasar todas las env vars necesarias
docker run -d \
  -e NEXT_PUBLIC_API_URL=http://localhost:3305 \
  -e NEXTAUTH_URL=http://localhost:3003 \
  -e NEXTAUTH_SECRET=tu-secret-key \
  sae-frontend:latest
```

3. **Error en CMD:**

```dockerfile
# Verificar que el CMD en Dockerfile sea correcto
CMD ["npm", "start"]  # Debe ser start, no dev
```

---

## 🔥 Problemas de Performance

### Página carga muy lento

**Diagnóstico:**

```bash
# 1. Ejecutar Lighthouse en Chrome DevTools
# 2. Identificar recursos pesados
```

**Soluciones:**

1. **Optimizar imágenes:**

```typescript
// Usar next/image en lugar de <img>
import Image from "next/image";

<Image
  src="/images/large-photo.jpg"
  width={800}
  height={600}
  alt="Foto"
  quality={75} // Reducir calidad si es necesario
  placeholder="blur" // Añadir placeholder
/>;
```

2. **Lazy loading de componentes:**

```typescript
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("@/components/heavy-component"), {
  loading: () => <Skeleton />,
});
```

3. **Memoización:**

```typescript
import { useMemo } from "react";

const expensiveResult = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

---

### Hot reload muy lento

**Síntoma:**

```
Cambios tardan 10-30 segundos en reflejarse
```

**Solución:**

```bash
# 1. Usar Turbopack (ya configurado en package.json)
npm run dev # Ya incluye --turbopack

# 2. Si aún es lento, excluir node_modules del watch
# Crear next.config.ts con:
module.exports = {
  webpack: (config) => {
    config.watchOptions = {
      ignored: /node_modules/,
    };
    return config;
  },
};

# 3. Aumentar límite de watchers (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

## 🌐 Problemas de Deployment

### Error 500 en producción pero funciona en dev

**Diagnóstico:**

```bash
# 1. Verificar logs del servidor
pm2 logs sae-frontend
# o
docker logs sae-frontend

# 2. Verificar variables de entorno
```

**Soluciones comunes:**

1. **Variables de entorno faltantes:**

```bash
# Verificar que todas las env vars estén configuradas
echo $NEXTAUTH_SECRET
echo $NEXT_PUBLIC_API_URL
```

2. **Build sin optimización:**

```bash
# Hacer build de producción
NODE_ENV=production npm run build
```

3. **Puerto incorrecto:**

```bash
# Verificar que el puerto esté correcto
PORT=3003 npm start
```

---

### HTTPS no funciona / Certificado inválido

**Síntoma:**

```
NET::ERR_CERT_AUTHORITY_INVALID
```

**Solución con Certbot:**

```bash
# 1. Verificar que el dominio apunte al servidor
dig app.tuempresa.com

# 2. Obtener certificado SSL
sudo certbot --nginx -d app.tuempresa.com

# 3. Verificar certificado
sudo certbot certificates

# 4. Renovar si está vencido
sudo certbot renew

# 5. Reiniciar Nginx
sudo systemctl restart nginx
```

---

## 📞 Obtener Ayuda

Si ninguna de estas soluciones funciona:

1. **Logs completos:**

   ```bash
   # Frontend
   npm run dev > frontend.log 2>&1

   # Backend
   cd ../sae-backend
   npm run start:dev > backend.log 2>&1

   # Revisar logs
   tail -f frontend.log
   tail -f backend.log
   ```

2. **Buscar en GitHub Issues:**

   - Next.js: https://github.com/vercel/next.js/issues
   - NextAuth: https://github.com/nextauthjs/next-auth/issues

3. **Stack Overflow:**

   - Tag: [next.js], [next-auth], [tailwindcss]

4. **Discord/Comunidad:**
   - Next.js Discord: https://nextjs.org/discord

---

## 📋 Checklist de Debug

- [ ] Node.js versión >= 18
- [ ] npm install sin errores
- [ ] .env.local configurado
- [ ] Backend corriendo en 3305
- [ ] Frontend corriendo en 3003
- [ ] Variables de entorno cargadas
- [ ] Sin errores en consola del navegador (F12)
- [ ] Sin errores en terminal de npm run dev
- [ ] Backend responde a curl
- [ ] Login funciona

---

**Volver a:** [Getting Started](./getting-started.md) | [Architecture](./architecture.md)
