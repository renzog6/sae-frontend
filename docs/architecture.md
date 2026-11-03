# 🏗️ Arquitectura - SAE Frontend

## Visión General

SAE-Frontend implementa una **arquitectura hexagonal moderna** (también conocida como Ports & Adapters) usando Next.js 16 con App Router, TypeScript estricto, y patrones empresariales escalables.

---

## 📊 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        USUARIO                               │
│                     (Navegador Web)                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   CAPA DE PRESENTACIÓN                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Pages      │  │  Components   │  │   Layouts    │     │
│  │  (App Router)│  │   (React)     │  │  (Nested)    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   CAPA DE APLICACIÓN                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │Custom Hooks  │  │ React Query  │  │  Validations │     │
│  │  (Business)  │  │ (State Mgmt) │  │    (Zod)     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   CAPA DE DOMINIO                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Types     │  │   Services   │  │   Constants  │     │
│  │ (TypeScript) │  │  (API Layer) │  │   (Enums)    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                 CAPA DE INFRAESTRUCTURA                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  ApiClient   │  │   NextAuth   │  │    Axios     │     │
│  │   (HTTP)     │  │    (Auth)    │  │ (Transport)  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND API (NestJS)                       │
│                    PostgreSQL Database                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Estructura de Carpetas

### Organización por Capas

```
sae-frontend/
│
├── 📄 app/                          # CAPA DE PRESENTACIÓN
│   ├── (auth)/                      # Grupo de rutas de autenticación
│   │   └── login/                   # Página de login
│   ├── dashboard/                   # Dashboard principal
│   ├── companies/                   # Módulo de empresas
│   │   ├── list/                    # Lista de empresas
│   │   ├── new/                     # Nueva empresa
│   │   ├── [id]/                    # Detalle/edición de empresa
│   │   └── business-categories/     # Categorías de negocio
│   ├── employees/                   # Módulo de empleados
│   ├── equipments/                  # Módulo de equipos
│   ├── tires/                       # Módulo de neumáticos
│   ├── settings/                    # Configuraciones
│   ├── layout.tsx                   # Layout raíz
│   ├── page.tsx                     # Página de inicio
│   └── globals.css                  # Estilos globales
│
├── 🧩 components/                   # COMPONENTES REUTILIZABLES
│   ├── ui/                          # Componentes base (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── layouts/                     # Componentes de layout
│   │   ├── dashboard-layout.tsx    # Layout del dashboard
│   │   ├── header.tsx              # Header
│   │   └── sidebar.tsx             # Sidebar
│   ├── forms/                       # Formularios reutilizables
│   ├── companies/                   # Componentes de empresas
│   ├── employees/                   # Componentes de empleados
│   ├── equipments/                  # Componentes de equipos
│   └── tires/                       # Componentes de neumáticos
│
├── 📚 lib/                          # CAPA DE LÓGICA DE NEGOCIO
│   ├── api/                         # Servicios API
│   │   ├── apiClient.ts            # Cliente HTTP base
│   │   ├── auth.ts                 # Configuración NextAuth
│   │   ├── base-api.service.ts     # Servicio base CRUD
│   │   ├── companies/              # Servicios de empresas
│   │   ├── employees/              # Servicios de empleados
│   │   ├── equipments/             # Servicios de equipos
│   │   └── tires/                  # Servicios de neumáticos
│   ├── hooks/                       # Custom React Hooks
│   │   ├── useAuth.ts              # Hook de autenticación
│   │   ├── useCompanies.ts         # Hook de empresas
│   │   ├── useEmployees.ts         # Hook de empleados
│   │   └── ...
│   ├── types/                       # TypeScript Types
│   │   ├── core/                   # Types del core
│   │   │   ├── api.ts              # Types de API
│   │   │   ├── auth.ts             # Types de auth
│   │   │   └── common.ts           # Types comunes
│   │   └── shared/                 # Types compartidos
│   ├── validations/                 # Esquemas de validación (Zod)
│   │   ├── auth.ts
│   │   ├── company.ts
│   │   └── ...
│   ├── constants/                   # Constantes de la app
│   ├── utils/                       # Utilidades
│   └── routes.ts                    # Definición de rutas
│
├── 🔧 public/                       # Archivos estáticos
│   ├── images/
│   └── favicon.ico
│
└── 📋 Configuración
    ├── next.config.ts              # Configuración Next.js
    ├── tailwind.config.js          # Configuración Tailwind
    ├── tsconfig.json               # Configuración TypeScript
    ├── middleware.ts               # Middleware Next.js
    └── package.json                # Dependencias
```

---

## 🎯 Patrones de Diseño Implementados

### 1. **Hexagonal Architecture (Ports & Adapters)**

```typescript
// ✅ Puerto (Interface)
interface ICompanyService {
  getAll(): Promise<Company[]>;
  getById(id: number): Promise<Company>;
  create(data: CreateCompanyDto): Promise<Company>;
}

// ✅ Adaptador (Implementación)
class CompanyService implements ICompanyService {
  async getAll() {
    return ApiClient.get<Company[]>("/companies");
  }
}
```

### 2. **Repository Pattern**

```typescript
// Base genérico para todos los servicios
export abstract class BaseApiService<T> {
  protected abstract basePath: string;

  async getAll(query?: BaseQueryParams): Promise<PaginatedResponse<T>> {
    const url = QueryBuilder.buildUrl(this.basePath, query);
    return ApiClient.get<PaginatedResponse<T>>(url);
  }

  async getById(id: number): Promise<T> { ... }
  async create(dto: any): Promise<T> { ... }
  async update(id: number, dto: any): Promise<T> { ... }
  async delete(id: number): Promise<void> { ... }
}
```

### 3. **Custom Hooks Pattern**

```typescript
// Separación de lógica de negocio de UI
export function useCompanies(params?: QueryParams) {
  return useQuery({
    queryKey: ["companies", params],
    queryFn: () => CompanyService.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

// Uso en componente
function CompanyList() {
  const { data, isLoading } = useCompanies({ page: 1 });
  // ...
}
```

### 4. **Composition Over Inheritance**

```typescript
// ✅ Componentes pequeños y componibles
<Card>
  <CardHeader>
    <CardTitle>Empresas</CardTitle>
  </CardHeader>
  <CardContent>
    <CompanyTable data={companies} />
  </CardContent>
</Card>
```

### 5. **Singleton Pattern (ApiClient)**

```typescript
export class ApiClient {
  private static instance: ApiClient;
  private static baseURL = process.env.NEXT_PUBLIC_API_URL;

  // Métodos estáticos - única instancia
  static async get<T>(path: string): Promise<T> { ... }
  static async post<T>(path: string, body: any): Promise<T> { ... }
}
```

---

## 🔄 Flujo de Datos

### Ejemplo: Listar Empresas

```
1. Usuario navega a /companies/list
   ↓
2. Page Component se renderiza
   ↓
3. Hook useCompanies() se ejecuta
   ↓
4. TanStack Query verifica cache
   ↓
5. Si no hay cache, llama CompanyService.getAll()
   ↓
6. CompanyService usa ApiClient.get()
   ↓
7. ApiClient agrega token JWT del session
   ↓
8. Fetch request a backend API
   ↓
9. Backend responde con datos
   ↓
10. ApiClient parsea respuesta
    ↓
11. TanStack Query cachea datos
    ↓
12. Hook retorna datos al componente
    ↓
13. Componente renderiza tabla con datos
```

### Código real del flujo:

```typescript
// 1. Page Component
export default function CompaniesListPage() {
  const { data, isLoading } = useCompanies();

  if (isLoading) return <LoadingSkeleton />;

  return <CompanyTable data={data?.data || []} />;
}

// 2. Custom Hook
export function useCompanies(params?: CompanyQueryParams) {
  return useQuery({
    queryKey: ["companies", params],
    queryFn: () => CompanyService.getAll(params),
  });
}

// 3. Service
class CompanyService extends BaseApiService<Company> {
  protected basePath = "/companies";
}

// 4. API Client
class ApiClient {
  static async get<T>(path: string): Promise<T> {
    const session = await getSession();
    const response = await fetch(this.buildUrl(path), {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    return response.json();
  }
}
```

---

## 🔐 Autenticación y Autorización

### Flujo de Autenticación

```
1. Usuario ingresa credenciales en /login
   ↓
2. NextAuth.js hace POST a backend /auth/login
   ↓
3. Backend valida credenciales
   ↓
4. Backend retorna accessToken + refreshToken
   ↓
5. NextAuth guarda tokens en cookie segura
   ↓
6. Middleware verifica token en cada request
   ↓
7. Si token válido → permite acceso
   Si token expirado → redirect a /login
```

### Componentes de Seguridad

```typescript
// middleware.ts - Protección de rutas
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // Verificar roles
    if (pathname.startsWith('/admin') && token.role !== 'ADMIN') {
      return NextResponse.redirect('/forbidden');
    }

    return NextResponse.next();
  }
);

// ApiClient - Renovación automática de tokens
private static async refreshAccessToken(): Promise<string> {
  const { refreshToken } = await getSession();
  const response = await fetch('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });
  return response.json().accessToken;
}
```

---

## 📊 Gestión de Estado

### Server State (TanStack Query)

```typescript
// ✅ Para datos del servidor
// - Automáticamente cachea
// - Revalida en background
// - Maneja loading/error states

const { data, isLoading, error } = useQuery({
  queryKey: ["companies"],
  queryFn: () => CompanyService.getAll(),
  staleTime: 5 * 60 * 1000, // Cache por 5 minutos
  refetchOnWindowFocus: true,
});
```

### Client State (React State)

```typescript
// ✅ Para estado local de UI
// - Modales abiertos/cerrados
// - Tabs activos
// - Form state temporal

const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedTab, setSelectedTab] = useState("details");
```

### Global Client State (Context o Zustand)

```typescript
// ✅ Para estado compartido entre componentes
// - Theme (dark/light)
// - User preferences
// - Sidebar collapsed state

import { useTheme } from "next-themes";
const { theme, setTheme } = useTheme();
```

---

## 🎨 Sistema de Diseño

### Jerarquía de Componentes

```
Atoms (Básicos)
├── Button
├── Input
├── Label
└── Icon

Molecules (Compuestos)
├── FormField (Label + Input + Error)
├── SearchBar (Input + Icon)
└── Card (Container + Shadow)

Organisms (Complejos)
├── CompanyForm (Múltiples FormFields)
├── DataTable (Tabla + Paginación + Filtros)
└── DashboardStats (Múltiples Cards)

Templates (Layouts)
├── DashboardLayout (Sidebar + Header + Content)
├── AuthLayout (Centered form)
└── PublicLayout (Simple)

Pages (Páginas completas)
├── /dashboard
├── /companies/list
└── /login
```

### Theming con CSS Variables

```css
/* globals.css */
:root {
  --primary: oklch(0.6487 0.1538 150.3071); /* Teal */
  --secondary: oklch(0.6746 0.1414 261.338); /* Purple */
  --background: oklch(0.9824 0.0013 286.3757); /* Light */
  --foreground: oklch(0.3211 0 0); /* Dark text */
}

.dark {
  --background: oklch(0.2303 0.0125 264.2926); /* Dark */
  --foreground: oklch(0.9219 0 0); /* Light text */
}
```

---

## 🚀 Optimizaciones de Performance

### 1. **Code Splitting Automático (Next.js)**

```typescript
// Cada página se divide automáticamente
app/companies/page.tsx → companies.chunk.js
app/employees/page.tsx → employees.chunk.js
```

### 2. **Lazy Loading Manual**

```typescript
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("@/components/heavy-component"), {
  loading: () => <Skeleton />,
});
```

### 3. **React Query Cache**

```typescript
// Datos se cachean automáticamente
// Reduce requests al servidor
queryClient.setQueryData(["company", id], cachedData);
```

### 4. **Next.js Image Optimization**

```typescript
import Image from "next/image";

<Image
  src="/logo.png"
  width={200}
  height={100}
  alt="Logo"
  priority // Para imágenes above-the-fold
/>;
```

---

## 🧪 Testing Strategy (Recomendado)

```
Unit Tests (70%)
├── Utilities
├── Hooks
├── Services
└── Pure Components

Integration Tests (20%)
├── API Integration
├── Auth Flow
└── Form Submissions

E2E Tests (10%)
├── Critical User Flows
├── Login → Dashboard → Action
└── Happy Paths
```

---

## 📝 Convenciones de Código

### Nomenclatura

```typescript
// Components: PascalCase
DashboardLayout.tsx
CompanyList.tsx

// Functions/Variables: camelCase
getCompanies()
useCompanies()

// Constants: UPPER_CASE
const API_TIMEOUT = 10000;

// Files: kebab-case
company-form.tsx
api-client.ts

// Types/Interfaces: PascalCase
type Company = {...}
interface CompanyService {...}
```

### Imports Order

```typescript
// 1. React
import { useState, useEffect } from "react";

// 2. External libraries
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

// 3. Internal @ imports
import { Button } from "@/components/ui/button";
import { useCompanies } from "@/lib/hooks/useCompanies";

// 4. Relative imports
import { CompanyCard } from "./company-card";

// 5. Types
import type { Company } from "@/lib/types/company";

// 6. Styles
import "./styles.css";
```

---

## 🔗 Referencias

- **Next.js App Router:** https://nextjs.org/docs/app
- **TanStack Query:** https://tanstack.com/query
- **shadcn/ui:** https://ui.shadcn.com
- **NextAuth.js:** https://next-auth.js.org
- **Tailwind CSS:** https://tailwindcss.com

---

**Siguiente:** [API Integration →](./api-integration.md)
