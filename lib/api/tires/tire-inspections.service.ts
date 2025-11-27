//filepath: sae-frontend/lib/api/tires/tire-inspections.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse, ApiResponse } from "@/lib/types/core/api";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  TireInspection,
  CreateTireInspectionDto,
  UpdateTireInspectionDto,
} from "@/lib/types/domain/tire";

export class TireInspectionsService {
  private static basePath = "/tires/inspections";

  static async getAll(params?: { page?: number; limit?: number; q?: string }) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.q) queryParams.append("q", params.q);

        const url = queryParams.toString()
          ? `${this.basePath}?${queryParams.toString()}`
          : this.basePath;

        const response = await ApiClient.get<PaginatedResponse<TireInspection>>(
          url
        );
        return response;
      },
      "TireInspectionsService",
      "getAll",
      { params }
    );
  }

  static async getById(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<TireInspection>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "TireInspectionsService",
      "getById",
      { id }
    );
  }

  static async getByTire(tireId: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<TireInspection[]>(
          `${this.basePath}/tire/${tireId}`
        );
        return response;
      },
      "TireInspectionsService",
      "getByTire",
      { tireId }
    );
  }

  static async create(dto: CreateTireInspectionDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<TireInspection>>(
          this.basePath,
          dto
        );
        return response.data;
      },
      "TireInspectionsService",
      "create",
      { dto }
    );
  }

  static async update(id: number, dto: UpdateTireInspectionDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<TireInspection>>(
          `${this.basePath}/${id}`,
          dto
        );
        return response.data;
      },
      "TireInspectionsService",
      "update",
      { id, dto }
    );
  }

  static async delete(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.basePath}/${id}`);
        return "Tire inspection deleted";
      },
      "TireInspectionsService",
      "delete",
      { id }
    );
  }
}
