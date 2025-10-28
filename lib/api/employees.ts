// filepath: sae-frontend/lib/api/employees.ts
import { ApiClient } from "./apiClient";
import { ApiResponse, PaginatedResponse } from "@/lib/types/api";
import { normalizeListResponse } from "@/lib/api/utils";
import {
  Employee,
  EmployeeCategory,
  EmployeePosition,
} from "@/lib/types/employee";
import {
  CreateEmployeeFormData,
  UpdateEmployeeFormData,
  EmployeeCategoryFormData,
  UpdateEmployeeCategoryFormData,
  EmployeePositionFormData,
  UpdateEmployeePositionFormData,
} from "@/lib/validations/employee";
import { unwrap } from "@/lib/api/utils";
export class EmployeesService {
  //Employees
  static async getEmployees(params?: {
    page?: number;
    limit?: number;
    q?: string;
    status?: string;
  }) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.q) query.set("q", params.q);
    if (params?.status) query.set("status", params.status);
    const qs = query.toString();
    const response = await ApiClient.get<PaginatedResponse<Employee>>(
      `employees${qs ? `?${qs}` : ""}`
    );
    return response;
  }

  static async getEmployeeById(id: number) {
    const response = await ApiClient.get<Employee>(`employees/${id}`);
    return response;
  }

  static async createEmployee(data: CreateEmployeeFormData) {
    const response = await ApiClient.post<Employee>("employees", data);
    return response;
  }

  static async updateEmployee(id: number, data: UpdateEmployeeFormData) {
    const response = await ApiClient.put<Employee>(`employees/${id}`, data);
    return response;
  }

  static async deleteEmployee(id: number) {
    await ApiClient.delete(`employees/${id}`);
    return "Employee deleted";
  }

  // Categories
  static async getCategories() {
    const resp = await ApiClient.get<EmployeeCategory[]>("employee-categories");
    return resp;
  }

  static async createCategory(data: EmployeeCategoryFormData) {
    const resp = await ApiClient.post<EmployeeCategory>(
      "employee-categories",
      data
    );
    return resp;
  }

  static async updateCategory(
    id: number,
    data: UpdateEmployeeCategoryFormData
  ) {
    const resp = await ApiClient.put<EmployeeCategory>(
      `employee-categories/${id}`,
      data
    );
    return resp;
  }

  static async deleteCategory(id: number) {
    await ApiClient.delete(`employee-categories/${id}`);
    return "Category deleted";
  }

  // Positions
  static async getPositions() {
    const resp = await ApiClient.get<EmployeePosition[]>("employee-positions");
    return resp;
  }

  static async createPosition(data: EmployeePositionFormData) {
    const resp = await ApiClient.post<EmployeePosition>(
      "employee-positions",
      data
    );
    return resp;
  }

  static async updatePosition(
    id: number,
    data: UpdateEmployeePositionFormData
  ) {
    const resp = await ApiClient.put<EmployeePosition>(
      `employee-positions/${id}`,
      data
    );
    return resp;
  }

  static async deletePosition(id: number) {
    await ApiClient.delete(`employee-positions/${id}`);
    return "Position deleted";
  }
}

// filepath: sae-frontend/lib/api/employees.ts
