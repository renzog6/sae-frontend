// filepath: sae-frontend/lib/api/history/history.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { ApiResponse } from "@/lib/types/core/api";
import { EmployeeHistoryResponse } from "@/lib/types/domain/history";

class HistoryServiceClass {
  async getEmployeeHistory(
    employeeId: number
  ): Promise<EmployeeHistoryResponse> {
    const emptyResponse: EmployeeHistoryResponse = {
      incidents: [],
      logs: [],
    };

    try {
      const res = await ApiClient.get<ApiResponse<EmployeeHistoryResponse>>(
        `/employees/${employeeId}/history`
      );

      if (!res || !res.data) {
        console.warn(
          `[HistoryServiceClass] Empty response for employee ${employeeId}`
        );
        return emptyResponse;
      }

      return res.data;
    } catch (error) {
      console.error(
        `[HistoryServiceClass] getEmployeeHistory failed for employee ${employeeId}:`,
        error
      );
      return emptyResponse;
    }
  }
}

export const HistoryService = new HistoryServiceClass();
