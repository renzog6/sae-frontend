// filepath: sae-frontend/lib/api/history.ts

import { ApiClient } from "./apiClient";
import {
  EmployeeHistoryResponse,
  EmployeeIncident,
  CreateEmployeeIncidentDto,
  UpdateEmployeeIncidentDto,
} from "@/lib/types/history";

function unwrap<T>(resp: any): T {
  if (resp && typeof resp === "object" && "data" in resp) {
    return resp.data as T;
  }
  return resp as T;
}

export class HistoryService {
  static async getEmployeeHistory(
    employeeId: number,
    accessToken: string
  ): Promise<EmployeeHistoryResponse> {
    const response = await ApiClient.request<EmployeeHistoryResponse>(
      `/employees/${employeeId}/history`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return unwrap<EmployeeHistoryResponse>(response);
  }

  // Employee Incidents CRUD
  static async createEmployeeIncident(
    data: CreateEmployeeIncidentDto,
    accessToken: string
  ): Promise<EmployeeIncident> {
    const response = await ApiClient.request<EmployeeIncident>(
      "/employee-incidents",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return unwrap<EmployeeIncident>(response);
  }

  static async updateEmployeeIncident(
    id: number,
    data: UpdateEmployeeIncidentDto,
    accessToken: string
  ): Promise<EmployeeIncident> {
    const response = await ApiClient.request<EmployeeIncident>(
      `/employee-incidents/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return unwrap<EmployeeIncident>(response);
  }

  static async deleteEmployeeIncident(
    id: number,
    accessToken: string
  ): Promise<void> {
    await ApiClient.request(`/employee-incidents/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
