//filepath: sae-frontend/lib/api/tires/tire-inspections.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import {
  TireInspection,
  CreateTireInspectionDto,
  UpdateTireInspectionDto,
} from "@/lib/types/tire";

export class TireInspectionsService {
  private static basePath = "/tires/inspections";

  static async getAll() {
    const response = await ApiClient.get<PaginatedResponse<TireInspection>>(
      this.basePath
    );
    return response;
  }

  static async getById(id: number) {
    const response = await ApiClient.get<TireInspection>(
      `${this.basePath}/${id}`
    );
    return response;
  }

  static async getByTire(tireId: number) {
    const response = await ApiClient.get<TireInspection[]>(
      `${this.basePath}/tire/${tireId}`
    );
    return response;
  }

  static async create(dto: CreateTireInspectionDto) {
    const response = await ApiClient.post<TireInspection>(this.basePath, dto);
    return response;
  }

  static async update(id: number, dto: UpdateTireInspectionDto) {
    const response = await ApiClient.put<TireInspection>(
      `${this.basePath}/${id}`,
      dto
    );
    return response;
  }

  static async delete(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Tire inspection deleted";
  }
}
