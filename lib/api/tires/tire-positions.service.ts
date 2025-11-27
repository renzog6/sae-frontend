//filepath: sae-frontend/lib/api/tires/tire-positions.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/core/api";
import { TirePositionConfig } from "@/lib/types/domain/tire";

// ===== TIRE POSITION =====

export class TirePositionsService {
  private static basePath = "/tires/positions";

  static async getAll(params: { axleId?: number } = {}) {
    const query = new URLSearchParams();
    if (params.axleId) query.append("axleId", params.axleId.toString());

    const response = await ApiClient.get<PaginatedResponse<TirePositionConfig>>(
      `${this.basePath}?${query.toString()}`
    );
    return response;
  }

  static async getByEquipment(equipmentId: number) {
    const response = await ApiClient.get<TirePositionConfig[]>(
      `/equipments/axles/positions/equipment/${equipmentId}`
    );
    return response;
  }

  static async getById(id: number) {
    const response = await ApiClient.get<TirePositionConfig>(
      `${this.basePath}/${id}`
    );
    return response;
  }

  static async create(dto: {
    axleId: number;
    positionKey: string;
    side: string;
    isDual: boolean;
  }) {
    const response = await ApiClient.post<TirePositionConfig>(
      this.basePath,
      dto
    );
    return response;
  }

  static async update(
    id: number,
    dto: Partial<{
      axleId: number;
      positionKey: string;
      side: string;
      isDual: boolean;
    }>
  ) {
    const response = await ApiClient.put<TirePositionConfig>(
      `${this.basePath}/${id}`,
      dto
    );
    return response;
  }

  static async delete(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Tire position config deleted";
  }
}

// ===== TIRE POSITION CONFIGS =====

export class TirePositionConfigsService {
  private static basePath = "/tires/positions";

  static async getAll(params: { axleId?: number } = {}) {
    const query = new URLSearchParams();
    if (params.axleId) query.append("axleId", params.axleId.toString());

    const response = await ApiClient.get<PaginatedResponse<TirePositionConfig>>(
      `${this.basePath}?${query.toString()}`
    );
    return response;
  }

  static async getByEquipment(equipmentId: number) {
    const response = await ApiClient.get<TirePositionConfig[]>(
      `/equipments/axles/positions/equipment/${equipmentId}`
    );
    return response;
  }

  static async getById(id: number) {
    const response = await ApiClient.get<TirePositionConfig>(
      `${this.basePath}/${id}`
    );
    return response;
  }

  static async create(dto: {
    axleId: number;
    positionKey: string;
    side: string;
    isDual: boolean;
  }) {
    const response = await ApiClient.post<TirePositionConfig>(
      this.basePath,
      dto
    );
    return response;
  }

  static async update(
    id: number,
    dto: Partial<{
      axleId: number;
      positionKey: string;
      side: string;
      isDual: boolean;
    }>
  ) {
    const response = await ApiClient.put<TirePositionConfig>(
      `${this.basePath}/${id}`,
      dto
    );
    return response;
  }

  static async delete(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Tire position config deleted";
  }
}
