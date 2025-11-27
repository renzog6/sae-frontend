// filepath: sae-frontend/lib/api/companies/business-subcategories.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { BusinessSubCategory } from "@/lib/types/domain/company";
import {
  BusinessSubcategoryFormData,
  UpdateBusinessSubcategoryFormData,
} from "@/lib/validations/company";

export class BusinessSubCategoriesService {
  private static basePath = "/companies/subcategories";

  static async getAll(query?: BaseQueryParams) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const url = QueryBuilder.buildUrl(this.basePath, query);
        const response = await ApiClient.get<
          PaginatedResponse<BusinessSubCategory>
        >(url);
        return response;
      },
      "BusinessSubCategoriesService",
      "getAll",
      { query }
    );
  }

  static async getById(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<BusinessSubCategory>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "BusinessSubCategoriesService",
      "getById",
      { id }
    );
  }

  static async create(data: BusinessSubcategoryFormData) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<BusinessSubCategory>>(
          this.basePath,
          data
        );
        return response.data;
      },
      "BusinessSubCategoriesService",
      "create",
      { data }
    );
  }

  static async update(id: number, data: UpdateBusinessSubcategoryFormData) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<BusinessSubCategory>>(
          `${this.basePath}/${id}`,
          data
        );
        return response.data;
      },
      "BusinessSubCategoriesService",
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
      "BusinessSubCategoriesService",
      "delete",
      { id }
    );
  }

  static async restore(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<BusinessSubCategory>>(
          `${this.basePath}/${id}/restore`,
          {}
        );
        return response.data;
      },
      "BusinessSubCategoriesService",
      "restore",
      { id }
    );
  }
}
