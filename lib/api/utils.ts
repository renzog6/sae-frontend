// filepath: sae-frontend/lib/api/utils.ts
import { PaginatedResponse } from "@/types/api";

export function normalizeListResponse<T>(
  resp: T[] | PaginatedResponse<T> | { items: T[]; meta: any }
): PaginatedResponse<T> {
  if (Array.isArray(resp)) {
    // If backend returns plain array, wrap with default meta
    return {
      data: resp,
      meta: { total: resp.length, page: 1, limit: resp.length, totalPages: 1 },
    };
  }
  // Handle backend response with 'items' instead of 'data'
  if (resp && typeof resp === "object" && "items" in resp && "meta" in resp) {
    return {
      data: (resp as { items: T[]; meta: any }).items,
      meta: (resp as { items: T[]; meta: any }).meta,
    };
  }
  // Already paginated
  return resp as PaginatedResponse<T>;
}
