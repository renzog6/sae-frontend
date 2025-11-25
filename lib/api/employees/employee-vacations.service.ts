//filepath: sae-frontend/lib/api/employees/employee-vacations.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import {
  EmployeeVacation,
  CreateEmployeeVacationDto,
  UpdateEmployeeVacationDto,
} from "@/lib/types/employee";
import { PaginatedResponse } from "@/lib/types/api";

export class EmployeeVacationsService {
  private static basePath = "/employee-vacations";

  static async getAll(params?: {
    page?: number;
    limit?: number;
  }): Promise<EmployeeVacation[]> {
    try {
      const query = new URLSearchParams();
      if (params?.page) query.append("page", params.page.toString());
      if (params?.limit) query.append("limit", params.limit.toString());
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

  static async getById(id: number): Promise<EmployeeVacation> {
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

  static async create(dto: CreateEmployeeVacationDto) {
    try {
      const response = await ApiClient.post<EmployeeVacation>(
        this.basePath,
        dto
      );
      return response;
    } catch (error) {
      console.error("Error creating vacation:", error);
      throw error;
    }
  }

  static async update(id: number, dto: UpdateEmployeeVacationDto) {
    try {
      const response = await ApiClient.put<EmployeeVacation>(
        `${this.basePath}/${id}`,
        dto
      );
      return response;
    } catch (error) {
      console.error("Error updating vacation:", error);
      throw error;
    }
  }

  static async delete(id: number): Promise<string> {
    try {
      await ApiClient.delete(`${this.basePath}/${id}`);
      return "Vacation deleted";
    } catch (error) {
      console.error("Error deleting vacation:", error);
      throw error;
    }
  }

  static async downloadPdf(id: number) {
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
}
