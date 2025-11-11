// filepath: sae-frontend/lib/api/companies/business-categories.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import { BusinessCategory } from "@/lib/types/company";
import {
  BusinessCategoryQueryParams,
  CreateBusinessCategoryDto,
  UpdateBusinessCategoryDto,
} from "@/lib/types/company";

export class BusinessCategoriesService {
  private static basePath = "/companies/categories";

  static async getAll(query?: BusinessCategoryQueryParams) {
    if (query) {
      const params = new URLSearchParams();
      if (query.page) params.append("page", query.page.toString());
      if (query.limit) params.append("limit", query.limit.toString());
      if (query.q) params.append("q", query.q);
      if (query.sortBy) params.append("sortBy", query.sortBy);
      if (query.sortOrder) params.append("sortOrder", query.sortOrder);

      const queryString = params.toString();
      const url = queryString
        ? `${this.basePath}?${queryString}`
        : this.basePath;
      const response = await ApiClient.get<PaginatedResponse<BusinessCategory>>(
        url
      );
      return response;
    } else {
      // Fallback to non-paginated for backward compatibility
      const response = await ApiClient.get<{ data: BusinessCategory[] }>(
        this.basePath
      );
      return {
        data: response.data,
        meta: {
          total: response.data.length,
          page: 1,
          limit: response.data.length,
          totalPages: 1,
        },
      };
    }
  }

  static async getById(id: number) {
    const response = await ApiClient.get<{ data: BusinessCategory }>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  static async create(data: CreateBusinessCategoryDto) {
    const response = await ApiClient.post<{ data: BusinessCategory }>(
      this.basePath,
      data
    );
    return response.data;
  }

  static async update(id: number, data: UpdateBusinessCategoryDto) {
    const response = await ApiClient.patch<{ data: BusinessCategory }>(
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
    const response = await ApiClient.patch<{ data: BusinessCategory }>(
      `${this.basePath}/${id}/restore`,
      {}
    );
    return response.data;
  }

  // Backward compatibility methods
  static async getCategories(params?: BusinessCategoryQueryParams) {
    return this.getAll(params);
  }

  static async getCategoryById(id: number) {
    return this.getById(id);
  }

  static async createCategory(data: CreateBusinessCategoryDto) {
    return this.create(data);
  }

  static async updateCategory(id: number, data: UpdateBusinessCategoryDto) {
    return this.update(id, data);
  }

  static async deleteCategory(id: number) {
    return this.delete(id);
  }

  static async restoreCategory(id: number) {
    return this.restore(id);
  }
}
