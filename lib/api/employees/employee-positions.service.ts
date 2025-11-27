//filepath: sae-frontend/lib/api/employees/employee-positions.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  EmployeePosition,
  CreateEmployeePositionDto,
  UpdateEmployeePositionDto,
} from "@/lib/types/domain/employee";

export class EmployeePositionsService {
  private static basePath = "/employee-positions";

  static async getAll(query?: BaseQueryParams) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const url = QueryBuilder.buildUrl(this.basePath, query);
        const response = await ApiClient.get<
          PaginatedResponse<EmployeePosition>
        >(url);
        return response;
      },
      "EmployeePositionsService",
      "getAll",
      { query }
    );
  }

  static async create(dto: CreateEmployeePositionDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<EmployeePosition>>(
          this.basePath,
          dto
        );
        return response.data;
      },
      "EmployeePositionsService",
      "create",
      { dto }
    );
  }

  static async update(id: number, dto: UpdateEmployeePositionDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<EmployeePosition>>(
          `${this.basePath}/${id}`,
          dto
        );
        return response.data;
      },
      "EmployeePositionsService",
      "update",
      { id, dto }
    );
  }

  static async delete(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.basePath}/${id}`);
        return "Position deleted";
      },
      "EmployeePositionsService",
      "delete",
      { id }
    );
  }
}
