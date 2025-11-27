// filepath: sae-frontend/lib/api/companies/companies.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { Company } from "@/lib/types/domain/company";
import {
  CompanyFormData,
  UpdateCompanyFormData,
} from "@/lib/validations/company";

export class CompaniesService {
  private static basePath = "/companies";

  static async getAll(query?: BaseQueryParams) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const url = QueryBuilder.buildUrl(this.basePath, query);
        const response = await ApiClient.get<PaginatedResponse<Company>>(url);
        return response;
      },
      "CompaniesService",
      "getAll",
      { query }
    );
  }

  static async getById(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<Company>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "CompaniesService",
      "getById",
      { id }
    );
  }

  static async create(data: CompanyFormData) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<Company>>(
          this.basePath,
          data
        );
        return response.data;
      },
      "CompaniesService",
      "create",
      { data }
    );
  }

  static async update(id: number, data: UpdateCompanyFormData) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<Company>>(
          `${this.basePath}/${id}`,
          data
        );
        return response.data;
      },
      "CompaniesService",
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
      "CompaniesService",
      "delete",
      { id }
    );
  }

  static async restore(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<Company>>(
          `${this.basePath}/${id}/restore`,
          {}
        );
        return response.data;
      },
      "CompaniesService",
      "restore",
      { id }
    );
  }
}
