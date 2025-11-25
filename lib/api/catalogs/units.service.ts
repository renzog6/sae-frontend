// filepath: sae-frontend/lib/api/catalogs/units.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import { Unit } from "@/lib/types/catalog";
import { UnitFormData, UpdateUnitFormData } from "@/lib/validations/catalog";

export interface UnitQueryParams {
  page?: number;
  limit?: number;
  q?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export class UnitsService {
  private static basePath = "/units";

  static async getAll(query?: UnitQueryParams) {
    if (query) {
      const params = new URLSearchParams();
      if (query.page) params.append("page", query.page.toString());
      if (query.limit) params.append("limit", query.limit.toString());
      if (query.q) params.append("q", query.q);
      if (query.sortBy) params.append("sortBy", query.sortBy);
      if (query.sortOrder) params.append("sortOrder", query.sortOrder);

      const queryString = params.toString();
      const url = queryString
        ? `${this.basePath}?${queryString}`
        : this.basePath;
      const response = await ApiClient.get<PaginatedResponse<Unit>>(url);
      return response;
    } else {
      // Fallback to non-paginated for backward compatibility
      const response = await ApiClient.get<{ data: Unit[] }>(this.basePath);
      return {
        data: response.data,
        meta: {
          total: response.data.length,
          page: 1,
          limit: response.data.length,
          totalPages: 1,
        },
      };
    }
  }

  static async getById(id: number) {
    const response = await ApiClient.get<{ data: Unit }>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  static async create(data: UnitFormData) {
    const response = await ApiClient.post<{ data: Unit }>(this.basePath, data);
    return response.data;
  }

  static async update(id: number, data: UpdateUnitFormData) {
    const response = await ApiClient.put<{ data: Unit }>(
      `${this.basePath}/${id}`,
      data
    );
    return response.data;
  }

  static async delete(id: number) {
    const response = await ApiClient.delete<{ data: string }>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  static async restore(id: number) {
    const response = await ApiClient.put<{ data: Unit }>(
      `${this.basePath}/${id}/restore`,
      {}
    );
    return response.data;
  }
}
