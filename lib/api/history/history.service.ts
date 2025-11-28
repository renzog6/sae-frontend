// filepath: sae-frontend/lib/api/history/history.service.ts

import { ApiClient } from "../apiClient";
import { ApiResponse } from "@/lib/types/core/api";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
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
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<
          ApiResponse<EmployeeHistoryResponse>
        >(`/employees/${employeeId}/history`);
        return response.data;
      },
      "HistoryService",
      "getEmployeeHistory",
      { employeeId }
    );
  }

  // Employee Incidents CRUD
  static async createEmployeeIncident(
    data: CreateEmployeeIncidentDto
  ): Promise<EmployeeIncident> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<EmployeeIncident>>(
          this.employeeIncidentsPath,
          data
        );
        return response.data;
      },
      "HistoryService",
      "createEmployeeIncident",
      { data }
    );
  }

  static async updateEmployeeIncident(
    id: number,
    data: UpdateEmployeeIncidentDto
  ): Promise<EmployeeIncident> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<EmployeeIncident>>(
          `${this.employeeIncidentsPath}/${id}`,
          data
        );
        return response.data;
      },
      "HistoryService",
      "updateEmployeeIncident",
      { id, data }
    );
  }

  static async deleteEmployeeIncident(id: number): Promise<void> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.employeeIncidentsPath}/${id}`);
      },
      "HistoryService",
      "deleteEmployeeIncident",
      { id }
    );
  }
}
