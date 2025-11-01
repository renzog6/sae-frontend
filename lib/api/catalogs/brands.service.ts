// filepath: sae-frontend/lib/api/catalogs/brands.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import { Brand } from "@/lib/types/catalog";
import { BrandFormData, UpdateBrandFormData } from "@/lib/validations/catalog";

export class BrandsService {
  private static basePath = "/brands";

  static async getAll() {
    const response = await ApiClient.get<Brand[]>(this.basePath);
    return response;
  }

  static async getById(id: number) {
    const response = await ApiClient.get<Brand>(`${this.basePath}/${id}`);
    return response;
  }

  static async create(data: BrandFormData) {
    const response = await ApiClient.post<Brand>(this.basePath, data);
    return response;
  }

  static async update(id: number, data: UpdateBrandFormData) {
    const response = await ApiClient.put<Brand>(`${this.basePath}/${id}`, data);
    return response;
  }

  static async delete(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Brand deleted";
  }
}
