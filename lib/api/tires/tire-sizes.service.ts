//filepath: sae-frontend/lib/api/tires/tire-sizes.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import {
  TireSize,
  CreateTireSizeDto,
  UpdateTireSizeDto,
  TireSizeAlias,
  CreateTireSizeAliasDto,
  UpdateTireSizeAliasDto,
} from "@/lib/types/domain/tire";

// ===== TIRE SIZE =====
export class TireSizesService {
  private static basePath = "/tires/sizes";

  static async getAll(query?: BaseQueryParams) {
    const url = QueryBuilder.buildUrl(this.basePath, query);
    const response = await ApiClient.get<PaginatedResponse<TireSize>>(url);
    return response;
  }

  static async getById(id: number) {
    const response = await ApiClient.get<TireSize>(`${this.basePath}/${id}`);
    return response;
  }

  static async create(dto: CreateTireSizeDto) {
    const response = await ApiClient.post<TireSize>(this.basePath, dto);
    return response;
  }

  static async update(id: number, dto: UpdateTireSizeDto) {
    const response = await ApiClient.put<TireSize>(
      `${this.basePath}/${id}`,
      dto
    );
    return response;
  }

  static async delete(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Tire size deleted";
  }
}

// ===== TIRE SIZE ALIASES =====
export class TireSizeAliasesService {
  private static basePath = "/tires/size-aliases";

  static async getBySize(sizeId: number) {
    const response = await ApiClient.get<
      TireSizeAlias[] | PaginatedResponse<TireSizeAlias>
    >(`/tires/sizes/${sizeId}/aliases`);
    if (response && typeof response === "object" && "data" in response) {
      return response.data;
    }
    return response;
  }

  static async create(dto: CreateTireSizeAliasDto) {
    const response = await ApiClient.post<{ data: TireSizeAlias }>(
      this.basePath,
      dto
    );
    return response.data;
  }

  static async update(id: number, dto: UpdateTireSizeAliasDto) {
    const response = await ApiClient.put<{ data: TireSizeAlias }>(
      `${this.basePath}/${id}`,
      dto
    );
    return response.data;
  }

  static async delete(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Tire size alias deleted";
  }
}
