# 🚀 Getting Started - SAE Frontend

## Bienvenido

Esta guía te ayudará a configurar y ejecutar el proyecto SAE-Frontend en tu máquina local en menos de 10 minutos.

---

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 18 o superior ([Descargar](https://nodejs.org/))
- **npm** o **yarn** (incluido con Node.js)
- **Git** ([Descargar](https://git-scm.com/))
- Un editor de código (recomendado: [VS Code](https://code.visualstudio.com/))

### Verificar instalación

```bash
node --version  # Debe ser v18.0.0 o superior
npm --version   # Debe ser v8.0.0 o superior
```

---

## 📥 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd sae-frontend
```

### 2. Instalar dependencias

```bash
npm install
# o si prefieres yarn:
yarn install
```

Esto instalará todas las dependencias necesarias (~300MB). Puede tomar 2-5 minutos.

---

## ⚙️ Configuración

### 1. Crear archivo de variables de entorno

Copia el archivo de ejemplo y edítalo:

```bash
cp .env.example .env.local
```

### 2. Configurar variables de entorno

Edita `.env.local` con tus valores:

```env
# Entorno
NODE_ENV=development

# Backend API (NestJS) - IMPORTANTE: Cambiar el puerto
NEXT_PUBLIC_API_BASE_URL=http://localhost:3305
API_URL=http://localhost:3305/api

# NextAuth - URL donde corre tu frontend
NEXTAUTH_URL=http://localhost:3003

# NextAuth Secret - Generar uno seguro
NEXTAUTH_SECRET=tu-secret-key-muy-segura-aqui-minimo-32-caracteres

# Debug (opcional)
NEXTAUTH_DEBUG=true
```

### 3. Generar NEXTAUTH_SECRET seguro

```bash
# En tu terminal:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copia el resultado y úsalo como `NEXTAUTH_SECRET`.

---

## 🚀 Ejecutar en Desarrollo

### Iniciar el servidor de desarrollo

```bash
npm run dev
```

El servidor estará disponible en:

- **Frontend:** http://localhost:3003
- **Hot reload:** Habilitado automáticamente

### ¿Qué esperar?

```
✓ Ready in 2.5s
○ Compiling / ...
✓ Compiled / in 1.2s
```

---

## 🔐 Iniciar Sesión

### Credenciales de prueba

Para desarrollo, el backend debe proporcionar usuarios de prueba. Ejemplo típico:

```
Email: admin@sae.com
Password: Admin123!
```

**Nota:** Estas credenciales deben coincidir con tu backend SAE-NestJS.

---

## 📁 Estructura del Proyecto

```
sae-frontend/
├── app/                    # Pages (Next.js App Router)
│   ├── dashboard/         # Panel principal
│   ├── companies/         # Gestión de empresas
│   ├── employees/         # Gestión de empleados
│   ├── equipments/        # Gestión de equipos
│   ├── tires/            # Gestión de neumáticos
│   └── login/            # Página de login
├── components/            # Componentes React
│   ├── ui/               # Componentes shadcn/ui
│   ├── layouts/          # Layouts (header, sidebar)
│   ├── forms/            # Formularios reutilizables
│   └── [domain]/         # Componentes por dominio
├── lib/                  # Lógica de negocio
│   ├── api/              # Servicios API
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript types
│   ├── validations/      # Esquemas Zod
│   └── utils/            # Utilidades
├── public/               # Archivos estáticos
└── package.json          # Dependencias
```

---

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Iniciar servidor de desarrollo (puerto 3003)

# Producción
npm run build            # Crear build optimizado
npm run start            # Iniciar servidor de producción

# Calidad de código
npm run lint             # Ejecutar ESLint
npm run type-check       # Verificar tipos TypeScript
```

---

## 🧪 Verificar que Todo Funciona

### Checklist de verificación

- [ ] El servidor inicia sin errores
- [ ] Puedes acceder a http://localhost:3003
- [ ] Ves la página de login
- [ ] Puedes iniciar sesión (requiere backend funcionando)
- [ ] Al iniciar sesión, rediriges al dashboard
- [ ] Hot reload funciona al editar archivos

---

## 🔌 Conectar con el Backend

### Backend SAE-NestJS

Este frontend requiere el backend SAE-NestJS funcionando.

**Requisitos:**

- Backend corriendo en: `http://localhost:3305`
- Base de datos PostgreSQL configurada
- Endpoints de API disponibles

### Verificar conexión

1. **Iniciar backend:**

   ```bash
   cd ../sae-backend
   npm run start:dev
   ```

2. **Probar conexión:**

   ```bash
   curl http://localhost:3305/api/health
   # Debe retornar: {"status":"ok"}
   ```

3. **En el frontend:**
   - Ir a http://localhost:3003/login
   - Intentar iniciar sesión
   - Si funciona, la conexión está OK ✅

---

## 🐛 Problemas Comunes

### Error: "Port 3003 is already in use"

```bash
# Encontrar el proceso usando el puerto
lsof -ti:3003

# Matar el proceso
kill -9 <PID>

# O cambiar el puerto en package.json:
"dev": "next dev --turbopack --port 3004"
```

### Error: "Cannot find module 'next'"

```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "NEXTAUTH_SECRET is not defined"

```bash
# Asegúrate de tener .env.local configurado
# y que NEXTAUTH_SECRET tenga al menos 32 caracteres
```

### Error: "Failed to fetch" al hacer login

```bash
# Verificar que el backend esté corriendo:
curl http://localhost:3305/api/auth/login

# Verificar NEXT_PUBLIC_API_BASE_URL en .env.local
```

---

## 📚 Próximos Pasos

Ahora que tienes el proyecto funcionando:

1. **Leer la documentación:**

   - [Arquitectura](./architecture.md) - Entender la estructura
   - [API Integration](./api-integration.md) - Cómo consumir APIs
   - [Deployment](./deployment.md) - Desplegar a producción

2. **Explorar el código:**

   - Comienza por `/app/dashboard/page.tsx`
   - Revisa los componentes en `/components/ui`
   - Estudia los hooks en `/lib/hooks`

3. **Hacer tu primer cambio:**
   - Edita el título en `/app/dashboard/page.tsx`
   - Guarda y observa el hot reload

---

## 🆘 Obtener Ayuda

- **Documentación:** Lee los archivos en `/docs`
- **Issues:** Abre un issue en GitHub
- **Contribuir:** Lee [CONTRIBUTING.md](../CONTRIBUTING.md)

---

## ✅ Checklist Final

- [ ] Node.js 18+ instalado
- [ ] Dependencias instaladas
- [ ] `.env.local` configurado
- [ ] Backend corriendo en puerto 3305
- [ ] Frontend corriendo en puerto 3003
- [ ] Puedo hacer login
- [ ] Hot reload funciona
- [ ] Leí la documentación de arquitectura

---

**¡Felicitaciones! 🎉 Ya estás listo para desarrollar en SAE-Frontend.**

Siguiente paso: [Entender la Arquitectura →](./architecture.md)
