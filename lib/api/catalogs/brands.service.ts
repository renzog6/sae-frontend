// filepath: sae-frontend/lib/api/catalogs/brands.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { Brand } from "@/lib/types/shared/catalogs";
import { BrandFormData, UpdateBrandFormData } from "@/lib/validations/catalog";

export class BrandsService {
  private static basePath = "/brands";

  static async getAll(query?: BaseQueryParams) {
    const url = QueryBuilder.buildUrl(this.basePath, query);
    const response = await ApiClient.get<PaginatedResponse<Brand>>(url);
    return response;
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
    const response = await ApiClient.put<{ data: Brand }>(
      `${this.basePath}/${id}/restore`,
      {}
    );
    return response.data;
  }
}
