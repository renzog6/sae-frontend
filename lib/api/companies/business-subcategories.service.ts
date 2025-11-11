// filepath: sae-frontend/lib/api/companies/business-subcategories.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import { BusinessSubCategory } from "@/lib/types/company";
import {
  CreateBusinessSubCategoryDto,
  UpdateBusinessSubCategoryDto,
} from "@/lib/types/company";
import { BusinessSubCategoryQueryParams } from "@/lib/types/company";

export class BusinessSubCategoriesService {
  private static basePath = "/companies/subcategories";

  static async getAll(query?: BusinessSubCategoryQueryParams) {
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
      const response = await ApiClient.get<
        PaginatedResponse<BusinessSubCategory>
      >(url);
      return response;
    } else {
      // Fallback to non-paginated for backward compatibility
      const response = await ApiClient.get<{ data: BusinessSubCategory[] }>(
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
    const response = await ApiClient.get<{ data: BusinessSubCategory }>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  static async create(data: CreateBusinessSubCategoryDto) {
    const response = await ApiClient.post<{ data: BusinessSubCategory }>(
      this.basePath,
      data
    );
    return response.data;
  }

  static async update(id: number, data: UpdateBusinessSubCategoryDto) {
    const response = await ApiClient.patch<{ data: BusinessSubCategory }>(
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
    const response = await ApiClient.patch<{ data: BusinessSubCategory }>(
      `${this.basePath}/${id}/restore`,
      {}
    );
    return response.data;
  }
}
