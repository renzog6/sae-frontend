//filepath: sae-frontend/lib/api/tires/tire-events.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/core/api";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { TireEvent } from "@/lib/types/domain/tire";

export class TireEventsService {
  private static basePath = "/tires/events";

  static async getByTire(tireId: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<TireEvent[]>(
          `${this.basePath}/tire/${tireId}`
        );
        return response;
      },
      "TireEventsService",
      "getByTire",
      { tireId }
    );
  }

  static async getAll(
    params: {
      page?: number;
      limit?: number;
      q?: string;
      eventType?: string;
      fromDate?: string;
      toDate?: string;
    } = {}
  ) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const query = new URLSearchParams();
        if (params.page) query.append("page", params.page.toString());
        if (params.limit) query.append("limit", params.limit.toString());
        if (params.q) query.append("q", params.q);
        if (params.eventType) query.append("eventType", params.eventType);
        if (params.fromDate) query.append("fromDate", params.fromDate);
        if (params.toDate) query.append("toDate", params.toDate);

        const response = await ApiClient.get<PaginatedResponse<TireEvent>>(
          `${this.basePath}?${query.toString()}`
        );
        return response;
      },
      "TireEventsService",
      "getAll",
      { params }
    );
  }
}
