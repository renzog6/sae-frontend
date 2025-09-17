// filepath: sae-frontend/types/api.ts

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
