//filepath: sae-frontend/lib/api/equipments/equipments.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import {
  Equipment,
  CreateEquipmentDto,
  UpdateEquipmentDto,
} from "@/lib/types/domain/equipment";

export class EquipmentsService {
  private static basePath = "/equipments";

  static async getAll(query?: BaseQueryParams) {
    const url = QueryBuilder.buildUrl(this.basePath, query);
    const response = await ApiClient.get<PaginatedResponse<Equipment>>(url);
    return response;
  }

  static async getById(id: number): Promise<Equipment> {
    const response = await ApiClient.get<Equipment>(`${this.basePath}/${id}`);
    return response;
  }

  static async create(dto: CreateEquipmentDto): Promise<Equipment> {
    const response = await ApiClient.post<{ data: Equipment }>(
      this.basePath,
      dto
    );
    return response.data;
  }

  static async update(id: number, dto: UpdateEquipmentDto): Promise<Equipment> {
    const response = await ApiClient.put<{ data: Equipment }>(
      `${this.basePath}/${id}`,
      dto
    );
    return response.data;
  }

  static async delete(id: number): Promise<string> {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Equipment deleted";
  }
}
