# SAE - Sistema de Administración Empresarial

Un sistema completo de administración empresarial desarrollado con tecnologías modernas, que incluye gestión de usuarios, empresas, empleados, equipos e inspecciones.

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Licencia](#-licencia)

## 🚀 Descripción

SAE es un sistema integral de administración empresarial que permite gestionar:

- **Usuarios y autenticación** con roles (ADMIN/USER)
- **Empresas** con información fiscal y comercial
- **Empleados** y contactos empresariales
- **Equipos** y activos de la empresa
- **Inspecciones** y auditorías
- **Ubicaciones** geográficas (provincias, ciudades, direcciones)

## 📁 Estructura del Proyecto

```
sae-web/
├── sae-frontend/          # Aplicación Next.js 15.5.3
│   ├── app/              # App Router de Next.js
│   │   ├── api/          # API Routes (NextAuth)
│   │   ├── dashboard/    # Páginas del dashboard
│   │   ├── login/        # Página de login
│   │   ├── users/        # Gestión de usuarios
│   │   └── layout.tsx    # Layout principal
│   ├── components/       # Componentes React reutilizables
│   │   ├── forms/        # Formularios
│   │   ├── layouts/      # Layouts y navegación
│   │   ├── providers/    # Context providers
│   │   └── ui/           # Componentes UI (shadcn/ui)
│   ├── lib/             # Utilidades y configuraciones
│   │   ├── api/         # Cliente API y servicios
│   │   ├── hooks/       # Custom hooks (TanStack Query)
│   │   └── validations.ts # Esquemas Zod
│   └── types/           # Definiciones TypeScript
│
└── sae-backend/         # API NestJS 10.0.0
    ├── src/
    │   ├── auth/        # Módulo de autenticación JWT
    │   ├── users/       # Gestión de usuarios
    │   ├── companies/   # Gestión de empresas
    │   ├── employees/   # Gestión de empleados
    │   ├── equipment/   # Gestión de equipos
    │   ├── contacts/    # Gestión de contactos
    │   ├── locations/   # Gestión de ubicaciones
    │   ├── inspections/ # Gestión de inspecciones
    │   ├── common/      # Utilidades compartidas
    │   └── prisma/      # Configuración Prisma ORM
    └── prisma/          # Esquemas y migraciones de BD
```

## 🛠 Tecnologías Utilizadas

- **Next.js** 15.5.3 - Framework React con App Router
- **React** 19.1.0 - Biblioteca de interfaz de usuario
- **TypeScript** 5.x - Tipado estático
- **Tailwind CSS** 4.x - Framework CSS utilitario
- **shadcn/ui** - Componentes UI accesibles
- **TanStack Query** 5.89.0 - Gestión de estado del servidor
- **NextAuth.js** 4.24.11 - Autenticación
- **React Hook Form** 7.62.0 - Gestión de formularios
- **Zod** 4.1.9 - Validación de esquemas
- **Axios** 1.6.0 - Cliente HTTP
- **Lucide React** - Iconografía

## 📄 Licencia

Este proyecto es privado y no tiene licencia pública.

---

**Autor**: Renzo O. Gorosito  
**Versión**: 1.0.0  
**Última actualización**: 2024
