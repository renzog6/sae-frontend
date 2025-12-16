// filepath: sae-frontend/lib/api/equipments/equipment-axles.service.ts

import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";

import {
  EquipmentAxle,
  CreateEquipmentAxleDto,
  UpdateEquipmentAxleDto,
  CreateAxleWithPositionsDto,
} from "@/lib/types/domain/equipment";

import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";

interface EquipmentAxlesQueryParams extends BaseQueryParams {
  equipmentId?: number;
}

class EquipmentAxlesServiceClass extends BaseApiService<
  EquipmentAxle,
  CreateEquipmentAxleDto,
  UpdateEquipmentAxleDto
> {
  protected basePath = "/equipment-axles";

  // GET ALL (override con filtros específicos)
  async getAll(
    filter?: EquipmentAxlesQueryParams
  ): Promise<PaginatedResponse<EquipmentAxle>> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const baseUrl = QueryBuilder.buildUrl(this.basePath, filter);

        const specificQuery = QueryBuilder.buildSpecific({
          equipmentId: filter?.equipmentId,
        });

        const finalUrl = QueryBuilder.combineUrls(baseUrl, specificQuery);

        return ApiClient.get<PaginatedResponse<EquipmentAxle>>(finalUrl);
      },
      this.constructor.name,
      "getAll",
      { filter }
    );
  }

  // POST /with-positions
  async createWithPositions(data: CreateAxleWithPositionsDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const res = await ApiClient.post<{ data: any }>(
          `${this.basePath}/with-positions`,
          data
        );
        return res.data;
      },
      this.constructor.name,
      "createWithPositions",
      { data }
    );
  }

  // GET positions by equipment
  async getPositionsByEquipment(equipmentId: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const res = await ApiClient.get<{ data: any }>(
          `${this.basePath}/positions/equipment/${equipmentId}`
        );
        return res.data;
      },
      this.constructor.name,
      "getPositionsByEquipment",
      { equipmentId }
    );
  }
}

export const EquipmentAxlesService = new EquipmentAxlesServiceClass();
