// filepath: sae-frontend/lib/api/history/history.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import type { ApiResponse } from "@/lib/types/core/api";
import type { EmployeeHistoryResponse } from "@/lib/types/domain/history";

class HistoryServiceClass {
  async getEmployeeHistory(
    employeeId: number
  ): Promise<EmployeeHistoryResponse> {
    const emptyResponse: EmployeeHistoryResponse = {
      incidents: [],
      logs: [],
    };

    try {
      const res = await ApiClient.get<
        EmployeeHistoryResponse | ApiResponse<EmployeeHistoryResponse>
      >(
        `/employees/${employeeId}/history`
      );

      if (!res) {
        console.warn(
          `[HistoryServiceClass] Empty response for employee ${employeeId}`
        );
        return emptyResponse;
      }

      const payload = "data" in res ? res.data : res;

      return {
        incidents: payload?.incidents ?? [],
        logs: payload?.logs ?? [],
      };
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
