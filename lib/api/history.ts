// filepath: sae-frontend/lib/api/history.ts

import { ApiClient } from "./apiClient";
import {
  EmployeeHistoryResponse,
  EmployeeIncident,
  CreateEmployeeIncidentDto,
  UpdateEmployeeIncidentDto,
} from "@/lib/types/history";

export class HistoryService {
  private static employeeIncidentsPath = "/employee-incidents";

  static async getEmployeeHistory(
    employeeId: number
  ): Promise<EmployeeHistoryResponse> {
    const response = await ApiClient.get<EmployeeHistoryResponse>(
      `/employees/${employeeId}/history`
    );
    return response;
  }

  // Employee Incidents CRUD
  static async createEmployeeIncident(
    data: CreateEmployeeIncidentDto
  ): Promise<EmployeeIncident> {
    const response = await ApiClient.post<EmployeeIncident>(
      this.employeeIncidentsPath,
      data
    );
    return response;
  }

  static async updateEmployeeIncident(
    id: number,
    data: UpdateEmployeeIncidentDto
  ): Promise<EmployeeIncident> {
    const response = await ApiClient.put<EmployeeIncident>(
      `${this.employeeIncidentsPath}/${id}`,
      data
    );
    return response;
  }

  static async deleteEmployeeIncident(id: number): Promise<void> {
    await ApiClient.delete(`${this.employeeIncidentsPath}/${id}`);
  }
}
