//filepath: sae-frontend/lib/api/equipments/equipment-models.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { ApiResponse, PaginatedResponse } from "@/lib/types/api";
import { unwrap } from "@/lib/api/utils";
import {
  EquipmentModel,
  CreateEquipmentModelDto,
  UpdateEquipmentModelDto,
} from "@/lib/types/equipment";

export class EquipmentModelsService {
  private static basePath = "/equipments/models";

  static async getAll(params?: {
    typeId?: number;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<EquipmentModel>> {
    const query = new URLSearchParams();
    if (params?.typeId) query.set("typeId", String(params.typeId));
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    const response = await ApiClient.get<PaginatedResponse<EquipmentModel>>(
      `${this.basePath}${qs ? `?${qs}` : ""}`
    );
    return response;
  }

  static async getById(id: number): Promise<EquipmentModel> {
    const response = await ApiClient.get<EquipmentModel>(
      `${this.basePath}/${id}`
    );
    return response;
  }

  static async create(dto: CreateEquipmentModelDto): Promise<EquipmentModel> {
    const response = await ApiClient.post<EquipmentModel>(this.basePath, dto);
    return response;
  }

  static async update(
    id: number,
    dto: UpdateEquipmentModelDto
  ): Promise<EquipmentModel> {
    const response = await ApiClient.put<EquipmentModel>(
      `${this.basePath}/${id}`,
      dto
    );
    return response;
  }

  static async delete(id: number): Promise<string> {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Model deleted";
  }

  static async getByType(typeId: number): Promise<EquipmentModel[]> {
    const response = await ApiClient.get<EquipmentModel[]>(
      `${this.basePath}/type/${typeId}`
    );
    return response;
  }
}
