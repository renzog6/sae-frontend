//filepath: sae-frontend/lib/api/equipments/equipment-types.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { ApiResponse } from "@/lib/types/api";
import { unwrap } from "@/lib/api/utils";
import {
  EquipmentType,
  CreateEquipmentTypeDto,
  UpdateEquipmentTypeDto,
} from "@/lib/types/equipment";

export class EquipmentTypesService {
  private static basePath = "/equipments/types";

  static async getAll(params?: {
    categoryId?: number;
    page?: number;
    limit?: number;
  }): Promise<EquipmentType[]> {
    const query = new URLSearchParams();
    if (params?.categoryId) query.set("categoryId", String(params.categoryId));
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    const response = await ApiClient.get<EquipmentType[]>(
      `${this.basePath}${qs ? `?${qs}` : ""}`
    );
    return response;
  }

  static async getById(id: number): Promise<EquipmentType> {
    const response = await ApiClient.get<EquipmentType>(
      `${this.basePath}/${id}`
    );
    return response;
  }

  static async create(dto: CreateEquipmentTypeDto): Promise<EquipmentType> {
    const response = await ApiClient.post<EquipmentType>(this.basePath, dto);
    return response;
  }

  static async update(
    id: number,
    dto: UpdateEquipmentTypeDto
  ): Promise<EquipmentType> {
    const response = await ApiClient.put<EquipmentType>(
      `${this.basePath}/${id}`,
      dto
    );
    return response;
  }

  static async delete(id: number): Promise<string> {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Type deleted";
  }

  static async getByCategory(categoryId: number): Promise<EquipmentType[]> {
    const response = await ApiClient.get<EquipmentType[]>(
      `${this.basePath}/category/${categoryId}`
    );
    return response;
  }
}
