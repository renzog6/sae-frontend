//filepath: sae-frontend/lib/api/tires/tire-positions.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse, ApiResponse } from "@/lib/types/core/api";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { TirePositionConfig } from "@/lib/types/domain/tire";

// ===== TIRE POSITION =====

export class TirePositionsService {
  private static basePath = "/tires/positions";

  static async getAll(params: { axleId?: number } = {}) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const query = new URLSearchParams();
        if (params.axleId) query.append("axleId", params.axleId.toString());

        const response = await ApiClient.get<
          PaginatedResponse<TirePositionConfig>
        >(`${this.basePath}?${query.toString()}`);
        return response;
      },
      "TirePositionConfigsService",
      "getAll",
      { params }
    );
  }

  static async getByEquipment(equipmentId: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<TirePositionConfig[]>(
          `/equipments/axles/positions/equipment/${equipmentId}`
        );
        return response;
      },
      "TirePositionConfigsService",
      "getByEquipment",
      { equipmentId }
    );
  }

  static async getById(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<TirePositionConfig>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "TirePositionConfigsService",
      "getById",
      { id }
    );
  }

  static async create(dto: {
    axleId: number;
    positionKey: string;
    side: string;
    isDual: boolean;
  }) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<TirePositionConfig>>(
          this.basePath,
          dto
        );
        return response.data;
      },
      "TirePositionConfigsService",
      "create",
      { dto }
    );
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
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<TirePositionConfig>>(
          `${this.basePath}/${id}`,
          dto
        );
        return response.data;
      },
      "TirePositionConfigsService",
      "update",
      { id, dto }
    );
  }

  static async delete(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.basePath}/${id}`);
        return "Tire position config deleted";
      },
      "TirePositionConfigsService",
      "delete",
      { id }
    );
  }
}

// ===== TIRE POSITION CONFIGS =====

export class TirePositionConfigsService {
  private static basePath = "/tires/positions";

  static async getAll(params: { axleId?: number } = {}) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const query = new URLSearchParams();
        if (params.axleId) query.append("axleId", params.axleId.toString());

        const response = await ApiClient.get<
          PaginatedResponse<TirePositionConfig>
        >(`${this.basePath}?${query.toString()}`);
        return response;
      },
      "TirePositionsService",
      "getAll",
      { params }
    );
  }

  static async getByEquipment(equipmentId: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<TirePositionConfig[]>(
          `/equipments/axles/positions/equipment/${equipmentId}`
        );
        return response;
      },
      "TirePositionsService",
      "getByEquipment",
      { equipmentId }
    );
  }

  static async getById(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<TirePositionConfig>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "TirePositionsService",
      "getById",
      { id }
    );
  }

  static async create(dto: {
    axleId: number;
    positionKey: string;
    side: string;
    isDual: boolean;
  }) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<TirePositionConfig>>(
          this.basePath,
          dto
        );
        return response.data;
      },
      "TirePositionsService",
      "create",
      { dto }
    );
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
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<TirePositionConfig>>(
          `${this.basePath}/${id}`,
          dto
        );
        return response.data;
      },
      "TirePositionsService",
      "update",
      { id, dto }
    );
  }

  static async delete(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.basePath}/${id}`);
        return "Tire position config deleted";
      },
      "TirePositionsService",
      "delete",
      { id }
    );
  }
}
