//filepath: sae-frontend/lib/api/tires/tire-models.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse, ApiResponse } from "@/lib/types/core/api";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  TireModel,
  CreateTireModelDto,
  UpdateTireModelDto,
} from "@/lib/types/domain/tire";

export class TireModelsService {
  private static basePath = "/tires/models";

  static async getAll(
    params: { page?: number; limit?: number; brandId?: number } = {}
  ) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const query = new URLSearchParams();
        if (params.page) query.append("page", params.page.toString());
        if (params.limit) query.append("limit", params.limit.toString());
        if (params.brandId) query.append("brandId", params.brandId.toString());

        const response = await ApiClient.get<PaginatedResponse<TireModel>>(
          `${this.basePath}?${query.toString()}`
        );
        return response;
      },
      "TireModelsService",
      "getAll",
      { params }
    );
  }

  static async getById(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<TireModel>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "TireModelsService",
      "getById",
      { id }
    );
  }

  static async create(dto: CreateTireModelDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<TireModel>>(
          this.basePath,
          dto
        );
        return response.data;
      },
      "TireModelsService",
      "create",
      { dto }
    );
  }

  static async update(id: number, dto: UpdateTireModelDto) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<TireModel>>(
          `${this.basePath}/${id}`,
          dto
        );
        return response.data;
      },
      "TireModelsService",
      "update",
      { id, dto }
    );
  }

  static async delete(id: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.basePath}/${id}`);
        return "Tire model deleted";
      },
      "TireModelsService",
      "delete",
      { id }
    );
  }
}
