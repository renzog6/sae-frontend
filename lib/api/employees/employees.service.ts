//filepath: sae-frontend/lib/api/employees/employees.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import {
  Employee,
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from "@/lib/types/domain/employee";

export class EmployeesService {
  private static basePath = "/employees";

  static async getAll(query?: BaseQueryParams) {
    const url = QueryBuilder.buildUrl(this.basePath, query);
    const response = await ApiClient.get<PaginatedResponse<Employee>>(url);
    return response;
  }

  static async getById(id: number): Promise<Employee> {
    const response = await ApiClient.get<ApiResponse<Employee>>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  static async create(dto: CreateEmployeeDto): Promise<Employee> {
    const response = await ApiClient.post<ApiResponse<Employee>>(
      this.basePath,
      dto
    );
    return response.data;
  }

  static async update(id: number, dto: UpdateEmployeeDto): Promise<Employee> {
    const response = await ApiClient.put<ApiResponse<Employee>>(
      `${this.basePath}/${id}`,
      dto
    );
    return response.data;
  }

  static async delete(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Employee deleted";
  }
}
