// filepath: sae-frontend/lib/api/tires/tire-inspections.service.ts

import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";

import {
  TireInspection,
  CreateTireInspectionDto,
  UpdateTireInspectionDto,
} from "@/lib/types/domain/tire";

import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";

// ======================
// Filtros específicos para inspecciones
// ======================
export interface TireInspectionsQueryParams extends BaseQueryParams {
  tireId?: number; // opcional si quieras buscar por neumático
}

class TireInspectionsServiceClass extends BaseApiService<
  TireInspection,
  CreateTireInspectionDto,
  UpdateTireInspectionDto
> {
  protected basePath = "/tires/inspections";

  /**
   * GET paginado + filtro por búsqueda (q)
   */
  async getAll(
    filter?: TireInspectionsQueryParams
  ): Promise<PaginatedResponse<TireInspection>> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        // 1) URL base (page, limit, search...)
        const baseUrl = QueryBuilder.buildUrl(this.basePath, filter);

        // 2) filtros custom
        const specificParams = {
          tireId: filter?.tireId,
        };
        const specificQuery = QueryBuilder.buildSpecific(specificParams);

        // 3) URL final combinada
        const finalUrl = QueryBuilder.combineUrls(baseUrl, specificQuery);

        return ApiClient.get<PaginatedResponse<TireInspection>>(finalUrl);
      },
      this.constructor.name,
      "getAll",
      { filter }
    );
  }

  /**
   * GET todas las inspecciones de un neumático
   */
  async getByTire(tireId: number): Promise<TireInspection[]> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        return ApiClient.get<TireInspection[]>(
          `${this.basePath}/tire/${tireId}`
        );
      },
      this.constructor.name,
      "getByTire",
      { tireId }
    );
  }
}

export const TireInspectionsService = new TireInspectionsServiceClass();
