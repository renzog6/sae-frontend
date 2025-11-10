// filepath: sae-frontend/lib/api/catalogs/brands.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import { Brand } from "@/lib/types/catalog";
import { BrandFormData, UpdateBrandFormData } from "@/lib/validations/catalog";
import { BrandQueryParams } from "@/lib/types/catalog";

export class BrandsService {
  private static basePath = "/brands";

  static async getAll(query?: BrandQueryParams) {
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
      const response = await ApiClient.get<PaginatedResponse<Brand>>(url);
      return response;
    } else {
      // Fallback to non-paginated for backward compatibility
      const response = await ApiClient.get<{ data: Brand[] }>(this.basePath);
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
    const response = await ApiClient.get<{ data: Brand }>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  static async create(data: BrandFormData) {
    const response = await ApiClient.post<{ data: Brand }>(this.basePath, data);
    return response.data;
  }

  static async update(id: number, data: UpdateBrandFormData) {
    const response = await ApiClient.put<{ data: Brand }>(
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
    const response = await ApiClient.patch<{ data: Brand }>(
      `${this.basePath}/${id}/restore`,
      {}
    );
    return response.data;
  }
}
