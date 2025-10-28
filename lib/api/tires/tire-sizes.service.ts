//filepath: sae-frontend/lib/api/tires/tire-sizes.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import { unwrap } from "@/lib/api/utils";
import {
  TireSize,
  CreateTireSizeDto,
  UpdateTireSizeDto,
  TireSizeAlias,
  CreateTireSizeAliasDto,
  UpdateTireSizeAliasDto,
} from "@/lib/types/tire";

// ===== TIRE SIZE =====
export class TireSizesService {
  private static basePath = "/tires/sizes";

  static async getAll(
    params: { page?: number; limit?: number; query?: string } = {}
  ) {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());
    if (params.query) query.append("query", params.query);

    const response = await ApiClient.get<PaginatedResponse<TireSize>>(
      `${this.basePath}?${query.toString()}`
    );
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
    return unwrap<TireSizeAlias[] | PaginatedResponse<TireSizeAlias>>(response);
  }

  static async create(dto: CreateTireSizeAliasDto) {
    const response = await ApiClient.post<TireSizeAlias>(this.basePath, dto);
    return unwrap<TireSizeAlias>(response);
  }

  static async update(id: number, dto: UpdateTireSizeAliasDto) {
    const response = await ApiClient.put<TireSizeAlias>(
      `${this.basePath}/${id}`,
      dto
    );
    return unwrap<TireSizeAlias>(response);
  }

  static async delete(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Tire size alias deleted";
  }
}
