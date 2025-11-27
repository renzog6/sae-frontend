// filepath: sae-frontend/lib/utils/api-response-validator.ts

import { ApiResponse, PaginatedResponse } from "@/lib/types/core/api";

/**
 * Utilidades para validar que las respuestas de API sigan el formato estandarizado { data: T }
 *
 * Las interfaces ApiResponse y PaginatedResponse están importadas desde
 * @/lib/types/core/api.ts para mantener consistencia.
 */

/**
 * Valida que una respuesta individual tenga el formato { data: T }
 */
export function validateApiResponse<T>(
  response: any
): response is ApiResponse<T> {
  return (
    response &&
    typeof response === "object" &&
    "data" in response &&
    response.data !== undefined
  );
}

/**
 * Valida que una respuesta paginada tenga el formato correcto
 */
export function validatePaginatedResponse<T>(
  response: any
): response is PaginatedResponse<T> {
  return (
    response &&
    typeof response === "object" &&
    Array.isArray(response.data) &&
    "meta" in response &&
    typeof response.meta === "object" &&
    "limit" in response.meta &&
    "page" in response.meta &&
    "total" in response.meta &&
    "totalPages" in response.meta
  );
}

/**
 * Utilidad para desarrollo: valida respuestas en runtime
 */
export function assertApiResponse<T>(
  response: any,
  context: string
): ApiResponse<T> {
  if (!validateApiResponse(response)) {
    throw new Error(
      `API Response validation failed in ${context}: Expected { data: T }, got ${JSON.stringify(
        response
      )}`
    );
  }
  return response as ApiResponse<T>;
}

/**
 * Utilidad para desarrollo: valida respuestas paginadas en runtime
 */
export function assertPaginatedResponse<T>(
  response: any,
  context: string
): PaginatedResponse<T> {
  if (!validatePaginatedResponse(response)) {
    throw new Error(
      `Paginated Response validation failed in ${context}: Expected paginated format, got ${JSON.stringify(
        response
      )}`
    );
  }
  return response as PaginatedResponse<T>;
}

/**
 * Utilidad para extraer datos de respuestas validadas
 */
export function extractApiData<T>(response: ApiResponse<T>): T {
  return response.data;
}

/**
 * Utilidad para extraer array de respuestas paginadas validadas
 */
export function extractPaginatedData<T>(response: PaginatedResponse<T>): T[] {
  return response.data;
}

/**
 * Utilidad para extraer metadata de respuestas paginadas
 */
export function extractPaginationMeta(response: PaginatedResponse<any>) {
  return response.meta;
}
