// filepath: sae-frontend/lib/api/catalogs/units.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import { Unit } from "@/lib/types/catalog";
import { UnitFormData, UpdateUnitFormData } from "@/lib/validations/catalog";

export class UnitsService {
  private static basePath = "/units";

  static async getAll() {
    const response = await ApiClient.get<Unit[]>(this.basePath);
    return response;
  }

  static async getById(id: number) {
    const response = await ApiClient.get<Unit>(`${this.basePath}/${id}`);
    return response;
  }

  static async create(data: UnitFormData) {
    const response = await ApiClient.post<Unit>(this.basePath, data);
    return response;
  }

  static async update(id: number, data: UpdateUnitFormData) {
    const response = await ApiClient.put<Unit>(`${this.basePath}/${id}`, data);
    return response;
  }

  static async delete(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Unit deleted";
  }
}
