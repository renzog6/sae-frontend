// filepath: sae-frontend/lib/api/catalogs/brands.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { Brand } from "@/lib/types/shared/catalogs";
import { BrandFormData, UpdateBrandFormData } from "@/lib/validations/catalog";

export class BrandsService {
  private static basePath = "/brands";

  static async getAll(query?: BaseQueryParams) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const url = QueryBuilder.buildUrl(this.basePath, query);
        const response = await ApiClient.get<PaginatedResponse<Brand>>(url);
        return response;
      },
      "BrandsService",
      "getAll",
      { query }
    );
  }

  static async getById(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<Brand>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "BrandsService",
      "getById",
      { id }
    );
  }

  static async create(data: BrandFormData) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<Brand>>(
          this.basePath,
          data
        );
        return response.data;
      },
      "BrandsService",
      "create",
      { data }
    );
  }

  static async update(id: number, data: UpdateBrandFormData) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<Brand>>(
          `${this.basePath}/${id}`,
          data
        );
        return response.data;
      },
      "BrandsService",
      "update",
      { id, data }
    );
  }

  static async delete(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.delete<ApiResponse<string>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "BrandsService",
      "delete",
      { id }
    );
  }

  static async restore(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<Brand>>(
          `${this.basePath}/${id}/restore`,
          {}
        );
        return response.data;
      },
      "BrandsService",
      "restore",
      { id }
    );
  }
}
