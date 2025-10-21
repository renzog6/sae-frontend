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

function unwrap<T>(resp: any): T {
  if (resp && typeof resp === "object" && "data" in resp) {
    return resp.data as T;
  }
  return resp as T;
}

export class EmployeesService {
  //Employees
  static async getEmployees(
    accessToken: string,
    params?: { page?: number; limit?: number; q?: string; status?: string }
  ) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.q) query.set("q", params.q);
    if (params?.status) query.set("status", params.status);
    const qs = query.toString();
    const response = await ApiClient.request<
      Employee[] | PaginatedResponse<Employee>
    >(`/employees${qs ? `?${qs}` : ""}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    // IMPORTANT: Do NOT unwrap here; we need meta for pagination
    return normalizeListResponse<Employee>(response as any);
  }

  static async getEmployeeById(id: number, accessToken: string) {
    const response = await ApiClient.request<Employee | ApiResponse<Employee>>(
      `/employees/${id}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return unwrap<Employee>(response);
  }

  static async createEmployee(
    data: CreateEmployeeFormData,
    accessToken: string
  ) {
    const response = await ApiClient.request<Employee | ApiResponse<Employee>>(
      "/employees",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return unwrap<Employee>(response);
  }

  static async updateEmployee(
    id: number,
    data: UpdateEmployeeFormData,
    accessToken: string
  ) {
    const response = await ApiClient.request<Employee | ApiResponse<Employee>>(
      `/employees/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return unwrap<Employee>(response);
  }

  static async deleteEmployee(id: number, accessToken: string) {
    await ApiClient.request(`/employees/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return "Employee deleted";
  }

  // Categories
  static async getCategories(accessToken: string) {
    const resp = await ApiClient.request<
      EmployeeCategory[] | ApiResponse<EmployeeCategory[]>
    >("/employee-categories", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<EmployeeCategory[]>(resp);
  }

  static async createCategory(
    data: EmployeeCategoryFormData,
    accessToken: string
  ) {
    const resp = await ApiClient.request<
      EmployeeCategory | ApiResponse<EmployeeCategory>
    >("/employee-categories", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<EmployeeCategory>(resp);
  }

  static async updateCategory(
    id: number,
    data: UpdateEmployeeCategoryFormData,
    accessToken: string
  ) {
    const resp = await ApiClient.request<
      EmployeeCategory | ApiResponse<EmployeeCategory>
    >(`/employee-categories/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<EmployeeCategory>(resp);
  }

  static async deleteCategory(id: number, accessToken: string) {
    await ApiClient.request(`/employee-categories/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return "Category deleted";
  }

  // Positions
  static async getPositions(accessToken: string) {
    const resp = await ApiClient.request<
      EmployeePosition[] | ApiResponse<EmployeePosition[]>
    >("/employee-positions", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<EmployeePosition[]>(resp);
  }

  static async createPosition(
    data: EmployeePositionFormData,
    accessToken: string
  ) {
    const resp = await ApiClient.request<
      EmployeePosition | ApiResponse<EmployeePosition>
    >("/employee-positions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<EmployeePosition>(resp);
  }

  static async updatePosition(
    id: number,
    data: UpdateEmployeePositionFormData,
    accessToken: string
  ) {
    const resp = await ApiClient.request<
      EmployeePosition | ApiResponse<EmployeePosition>
    >(`/employee-positions/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return unwrap<EmployeePosition>(resp);
  }

  static async deletePosition(id: number, accessToken: string) {
    await ApiClient.request(`/employee-positions/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return "Position deleted";
  }
}

// filepath: sae-frontend/lib/api/employees.ts
