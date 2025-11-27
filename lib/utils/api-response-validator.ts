// filepath: sae-frontend/lib/utils/api-response-validator.ts

/**
 * Utilidades para validar que las respuestas de API sigan el formato estandarizado { data: T }
 */

export interface ApiResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
}

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
 * Helper para tests: asegura que un servicio retorne el formato correcto
 */
export function expectApiResponse<T>(
  result: any,
  expectedData?: T
): ApiResponse<T> {
  expect(validateApiResponse(result)).toBe(true);
  expect(result).toHaveProperty("data");

  if (expectedData !== undefined) {
    expect(result.data).toEqual(expectedData);
  }

  return result as ApiResponse<T>;
}

/**
 * Helper para tests: asegura que un servicio paginado retorne el formato correcto
 */
export function expectPaginatedResponse<T>(result: any): PaginatedResponse<T> {
  expect(validatePaginatedResponse(result)).toBe(true);
  expect(Array.isArray(result.data)).toBe(true);
  expect(result).toHaveProperty("meta");
  expect(result.meta).toHaveProperty("limit");
  expect(result.meta).toHaveProperty("page");
  expect(result.meta).toHaveProperty("total");
  expect(result.meta).toHaveProperty("totalPages");

  return result as PaginatedResponse<T>;
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
