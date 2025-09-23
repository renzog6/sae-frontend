// file: sae-frontend/lib/api/catalogs.ts
import { ApiClient } from "./apiClient";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { Brand, Unit } from "@/types/catalog";
import { BrandFormData, UpdateBrandFormData, UnitFormData, UpdateUnitFormData } from "@/lib/validations/catalog";

// Helper to unwrap responses that may come wrapped in { data }
function unwrap<T>(resp: any): T {
  if (resp && typeof resp === "object" && "data" in resp) {
    return resp.data as T;
  }
  return resp as T;
}

export class CatalogsService {
  // ===== Brands =====
  static async getBrands(accessToken: string): Promise<Brand[]> {
    const response = await ApiClient.request<Brand[] | PaginatedResponse<Brand>>(
      "/brands",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return unwrap<Brand[]>(response);
  }

  static async getBrandById(id: number, accessToken: string): Promise<Brand> {
    const response = await ApiClient.request<Brand | ApiResponse<Brand>>(
      `/brands/${id}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return unwrap<Brand>(response);
  }

  static async createBrand(data: BrandFormData, accessToken: string): Promise<Brand> {
    const response = await ApiClient.request<Brand | ApiResponse<Brand>>(
      "/brands",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return unwrap<Brand>(response);
  }

  static async updateBrand(id: number, data: UpdateBrandFormData, accessToken: string): Promise<Brand> {
    const response = await ApiClient.request<Brand | ApiResponse<Brand>>(
      `/brands/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return unwrap<Brand>(response);
  }

  static async deleteBrand(id: number, accessToken: string): Promise<string> {
    const response = await ApiClient.request<{ message?: string } | ApiResponse<unknown>>(
      `/brands/${id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (response && typeof response === "object" && "message" in response) {
      return (response as { message?: string }).message || "Brand deleted";
    }
    return "Brand deleted";
  }

  // ===== Units =====
  static async getUnits(accessToken: string): Promise<Unit[]> {
    const response = await ApiClient.request<Unit[] | PaginatedResponse<Unit>>(
      "/units",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return unwrap<Unit[]>(response);
  }

  static async getUnitById(id: number, accessToken: string): Promise<Unit> {
    const response = await ApiClient.request<Unit | ApiResponse<Unit>>(
      `/units/${id}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return unwrap<Unit>(response);
  }

  static async createUnit(data: UnitFormData, accessToken: string): Promise<Unit> {
    const response = await ApiClient.request<Unit | ApiResponse<Unit>>(
      "/units",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return unwrap<Unit>(response);
  }

  static async updateUnit(id: number, data: UpdateUnitFormData, accessToken: string): Promise<Unit> {
    const response = await ApiClient.request<Unit | ApiResponse<Unit>>(
      `/units/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return unwrap<Unit>(response);
  }

  static async deleteUnit(id: number, accessToken: string): Promise<string> {
    const response = await ApiClient.request<{ message?: string } | ApiResponse<unknown>>(
      `/units/${id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (response && typeof response === "object" && "message" in response) {
      return (response as { message?: string }).message || "Unit deleted";
    }
    return "Unit deleted";
  }
}