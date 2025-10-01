// file: sae-frontend/lib/api/companies.ts
import { ApiClient } from "./apiClient";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { BusinessCategory, BusinessSubcategory, Company } from "@/types/company";
import { BusinessCategoryFormData, BusinessSubcategoryFormData, CompanyFormData, UpdateBusinessCategoryFormData, UpdateBusinessSubcategoryFormData, UpdateCompanyFormData } from "@/lib/validations/company";

function unwrap<T>(resp: any): T {
  if (resp && typeof resp === "object" && "data" in resp) {
    return resp.data as T;
  }
  return resp as T;
}

export class CompaniesService {
  static async getCompanies(accessToken: string, params?: { page?: number; limit?: number }) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    const response = await ApiClient.request<Company[] | PaginatedResponse<Company>>(
      `/companies${qs ? `?${qs}` : ""}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return unwrap<Company[] | PaginatedResponse<Company>>(response);
  }

  static async getCompanyById(id: number, accessToken: string) {
    const response = await ApiClient.request<Company | ApiResponse<Company>>(
      `/companies/${id}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return unwrap<Company>(response);
  }

  static async createCompany(data: CompanyFormData, accessToken: string) {
    const response = await ApiClient.request<Company | ApiResponse<Company>>(
      "/companies",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    return unwrap<Company>(response);
  }

  static async updateCompany(id: number, data: UpdateCompanyFormData, accessToken: string) {
    const response = await ApiClient.request<Company | ApiResponse<Company>>(
      `/companies/${id}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    return unwrap<Company>(response);
  }

  static async deleteCompany(id: number, accessToken: string) {
    await ApiClient.request(`/companies/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return "Company deleted";
  }
}

export class BusinessCategoriesService {
  static async getCategories(accessToken: string) {
    const response = await ApiClient.request<BusinessCategory[] | PaginatedResponse<BusinessCategory>>(
      "/companies/categories",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return unwrap<BusinessCategory[] | PaginatedResponse<BusinessCategory>>(response);
  }

  static async getCategoryById(id: number, accessToken: string) {
    const response = await ApiClient.request<BusinessCategory | ApiResponse<BusinessCategory>>(
      `/companies/categories/${id}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return unwrap<BusinessCategory>(response);
  }

  static async createCategory(data: BusinessCategoryFormData, accessToken: string) {
    const response = await ApiClient.request<BusinessCategory | ApiResponse<BusinessCategory>>(
      "/companies/categories",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    return unwrap<BusinessCategory>(response);
  }

  static async updateCategory(id: number, data: UpdateBusinessCategoryFormData, accessToken: string) {
    const response = await ApiClient.request<BusinessCategory | ApiResponse<BusinessCategory>>(
      `/companies/categories/${id}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    return unwrap<BusinessCategory>(response);
  }

  static async deleteCategory(id: number, accessToken: string) {
    await ApiClient.request(`/companies/categories/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return "Category deleted";
  }
}

export class BusinessSubcategoriesService {
  static async getSubcategories(accessToken: string, params?: { categoryId?: number }) {
    const qs = params?.categoryId ? `?categoryId=${params.categoryId}` : "";
    const response = await ApiClient.request<BusinessSubcategory[] | PaginatedResponse<BusinessSubcategory>>(
      `/companies/subcategories${qs}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return unwrap<BusinessSubcategory[] | PaginatedResponse<BusinessSubcategory>>(response);
  }

  static async getSubcategoryById(id: number, accessToken: string) {
    const response = await ApiClient.request<BusinessSubcategory | ApiResponse<BusinessSubcategory>>(
      `/companies/subcategories/${id}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return unwrap<BusinessSubcategory>(response);
  }

  static async createSubcategory(data: BusinessSubcategoryFormData, accessToken: string) {
    const response = await ApiClient.request<BusinessSubcategory | ApiResponse<BusinessSubcategory>>(
      "/companies/subcategories",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    return unwrap<BusinessSubcategory>(response);
  }

  static async updateSubcategory(id: number, data: UpdateBusinessSubcategoryFormData, accessToken: string) {
    const response = await ApiClient.request<BusinessSubcategory | ApiResponse<BusinessSubcategory>>(
      `/companies/subcategories/${id}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    return unwrap<BusinessSubcategory>(response);
  }

  static async deleteSubcategory(id: number, accessToken: string) {
    await ApiClient.request(`/companies/subcategories/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return "Subcategory deleted";
  }
}
