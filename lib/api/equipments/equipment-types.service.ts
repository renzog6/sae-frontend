// filepath: sae-frontend/lib/api/equipments/equipment-types.service.ts

import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { QueryBuilder } from "@/lib/api/queryBuilder";

import {
  EquipmentType,
  CreateEquipmentTypeDto,
  UpdateEquipmentTypeDto,
} from "@/lib/types/domain/equipment";

import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";

// Query params extendidos
export interface EquipmentTypesQueryParams extends BaseQueryParams {
  categoryId?: number;
}

class EquipmentTypesServiceClass extends BaseApiService<
  EquipmentType,
  CreateEquipmentTypeDto,
  UpdateEquipmentTypeDto
> {
  protected basePath = "/equipments/types";

  /**
   * Override: getAll con filtros extendidos
   */
  async getAll(
    filter?: EquipmentTypesQueryParams
  ): Promise<PaginatedResponse<EquipmentType>> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        // 1. Query paginada estándar
        const baseUrl = QueryBuilder.buildUrl(this.basePath, filter);

        // 2. Query específica
        const specificParams = {
          categoryId: filter?.categoryId,
        };
        const specificQuery = QueryBuilder.buildSpecific(specificParams);

        // 3. Combinación final
        const finalUrl = QueryBuilder.combineUrls(baseUrl, specificQuery);

        return ApiClient.get<PaginatedResponse<EquipmentType>>(finalUrl);
      },
      this.constructor.name,
      "getAll",
      { filter }
    );
  }

  /**
   * GET por categoría
   * GET /equipments/types/category/:categoryId
   */
  async getByCategory(categoryId: number): Promise<EquipmentType[]> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const url = `${this.basePath}/category/${categoryId}`;
        return ApiClient.get<EquipmentType[]>(url);
      },
      this.constructor.name,
      "getByCategory",
      { categoryId }
    );
  }

  /**
   * DELETE estándar SAE (void)
   * Override solo si querés comportamiento custom
   */
  async delete(id: number): Promise<void> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.basePath}/${id}`);
      },
      this.constructor.name,
      "delete",
      { id }
    );
  }
}

export const EquipmentTypesService = new EquipmentTypesServiceClass();
