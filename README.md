# SAE Frontend - Sistema de Administración Empresarial

Sistema de administración empresarial desarrollado con Next.js 15, React 19, TypeScript y Tailwind CSS.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Comandos Disponibles](#comandos-disponibles)
- [API Endpoints](#api-endpoints)
- [Autenticación](#autenticación)
- [Contribuir](#contribuir)
- [Troubleshooting](#troubleshooting)

## Descripción

SAE Frontend es la interfaz de usuario del Sistema de Administración Empresarial, diseñado para gestionar usuarios, empleados, equipos, inspecciones y más. Utiliza NextAuth.js para autenticación y se conecta con un backend NestJS.

## Estructura del Proyecto

```
sae-frontend/
├── app/                          # App Router de Next.js 15
│   ├── api/auth/                # Endpoints de autenticación NextAuth
│   ├── dashboard/               # Página principal del dashboard
│   ├── login/                   # Página de inicio de sesión
│   ├── users/                   # Gestión de usuarios
│   │   ├── [id]/               # Editar usuario específico
│   │   └── new/                # Crear nuevo usuario
│   ├── globals.css             # Estilos globales y variables CSS
│   ├── layout.tsx              # Layout raíz de la aplicación
│   └── page.tsx                # Página de inicio (redirección)
├── components/                  # Componentes reutilizables
│   ├── layouts/                # Componentes de layout
│   │   ├── dashboard-layout.tsx # Layout principal del dashboard
│   │   ├── header.tsx          # Header de la aplicación
│   │   ├── mobile-sidebar.tsx  # Sidebar móvil
│   │   └── sidebar.tsx         # Sidebar de navegación
│   ├── providers/              # Providers de contexto
│   │   ├── providers.tsx       # Provider principal
│   │   └── session-provider.tsx # Provider de sesión NextAuth
│   └── ui/                     # Componentes UI de shadcn/ui
│       ├── button.tsx          # Componente Button
│       ├── card.tsx            # Componente Card
│       ├── form.tsx            # Componentes de formulario
│       ├── input.tsx           # Componente Input
│       ├── select.tsx          # Componente Select
│       └── table.tsx           # Componente Table
├── lib/                        # Utilidades y configuraciones
│   ├── api/                    # Servicios de API
│   │   ├── apiClient.ts        # Cliente HTTP base
│   │   ├── auth.ts             # Servicios de autenticación
│   │   └── users.ts            # Servicios de usuarios
│   ├── hooks/                  # Custom hooks
│   │   └── useUsers.ts         # Hook para gestión de usuarios
│   ├── utils.ts                # Utilidades generales
│   └── validations.ts          # Esquemas de validación Zod
├── types/                      # Definiciones de tipos TypeScript
│   ├── api.ts                  # Tipos para respuestas de API
│   ├── auth.ts                 # Tipos de autenticación
│   ├── next-auth.d.ts          # Extensiones de tipos NextAuth
│   └── user.ts                 # Tipos de usuario
├── public/                     # Archivos estáticos
├── middleware.ts               # Middleware de Next.js
├── tailwind.config.js          # Configuración de Tailwind CSS
├── components.json             # Configuración de shadcn/ui
└── package.json               # Dependencias y scripts
```

## Tecnologías

### Core
- **Next.js**: 15.5.3 (App Router, Turbopack)
- **React**: 19.1.0
- **TypeScript**: ^5
- **Tailwind CSS**: ^4

### UI y Componentes
- **shadcn/ui**: Componentes UI basados en Radix UI
- **Radix UI**: Primitivos de UI accesibles
- **Lucide React**: 0.544.0 (Iconos)
- **class-variance-authority**: 0.7.1 (Variantes de componentes)

### Estado y Datos
- **TanStack Query**: 5.89.0 (Gestión de estado del servidor)
- **React Hook Form**: 7.62.0 (Gestión de formularios)
- **Zod**: 4.1.9 (Validación de esquemas)

### Autenticación y HTTP
- **NextAuth.js**: 4.24.11 (Autenticación)
- **Axios**: 1.6.0 (Cliente HTTP)

### Utilidades
- **clsx**: 2.1.1 (Utilidad de clases CSS)
- **tailwind-merge**: 3.3.1 (Merge de clases Tailwind)
- **next-themes**: 0.4.6 (Gestión de temas)

## Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd sae-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   # Editar .env.local con los valores correctos
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

## Variables de Entorno

Crear un archivo `.env.local` basado en `.env.example`:

```env
# Entorno
NODE_ENV=development

# API Backend (NestJS)
API_URL="http://localhost:3305/api"
NEXT_PUBLIC_API_BASE_URL=http://localhost:3305

# NextAuth.js
NEXTAUTH_URL="http://localhost:3303"
NEXTAUTH_SECRET="sae-nextauth-secret-key-2024-development-environment-secure-token"

# Opcional: Debug en desarrollo
NEXTAUTH_DEBUG=true
```

### Descripción de Variables

- `API_URL`: URL del backend NestJS (usado en server-side)
- `NEXT_PUBLIC_API_BASE_URL`: URL pública del backend (usado en client-side)
- `NEXTAUTH_URL`: URL donde corre el frontend Next.js
- `NEXTAUTH_SECRET`: Clave secreta para firmar tokens JWT y cookies
- `NEXTAUTH_DEBUG`: Habilita logs de debug de NextAuth (solo desarrollo)

## Comandos Disponibles

```bash
# Desarrollo con Turbopack
npm run dev

# Construcción para producción
npm run build

# Iniciar servidor de producción
npm run start

# Verificación de tipos TypeScript
npx tsc --noEmit

# Linting (si está configurado)
npm run lint
```

## API Endpoints

El frontend se conecta con los siguientes endpoints del backend:

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/refresh` - Renovar token

### Usuarios
- `GET /api/users` - Obtener lista de usuarios
- `POST /api/users` - Crear nuevo usuario
- `PATCH /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Headers Requeridos
```
Content-Type: application/json
Authorization: Bearer <access_token>
```

## Autenticación

El sistema utiliza NextAuth.js con un provider personalizado que se conecta al backend NestJS:

1. **Login**: Usuario ingresa credenciales en `/login`
2. **Validación**: NextAuth envía credenciales al backend
3. **Token**: Backend retorna `accessToken` y `refreshToken`
4. **Sesión**: NextAuth almacena la sesión con el token
5. **Protección**: Middleware protege rutas que requieren autenticación

### Flujo de Autenticación
```
Usuario → /login → NextAuth → Backend → JWT Token → Sesión → Dashboard
```

## Contribuir

### Convenciones de Commits
Usar [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user creation form
fix: resolve login redirect issue
docs: update README installation steps
style: apply teal color palette
refactor: improve API client error handling
test: add user service unit tests
```

### Proceso de Desarrollo
1. Crear rama desde `main`: `git checkout -b feature/nueva-funcionalidad`
2. Hacer commits siguiendo convenciones
3. Ejecutar tests: `npm test` (si están configurados)
4. Verificar tipos: `npx tsc --noEmit`
5. Crear Pull Request

## Troubleshooting

### Errores Comunes

#### 1. Error de Compilación TypeScript
```
Property 'login' does not exist on type 'typeof ApiClient'
```
**Causa**: Método no definido en ApiClient
**Solución**: Verificar que el método esté implementado en `lib/api/apiClient.ts`

#### 2. Error de Creación de Usuario
```
Failed to create user: HTTP error! status: 400
```
**Causa**: Payload incorrecto o falta Content-Type header
**Solución**: 
- Verificar estructura del payload en `UsersService.createUser`
- Confirmar que el header `Content-Type: application/json` esté presente

#### 3. Error de Autenticación
```
Session callback error: Invalid token
```
**Causa**: Token JWT inválido o expirado
**Solución**: 
- Verificar `NEXTAUTH_SECRET` en variables de entorno
- Confirmar que el backend esté corriendo en la URL correcta

#### 4. Error de CORS
```
Access to fetch blocked by CORS policy
```
**Causa**: Backend no permite requests desde el frontend
**Solución**: Verificar configuración CORS en `next.config.ts`

#### 5. Error de Hydration
```
Hydration failed because the initial UI does not match
```
**Causa**: Diferencia entre server-side y client-side rendering
**Solución**: Usar `suppressHydrationWarning` o verificar estado inicial

### Comandos de Diagnóstico

```bash
# Verificar tipos TypeScript
npx tsc --noEmit

# Verificar dependencias
npm ls

# Limpiar cache de Next.js
rm -rf .next

# Reinstalar dependencias
rm -rf node_modules package-lock.json && npm install
```

### Logs de Debug

Para habilitar logs detallados:
```env
NEXTAUTH_DEBUG=true
NODE_ENV=development
```

### Contacto y Soporte

- **Autor**: Renzo O. Gorosito
- **Versión**: 1.0.0
- **Licencia**: UNLICENSED (Privado)

---

**Nota**: Este proyecto está en desarrollo activo. Consultar la documentación del backend para endpoints actualizados y cambios en la API.