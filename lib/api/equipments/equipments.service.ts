//filepath: sae-frontend/lib/api/equipments/equipments.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  Equipment,
  CreateEquipmentDto,
  UpdateEquipmentDto,
} from "@/lib/types/domain/equipment";

export class EquipmentsService {
  private static basePath = "/equipments";

  static async getAll(query?: BaseQueryParams) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const url = QueryBuilder.buildUrl(this.basePath, query);
        const response = await ApiClient.get<PaginatedResponse<Equipment>>(url);
        return response;
      },
      "EquipmentsService",
      "getAll",
      { query }
    );
  }

  static async getById(id: number): Promise<Equipment> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<Equipment>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "EquipmentsService",
      "getById",
      { id }
    );
  }

  static async create(dto: CreateEquipmentDto): Promise<Equipment> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<Equipment>>(
          this.basePath,
          dto
        );
        return response.data;
      },
      "EquipmentsService",
      "create",
      { dto }
    );
  }

  static async update(id: number, dto: UpdateEquipmentDto): Promise<Equipment> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<Equipment>>(
          `${this.basePath}/${id}`,
          dto
        );
        return response.data;
      },
      "EquipmentsService",
      "update",
      { id, dto }
    );
  }

  static async delete(id: number): Promise<string> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.basePath}/${id}`);
        return "Equipment deleted";
      },
      "EquipmentsService",
      "delete",
      { id }
    );
  }
}
