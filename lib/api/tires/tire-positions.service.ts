// filepath: sae-frontend/lib/api/tires/tire-positions.service.ts

import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { PaginatedResponse, BaseQueryParams } from "@/lib/types/core/api";
import { TirePositionConfig } from "@/lib/types/domain/tire";

interface TirePositionQueryParams extends BaseQueryParams {
  axleId?: number;
}
class TirePositionsServiceClass extends BaseApiService<
  TirePositionConfig,
  {
    axleId: number;
    positionKey: string;
    side: string;
    isDual: boolean;
  },
  Partial<{
    axleId: number;
    positionKey: string;
    side: string;
    isDual: boolean;
  }>
> {
  protected basePath = "/tires/positions";

  /** GET ALL with optional axle filter */
  async getAll(
    filter?: TirePositionQueryParams
  ): Promise<PaginatedResponse<TirePositionConfig>> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const finalUrl = QueryBuilder.buildUrl(this.basePath, filter);
        return ApiClient.get<PaginatedResponse<TirePositionConfig>>(finalUrl);
      },
      this.constructor.name,
      "getAll",
      { filter }
    );
  }

  /** GET tire positions by equipment */
  async getByEquipment(equipmentId: number): Promise<TirePositionConfig[]> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        return ApiClient.get<TirePositionConfig[]>(
          `/equipment-axles/positions/equipment/${equipmentId}`
        );
      },
      this.constructor.name,
      "getByEquipment",
      { equipmentId }
    );
  }
}

export const TirePositionsService = new TirePositionsServiceClass();
