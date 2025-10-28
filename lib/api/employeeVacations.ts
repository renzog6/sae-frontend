// filepath: sae-frontend/lib/api/employeeVacations.ts
import { ApiClient } from "./apiClient";
import { EmployeeVacation } from "@/lib/types/employee";
import { PaginatedResponse, ApiResponse } from "@/lib/types/api";
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
  private static basePath = "/employee-vacations";

  // Fetch all employee vacations with optional pagination
  static async getEmployeeVacations(
    page?: number,
    limit?: number
  ): Promise<EmployeeVacation[]> {
    try {
      const query = new URLSearchParams();
      if (page) query.append("page", page.toString());
      if (limit) query.append("limit", limit.toString());
      const url = `${this.basePath}${
        query.toString() ? `?${query.toString()}` : ""
      }`;
      const response = await ApiClient.get<PaginatedResponse<EmployeeVacation>>(
        url
      );
      return response.data || [];
    } catch (error) {
      console.error("Error fetching employee vacations:", error);
      throw error;
    }
  }

  // Fetch a single employee vacation by ID
  static async getEmployeeVacationById(id: number): Promise<EmployeeVacation> {
    try {
      const response = await ApiClient.get<EmployeeVacation>(
        `${this.basePath}/${id}`
      );
      return response;
    } catch (error) {
      console.error(`Error fetching employee vacation with ID ${id}:`, error);
      throw error;
    }
  }

  // Create a new employee vacation
  static async createVacation(data: EmployeeVacationFormData) {
    try {
      const response = await ApiClient.post<EmployeeVacation>(
        this.basePath,
        data
      );
      return response;
    } catch (error) {
      console.error("Error creating vacation:", error);
      throw error;
    }
  }

  // Update an existing employee vacation
  static async updateVacation(
    id: number,
    data: UpdateEmployeeVacationFormData
  ) {
    try {
      const response = await ApiClient.put<EmployeeVacation>(
        `${this.basePath}/${id}`,
        data
      );
      return response;
    } catch (error) {
      console.error("Error updating vacation:", error);
      throw error;
    }
  }

  // Delete an employee vacation
  static async deleteVacation(id: number): Promise<string> {
    try {
      await ApiClient.delete(`${this.basePath}/${id}`);
      return "Vacation deleted";
    } catch (error) {
      console.error("Error deleting vacation:", error);
      throw error;
    }
  }

  // Download vacation details as a PDF
  static async downloadVacationPdf(id: number) {
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
  }

  // Export vacations to Excel for a specific employee
  static async exportVacationsToExcel(employeeId: number) {
    const blob = await ApiClient.getBlob(
      `${this.basePath}/${employeeId}/exportVacations/excel`
    );

    const filename = `vacaciones.xlsx`;
    const link = document.createElement("a");
    const blobUrl = URL.createObjectURL(blob);
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(blobUrl);
  }

  // Export employees vacations summary to Excel
  static async exportEmployeesVacationsToExcel() {
    const blob = await ApiClient.getBlob(
      `${this.basePath}/exportEmployees/excel`
    );

    const filename = `empleados_vacaciones.xlsx`;
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
