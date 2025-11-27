//filepath: sae-frontend/lib/api/tires/tire-rotations.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/core/api";
import {
  TireRotation,
  CreateTireRotationDto,
  UpdateTireRotationDto,
} from "@/lib/types/domain/tire";

export class TireRotationsService {
  private static basePath = "/tires/rotations";

  static async getAll() {
    const response = await ApiClient.get<PaginatedResponse<TireRotation>>(
      this.basePath
    );
    return response;
  }

  static async getById(id: number) {
    const response = await ApiClient.get<TireRotation>(
      `${this.basePath}/${id}`
    );
    return response;
  }

  static async getByTire(tireId: number) {
    const response = await ApiClient.get<TireRotation[]>(
      `${this.basePath}/tire/${tireId}`
    );
    return response;
  }

  static async create(dto: CreateTireRotationDto) {
    const response = await ApiClient.post<TireRotation>(this.basePath, dto);
    return response;
  }

  static async update(id: number, dto: UpdateTireRotationDto) {
    const response = await ApiClient.put<TireRotation>(
      `${this.basePath}/${id}`,
      dto
    );
    return response;
  }

  static async delete(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Tire rotation deleted";
  }
}
