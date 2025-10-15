# SAE Frontend - Sistema de Administración Empresarial

Aplicación web completa para gestión empresarial desarrollada con Next.js 15, TypeScript y Tailwind CSS. Incluye autenticación JWT, gestión de usuarios, empresas, empleados, contactos, ubicaciones y catálogos.

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
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
- Roles y permisos (USER, ADMIN)
- Navegación basada en roles (filtrado de menú)

### Gestión de Datos

- **Usuarios**: CRUD completo con roles
- **Empresas**: Gestión de compañías con categorías y subcategorías
- **Empleados**: Empleados con categorías, posiciones y vacaciones
- **Contactos**: Contactos polimórficos (empresas/personas)
- **Personas y Familia**: Gestión de personas físicas y relaciones familiares
- **Ubicaciones**: Países, provincias, ciudades y direcciones
- **Catálogos**: Marcas, unidades, equipos y categorías
- **Historial**: Incidentes, mantenimientos y eventos

### Interfaz de Usuario

- UI moderna con shadcn/ui y Tailwind CSS
- Tema oscuro/claro con next-themes
- Formularios validados con Zod y React Hook Form
- Tablas interactivas con TanStack Table (ordenamiento, búsqueda múltiple)
- Notificaciones toast con Framer Motion
- Diseño responsivo y accesible
- Sidebar móvil con navegación

### Arquitectura Técnica

- Next.js 15 con App Router
- TypeScript para tipado fuerte
- TanStack Query para gestión de estado servidor
- Axios para llamadas HTTP
- Componentes modulares y reutilizables
- Hooks personalizados para lógica de negocio
- Validaciones con Zod
- Constantes y etiquetas para enums

## 🏗 Arquitectura del Sistema

### Patrón de Arquitectura

El proyecto sigue una arquitectura modular y escalable:

- **App Router**: Estructura de rutas basada en directorios
- **Componentes Reutilizables**: UI components con shadcn/ui
- **Separación de Concerns**: API, hooks, validaciones y constantes separados
- **Type Safety**: TypeScript completo con tipos compartidos
- **State Management**: TanStack Query para server state, React Query para client state

### Flujo de Datos

1. **Autenticación**: NextAuth.js maneja login/logout y sesiones
2. **API Calls**: Axios client con interceptores para tokens
3. **State Management**: TanStack Query para cache y sincronización
4. **UI Updates**: React hooks personalizados para lógica de negocio
5. **Validations**: Zod schemas para forms y API responses

### Seguridad

- **Middleware**: Protección de rutas en Next.js
- **JWT Tokens**: Autenticación stateless
- **Role-based Access**: Filtrado de navegación y acciones
- **Input Validation**: Validaciones en cliente y servidor

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
│   ├── equipments/                    # Gestión de equipos
│   │   ├── [id]/                      # Detalle equipo
│   │   ├── categories/                # Categorías de equipos
│   │   ├── list/                      # Lista de equipos
│   │   ├── models/                    # Modelos de equipos
│   │   ├── new/                       # Nuevo equipo
│   │   └── types/                     # Tipos de equipos
│   ├── login/                         # Página de login
│   ├── profile/                       # Perfil de usuario
│   ├── reports/                       # Reportes del sistema
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
│   ├── page.tsx                       # Página de inicio (redirect)
│   └── middleware.ts                  # Middleware de protección
│
├── components/                        # Componentes React
│   ├── addresses/                     # Componentes de direcciones
│   ├── brands/                        # Componentes de marcas
│   ├── categories/                    # Componentes de categorías
│   ├── companies/                     # Componentes de empresas
│   ├── contacts/                      # Componentes de contactos
│   ├── employees/                     # Componentes de empleados
│   ├── equipment/                     # Componentes de equipos
│   ├── forms/                         # Formularios reutilizables
│   ├── layouts/                       # Layouts y navegación
│   ├── locations/                     # Componentes de ubicaciones
│   ├── providers/                     # Context providers
│   ├── ui/                            # Componentes UI (shadcn/ui)
│   │   ├── data-table.tsx             # Tabla de datos genérica
│   │   ├── form-dialog.tsx            # Dialog para formularios
│   │   ├── toaster.tsx                # Notificaciones toast
│   │   ├── global-search.tsx          # Búsqueda global
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
│   │   ├── documents.ts               # Servicios de documentos
│   │   ├── employees.ts               # Servicios de empleados
│   │   ├── employeeVacations.ts       # Servicios de vacaciones
│   │   ├── equipment.ts               # Servicios de equipos
│   │   ├── history.ts                 # Servicios de historial
│   │   ├── locations.ts               # Servicios de ubicaciones
│   │   ├── persons.ts                 # Servicios de personas
│   │   ├── users.ts                   # Servicios de usuarios
│   │   └── utils.ts                   # Utilidades API
│   ├── hooks/                         # React hooks personalizados
│   │   ├── useCatalogs.ts             # Hook para catálogos
│   │   ├── useCompanies.ts            # Hook para empresas
│   │   ├── useContacts.ts             # Hook para contactos
│   │   ├── useDocuments.ts            # Hook para documentos
│   │   ├── useEmployees.ts            # Hook para empleados
│   │   ├── useEmployeeVacations.ts    # Hook para vacaciones
│   │   ├── useEquipment.ts            # Hook para equipos
│   │   ├── useHistory.ts              # Hook para historial
│   │   ├── useLocations.ts            # Hook para ubicaciones
│   │   ├── usePersons.ts              # Hook para personas
│   │   └── useUsers.ts                # Hook para usuarios
│   ├── validations/                   # Esquemas de validación Zod
│   ├── constants.ts                   # Constantes y etiquetas
│   ├── navigation.ts                  # Configuración de navegación
│   ├── routes.ts                      # Definiciones de rutas
│   ├── utils.ts                       # Utilidades generales
│   └── utils/date.ts                  # Utilidades de fecha
│
├── types/                             # Definiciones TypeScript
│   ├── api.ts                         # Tipos de API (responses)
│   ├── auth.ts                        # Tipos de autenticación
│   ├── catalog.ts                     # Tipos de catálogos
│   ├── company.ts                     # Tipos de empresas
│   ├── contact.ts                     # Tipos de contactos
│   ├── document.ts                    # Tipos de documentos
│   ├── employee.ts                    # Tipos de empleados
│   ├── enums.ts                       # Enums del sistema
│   ├── equipment.ts                   # Tipos de equipos
│   ├── history.ts                     # Tipos de historial
│   ├── location.ts                    # Tipos de ubicaciones
│   ├── shared.ts                      # Tipos compartidos
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

- **class-variance-authority** 0.7.1 - Sistema de variantes CSS
- **clsx** 2.1.1 - Utilidades de clases condicionales
- **tailwind-merge** 3.3.1 - Fusión inteligente de clases Tailwind
- **cmdk** 1.1.1 - Command palette para búsqueda

### Desarrollo

- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **Turbopack** - Empaquetador rápido para desarrollo

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

- **Dashboard**: Vista general del sistema con acceso rápido a módulos principales
- **Empresas**: Gestión completa de compañías, categorías y subcategorías de negocio
- **Empleados**: Administración de personal, categorías, posiciones y vacaciones
- **Equipos**: Gestión de equipos, categorías, modelos, tipos y mantenimientos
- **Configuración**: Catálogos del sistema (marcas, unidades, ubicaciones)
- **Reportes**: Generación de reportes y estadísticas

### Características Principales

- **CRUD Completo**: Operaciones completas de crear, leer, actualizar y eliminar
- **Búsqueda Avanzada**: Tablas con búsqueda múltiple y ordenamiento
- **Formularios Validados**: Validación en tiempo real con feedback visual
- **Notificaciones**: Sistema de toast notifications para feedback de usuario
- **Responsive Design**: Interfaz adaptativa para desktop y móvil
- **Role-based Access**: Control de acceso basado en roles de usuario
- **Tema Dinámico**: Soporte para temas claro y oscuro

### API Integration

El frontend se conecta con el backend SAE mediante:

- **Base URL**: Configurable via variables de entorno
- **Autenticación**: JWT tokens con refresh automático
- **Endpoints RESTful**: Convenciones REST para todas las operaciones
- **Error Handling**: Manejo robusto de errores con feedback al usuario
- **Caching**: TanStack Query para optimización de performance

## 🔧 Desarrollo y Contribución

### Scripts Disponibles

```bash
npm run dev          # Desarrollo con Turbopack (puerto 3003)
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting del código
```

### Convenciones de Código

- **TypeScript**: Tipado fuerte en todos los archivos
- **ESLint**: Reglas de linting consistentes
- **Prettier**: Formateo automático de código
- **Componentes**: PascalCase, archivos .tsx
- **Hooks**: camelCase, prefijo "use"
- **Utilidades**: camelCase, archivos .ts

### Arquitectura de Componentes

- **Páginas**: Lógicas de routing en `/app`
- **Componentes**: Reutilizables en `/components`
- **UI**: Primitivas shadcn/ui en `/components/ui`
- **Forms**: Validaciones Zod en `/lib/validations`
- **API**: Servicios en `/lib/api`, hooks en `/lib/hooks`

## 📄 Licencia

Este proyecto es privado y no tiene licencia pública.

---

**Desarrollado por**: Renzo O. Gorosito
**Versión**: 1.0.0
**Última actualización**: 2025
