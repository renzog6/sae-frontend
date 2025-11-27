//filepath: sae-frontend/lib/api/employees/employee-vacations.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  EmployeeVacation,
  CreateEmployeeVacationDto,
  UpdateEmployeeVacationDto,
} from "@/lib/types/domain/employee";

export class EmployeeVacationsService {
  private static basePath = "/employee-vacations";

  static async getAll(query?: BaseQueryParams) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const url = QueryBuilder.buildUrl(this.basePath, query);
        const response = await ApiClient.get<
          PaginatedResponse<EmployeeVacation>
        >(url);
        return response.data || [];
      },
      "EmployeeVacationsService",
      "getAll",
      { query }
    );
  }

  static async getById(id: number): Promise<EmployeeVacation> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<EmployeeVacation>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "EmployeeVacationsService",
      "getById",
      { id }
    );
  }

  static async create(dto: CreateEmployeeVacationDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<EmployeeVacation>>(
          this.basePath,
          dto
        );
        return response.data;
      },
      "EmployeeVacationsService",
      "create",
      { dto }
    );
  }

  static async update(id: number, dto: UpdateEmployeeVacationDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<EmployeeVacation>>(
          `${this.basePath}/${id}`,
          dto
        );
        return response.data;
      },
      "EmployeeVacationsService",
      "update",
      { id, dto }
    );
  }

  static async delete(id: number): Promise<string> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.basePath}/${id}`);
        return "Vacation deleted";
      },
      "EmployeeVacationsService",
      "delete",
      { id }
    );
  }

  static async downloadPdf(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const blob = await ApiClient.getBlob(`${this.basePath}/${id}/pdf`);

        const filename = `Vacaciones_${id}.pdf`;
        const link = document.createElement("a");
        const blobUrl = URL.createObjectURL(blob);
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(blobUrl);
      },
      "EmployeeVacationsService",
      "downloadPdf",
      { id }
    );
  }
}
