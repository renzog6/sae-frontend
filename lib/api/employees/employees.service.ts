//filepath: sae-frontend/lib/api/employees/employees.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  Employee,
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from "@/lib/types/domain/employee";

export class EmployeesService {
  private static basePath = "/employees";

  static async getAll(query?: BaseQueryParams) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const url = QueryBuilder.buildUrl(this.basePath, query);
        const response = await ApiClient.get<PaginatedResponse<Employee>>(url);
        return response;
      },
      "EmployeesService",
      "getAll",
      { query }
    );
  }

  static async getById(id: number): Promise<Employee> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<Employee>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "EmployeesService",
      "getById",
      { id }
    );
  }

  static async create(dto: CreateEmployeeDto): Promise<Employee> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<Employee>>(
          this.basePath,
          dto
        );
        return response.data;
      },
      "EmployeesService",
      "create",
      { dto }
    );
  }

  static async update(id: number, dto: UpdateEmployeeDto): Promise<Employee> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<Employee>>(
          `${this.basePath}/${id}`,
          dto
        );
        return response.data;
      },
      "EmployeesService",
      "update",
      { id, dto }
    );
  }

  static async delete(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.basePath}/${id}`);
        return "Employee deleted";
      },
      "EmployeesService",
      "delete",
      { id }
    );
  }
}
