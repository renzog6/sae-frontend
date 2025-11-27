// filepath: sae-frontend/lib/types/core/api.ts

// Representa cualquier respuesta paginada del backend
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
}

// Representa una respuesta con un solo recurso
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Parámetros de consulta comunes para múltiples endpoints
export interface BaseQueryParams {
  // Paginación
  page?: number;
  limit?: number;

  // Búsqueda y orden
  q?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";

  // Filtros comunes
  isActive?: boolean;
  status?: string;

  // Rango de fechas
  fromDate?: string;
  toDate?: string;
}
