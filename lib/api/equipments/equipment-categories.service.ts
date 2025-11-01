//filepath: sae-frontend/lib/api/equipments/equipment-categories.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { ApiResponse, PaginatedResponse } from "@/lib/types/api";
import { unwrap } from "@/lib/api/utils";
import {
  EquipmentCategory,
  CreateEquipmentCategoryDto,
  UpdateEquipmentCategoryDto,
} from "@/lib/types/equipment";

export class EquipmentCategoriesService {
  private static basePath = "/equipments/categories";

  static async getAll(params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<EquipmentCategory>> {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    const response = await ApiClient.get<PaginatedResponse<EquipmentCategory>>(
      `${this.basePath}${qs ? `?${qs}` : ""}`
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
