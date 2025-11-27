// filepath: sae-frontend/lib/api/history.ts

import { ApiClient } from "./apiClient";
import { ApiResponse } from "@/lib/types/core/api";
import {
  EmployeeHistoryResponse,
  EmployeeIncident,
  CreateEmployeeIncidentDto,
  UpdateEmployeeIncidentDto,
} from "@/lib/types/domain/history";

export class HistoryService {
  private static employeeIncidentsPath = "/employee-incidents";

  static async getEmployeeHistory(
    employeeId: number
  ): Promise<EmployeeHistoryResponse> {
    const response = await ApiClient.get<ApiResponse<EmployeeHistoryResponse>>(
      `/employees/${employeeId}/history`
    );
    return response.data;
  }

  // Employee Incidents CRUD
  static async createEmployeeIncident(
    data: CreateEmployeeIncidentDto
  ): Promise<EmployeeIncident> {
    const response = await ApiClient.post<ApiResponse<EmployeeIncident>>(
      this.employeeIncidentsPath,
      data
    );
    return response.data;
  }

  static async updateEmployeeIncident(
    id: number,
    data: UpdateEmployeeIncidentDto
  ): Promise<EmployeeIncident> {
    const response = await ApiClient.put<ApiResponse<EmployeeIncident>>(
      `${this.employeeIncidentsPath}/${id}`,
      data
    );
    return response.data;
  }

  static async deleteEmployeeIncident(id: number): Promise<void> {
    await ApiClient.delete(`${this.employeeIncidentsPath}/${id}`);
  }
}
