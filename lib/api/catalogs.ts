// file: sae-frontend/lib/api/catalogs.ts
import { ApiClient } from "./apiClient";
import { ApiResponse, PaginatedResponse } from "@/lib/types/api";
import { Brand, Unit } from "@/lib/types/catalog";
import {
  BrandFormData,
  UpdateBrandFormData,
  UnitFormData,
  UpdateUnitFormData,
} from "@/lib/validations/catalog";

export class CatalogsService {
  private static brandsPath = "/brands";
  private static unitsPath = "/units";

  // ===== Brands =====
  static async getBrands(): Promise<Brand[]> {
    const response = await ApiClient.get<PaginatedResponse<Brand>>(
      this.brandsPath
    );
    return response.data || [];
  }

  static async getBrandById(id: number): Promise<Brand> {
    const response = await ApiClient.get<Brand>(`${this.brandsPath}/${id}`);
    return response;
  }

  static async createBrand(data: BrandFormData): Promise<Brand> {
    const response = await ApiClient.post<Brand>(this.brandsPath, data);
    return response;
  }

  static async updateBrand(
    id: number,
    data: UpdateBrandFormData
  ): Promise<Brand> {
    const response = await ApiClient.put<Brand>(
      `${this.brandsPath}/${id}`,
      data
    );
    return response;
  }

  static async deleteBrand(id: number): Promise<string> {
    await ApiClient.delete(`${this.brandsPath}/${id}`);
    return "Brand deleted";
  }

  // ===== Units =====
  static async getUnits(): Promise<Unit[]> {
    const response = await ApiClient.get<PaginatedResponse<Unit>>(
      this.unitsPath
    );
    return response.data || [];
  }

  static async getUnitById(id: number): Promise<Unit> {
    const response = await ApiClient.get<Unit>(`${this.unitsPath}/${id}`);
    return response;
  }

  static async createUnit(data: UnitFormData): Promise<Unit> {
    const response = await ApiClient.post<Unit>(this.unitsPath, data);
    return response;
  }

  static async updateUnit(id: number, data: UpdateUnitFormData): Promise<Unit> {
    const response = await ApiClient.put<Unit>(`${this.unitsPath}/${id}`, data);
    return response;
  }

  static async deleteUnit(id: number): Promise<string> {
    await ApiClient.delete(`${this.unitsPath}/${id}`);
    return "Unit deleted";
  }
}
