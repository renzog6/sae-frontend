// filepath: sae-frontend/lib/api/tires/tires.service.ts

import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";

import { Tire, CreateTireDto, UpdateTireDto } from "@/lib/types/domain/tire";

// Filtros específicos para listar neumáticos
export interface TiresQueryParams extends BaseQueryParams {
  brandId?: number;
  status?: string;
  q?: string;
}

class TiresServiceClass extends BaseApiService<
  Tire,
  CreateTireDto,
  UpdateTireDto
> {
  protected basePath = "/tires";

  async getAll(filter?: TiresQueryParams): Promise<PaginatedResponse<Tire>> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const finalUrl = QueryBuilder.buildUrl(this.basePath, filter);
        return ApiClient.get<PaginatedResponse<Tire>>(finalUrl);
      },
      this.constructor.name,
      "getAll",
      { filter }
    );
  }
}

export const TiresService = new TiresServiceClass();
