// filepath: sae-frontend/lib/api/companies/companies.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import { Company } from "@/lib/types/company";
import {
  CompanyFormData,
  UpdateCompanyFormData,
} from "@/lib/validations/company";

export class CompaniesService {
  private static basePath = "/companies";

  static async getAll(params?: {
    page?: number;
    limit?: number;
    q?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) {
    if (params) {
      const query = new URLSearchParams();
      if (params.page) query.append("page", params.page.toString());
      if (params.limit) query.append("limit", params.limit.toString());
      if (params.q) query.append("q", params.q);
      if (params.sortBy) query.append("sortBy", params.sortBy);
      if (params.sortOrder) query.append("sortOrder", params.sortOrder);

      const queryString = query.toString();
      const url = queryString
        ? `${this.basePath}?${queryString}`
        : this.basePath;
      const response = await ApiClient.get<PaginatedResponse<Company>>(url);
      return response;
    } else {
      // Fallback to non-paginated for backward compatibility
      const response = await ApiClient.get<{ data: Company[] }>(this.basePath);
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
    const response = await ApiClient.get<{ data: Company }>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  static async create(data: CompanyFormData) {
    const response = await ApiClient.post<{ data: Company }>(
      this.basePath,
      data
    );
    return response.data;
  }

  static async update(id: number, data: UpdateCompanyFormData) {
    const response = await ApiClient.put<{ data: Company }>(
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
    const response = await ApiClient.put<{ data: Company }>(
      `${this.basePath}/${id}/restore`,
      {}
    );
    return response.data;
  }

  // Backward compatibility methods
  static async getCompanyById(id: number) {
    return this.getById(id);
  }

  static async createCompany(data: CompanyFormData) {
    return this.create(data);
  }

  static async updateCompany(id: number, data: UpdateCompanyFormData) {
    return this.update(id, data);
  }
}
