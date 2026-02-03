// filepath: sae-frontend/lib/api/tires/tire-models.service.ts

import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";

import {
  TireModel,
  CreateTireModelDto,
  UpdateTireModelDto,
} from "@/lib/types/domain/tire";

import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";

// --------- Tipado para filtros ---------
export interface TireModelsQueryParams extends BaseQueryParams {
  brandId?: number;
}

class TireModelsServiceClass extends BaseApiService<
  TireModel,
  CreateTireModelDto,
  UpdateTireModelDto
> {
  protected basePath = "/tires/models";

  /**
   * Override parcial: agrego filtros custom (brandId)
   * pero con la misma estructura que EquipmentModels.
   */
  async getAll(
    filter?: TireModelsQueryParams
  ): Promise<PaginatedResponse<TireModel>> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const finalUrl = QueryBuilder.buildUrl(this.basePath, filter);
        return ApiClient.get<PaginatedResponse<TireModel>>(finalUrl);
      },
      this.constructor.name,
      "getAll",
      { filter }
    );
  }
}

export const TireModelsService = new TireModelsServiceClass();
