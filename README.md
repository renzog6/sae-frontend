# SAE - Sistema de Administración Empresarial

Un sistema completo de administración empresarial desarrollado con tecnologías modernas, que incluye gestión de usuarios, empresas, empleados, equipos e inspecciones.

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Licencia](#-licencia)

## 🚀 Descripción

SAE Frontend es una aplicación web en Next.js (App Router) con UI moderna basada en TailwindCSS y shadcn/ui. Integra autenticación con NextAuth, formularios validados con Zod y React Hook Form, y gestión de datos mediante hooks personalizados.

Funcionalidades destacadas:

- **Autenticación** (NextAuth) con rutas protegidas y middleware.
- **Panel y páginas**: Dashboard, Perfil, Usuarios (listado/alta/edición), Settings.
- **Settings unificado** (Marcas, Unidades, Ciudades):
  - Formularios en **diálogo centrado** (shadcn/ui `Dialog`) a través del componente reutilizable `FormDialog`.
  - Formularios consistentes con **`FormField`/`FormItem`/`FormMessage`** de shadcn/ui y validación Zod.
  - **Toasts** de éxito/error globales con `ToasterProvider`.
  - Tablas con búsqueda y acciones (editar/eliminar) por entidad.
- **Accesibilidad y UX**: soporte para `prefers-reduced-motion`, foco visible, jerarquía tipográfica y paleta **slate + emerald**.
- **Arquitectura modular**: componentes desacoplados (`components/forms/*`, `components/*-dialog.tsx`), hooks en `lib/hooks`, y tipados en `types/*`.

## 📁 Estructura del Proyecto

```
sae-frontend/
├── app/                               # App Router
│   ├── api/
│   │   └── auth/[...nextauth]/        # NextAuth (credenciales/JWT)
│   ├── dashboard/                     # Dashboard
│   ├── login/                         # Login
│   ├── profile/                       # Perfil de usuario
│   ├── settings/
│   │   ├── brands/                    # Settings: Marcas (tabla + acciones)
│   │   ├── locations/                 # Settings: Ciudades (tabla + acciones)
│   │   ├── units/                     # Settings: Unidades (tabla + acciones)
│   │   ├── layout.tsx                 # Layout de settings
│   │   └── page.tsx                   # Landing de settings (cards)
│   ├── users/                         # Gestión de usuarios
│   │   ├── [id]/                      # Detalle/edición
│   │   └── new/                       # Alta de usuario
│   ├── globals.css                    # Estilos globales (Tailwind)
│   └── layout.tsx                     # Root layout + Providers + Toaster
│
├── components/
│   ├── brands/
│   │   └── brand-dialog.tsx           # Dialog centrado para crear/editar marcas
│   ├── units/
│   │   └── unit-dialog.tsx            # Dialog centrado para crear/editar unidades
│   ├── locations/
│   │   └── city-dialog.tsx            # Dialog centrado para crear/editar ciudades
│   ├── forms/
│   │   ├── brand-form.tsx             # Form de marca (shadcn FormField + Zod)
│   │   ├── unit-form.tsx              # Form de unidad (shadcn FormField + Zod)
│   │   └── city-form.tsx              # Form de ciudad (shadcn FormField + Zod)
│   ├── layouts/                        # Layouts y navegación
│   ├── providers/                      # Providers (Auth/Query/etc.)
│   └── ui/
│       ├── form.tsx                   # Primitivas de formulario shadcn adaptadas
│       ├── form-dialog.tsx            # Dialog reutilizable con motion
│       ├── toaster.tsx                # Toaster global con framer-motion
│       └── (button, card, input, ...) # Componentes de shadcn/ui
│
├── lib/
│   ├── api/                           # Cliente HTTP y servicios
│   ├── hooks/                         # Hooks de datos (useCatalogs, useLocations)
│   ├── validations/                   # Esquemas Zod (catalog, location, auth)
│   └── utils.ts                       # Utilidades varias
│
├── types/                             # Tipados de dominio (auth, user, catalog, location)
├── middleware.ts                      # Protección de rutas (NextAuth)
├── tailwind.config.js                 # Configuración Tailwind (tema slate + emerald)
└── next.config.ts                     # Configuración Next.js
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
