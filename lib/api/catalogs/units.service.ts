// filepath: sae-frontend/lib/api/catalogs/units.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { Unit } from "@/lib/types/shared/catalogs";
import { UnitFormData, UpdateUnitFormData } from "@/lib/validations/catalog";

export class UnitsService {
  private static basePath = "/units";

  static async getAll(query?: BaseQueryParams) {
    const url = QueryBuilder.buildUrl(this.basePath, query);
    const response = await ApiClient.get<PaginatedResponse<Unit>>(url);
    return response;
  }

  static async getById(id: number) {
    const response = await ApiClient.get<{ data: Unit }>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  static async create(data: UnitFormData) {
    const response = await ApiClient.post<{ data: Unit }>(this.basePath, data);
    return response.data;
  }

  static async update(id: number, data: UpdateUnitFormData) {
    const response = await ApiClient.put<{ data: Unit }>(
      `${this.basePath}/${id}`,
      data
    );
    return response.data;
  }

  static async delete(id: number) {
    const response = await ApiClient.delete<{ data: string }>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  static async restore(id: number) {
    const response = await ApiClient.put<{ data: Unit }>(
      `${this.basePath}/${id}/restore`,
      {}
    );
    return response.data;
  }
}
