// filepath: sae-frontend/lib/api/companies/companies.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { Company } from "@/lib/types/domain/company";
import {
  CompanyFormData,
  UpdateCompanyFormData,
} from "@/lib/validations/company";

export class CompaniesService {
  private static basePath = "/companies";

  static async getAll(query?: BaseQueryParams) {
    const url = QueryBuilder.buildUrl(this.basePath, query);
    const response = await ApiClient.get<PaginatedResponse<Company>>(url);
    return response;
  }

  static async getById(id: number) {
    const response = await ApiClient.get<ApiResponse<Company>>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  static async create(data: CompanyFormData) {
    const response = await ApiClient.post<ApiResponse<Company>>(
      this.basePath,
      data
    );
    return response.data;
  }

  static async update(id: number, data: UpdateCompanyFormData) {
    const response = await ApiClient.put<ApiResponse<Company>>(
      `${this.basePath}/${id}`,
      data
    );
    return response.data;
  }

  static async delete(id: number) {
    const response = await ApiClient.delete<ApiResponse<string>>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  static async restore(id: number) {
    const response = await ApiClient.put<ApiResponse<Company>>(
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
