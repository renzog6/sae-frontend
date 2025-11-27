//filepath: sae-frontend/lib/api/tires/tire-events.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/core/api";
import { TireEvent } from "@/lib/types/domain/tire";

export class TireEventsService {
  private static basePath = "/tires/events";

  static async getByTire(tireId: number) {
    const response = await ApiClient.get<TireEvent[]>(
      `${this.basePath}/tire/${tireId}`
    );
    return response;
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
  }
}
