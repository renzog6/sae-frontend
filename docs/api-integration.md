# 🔌 API Integration - SAE Frontend

## Visión General

Esta guía explica cómo el frontend SAE se integra con el backend SAE-NestJS a través de APIs RESTful.

---

## 🌐 Arquitectura de API

```
┌─────────────┐         HTTP/REST         ┌─────────────┐
│             │     (JSON over HTTPS)     │             │
│  Frontend   │◄─────────────────────────►│   Backend   │
│  Next.js    │                            │   NestJS    │
│  Port 3003  │                            │  Port 3305  │
└─────────────┘                            └─────────────┘
      ▲                                           │
      │                                           ▼
      │                                  ┌─────────────┐
      └──────── JWT Tokens ─────────────│ PostgreSQL  │
        (accessToken + refreshToken)     │  Database   │
                                          └─────────────┘
```

---

## ⚙️ Configuración

### Variables de Entorno

```env
# .env.local

# URL pública del API (usada en el navegador)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3305

# URL interna del API (usada en servidor Next.js)
API_URL=http://localhost:3305/api
```

### ApiClient - Cliente HTTP Base

Ubicación: `/lib/api/apiClient.ts`

```typescript
export class ApiClient {
  // Obtiene la URL base según el entorno
  private static getBaseUrl(): string {
    if (typeof window === "undefined") {
      // Server-side: usa API_URL
      return process.env.API_URL || "http://localhost:3305/api";
    }
    // Client-side: usa NEXT_PUBLIC_API_BASE_URL
    return process.env.NEXT_PUBLIC_API_BASE_URL || "/api";
  }

  // Construye URL completa
  private static buildUrl(path: string): string {
    const baseUrl = this.getBaseUrl();
    return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  }
}
```

---

## 🔐 Autenticación

### Flujo de Login

```typescript
// 1. Usuario envía credenciales
const credentials = {
  email: 'user@example.com',
  password: 'password123'
};

// 2. Frontend hace POST a /auth/login
const response = await ApiClient.login(credentials);

// 3. Backend responde con tokens
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "user@example.com",
    "role": "USER"
  }
}

// 4. NextAuth guarda tokens en sesión
await signIn('credentials', {
  email: credentials.email,
  password: credentials.password,
  redirect: false,
});
```

### Headers Automáticos

```typescript
// ApiClient agrega automáticamente el token
private static async request<T>(url: string, options: RequestInit) {
  const { accessToken } = await getSession();

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  };

  return fetch(url, { ...options, headers });
}
```

### Renovación Automática de Tokens

```typescript
// Si el servidor responde 401 (Unauthorized)
if (response.status === 401 && !retry) {
  // Intenta renovar el token
  const newAccessToken = await this.refreshAccessToken();

  // Reintenta la petición con el nuevo token
  headers["Authorization"] = `Bearer ${newAccessToken}`;
  return this.request<T>(url, { ...options, headers }, true);
}
```

---

## 📡 Métodos HTTP

### GET - Obtener Datos

```typescript
// Obtener lista de empresas
const companies = await ApiClient.get<PaginatedResponse<Company>>(
  "/companies",
  {
    params: { page: 1, limit: 10 },
  }
);

// Obtener una empresa específica
const company = await ApiClient.get<ApiResponse<Company>>("/companies/123");
```

### POST - Crear Recursos

```typescript
// Crear nueva empresa
const newCompany = await ApiClient.post<ApiResponse<Company>>("/companies", {
  name: "Acme Corp",
  email: "contact@acme.com",
  businessCategoryId: 1,
});
```

### PUT - Actualizar Recursos

```typescript
// Actualizar empresa completa
const updatedCompany = await ApiClient.put<ApiResponse<Company>>(
  "/companies/123",
  {
    name: "Acme Corporation",
    email: "info@acme.com",
    businessCategoryId: 1,
  }
);
```

### PATCH - Actualizar Parcial

```typescript
// Actualizar solo algunos campos
const patched = await ApiClient.patch<ApiResponse<Company>>("/companies/123", {
  email: "newemail@acme.com",
});
```

### DELETE - Eliminar Recursos

```typescript
// Eliminar empresa
await ApiClient.delete("/companies/123");
```

---

## 📦 Servicios API

### BaseApiService - Servicio Base

Ubicación: `/lib/api/base-api.service.ts`

```typescript
export abstract class BaseApiService<TEntity> {
  protected abstract basePath: string;

  // GET todos los recursos (paginado)
  async getAll(query?: BaseQueryParams): Promise<PaginatedResponse<TEntity>> {
    const url = QueryBuilder.buildUrl(this.basePath, query);
    return ApiClient.get<PaginatedResponse<TEntity>>(url);
  }

  // GET un recurso por ID
  async getById(id: number): Promise<TEntity> {
    const res = await ApiClient.get<ApiResponse<TEntity>>(
      `${this.basePath}/${id}`
    );
    return res.data;
  }

  // POST crear recurso
  async create(dto: any): Promise<TEntity> {
    const res = await ApiClient.post<ApiResponse<TEntity>>(this.basePath, dto);
    return res.data;
  }

  // PUT actualizar recurso
  async update(id: number, dto: any): Promise<TEntity> {
    const res = await ApiClient.put<ApiResponse<TEntity>>(
      `${this.basePath}/${id}`,
      dto
    );
    return res.data;
  }

  // DELETE eliminar recurso
  async delete(id: number): Promise<void> {
    await ApiClient.delete(`${this.basePath}/${id}`);
  }
}
```

### Ejemplo: CompanyService

Ubicación: `/lib/api/companies/companies.service.ts`

```typescript
import { BaseApiService } from "../base-api.service";
import type { Company, CreateCompanyDto } from "@/lib/types/company";

class CompanyServiceImpl extends BaseApiService<Company> {
  protected basePath = "/companies";

  // Métodos heredados automáticamente:
  // - getAll()
  // - getById()
  // - create()
  // - update()
  // - delete()

  // Métodos personalizados adicionales
  async getByBusinessCategory(categoryId: number): Promise<Company[]> {
    const res = await ApiClient.get<PaginatedResponse<Company>>(
      `${this.basePath}?businessCategoryId=${categoryId}`
    );
    return res.data;
  }

  async search(query: string): Promise<Company[]> {
    const res = await ApiClient.get<PaginatedResponse<Company>>(
      `${this.basePath}?q=${query}`
    );
    return res.data;
  }
}

export const CompanyService = new CompanyServiceImpl();
```

---

## 🎣 Custom Hooks

### Patrón de Hooks con TanStack Query

Ubicación: `/lib/hooks/useCompanies.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CompanyService } from "@/lib/api/companies/companies.service";
import type { Company, CreateCompanyDto } from "@/lib/types/company";

// Hook para obtener todas las empresas
export function useCompanies(params?: CompanyQueryParams) {
  return useQuery({
    queryKey: ["companies", params],
    queryFn: () => CompanyService.getAll(params),
    staleTime: 5 * 60 * 1000, // Cache por 5 minutos
  });
}

// Hook para obtener una empresa por ID
export function useCompany(id: number) {
  return useQuery({
    queryKey: ["company", id],
    queryFn: () => CompanyService.getById(id),
    enabled: !!id, // Solo ejecutar si hay ID
  });
}

// Hook para crear empresa
export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCompanyDto) => CompanyService.create(data),
    onSuccess: () => {
      // Invalidar cache para refrescar lista
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
}

// Hook para actualizar empresa
export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCompanyDto }) =>
      CompanyService.update(id, data),
    onSuccess: (_, { id }) => {
      // Invalidar cache específico y lista
      queryClient.invalidateQueries({ queryKey: ["company", id] });
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
}

// Hook para eliminar empresa
export function useDeleteCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => CompanyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
}
```

---

## 🧩 Uso en Componentes

### Listar Recursos

```typescript
// app/companies/list/page.tsx
"use client";

import { useCompanies } from "@/lib/hooks/useCompanies";
import { CompanyTable } from "@/components/companies/company-table";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorAlert } from "@/components/ui/error-alert";

export default function CompaniesListPage() {
  const { data, isLoading, error } = useCompanies({ page: 1, limit: 10 });

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorAlert error={error} />;

  return (
    <div>
      <h1>Empresas</h1>
      <CompanyTable data={data?.data || []} />
    </div>
  );
}
```

### Crear Recurso

```typescript
// components/companies/company-form.tsx
"use client";

import { useCreateCompany } from "@/lib/hooks/useCompanies";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companySchema } from "@/lib/validations/company";
import { toast } from "sonner";

export function CompanyForm() {
  const createCompany = useCreateCompany();

  const form = useForm({
    resolver: zodResolver(companySchema),
  });

  const onSubmit = async (data: CreateCompanyDto) => {
    try {
      await createCompany.mutateAsync(data);
      toast.success("Empresa creada exitosamente");
      router.push("/companies/list");
    } catch (error) {
      toast.error("Error al crear empresa");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
      <Button type="submit" disabled={createCompany.isPending}>
        {createCompany.isPending ? "Guardando..." : "Guardar"}
      </Button>
    </form>
  );
}
```

### Actualizar Recurso

```typescript
// app/companies/[id]/edit/page.tsx
"use client";

import { useCompany, useUpdateCompany } from "@/lib/hooks/useCompanies";

export default function EditCompanyPage({
  params,
}: {
  params: { id: string };
}) {
  const companyId = parseInt(params.id);
  const { data: company, isLoading } = useCompany(companyId);
  const updateCompany = useUpdateCompany();

  if (isLoading) return <LoadingSkeleton />;

  const handleSubmit = async (data: UpdateCompanyDto) => {
    try {
      await updateCompany.mutateAsync({ id: companyId, data });
      toast.success("Empresa actualizada");
    } catch (error) {
      toast.error("Error al actualizar");
    }
  };

  return <CompanyForm initialData={company} onSubmit={handleSubmit} />;
}
```

### Eliminar Recurso

```typescript
// components/companies/delete-company-button.tsx
"use client";

import { useDeleteCompany } from "@/lib/hooks/useCompanies";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export function DeleteCompanyButton({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const deleteCompany = useDeleteCompany();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteCompany.mutateAsync(id);
      toast.success(`${name} eliminada`);
      setOpen(false);
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Eliminar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
        <AlertDialogDescription>
          Se eliminará permanentemente la empresa "{name}".
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteCompany.isPending}
          >
            {deleteCompany.isPending ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

---

## 📊 Formato de Respuestas

### Respuesta Individual

```typescript
// Formato estándar para un solo recurso
interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Ejemplo:
{
  "data": {
    "id": 1,
    "name": "Acme Corp",
    "email": "contact@acme.com"
  }
}
```

### Respuesta Paginada

```typescript
// Formato estándar para listas
interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Ejemplo:
{
  "data": [
    { "id": 1, "name": "Acme Corp" },
    { "id": 2, "name": "Tech Inc" }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

---

## 🔍 Query Parameters

### Paginación

```typescript
// Obtener página 2 con 20 resultados
const companies = await CompanyService.getAll({
  page: 2,
  limit: 20,
});

// URL generada: /companies?page=2&limit=20
```

### Búsqueda

```typescript
// Buscar por término
const results = await CompanyService.getAll({
  q: "acme",
});

// URL generada: /companies?q=acme
```

### Ordenamiento

```typescript
// Ordenar por nombre ascendente
const sorted = await CompanyService.getAll({
  sortBy: "name",
  sortOrder: "asc",
});

// URL generada: /companies?sortBy=name&sortOrder=asc
```

### Filtros

```typescript
// Filtrar por categoría y estado activo
const filtered = await CompanyService.getAll({
  businessCategoryId: 1,
  isActive: true,
});

// URL generada: /companies?businessCategoryId=1&isActive=true
```

### Combinados

```typescript
// Todos los parámetros combinados
const results = await CompanyService.getAll({
  page: 1,
  limit: 10,
  q: "tech",
  sortBy: "createdAt",
  sortOrder: "desc",
  isActive: true,
  businessCategoryId: 2,
});

// URL: /companies?page=1&limit=10&q=tech&sortBy=createdAt&sortOrder=desc&isActive=true&businessCategoryId=2
```

---

## 🚨 Manejo de Errores

### Errores HTTP Comunes

```typescript
// 400 Bad Request - Datos inválidos
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Email inválido" }
  ]
}

// 401 Unauthorized - Token inválido/expirado
{
  "statusCode": 401,
  "message": "Token expirado"
}

// 403 Forbidden - Sin permisos
{
  "statusCode": 403,
  "message": "No tienes permisos para esta acción"
}

// 404 Not Found - Recurso no encontrado
{
  "statusCode": 404,
  "message": "Empresa no encontrada"
}

// 500 Internal Server Error - Error del servidor
{
  "statusCode": 500,
  "message": "Error interno del servidor"
}
```

### Manejo en Hooks

```typescript
export function useCompanies() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: () => CompanyService.getAll(),
    retry: (failureCount, error) => {
      // No reintentar en errores 4xx
      if (error.status >= 400 && error.status < 500) {
        return false;
      }
      // Reintentar máximo 3 veces en errores 5xx
      return failureCount < 3;
    },
    onError: (error) => {
      // Log error
      console.error("Error fetching companies:", error);
      // Mostrar toast
      toast.error("Error al cargar empresas");
    },
  });
}
```

---

## 📤 Subida de Archivos

### Upload con FormData

```typescript
// Servicio
class EmployeeService extends BaseApiService<Employee> {
  async uploadDocument(employeeId: number, file: File): Promise<Document> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("employeeId", employeeId.toString());

    const res = await ApiClient.post<ApiResponse<Document>>(
      "/documents/upload",
      formData
    );
    return res.data;
  }
}

// Componente
export function DocumentUpload({ employeeId }: { employeeId: number }) {
  const [file, setFile] = useState<File | null>(null);
  const uploadMutation = useMutation({
    mutationFn: (file: File) =>
      EmployeeService.uploadDocument(employeeId, file),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      await uploadMutation.mutateAsync(file);
      toast.success("Documento subido");
    } catch (error) {
      toast.error("Error al subir documento");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <Button type="submit" disabled={uploadMutation.isPending}>
        Subir
      </Button>
    </form>
  );
}
```

---

## 🔄 Optimistic Updates

```typescript
export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCompanyDto }) =>
      CompanyService.update(id, data),

    // Antes de la mutación - actualizar UI inmediatamente
    onMutate: async ({ id, data }) => {
      // Cancelar queries en progreso
      await queryClient.cancelQueries({ queryKey: ["company", id] });

      // Snapshot del valor anterior
      const previousCompany = queryClient.getQueryData(["company", id]);

      // Actualizar optimistically
      queryClient.setQueryData(["company", id], (old: Company) => ({
        ...old,
        ...data,
      }));

      return { previousCompany };
    },

    // Si falla - revertir cambios
    onError: (err, { id }, context) => {
      queryClient.setQueryData(["company", id], context?.previousCompany);
      toast.error("Error al actualizar");
    },

    // Siempre refrescar desde servidor
    onSettled: (data, error, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["company", id] });
    },
  });
}
```

---

## 📋 Checklist de Integración

- [ ] Variables de entorno configuradas
- [ ] ApiClient configurado con URL base
- [ ] Autenticación JWT funcionando
- [ ] Headers Authorization agregados automáticamente
- [ ] Refresh token implementado
- [ ] Servicios creados extendiendo BaseApiService
- [ ] Custom hooks creados con TanStack Query
- [ ] Manejo de errores implementado
- [ ] Loading states manejados
- [ ] Mensajes de éxito/error con toast
- [ ] Cache de TanStack Query configurado
- [ ] Invalidación de cache después de mutaciones

---

**Siguiente:** [Deployment →](./deployment.md)
