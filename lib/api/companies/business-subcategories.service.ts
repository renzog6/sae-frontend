// filepath: sae-frontend/lib/api/companies/business-subcategories.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { BusinessSubCategory } from "@/lib/types/domain/company";
import {
  BusinessSubcategoryFormData,
  UpdateBusinessSubcategoryFormData,
} from "@/lib/validations/company";

export class BusinessSubCategoriesService {
  private static basePath = "/companies/subcategories";

  static async getAll(query?: BaseQueryParams) {
    const url = QueryBuilder.buildUrl(this.basePath, query);
    const response = await ApiClient.get<
      PaginatedResponse<BusinessSubCategory>
    >(url);
    return response;
  }

  static async getById(id: number) {
    const response = await ApiClient.get<{ data: BusinessSubCategory }>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  static async create(data: BusinessSubcategoryFormData) {
    const response = await ApiClient.post<{ data: BusinessSubCategory }>(
      this.basePath,
      data
    );
    return response.data;
  }

  static async update(id: number, data: UpdateBusinessSubcategoryFormData) {
    const response = await ApiClient.put<{ data: BusinessSubCategory }>(
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
    const response = await ApiClient.put<{ data: BusinessSubCategory }>(
      `${this.basePath}/${id}/restore`,
      {}
    );
    return response.data;
  }
}
