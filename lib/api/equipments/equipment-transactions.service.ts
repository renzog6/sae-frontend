// filepath: sae-frontend/lib/api/equipments/equipment-transactions.service.ts

import {
  EquipmentTransaction,
  CreateEquipmentTransactionDto,
  EquipmentTransactionQueryDto,
  EquipmentTransactionSummary,
} from "@/lib/types";
import { BaseApiService } from "../base-api.service";
import { BaseQueryParams } from "@/lib/types/core/api";
import { QueryBuilder } from "../queryBuilder";
import { ApiClient } from "../apiClient";

export class EquipmentTransactionsService extends BaseApiService<
  EquipmentTransaction,
  CreateEquipmentTransactionDto
> {
  protected readonly basePath = "/equipment-transactions";

  async findByEquipment(equipmentId: number): Promise<EquipmentTransaction[]> {
    return ApiClient.get<EquipmentTransaction[]>(
      `${this.basePath}/by-equipment/${equipmentId}`
    );
  }

  async findAll(
    query?: EquipmentTransactionQueryDto
  ): Promise<import("@/lib/types/core/api").PaginatedResponse<EquipmentTransaction>> {
    const queryString = QueryBuilder.buildUrl(
      this.basePath,
      query as BaseQueryParams
    );
    return ApiClient.get<
      import("@/lib/types/core/api").PaginatedResponse<EquipmentTransaction>
    >(queryString);
  }

  async getSummary(equipmentId?: number): Promise<EquipmentTransactionSummary> {
    const path = equipmentId
      ? `${this.basePath}/summary?equipmentId=${equipmentId}`
      : `${this.basePath}/summary`;
    return ApiClient.get<EquipmentTransactionSummary>(path);
  }
}
