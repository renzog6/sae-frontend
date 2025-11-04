//filepath: sae-frontend/lib/api/equipments/equipments.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { ApiResponse, PaginatedResponse } from "@/lib/types/api";
import { unwrap, normalizeListResponse } from "@/lib/api/utils";
import {
  Equipment,
  CreateEquipmentDto,
  UpdateEquipmentDto,
} from "@/lib/types/equipment";

export class EquipmentsService {
  private static basePath = "/equipments";

  static async getAll(params?: {
    page?: number;
    limit?: number;
    typeId?: number;
    modelId?: number;
    categoryId?: number;
    year?: number;
    status?: string;
  }): Promise<PaginatedResponse<Equipment>> {
    const query = new URLSearchParams();
    if (params?.page !== undefined) query.set("page", String(params.page));
    if (params?.limit !== undefined) query.set("limit", String(params.limit));
    if (params?.typeId) query.set("typeId", String(params.typeId));
    if (params?.modelId) query.set("modelId", String(params.modelId));
    if (params?.categoryId) query.set("categoryId", String(params.categoryId));
    if (params?.year) query.set("year", String(params.year));
    if (params?.status) query.set("status", params.status);
    const qs = query.toString();

    const url = `${this.basePath}${qs ? `?${qs}` : ""}`;

    const response = await ApiClient.get<PaginatedResponse<Equipment>>(url);

    return response;
  }

  static async getById(id: number): Promise<Equipment> {
    const response = await ApiClient.get<Equipment | ApiResponse<Equipment>>(
      `${this.basePath}/${id}`
    );
    return unwrap<Equipment>(response);
  }

  static async create(dto: CreateEquipmentDto): Promise<Equipment> {
    const response = await ApiClient.post<Equipment | ApiResponse<Equipment>>(
      this.basePath,
      dto
    );
    return unwrap<Equipment>(response);
  }

  static async update(id: number, dto: UpdateEquipmentDto): Promise<Equipment> {
    const response = await ApiClient.patch<Equipment | ApiResponse<Equipment>>(
      `${this.basePath}/${id}`,
      dto
    );
    return unwrap<Equipment>(response);
  }

  static async delete(id: number): Promise<string> {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Equipment deleted";
  }
}
