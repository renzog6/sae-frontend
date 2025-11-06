//filepath: sae-frontend/lib/api/employees/employees.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import {
  Employee,
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from "@/lib/types/employee";

export class EmployeesService {
  private static basePath = "/employees";

  static async getAll(params?: {
    page?: number;
    limit?: number;
    q?: string;
    status?: string;
    sortBy?: string; //  AGREGADO: Campo por el cual ordenar
    sortOrder?: "asc" | "desc"; //  AGREGADO: Dirección del orden
  }) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.q) query.set("q", params.q);
    if (params?.status) query.set("status", params.status);
    // ✅ AGREGADO: Parámetros de ordenamiento
    if (params?.sortBy) query.set("sortBy", params.sortBy);
    if (params?.sortOrder) query.set("sortOrder", params.sortOrder);

    const qs = query.toString();
    const response = await ApiClient.get<PaginatedResponse<Employee>>(
      `${this.basePath}${qs ? `?${qs}` : ""}`
    );
    return response;
  }

  static async getById(id: number): Promise<Employee> {
    const response = await ApiClient.get<Employee | { data: Employee }>(
      `${this.basePath}/${id}`
    );
    // Handle both direct response and wrapped response
    return response && typeof response === "object" && "data" in response
      ? response.data
      : response;
  }

  static async create(dto: CreateEmployeeDto): Promise<Employee> {
    const response = await ApiClient.post<Employee | { data: Employee }>(
      this.basePath,
      dto
    );
    // Handle both direct response and wrapped response
    return response && typeof response === "object" && "data" in response
      ? response.data
      : response;
  }

  static async update(id: number, dto: UpdateEmployeeDto): Promise<Employee> {
    const response = await ApiClient.patch<Employee | { data: Employee }>(
      `${this.basePath}/${id}`,
      dto
    );
    // Handle both direct response and wrapped response
    return response && typeof response === "object" && "data" in response
      ? response.data
      : response;
  }

  static async delete(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Employee deleted";
  }
}
