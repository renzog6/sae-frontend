// filepath: sae-frontend/lib/api/equipments/equipment-models.service.ts

import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { QueryBuilder } from "@/lib/api/queryBuilder";

import {
  EquipmentModel,
  CreateEquipmentModelDto,
  UpdateEquipmentModelDto,
} from "@/lib/types/domain/equipment";

import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";

// Query params extendidos
export interface EquipmentModelsQueryParams extends BaseQueryParams {
  typeId?: number;
}

class EquipmentModelsServiceClass extends BaseApiService<
  EquipmentModel,
  CreateEquipmentModelDto,
  UpdateEquipmentModelDto
> {
  protected basePath = "/equipment-models";

  /**
   * Override: getAll con filtros extendidos
   */
  async getAll(
    filter?: EquipmentModelsQueryParams
  ): Promise<PaginatedResponse<EquipmentModel>> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        // 1. Query paginada estándar
        const baseUrl = QueryBuilder.buildUrl(this.basePath, filter);

        // 2. Query específica (filtro por typeId)
        const specificParams = {
          typeId: filter?.typeId,
        };
        const specificQuery = QueryBuilder.buildSpecific(specificParams);

        // 3. Combinación final
        const finalUrl = QueryBuilder.combineUrls(baseUrl, specificQuery);

        return ApiClient.get<PaginatedResponse<EquipmentModel>>(finalUrl);
      },
      this.constructor.name,
      "getAll",
      { filter }
    );
  }

  /**
   * GET por tipo
   * GET /equipments/models/type/:typeId
   */
  async getByType(typeId: number): Promise<EquipmentModel[]> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const url = `${this.basePath}/by-type/${typeId}`;
        return ApiClient.get<EquipmentModel[]>(url);
      },
      this.constructor.name,
      "getByType",
      { typeId }
    );
  }
}

export const EquipmentModelsService = new EquipmentModelsServiceClass();
