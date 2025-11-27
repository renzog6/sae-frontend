//filepath: sae-frontend/lib/api/equipments/equipment-categories.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import {
  EquipmentCategory,
  CreateEquipmentCategoryDto,
  UpdateEquipmentCategoryDto,
} from "@/lib/types/domain/equipment";

export class EquipmentCategoriesService {
  private static basePath = "/equipments/categories";

  static async getAll(query?: BaseQueryParams) {
    const url = QueryBuilder.buildUrl(this.basePath, query);
    const response = await ApiClient.get<PaginatedResponse<EquipmentCategory>>(
      url
    );
    return response;
  }

  static async create(
    dto: CreateEquipmentCategoryDto
  ): Promise<EquipmentCategory> {
    const response = await ApiClient.post<EquipmentCategory>(
      this.basePath,
      dto
    );
    return response;
  }

  static async update(
    id: number,
    dto: UpdateEquipmentCategoryDto
  ): Promise<EquipmentCategory> {
    const response = await ApiClient.put<EquipmentCategory>(
      `${this.basePath}/${id}`,
      dto
    );
    return response;
  }

  static async delete(id: number): Promise<string> {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Category deleted";
  }
}
