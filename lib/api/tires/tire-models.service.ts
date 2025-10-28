//filepath: sae-frontend/lib/api/tires/tire-models.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import {
  TireModel,
  CreateTireModelDto,
  UpdateTireModelDto,
} from "@/lib/types/tire";

export class TireModelsService {
  private static basePath = "/tires/models";

  static async getAll(
    params: { page?: number; limit?: number; brandId?: number } = {}
  ) {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());
    if (params.brandId) query.append("brandId", params.brandId.toString());

    const response = await ApiClient.get<PaginatedResponse<TireModel>>(
      `${this.basePath}?${query.toString()}`
    );
    return response;
  }

  static async getById(id: number) {
    const response = await ApiClient.get<TireModel>(`${this.basePath}/${id}`);
    return response;
  }

  static async create(dto: CreateTireModelDto) {
    const response = await ApiClient.post<TireModel>(this.basePath, dto);
    return response;
  }

  static async update(id: number, dto: UpdateTireModelDto) {
    const response = await ApiClient.put<TireModel>(
      `${this.basePath}/${id}`,
      dto
    );
    return response;
  }

  static async delete(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Tire model deleted";
  }
}
