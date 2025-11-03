//filepath: sae-frontend/lib/api/employees/employee-positions.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import {
  EmployeePosition,
  CreateEmployeePositionDto,
  UpdateEmployeePositionDto,
} from "@/lib/types/employee";

export class EmployeePositionsService {
  private static basePath = "/employee-positions";

  static async getAll(params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<EmployeePosition>> {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    const response = await ApiClient.get<PaginatedResponse<EmployeePosition>>(
      `${this.basePath}${qs ? `?${qs}` : ""}`
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
