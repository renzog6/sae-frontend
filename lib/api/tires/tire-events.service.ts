//filepath: sae-frontend/lib/api/tires/tire-events.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import { TireEvent } from "@/lib/types/tire";

export class TireEventsService {
  private static basePath = "/tires/events";

  static async getByTire(tireId: number) {
    const response = await ApiClient.get<TireEvent[]>(
      `${this.basePath}/tire/${tireId}`
    );
    return response;
  }

  static async getAll(
    params: { eventType?: string; fromDate?: string; toDate?: string } = {}
  ) {
    const query = new URLSearchParams();
    if (params.eventType) query.append("eventType", params.eventType);
    if (params.fromDate) query.append("fromDate", params.fromDate);
    if (params.toDate) query.append("toDate", params.toDate);

    const response = await ApiClient.get<PaginatedResponse<TireEvent>>(
      `${this.basePath}?${query.toString()}`
    );
    return response;
  }
}
