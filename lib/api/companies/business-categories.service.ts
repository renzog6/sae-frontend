// filepath: sae-frontend/lib/api/companies/business-categories.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { BusinessCategory } from "@/lib/types/domain/company";
import {
  BusinessCategoryFormData,
  UpdateBusinessCategoryFormData,
} from "@/lib/validations/company";

export class BusinessCategoriesService {
  private static basePath = "/companies/categories";

  static async getAll(query?: BaseQueryParams) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const url = QueryBuilder.buildUrl(this.basePath, query);
        const response = await ApiClient.get<
          PaginatedResponse<BusinessCategory>
        >(url);
        return response;
      },
      "BusinessCategoriesService",
      "getAll",
      { query }
    );
  }

  static async getById(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<BusinessCategory>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "BusinessCategoriesService",
      "getById",
      { id }
    );
  }

  static async create(data: BusinessCategoryFormData) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<BusinessCategory>>(
          this.basePath,
          data
        );
        return response.data;
      },
      "BusinessCategoriesService",
      "create",
      { data }
    );
  }

  static async update(id: number, data: UpdateBusinessCategoryFormData) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<BusinessCategory>>(
          `${this.basePath}/${id}`,
          data
        );
        return response.data;
      },
      "BusinessCategoriesService",
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
      "BusinessCategoriesService",
      "delete",
      { id }
    );
  }

  static async restore(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<BusinessCategory>>(
          `${this.basePath}/${id}/restore`,
          {}
        );
        return response.data;
      },
      "BusinessCategoriesService",
      "restore",
      { id }
    );
  }

  // Backward compatibility methods
  static async getCategories(params?: BaseQueryParams) {
    return this.getAll(params);
  }

  static async getCategoryById(id: number) {
    return this.getById(id);
  }

  static async createCategory(data: BusinessCategoryFormData) {
    return this.create(data);
  }

  static async updateCategory(
    id: number,
    data: UpdateBusinessCategoryFormData
  ) {
    return this.update(id, data);
  }

  static async deleteCategory(id: number) {
    return this.delete(id);
  }

  static async restoreCategory(id: number) {
    return this.restore(id);
  }
}
