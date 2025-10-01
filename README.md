# SAE Frontend - Sistema de Administración Empresarial

Aplicación web completa para gestión empresarial desarrollada con Next.js 15, TypeScript y Tailwind CSS. Incluye autenticación JWT, gestión de usuarios, empresas, empleados, contactos, ubicaciones y catálogos.

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Uso](#-uso)
- [Licencia](#-licencia)

## 🚀 Descripción

SAE Frontend es una aplicación web moderna construida con Next.js 15 (App Router), que proporciona una interfaz completa para el sistema de administración empresarial. Integra autenticación segura, formularios validados, gestión de estado eficiente y una UI accesible basada en shadcn/ui.

- **Versión**: 1.0.0
- **Autor**: Renzo O. Gorosito
- **Licencia**: UNLICENSED (privado)

## ✨ Características

### Autenticación y Seguridad

- Autenticación JWT con NextAuth.js
- Middleware de protección de rutas
- Gestión de sesiones y tokens de refresh
- Roles y permisos (USER, ADMIN, MANAGER)

### Gestión de Datos

- **Usuarios**: CRUD completo con roles
- **Empresas**: Gestión de compañías con categorías y subcategorías
- **Empleados**: Empleados con categorías, posiciones y vacaciones
- **Contactos**: Contactos polimórficos (empresas/personas)
- **Personas y Familia**: Gestión de personas físicas y relaciones familiares
- **Ubicaciones**: Países, provincias, ciudades y direcciones
- **Catálogos**: Marcas, unidades, equipos y categorías

### Interfaz de Usuario

- UI moderna con shadcn/ui y Tailwind CSS
- Tema oscuro/claro con next-themes
- Formularios validados con Zod y React Hook Form
- Tablas interactivas con TanStack Table
- Notificaciones toast con Framer Motion
- Diseño responsivo y accesible

### Arquitectura Técnica

- Next.js 15 con App Router
- TypeScript para tipado fuerte
- TanStack Query para gestión de estado servidor
- Axios para llamadas HTTP
- Componentes modulares y reutilizables
- Hooks personalizados para lógica de negocio

## 📁 Estructura del Proyecto

```
sae-frontend/
├── app/                               # Next.js App Router
│   ├── api/
│   │   └── auth/[...nextauth]/        # NextAuth API routes
│   ├── companies/                     # Gestión de empresas
│   │   ├── [id]/                      # Detalle/edición empresa
│   │   ├── business-categories/       # Categorías de negocio
│   │   ├── business-subcategories/    # Subcategorías de negocio
│   │   ├── list/                      # Lista de empresas
│   │   └── new/                       # Nueva empresa
│   ├── dashboard/                     # Dashboard principal
│   ├── employees/                     # Gestión de empleados
│   │   ├── [id]/                      # Detalle/edición empleado
│   │   ├── categories/                # Categorías de empleados
│   │   ├── list/                      # Lista de empleados
│   │   ├── new/                       # Nuevo empleado
│   │   ├── positions/                 # Posiciones de empleados
│   │   └── vacations/                 # Vacaciones de empleados
│   ├── login/                         # Página de login
│   ├── profile/                       # Perfil de usuario
│   ├── settings/                      # Configuraciones del sistema
│   │   ├── brands/                    # Gestión de marcas
│   │   ├── locations/                 # Gestión de ubicaciones
│   │   ├── units/                     # Gestión de unidades
│   │   └── page.tsx                   # Landing de settings
│   ├── users/                         # Gestión de usuarios
│   │   ├── [id]/                      # Detalle/edición usuario
│   │   └── new/                       # Nuevo usuario
│   ├── globals.css                    # Estilos globales Tailwind
│   ├── layout.tsx                     # Layout raíz con providers
│   └── page.tsx                       # Página de inicio
│
├── components/                        # Componentes React
│   ├── addresses/                     # Componentes de direcciones
│   ├── brands/                        # Componentes de marcas
│   ├── categories/                    # Componentes de categorías
│   ├── companies/                     # Componentes de empresas
│   ├── contacts/                      # Componentes de contactos
│   ├── employees/                     # Componentes de empleados
│   ├── forms/                         # Formularios reutilizables
│   ├── layouts/                       # Layouts y navegación
│   ├── locations/                     # Componentes de ubicaciones
│   ├── providers/                     # Context providers
│   ├── ui/                            # Componentes UI (shadcn/ui)
│   │   ├── data-table.tsx             # Tabla de datos genérica
│   │   ├── form-dialog.tsx            # Dialog para formularios
│   │   ├── toaster.tsx                # Notificaciones toast
│   │   └── ...                        # Otros componentes UI
│   └── units/                         # Componentes de unidades
│
├── lib/                               # Utilidades y lógica de negocio
│   ├── api/                           # Servicios API
│   │   ├── apiClient.ts               # Cliente HTTP base
│   │   ├── auth.ts                    # Servicios de autenticación
│   │   ├── catalogs.ts                # Servicios de catálogos
│   │   ├── companies.ts               # Servicios de empresas
│   │   ├── contacts.ts                # Servicios de contactos
│   │   ├── employees.ts               # Servicios de empleados
│   │   ├── locations.ts               # Servicios de ubicaciones
│   │   └── users.ts                   # Servicios de usuarios
│   ├── hooks/                         # React hooks personalizados
│   │   ├── useCatalogs.ts             # Hook para catálogos
│   │   ├── useCompanies.ts            # Hook para empresas
│   │   ├── useContacts.ts             # Hook para contactos
│   │   ├── useEmployees.ts            # Hook para empleados
│   │   ├── useLocations.ts            # Hook para ubicaciones
│   │   └── useUsers.ts                # Hook para usuarios
│   ├── validations/                   # Esquemas de validación Zod
│   └── utils.ts                       # Utilidades generales
│
├── types/                             # Definiciones TypeScript
│   ├── api.ts                         # Tipos de API
│   ├── auth.ts                        # Tipos de autenticación
│   ├── catalog.ts                     # Tipos de catálogos
│   ├── company.ts                     # Tipos de empresas
│   ├── contact.ts                     # Tipos de contactos
│   ├── employee.ts                    # Tipos de empleados
│   ├── location.ts                    # Tipos de ubicaciones
│   ├── user.ts                        # Tipos de usuarios
│   └── next-auth.d.ts                 # Extensiones NextAuth
│
├── middleware.ts                      # Middleware de Next.js
├── next.config.ts                     # Configuración Next.js
├── tailwind.config.js                 # Configuración Tailwind CSS
├── postcss.config.mjs                 # Configuración PostCSS
├── components.json                    # Configuración shadcn/ui
├── Dockerfile                         # Docker para producción
└── .env.example                       # Variables de entorno ejemplo
```

## 🛠 Tecnologías Utilizadas

### Core Framework

- **Next.js** 15.5.3 - React framework con App Router
- **React** 19.1.0 - Biblioteca de interfaz de usuario
- **TypeScript** 5.1.3 - Tipado estático

### UI y Estilos

- **Tailwind CSS** 4.0.0-alpha.66 - Framework CSS utilitario
- **shadcn/ui** - Componentes UI accesibles y personalizables
- **Radix UI** - Primitivas UI headless
- **Lucide React** 0.544.0 - Iconografía
- **Framer Motion** 12.23.19 - Animaciones
- **next-themes** 0.4.6 - Gestión de temas

### Gestión de Estado y Datos

- **TanStack Query** 5.89.0 - Gestión de estado del servidor
- **Axios** 1.6.0 - Cliente HTTP
- **@tanstack/react-table** 8.21.3 - Tablas de datos

### Formularios y Validación

- **React Hook Form** 7.62.0 - Gestión de formularios
- **@hookform/resolvers** 5.2.1 - Resolvers para RHF
- **Zod** 4.1.9 - Validación de esquemas

### Autenticación

- **NextAuth.js** 4.24.11 - Autenticación completa

### Utilidades

- **class-variance-authority** 0.7.1 - Variantes de clases
- **clsx** 2.1.1 - Utilidades de clases condicionales
- **tailwind-merge** 3.3.1 - Fusión de clases Tailwind
- **cmdk** 1.1.1 - Command palette

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd sae-frontend

# Instalar dependencias
npm install
```

### Variables de Entorno

Crear un archivo `.env.local` en la raíz del proyecto basado en `.env.example`:

```env
# Entorno
NODE_ENV=development

# API Backend (NestJS)
API_URL=http://localhost:3305/api
NEXT_PUBLIC_API_BASE_URL=http://localhost:3305

# NextAuth
NEXTAUTH_URL=http://localhost:3303
NEXTAUTH_SECRET=your-secure-secret-key-here
NEXTAUTH_DEBUG=true
```

### Desarrollo

```bash
# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

## 📖 Uso

### Estructura de Navegación

- **Dashboard**: Vista general del sistema
- **Empresas**: Gestión completa de compañías
- **Empleados**: Administración de personal
- **Usuarios**: Control de usuarios del sistema
- **Settings**: Configuración de catálogos (marcas, unidades, ubicaciones)

### Características Principales

- **CRUD Completo**: Crear, leer, actualizar y eliminar entidades
- **Búsqueda y Filtrado**: Tablas con funcionalidad de búsqueda
- **Formularios Validados**: Validación en tiempo real con feedback
- **Notificaciones**: Toast notifications para acciones del usuario
- **Responsive Design**: Adaptable a diferentes tamaños de pantalla

## 📄 Licencia

Este proyecto es privado y no tiene licencia pública.

---

**Desarrollado por**: Renzo O. Gorosito
**Versión**: 1.0.0
**Última actualización**: 2025
