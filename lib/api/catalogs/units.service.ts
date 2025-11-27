// filepath: sae-frontend/lib/api/catalogs/units.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { Unit } from "@/lib/types/shared/catalogs";
import { UnitFormData, UpdateUnitFormData } from "@/lib/validations/catalog";

export class UnitsService {
  private static basePath = "/units";

  static async getAll(query?: BaseQueryParams) {
    const url = QueryBuilder.buildUrl(this.basePath, query);
    const response = await ApiClient.get<PaginatedResponse<Unit>>(url);
    return response;
  }

  static async getById(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<Unit>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "UnitsService",
      "getById",
      { id }
    );
  }

  static async create(data: UnitFormData) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<Unit>>(
          this.basePath,
          data
        );
        return response.data;
      },
      "UnitsService",
      "create",
      { data }
    );
  }

  static async update(id: number, data: UpdateUnitFormData) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<Unit>>(
          `${this.basePath}/${id}`,
          data
        );
        return response.data;
      },
      "UnitsService",
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
      "UnitsService",
      "delete",
      { id }
    );
  }

  static async restore(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<Unit>>(
          `${this.basePath}/${id}/restore`,
          {}
        );
        return response.data;
      },
      "UnitsService",
      "restore",
      { id }
    );
  }
}
