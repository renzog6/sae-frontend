// filepath: sae-frontend/lib/api/utils.ts
import { PaginatedResponse } from "@/types/api";

export function normalizeListResponse<T>(resp: T[] | PaginatedResponse<T>): PaginatedResponse<T> {
  if (Array.isArray(resp)) {
    // If backend returns plain array, wrap with default meta
    return {
      data: resp,
      meta: { total: resp.length, page: 1, limit: resp.length, totalPages: 1 },
    };
  }
  // Already paginated
  return resp as PaginatedResponse<T>;
}
