//filepath: sae-frontend/lib/api/employees/employee-positions.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import {
  EmployeePosition,
  CreateEmployeePositionDto,
  UpdateEmployeePositionDto,
} from "@/lib/types/domain/employee";

export class EmployeePositionsService {
  private static basePath = "/employee-positions";

  static async getAll(query?: BaseQueryParams) {
    const url = QueryBuilder.buildUrl(this.basePath, query);
    const response = await ApiClient.get<PaginatedResponse<EmployeePosition>>(
      url
    );
    return response;
  }

  static async create(dto: CreateEmployeePositionDto) {
    const response = await ApiClient.post<EmployeePosition>(this.basePath, dto);
    return response;
  }

  static async update(id: number, dto: UpdateEmployeePositionDto) {
    const response = await ApiClient.put<EmployeePosition>(
      `${this.basePath}/${id}`,
      dto
    );
    return response;
  }

  static async delete(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Position deleted";
  }
}
