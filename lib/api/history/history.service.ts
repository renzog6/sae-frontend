// filepath: sae-frontend/lib/api/history/history.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { ApiResponse } from "@/lib/types/core/api";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { EmployeeHistoryResponse } from "@/lib/types/domain/history";

class HistoryServiceClass {
  async getEmployeeHistory(
    employeeId: number
  ): Promise<EmployeeHistoryResponse> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const res = await ApiClient.get<ApiResponse<EmployeeHistoryResponse>>(
          `/employees/${employeeId}/history`
        );
        return res.data;
      },
      this.constructor.name,
      "getEmployeeHistory",
      { employeeId }
    );
  }
}

export const HistoryService = new HistoryServiceClass();
