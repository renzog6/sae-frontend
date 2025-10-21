# SAE Frontend - Sistema de Administración Empresarial

Aplicación web completa y profesional para gestión empresarial desarrollada con **Next.js 15**, **TypeScript** y **Tailwind CSS**. Interfaz moderna y responsiva que integra **autenticación JWT**, **gestión de usuarios**, **empresas**, **empleados**, **equipos**, **neumáticos**, **contactos**, **ubicaciones** y **catálogos** del sistema. Incluye más de **80 páginas** y **200+ componentes** organizados por dominio.

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

SAE Frontend es una aplicación web empresarial de **alta calidad** construida con **Next.js 15 (App Router)**, que proporciona una interfaz completa y profesional para el sistema de administración empresarial. Integra **autenticación segura con NextAuth.js**, **formularios validados con Zod**, **gestión de estado eficiente con TanStack Query**, y una **UI moderna y accesible** basada en **shadcn/ui** y **Radix UI**.

### 🎯 Características Principales

- **Interfaz Profesional**: Más de 80 páginas organizadas por módulos
- **200+ Componentes**: Reutilizables y tipados con TypeScript
- **Gestión Completa**: RRHH, Flota, Neumáticos, Catálogos, etc.
- **Autenticación Robusta**: JWT con refresh tokens y roles
- **Validaciones Avanzadas**: Zod + React Hook Form
- **Estado Eficiente**: TanStack Query para server/client state
- **UI Moderna**: shadcn/ui + Tailwind CSS + Tema dinámico
- **Responsive**: Diseño adaptativo desktop/móvil
- **Performance**: Optimizado con Turbopack y Next.js 15

- **Versión**: 1.0.0
- **Autor**: Renzo O. Gorosito
- **Licencia**: MIT
- **Última Actualización**: Octubre 2025

## ✨ Características

### 🔐 Autenticación y Seguridad Empresarial

- **NextAuth.js Completo**: Autenticación JWT con providers múltiples
- **Middleware Avanzado**: Protección de rutas con Next.js middleware
- **Gestión de Sesiones**: Tokens de access/refresh con expiración automática
- **Sistema de Roles**: USER, ADMIN con permisos jerárquicos
- **Navegación Dinámica**: Menú filtrado por roles de usuario
- **Protección CSRF**: Configurado para seguridad adicional

### 📊 Gestión de Datos Completa

- **👥 Usuarios**: CRUD completo con roles y permisos
- **🏢 Empresas**: Gestión integral con categorías y subcategorías de negocio
- **👷 Empleados**: RRHH completo con categorías, posiciones, vacaciones y documentos
- **📞 Contactos**: Sistema polimórfico para empresas y personas
- **👤 Personas y Familia**: Gestión de personas físicas con relaciones familiares
- **📍 Ubicaciones**: Sistema geográfico completo (países, provincias, ciudades, direcciones)
- **🏷️ Catálogos**: Marcas, unidades, equipos, categorías y tipos
- **🛞 Neumáticos**: Gestión especializada del ciclo de vida completo
- **📋 Historial**: Incidentes, mantenimientos, eventos y auditoría

### 🎨 Interfaz de Usuario Profesional

- **UI Moderna**: shadcn/ui + Radix UI para componentes accesibles
- **Tema Dinámico**: Claro/oscuro con next-themes y persistencia
- **Formularios Avanzados**: Validación en tiempo real con Zod + React Hook Form
- **Tablas Interactivas**: TanStack Table con ordenamiento, filtros y paginación
- **Notificaciones**: Sistema toast con Framer Motion y animaciones
- **Responsive Design**: Layout adaptativo desktop/tablet/móvil
- **Sidebar Inteligente**: Navegación móvil con colapso automático
- **Búsqueda Global**: Command palette para navegación rápida

### 🏗️ Arquitectura Técnica Avanzada

- **Next.js 15 App Router**: Routing moderno con layouts anidados
- **TypeScript Estricto**: Tipado fuerte en 200+ archivos
- **TanStack Query**: Gestión optimizada de estado servidor/cliente
- **Axios Interceptors**: Cliente HTTP con manejo automático de tokens
- **Componentes Modulares**: 200+ componentes reutilizables y tipados
- **Hooks Personalizados**: Lógica de negocio separada y testeable
- **Validaciones Robustas**: Zod schemas para type safety completo
- **Constantes Centralizadas**: Enums y labels organizados por dominio

## 🏗 Arquitectura del Sistema

### 🏛️ Patrón de Arquitectura Empresarial

El proyecto implementa una **arquitectura modular y escalable** siguiendo las mejores prácticas de Next.js 15:

#### **Estructura por Dominios**

- **App Router**: Rutas organizadas por directorios con layouts anidados
- **Componentes por Módulo**: UI components agrupados por funcionalidad
- **Separación de Concerns**: API, hooks, validaciones y constantes en capas
- **Type Safety Completo**: TypeScript estricto con tipos compartidos
- **State Management Híbrido**: TanStack Query para server state, Zustand para client state

#### **Flujo de Datos Optimizado**

1. **🔐 Autenticación**: NextAuth.js maneja sesiones y tokens JWT
2. **📡 API Calls**: Axios con interceptores automáticos para tokens
3. **💾 State Management**: TanStack Query para cache inteligente y sincronización
4. **🔄 UI Updates**: React hooks personalizados para lógica de negocio
5. **✅ Validations**: Zod schemas para type safety en forms y API

#### **🛡️ Seguridad Empresarial**

- **Middleware Avanzado**: Protección granular de rutas en Next.js
- **JWT Stateless**: Autenticación sin estado con refresh tokens
- **RBAC Completo**: Role-based access con permisos jerárquicos
- **Input Validation**: Validaciones cliente/servidor con feedback visual
- **XSS Protection**: Sanitización automática de inputs

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

### 🚀 Core Framework Empresarial

- **Next.js** 15.5.3 - React framework con App Router y Turbopack
- **React** 19.1.0 - Biblioteca de UI con concurrent features
- **TypeScript** 5.1.3 - Tipado estático estricto en todo el proyecto

### 🎨 UI y Estilos Profesionales

- **Tailwind CSS** 4.0.0-alpha.66 - Framework CSS utilitario de última generación
- **shadcn/ui** - Componentes UI accesibles y personalizables (200+ componentes)
- **Radix UI** - Primitivas headless para máxima accesibilidad
- **Lucide React** 0.544.0 - Iconografía consistente y moderna
- **Framer Motion** 12.23.19 - Animaciones fluidas y profesionales
- **next-themes** 0.4.6 - Gestión de temas con persistencia automática

### 📊 Gestión de Estado y Datos Avanzada

- **TanStack Query** 5.89.0 - Gestión inteligente de estado servidor/cliente
- **Axios** 1.6.0 - Cliente HTTP con interceptores y manejo de errores
- **@tanstack/react-table** 8.21.3 - Tablas de datos con virtualización y filtros

### 📝 Formularios y Validación Robusta

- **React Hook Form** 7.62.0 - Gestión de formularios performante
- **@hookform/resolvers** 5.2.1 - Integración Zod con RHF
- **Zod** 4.1.9 - Validación de esquemas con type inference

### 🔐 Autenticación Empresarial

- **NextAuth.js** 4.24.11 - Autenticación completa con múltiples providers
- **JWT Management**: Access/refresh tokens con renovación automática
- **Session Handling**: Gestión de sesiones con persistencia

### 🛠️ Utilidades y Herramientas

- **class-variance-authority** 0.7.1 - Sistema de variantes CSS dinámicas
- **clsx** 2.1.1 - Utilidades de clases condicionales optimizadas
- **tailwind-merge** 3.3.1 - Fusión inteligente de clases Tailwind
- **cmdk** 1.1.1 - Command palette para búsqueda global
- **date-fns** - Manipulación de fechas (importado desde backend)

### 💻 Desarrollo y Calidad

- **ESLint** - Linting avanzado con reglas personalizadas
- **Prettier** - Formateo automático consistente
- **Turbopack** - Empaquetador ultra-rápido para desarrollo
- **TypeScript Strict** - Configuración estricta para máxima type safety

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
- **Neumáticos**: Gestión completa de neumáticos, medidas, modelos y ciclo de vida
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

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

**Desarrollado por**: Renzo O. Gorosito
**Versión**: 1.0.0
**Última actualización**: 2025
