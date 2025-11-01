# SAE Frontend - Sistema de Administración Empresarial

Aplicación web **empresarial completa y profesional** desarrollada con **Next.js 15 (App Router)**, **TypeScript 5.1+** y **Tailwind CSS 4.0**. Interfaz moderna, responsiva y accesible que integra **autenticación JWT robusta**, **gestión completa de usuarios**, **empresas**, **empleados**, **equipos**, **neumáticos especializados**, **contactos polimórficos**, **ubicaciones geográficas** y **catálogos del sistema**. Incluye más de **80 páginas** y **200+ componentes** organizados por dominio de negocio con **arquitectura modular escalable**.

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

SAE Frontend es una **aplicación web empresarial de alta calidad y escalable** construida con **Next.js 15 (App Router)**, **TypeScript 5.1+ (strict mode)** y **Tailwind CSS 4.0**, que proporciona una **interfaz completa y profesional** para el sistema de administración empresarial. Integra **autenticación segura con NextAuth.js 4.24+**, **formularios validados con Zod 4.1+**, **gestión de estado eficiente con TanStack Query 5.89+**, y una **UI moderna y completamente accesible** basada en **shadcn/ui** y **Radix UI**. Diseñada para **empresas medianas y grandes** con flotas vehiculares y gestión especializada de neumáticos.

### 🎯 Características Principales

- **🏢 Interfaz Empresarial Profesional**: Más de 80 páginas organizadas por módulos de negocio
- **🧩 200+ Componentes Reutilizables**: Completamente tipados con TypeScript y accesibles
- **👥 Gestión Empresarial Completa**: RRHH, Flota, Neumáticos especializados, Catálogos, etc.
- **🔐 Autenticación JWT Robusta**: NextAuth.js con refresh tokens, roles jerárquicos y middleware avanzado
- **✅ Validaciones Empresariales**: Zod + React Hook Form con feedback visual en tiempo real
- **💾 Estado Eficiente**: TanStack Query para server state + client state optimizado
- **🎨 UI Moderna y Accesible**: shadcn/ui + Radix UI + Tailwind CSS + temas dinámicos
- **📱 Responsive Design**: Diseño adaptativo completo desktop/tablet/móvil
- **⚡ Performance Optimizada**: Turbopack, Next.js 15, lazy loading y code splitting
- **🛞 Gestión de Neumáticos Visual**: Diagrama interactivo de ejes y posiciones
- **📊 Dashboard Ejecutivo**: Vista general con métricas y acceso rápido a módulos

### 📊 Estadísticas del Proyecto

- **Versión**: 1.0.0
- **Autor**: Renzo O. Gorosito
- **Licencia**: MIT
- **Última Actualización**: Octubre 2025
- **Framework**: Next.js 15.5.3 (App Router)
- **Lenguaje**: TypeScript 5.1+ (strict mode)
- **UI Framework**: Tailwind CSS 4.0 + shadcn/ui
- **Páginas**: 80+ páginas organizadas por dominio
- **Componentes**: 200+ componentes reutilizables
- **Hooks**: 25+ hooks personalizados
- **Validaciones**: 30+ esquemas Zod
- **APIs**: 15+ servicios API tipados
- **Rutas**: 50+ rutas dinámicas y anidadas

## ✨ Características

### 🔐 Autenticación y Seguridad Empresarial

- **NextAuth.js Completo**: Autenticación JWT con providers múltiples
- **Middleware Avanzado**: Protección de rutas con Next.js middleware
- **Gestión de Sesiones**: Tokens de access/refresh con expiración automática
- **Sistema de Roles**: USER, ADMIN con permisos jerárquicos
- **Navegación Dinámica**: Menú filtrado por roles de usuario
- **Protección CSRF**: Configurado para seguridad adicional

### 📊 Gestión de Datos Completa

- **👥 Usuarios**: CRUD completo con roles y permisos (USER, ADMIN)
- **🏢 Empresas**: Gestión integral con categorías y subcategorías de negocio
- **👷 Empleados**: RRHH completo con categorías, posiciones, vacaciones y documentos
- **📞 Contactos**: Sistema polimórfico para empresas y personas (email, teléfono, WhatsApp, etc.)
- **👤 Personas y Familia**: Gestión de personas físicas con relaciones familiares
- **📍 Ubicaciones**: Sistema geográfico completo (países, provincias, ciudades, direcciones)
- **🏷️ Catálogos**: Marcas, unidades, equipos, categorías y tipos
- **🛞 Neumáticos**: Gestión especializada del ciclo de vida completo con asignaciones, rotaciones, recapados e inspecciones
- **📋 Historial**: Incidentes, mantenimientos, eventos y auditoría completa

### 🎨 Interfaz de Usuario Empresarial Profesional

- **🎯 UI Moderna y Accesible**: shadcn/ui + Radix UI con componentes 100% accesibles (WCAG 2.1 AA)
- **🌓 Tema Dinámico Empresarial**: Claro/oscuro/profesional con next-themes, persistencia automática y branding
- **📝 Formularios Avanzados**: Validación en tiempo real con Zod + React Hook Form + feedback visual contextual
- **📊 Tablas Interactivas Empresariales**: TanStack Table con ordenamiento multi-columna, filtros avanzados, paginación inteligente y exportación
- **🔔 Notificaciones Profesionales**: Sistema toast con Framer Motion, animaciones fluidas y categorías (success/warning/error/info)
- **📱 Responsive Design Completo**: Layout adaptativo con breakpoints optimizados para desktop/tablet/móvil/impresión
- **🧭 Sidebar Inteligente**: Navegación contextual con colapso automático, breadcrumbs dinámicos y estado persistente
- **🔍 Búsqueda Global Empresarial**: Command palette con fuzzy search, navegación rápida y shortcuts de teclado
- **📈 Dashboard Ejecutivo**: Vista general con métricas clave, gráficos interactivos y acceso rápido a módulos críticos
- **🛞 Diagrama Visual de Ejes**: Componente interactivo para configuración visual de neumáticos por posición
- **⚡ Performance Visual**: Lazy loading, skeleton states, loading states optimizados y transitions fluidas

### 🏗️ Arquitectura Técnica Empresarial Avanzada

- **🚀 Next.js 15 App Router**: Routing moderno con layouts anidados, loading states y error boundaries
- **📝 TypeScript Estricto Empresarial**: Tipado fuerte en 200+ archivos con strict mode y noImplicitAny
- **💾 TanStack Query Empresarial**: Gestión optimizada de estado servidor/cliente con caching inteligente, background refetching y optimistic updates
- **🌐 Axios Interceptors Avanzados**: Cliente HTTP con manejo automático de tokens JWT, retry logic y error handling global
- **🧩 Componentes Modulares Empresariales**: 200+ componentes reutilizables, tipados y organizados por dominio de negocio
- **🎣 Hooks Personalizados Empresariales**: Lógica de negocio separada, testeable y reutilizable con composición avanzada
- **✅ Validaciones Robustas Empresariales**: Zod schemas para type safety completo con validaciones de negocio complejas
- **🏷️ Constantes Centralizadas**: Enums, labels, configuraciones y metadata organizados por dominio
- **🔄 State Management Híbrido**: TanStack Query para server state + Zustand para client state complejo
- **🛡️ Error Boundaries**: Manejo granular de errores con recovery automático y logging estructurado
- **📊 Business Logic Layer**: Separación clara entre UI, lógica de negocio y servicios API

## 🏗 Arquitectura del Sistema

### 🏛️ Patrón de Arquitectura Empresarial Hexagonal

El proyecto implementa una **arquitectura hexagonal modular y escalable** siguiendo las mejores prácticas empresariales de Next.js 15, con **separación clara de responsabilidades** y **capas bien definidas**:

#### **🏗️ Estructura por Dominios de Negocio**

- **🗂️ App Router Empresarial**: Rutas organizadas por directorios con layouts anidados, loading states y error boundaries
- **🧩 Componentes por Módulo**: UI components agrupados por funcionalidad empresarial con composición avanzada
- **🔀 Separación de Concerns Empresarial**: API, hooks, validaciones, constantes y lógica de negocio en capas especializadas
- **📝 Type Safety Empresarial**: TypeScript estricto con tipos compartidos, enums centralizados y validaciones de negocio
- **💾 State Management Híbrido Empresarial**: TanStack Query para server state optimizado, Zustand para client state complejo

#### **🔄 Flujo de Datos Empresarial Optimizado**

1. **🔐 Autenticación Empresarial**: NextAuth.js maneja sesiones JWT con middleware avanzado y refresh automático
2. **📡 API Calls Empresariales**: Axios con interceptores para tokens, retry logic y error handling global
3. **💾 State Management Inteligente**: TanStack Query con cache inteligente, background refetching y optimistic updates
4. **🔄 UI Updates Reactivos**: React hooks personalizados con composición para lógica de negocio compleja
5. **✅ Validations Empresariales**: Zod schemas con validaciones de negocio, type safety completo y feedback contextual

#### **🛡️ Seguridad Empresarial de Nivel Empresarial**

- **🚧 Middleware Avanzado**: Protección granular de rutas con role-based access y session validation
- **🔑 JWT Stateless Seguro**: Autenticación sin estado con refresh tokens rotativos y expiración automática
- **👥 RBAC Empresarial**: Role-based access control con permisos jerárquicos (USER < MANAGER < ADMIN)
- **🔍 Input Validation Dual**: Validaciones cliente/servidor sincronizadas con feedback visual en tiempo real
- **🛡️ XSS/CSRF Protection**: Sanitización automática, headers de seguridad y validaciones de input estrictas
- **📊 Audit Trail**: Logging completo de acciones críticas con traceability y accountability

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

### 💻 Desarrollo y Calidad Empresarial

- **🔍 ESLint Empresarial**: Linting avanzado con reglas personalizadas para código consistente y seguro
- **🎨 Prettier Empresarial**: Formateo automático consistente con configuración de equipo
- **⚡ Turbopack Optimizado**: Empaquetador ultra-rápido para desarrollo con HMR instantáneo
- **📝 TypeScript Strict Empresarial**: Configuración estricta (noImplicitAny, strictNullChecks) para máxima type safety
- **🧪 Testing Preparado**: Jest + React Testing Library configurado para tests unitarios y de integración
- **📊 Code Coverage**: Configurado para >80% coverage con reportes detallados
- **🚀 CI/CD Ready**: Preparado para integración continua con GitHub Actions
- **📖 Storybook**: Componentes documentados y testeables de forma aislada

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

### 🧭 Estructura de Navegación Empresarial

- **📊 Dashboard Ejecutivo**: Vista general del sistema con métricas clave y acceso rápido a módulos principales
- **🏢 Empresas**: Gestión completa de compañías, categorías y subcategorías de negocio con validaciones CUIT
- **👷 Empleados**: Administración de personal, categorías, posiciones, vacaciones y documentos con PDFs automáticos
- **🔧 Equipos**: Gestión de equipos, categorías, modelos, tipos y mantenimientos con jerarquía completa
- **🛞 Neumáticos Especializados**: Gestión completa del ciclo de vida con asignaciones, rotaciones, recapados (con kmAtRecap, recapType), inspecciones y diagrama visual interactivo de ejes
- **⚙️ Configuración del Sistema**: Catálogos empresariales (marcas, unidades, ubicaciones geográficas)
- **📈 Reportes y Analytics**: Generación de reportes Excel, métricas de rendimiento y business intelligence
- **👤 Perfil de Usuario**: Gestión personal con configuración de preferencias y cambio de contraseña

### Características Principales

- **CRUD Completo**: Operaciones completas de crear, leer, actualizar y eliminar
- **Búsqueda Avanzada**: Tablas con búsqueda múltiple y ordenamiento
- **Formularios Validados**: Validación en tiempo real con feedback visual
- **Notificaciones**: Sistema de toast notifications para feedback de usuario
- **Responsive Design**: Interfaz adaptativa para desktop y móvil
- **Role-based Access**: Control de acceso basado en roles de usuario
- **Tema Dinámico**: Soporte para temas claro y oscuro
- **Diagrama Visual de Ejes**: Visualización interactiva de posiciones de neumáticos por eje
- **Gestión de Asignaciones**: Montaje/desmontaje visual de neumáticos en equipos

### API Integration

El frontend se conecta con el backend SAE mediante:

- **Base URL**: Configurable via variables de entorno
- **Autenticación**: JWT tokens con refresh automático
- **Endpoints RESTful**: Convenciones REST para todas las operaciones
- **Error Handling**: Manejo robusto de errores con feedback al usuario
- **Caching**: TanStack Query para optimización de performance
- **Gestión de Ejes**: Endpoint específico para obtener posiciones por equipo (`/equipment-axles/positions/equipment/:equipmentId`)
- **Diagrama Interactivo**: Visualización de neumáticos montados con estados visuales

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
- **Diagrama de Ejes**: Componente `AxleDiagram` con lógica de agrupación dual
- **Gestión de Estado**: TanStack Query para estado de posiciones de neumáticos
- **Recapados**: Campos adicionales kmAtRecap, recapType en formularios y UI

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

**Desarrollado por**: Renzo O. Gorosito
**Versión**: 1.0.0
**Última actualización**: 2025
