//filepath: sae-frontend/lib/api/tires/tires.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import { Tire, CreateTireDto, UpdateTireDto } from "@/lib/types/tire";

export class TiresService {
  private static basePath = "/tires";

  static async getAll(
    params: {
      page?: number;
      limit?: number;
      status?: string;
      brandId?: number;
    } = {}
  ) {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());
    if (params.status) query.append("status", params.status);
    if (params.brandId) query.append("brandId", params.brandId.toString());

    const response = await ApiClient.get<PaginatedResponse<Tire>>(
      `${this.basePath}?${query.toString()}`
    );
    return response;
  }

  static async getById(id: number) {
    const response = await ApiClient.get<Tire>(`${this.basePath}/${id}`);
    return response;
  }

  static async create(dto: CreateTireDto) {
    const response = await ApiClient.post<Tire>(this.basePath, dto);
    return response;
  }

  static async update(id: number, dto: UpdateTireDto) {
    const response = await ApiClient.put<Tire>(`${this.basePath}/${id}`, dto);
    return response;
  }

  static async delete(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Tire deleted";
  }
}
