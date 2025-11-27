//filepath: sae-frontend/lib/api/employees/employee-categories.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import {
  EmployeeCategory,
  CreateEmployeeCategoryDto,
  UpdateEmployeeCategoryDto,
} from "@/lib/types/domain/employee";

export class EmployeeCategoriesService {
  private static basePath = "/employee-categories";

  static async getAll(query?: BaseQueryParams) {
    const url = QueryBuilder.buildUrl(this.basePath, query);
    const response = await ApiClient.get<PaginatedResponse<EmployeeCategory>>(
      url
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
