// filepath: sae-frontend/lib/api/tires/tire-events.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { createApiHooks } from "@/lib/hooks/createApiHooks";
import { TireEvent } from "@/lib/types/domain/tire";

// 🔹 Query params específicos de eventos
interface TireEventsQueryParams extends BaseQueryParams {
  eventType?: string;
  fromDate?: string;
  toDate?: string;
}

class TireEventsServiceClass extends BaseApiService<TireEvent, any, any> {
  protected basePath = "/tires/events";

  async getByTire(tireId: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        return ApiClient.get<TireEvent[]>(`${this.basePath}/tire/${tireId}`);
      },
      this.constructor.name,
      "getByTire",
      { tireId }
    );
  }

  async getAll(
    filter?: TireEventsQueryParams
  ): Promise<PaginatedResponse<TireEvent>> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const finalUrl = QueryBuilder.buildUrl(this.basePath, filter);
        return ApiClient.get<PaginatedResponse<TireEvent>>(finalUrl);
      },
      this.constructor.name,
      "getAll",
      { filter }
    );
  }
}

export const TireEventsService = new TireEventsServiceClass();

// Export hooks for consistent usage
export const {
  useGetAll: useTireEvents,
  useGetById: useTireEventById,
  useCreate: useCreateTireEvent,
  useUpdate: useUpdateTireEvent,
  useDelete: useDeleteTireEvent,
} = createApiHooks(TireEventsService, "tireEvents");
