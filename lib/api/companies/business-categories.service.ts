// filepath: sae-frontend/lib/api/companies/business-categories.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { BusinessCategory } from "@/lib/types/domain/company";
import {
  BusinessCategoryFormData,
  UpdateBusinessCategoryFormData,
} from "@/lib/validations/company";

export class BusinessCategoriesService {
  private static basePath = "/companies/categories";

  static async getAll(query?: BaseQueryParams) {
    const url = QueryBuilder.buildUrl(this.basePath, query);
    const response = await ApiClient.get<PaginatedResponse<BusinessCategory>>(
      url
    );
    return response;
  }

  static async getById(id: number) {
    const response = await ApiClient.get<{ data: BusinessCategory }>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  static async create(data: BusinessCategoryFormData) {
    const response = await ApiClient.post<{ data: BusinessCategory }>(
      this.basePath,
      data
    );
    return response.data;
  }

  static async update(id: number, data: UpdateBusinessCategoryFormData) {
    const response = await ApiClient.put<{ data: BusinessCategory }>(
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
    const response = await ApiClient.put<{ data: BusinessCategory }>(
      `${this.basePath}/${id}/restore`,
      {}
    );
    return response.data;
  }

  // Backward compatibility methods
  static async getCategories(params?: BaseQueryParams) {
    return this.getAll(params);
  }

  static async getCategoryById(id: number) {
    return this.getById(id);
  }

  static async createCategory(data: BusinessCategoryFormData) {
    return this.create(data);
  }

  static async updateCategory(
    id: number,
    data: UpdateBusinessCategoryFormData
  ) {
    return this.update(id, data);
  }

  static async deleteCategory(id: number) {
    return this.delete(id);
  }

  static async restoreCategory(id: number) {
    return this.restore(id);
  }
}
