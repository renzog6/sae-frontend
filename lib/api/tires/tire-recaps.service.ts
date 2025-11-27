//filepath: sae-frontend/lib/api/tires/tire-recaps.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse, ApiResponse } from "@/lib/types/core/api";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  TireRecap,
  CreateTireRecapDto,
  UpdateTireRecapDto,
} from "@/lib/types/domain/tire";

export class TireRecapsService {
  private static basePath = "/tires/recaps";

  static async getAll() {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<PaginatedResponse<TireRecap>>(
          this.basePath
        );
        return response;
      },
      "TireRecapsService",
      "getAll"
    );
  }

  static async getById(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<TireRecap>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "TireRecapsService",
      "getById",
      { id }
    );
  }

  static async getByTire(tireId: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<TireRecap[]>(
          `${this.basePath}/tire/${tireId}`
        );
        return response;
      },
      "TireRecapsService",
      "getByTire",
      { tireId }
    );
  }

  static async create(dto: CreateTireRecapDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<TireRecap>>(
          this.basePath,
          dto
        );
        return response.data;
      },
      "TireRecapsService",
      "create",
      { dto }
    );
  }

  static async update(id: number, dto: UpdateTireRecapDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<TireRecap>>(
          `${this.basePath}/${id}`,
          dto
        );
        return response.data;
      },
      "TireRecapsService",
      "update",
      { id, dto }
    );
  }

  static async delete(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.basePath}/${id}`);
        return "Tire recap deleted";
      },
      "TireRecapsService",
      "delete",
      { id }
    );
  }
}
