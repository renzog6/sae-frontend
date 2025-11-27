//filepath: sae-frontend/lib/api/tires/tire-rotations.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse, ApiResponse } from "@/lib/types/core/api";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  TireRotation,
  CreateTireRotationDto,
  UpdateTireRotationDto,
} from "@/lib/types/domain/tire";

export class TireRotationsService {
  private static basePath = "/tires/rotations";

  static async getAll() {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<PaginatedResponse<TireRotation>>(
          this.basePath
        );
        return response;
      },
      "TireRotationsService",
      "getAll"
    );
  }

  static async getById(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<TireRotation>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "TireRotationsService",
      "getById",
      { id }
    );
  }

  static async getByTire(tireId: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<TireRotation[]>(
          `${this.basePath}/tire/${tireId}`
        );
        return response;
      },
      "TireRotationsService",
      "getByTire",
      { tireId }
    );
  }

  static async create(dto: CreateTireRotationDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<TireRotation>>(
          this.basePath,
          dto
        );
        return response.data;
      },
      "TireRotationsService",
      "create",
      { dto }
    );
  }

  static async update(id: number, dto: UpdateTireRotationDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<TireRotation>>(
          `${this.basePath}/${id}`,
          dto
        );
        return response.data;
      },
      "TireRotationsService",
      "update",
      { id, dto }
    );
  }

  static async delete(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.basePath}/${id}`);
        return "Tire rotation deleted";
      },
      "TireRotationsService",
      "delete",
      { id }
    );
  }
}
