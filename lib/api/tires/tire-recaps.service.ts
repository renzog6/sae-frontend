//filepath: sae-frontend/lib/api/tires/tire-recaps.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import {
  TireRecap,
  CreateTireRecapDto,
  UpdateTireRecapDto,
} from "@/lib/types/tire";

export class TireRecapsService {
  private static basePath = "/tires/recaps";

  static async getAll() {
    const response = await ApiClient.get<PaginatedResponse<TireRecap>>(
      this.basePath
    );
    return response;
  }

  static async getById(id: number) {
    const response = await ApiClient.get<TireRecap>(`${this.basePath}/${id}`);
    return response;
  }

  static async getByTire(tireId: number) {
    const response = await ApiClient.get<TireRecap[]>(
      `${this.basePath}/tire/${tireId}`
    );
    return response;
  }

  static async create(dto: CreateTireRecapDto) {
    const response = await ApiClient.post<TireRecap>(this.basePath, dto);
    return response;
  }

  static async update(id: number, dto: UpdateTireRecapDto) {
    const response = await ApiClient.put<TireRecap>(
      `${this.basePath}/${id}`,
      dto
    );
    return response;
  }

  static async delete(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Tire recap deleted";
  }
}
