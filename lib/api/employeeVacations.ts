// filepath: sae-frontend/lib/api/employeeVacations.ts
import { ApiClient } from "./apiClient";
import { EmployeeVacation } from "@/types/employee";
import { PaginatedResponse, ApiResponse } from "@/types/api";
import {
  EmployeeVacationFormData,
  UpdateEmployeeVacationFormData,
} from "@/lib/validations/employeeVacation";

function unwrap<T>(resp: any): T {
  if (resp && typeof resp === "object" && "data" in resp) {
    return resp.data as T;
  }
  return resp as T;
}
export class EmployeeVacationsService {

  // Fetch all employee vacations with optional pagination
  static async getEmployeeVacations(
    accessToken: string,
    page?: number,
    limit?: number
  ): Promise<EmployeeVacation[]> {
    try {
      const query = new URLSearchParams();
      if (page) query.append("page", page.toString());
      if (limit) query.append("limit", limit.toString());
      const url = `/employee-vacations${
        query.toString() ? `?${query.toString()}` : ""
      }`;
      const response = await ApiClient.request<
        PaginatedResponse<EmployeeVacation>
      >(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching employee vacations:", error);
      throw error;
    }
  }

  // Fetch a single employee vacation by ID
  static async getEmployeeVacationById(
    id: number,
    accessToken: string
  ): Promise<EmployeeVacation> {
    try {
      const response = await ApiClient.request<ApiResponse<EmployeeVacation>>(
        `/employee-vacations/${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching employee vacation with ID ${id}:`, error);
      throw error;
    }
  }

  // Create a new employee vacation
  static async createVacation(
    data: EmployeeVacationFormData,
    accessToken: string
  ) {
    try {
      const response = await ApiClient.request<
        EmployeeVacation | ApiResponse<EmployeeVacation>
      >(`/employee-vacations`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return unwrap<EmployeeVacation>(response);
    } catch (error) {
      console.error("Error creating vacation:", error);
      throw error;
    }
  }

  // Update an existing employee vacation
  static async updateVacation(
    id: number,
    data: UpdateEmployeeVacationFormData,
    accessToken: string
  ) {
    try {
      const response = await ApiClient.request<
        EmployeeVacation | ApiResponse<EmployeeVacation>
      >(`/employee-vacations/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return unwrap<EmployeeVacation>(response);
    } catch (error) {
      console.error("Error updating vacation:", error);
      throw error;
    }
  }

  // Delete an employee vacation
  static async deleteVacation(
    id: number,
    accessToken: string
  ): Promise<string> {
    try {
      const response = await ApiClient.request<{ message: string }>(
        `/employee-vacations/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.message;
    } catch (error) {
      console.error("Error deleting vacation:", error);
      throw error;
    }
  }

  // Download vacation details as a PDF
  static async downloadVacationPdf(id: number, accessToken: string) {
    const blob = await ApiClient.requestBlob(`/employee-vacations/${id}/pdf`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const filename = `Vacaciones_${id}.pdf`;
    const link = document.createElement("a");
    const blobUrl = URL.createObjectURL(blob);
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(blobUrl);
  }
}
