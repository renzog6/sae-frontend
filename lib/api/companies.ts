// file: sae-frontend/lib/api/companies.ts
import { ApiClient } from "./apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import {
  BusinessCategory,
  BusinessSubcategory,
  Company,
} from "@/lib/types/company";
import {
  BusinessCategoryFormData,
  BusinessSubcategoryFormData,
  CompanyFormData,
  UpdateBusinessCategoryFormData,
  UpdateBusinessSubcategoryFormData,
  UpdateCompanyFormData,
} from "@/lib/validations/company";

export class CompaniesService {
  private static basePath = "/companies";

  static async getCompanies(params?: { page?: number; limit?: number }) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    const response = await ApiClient.get<PaginatedResponse<Company>>(
      `${this.basePath}${qs ? `?${qs}` : ""}`
    );
    return response;
  }

  static async getCompanyById(id: number) {
    const response = await ApiClient.get<Company>(`${this.basePath}/${id}`);
    return response;
  }

  static async createCompany(data: CompanyFormData) {
    const response = await ApiClient.post<Company>(this.basePath, data);
    return response;
  }

  static async updateCompany(id: number, data: UpdateCompanyFormData) {
    const response = await ApiClient.put<Company>(
      `${this.basePath}/${id}`,
      data
    );
    return response;
  }

  static async deleteCompany(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Company deleted";
  }
}

export class BusinessCategoriesService {
  private static basePath = "/companies/categories";

  static async getCategories() {
    const response = await ApiClient.get<PaginatedResponse<BusinessCategory>>(
      this.basePath
    );
    return response;
  }

  static async getCategoryById(id: number) {
    const response = await ApiClient.get<BusinessCategory>(
      `${this.basePath}/${id}`
    );
    return response;
  }

  static async createCategory(data: BusinessCategoryFormData) {
    const response = await ApiClient.post<BusinessCategory>(
      this.basePath,
      data
    );
    return response;
  }

  static async updateCategory(
    id: number,
    data: UpdateBusinessCategoryFormData
  ) {
    const response = await ApiClient.put<BusinessCategory>(
      `${this.basePath}/${id}`,
      data
    );
    return response;
  }

  static async deleteCategory(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Category deleted";
  }
}

export class BusinessSubcategoriesService {
  private static basePath = "/companies/subcategories";

  static async getSubcategories(params?: { categoryId?: number }) {
    const query = new URLSearchParams();
    if (params?.categoryId) query.set("categoryId", String(params.categoryId));
    const qs = query.toString();
    const response = await ApiClient.get<
      PaginatedResponse<BusinessSubcategory>
    >(`${this.basePath}${qs ? `?${qs}` : ""}`);
    return response;
  }

  static async getSubcategoryById(id: number) {
    const response = await ApiClient.get<BusinessSubcategory>(
      `${this.basePath}/${id}`
    );
    return response;
  }

  static async createSubcategory(data: BusinessSubcategoryFormData) {
    const response = await ApiClient.post<BusinessSubcategory>(
      this.basePath,
      data
    );
    return response;
  }

  static async updateSubcategory(
    id: number,
    data: UpdateBusinessSubcategoryFormData
  ) {
    const response = await ApiClient.put<BusinessSubcategory>(
      `${this.basePath}/${id}`,
      data
    );
    return response;
  }

  static async deleteSubcategory(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Subcategory deleted";
  }
}
