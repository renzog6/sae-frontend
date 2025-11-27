//filepath: sae-frontend/lib/api/employees/employee-categories.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  EmployeeCategory,
  CreateEmployeeCategoryDto,
  UpdateEmployeeCategoryDto,
} from "@/lib/types/domain/employee";

export class EmployeeCategoriesService {
  private static basePath = "/employee-categories";

  static async getAll(query?: BaseQueryParams) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const url = QueryBuilder.buildUrl(this.basePath, query);
        const response = await ApiClient.get<
          PaginatedResponse<EmployeeCategory>
        >(url);
        return response;
      },
      "EmployeeCategoriesService",
      "getAll",
      { query }
    );
  }

  static async create(dto: CreateEmployeeCategoryDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<EmployeeCategory>>(
          this.basePath,
          dto
        );
        return response.data;
      },
      "EmployeeCategoriesService",
      "create",
      { dto }
    );
  }

  static async update(id: number, dto: UpdateEmployeeCategoryDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<EmployeeCategory>>(
          `${this.basePath}/${id}`,
          dto
        );
        return response.data;
      },
      "EmployeeCategoriesService",
      "update",
      { id, dto }
    );
  }

  static async delete(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.basePath}/${id}`);
        return "Category deleted";
      },
      "EmployeeCategoriesService",
      "delete",
      { id }
    );
  }
}
