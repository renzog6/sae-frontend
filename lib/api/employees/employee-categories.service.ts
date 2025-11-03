//filepath: sae-frontend/lib/api/employees/employee-categories.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import {
  EmployeeCategory,
  CreateEmployeeCategoryDto,
  UpdateEmployeeCategoryDto,
} from "@/lib/types/employee";

export class EmployeeCategoriesService {
  private static basePath = "/employee-categories";

  static async getAll(params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<EmployeeCategory>> {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    const response = await ApiClient.get<PaginatedResponse<EmployeeCategory>>(
      `${this.basePath}${qs ? `?${qs}` : ""}`
    );
    return response;
  }

  static async create(dto: CreateEmployeeCategoryDto) {
    const response = await ApiClient.post<EmployeeCategory>(this.basePath, dto);
    return response;
  }

  static async update(id: number, dto: UpdateEmployeeCategoryDto) {
    const response = await ApiClient.put<EmployeeCategory>(
      `${this.basePath}/${id}`,
      dto
    );
    return response;
  }

  static async delete(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Category deleted";
  }
}
