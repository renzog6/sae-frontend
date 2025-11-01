//filepath: sae-frontend/lib/api/equipments/equipment-axles.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { ApiResponse, PaginatedResponse } from "@/lib/types/api";
import { unwrap } from "@/lib/api/utils";
import { EquipmentAxle } from "@/lib/types/equipment";

export class EquipmentAxlesService {
  private static basePath = "/equipments/axles";

  static async getAll(params?: {
    equipmentId?: number;
  }): Promise<EquipmentAxle[] | PaginatedResponse<EquipmentAxle>> {
    const query = new URLSearchParams();
    if (params?.equipmentId)
      query.set("equipmentId", String(params.equipmentId));
    const qs = query.toString();

    const response = await ApiClient.get<
      EquipmentAxle[] | PaginatedResponse<EquipmentAxle>
    >(`${this.basePath}${qs ? `?${qs}` : ""}`);
    return unwrap<EquipmentAxle[] | PaginatedResponse<EquipmentAxle>>(response);
  }

  static async getById(id: number): Promise<EquipmentAxle> {
    const response = await ApiClient.get<
      EquipmentAxle | ApiResponse<EquipmentAxle>
    >(`${this.basePath}/${id}`);
    return unwrap<EquipmentAxle>(response);
  }

  static async create(data: {
    equipmentId: number;
    order: number;
    axleType: string;
    wheelCount: number;
    description?: string;
  }): Promise<EquipmentAxle> {
    const response = await ApiClient.post<
      EquipmentAxle | ApiResponse<EquipmentAxle>
    >(this.basePath, data);
    return unwrap<EquipmentAxle>(response);
  }

  static async update(
    id: number,
    data: Partial<{
      equipmentId: number;
      order: number;
      axleType: string;
      wheelCount: number;
      description?: string;
    }>
  ): Promise<EquipmentAxle> {
    const response = await ApiClient.put<
      EquipmentAxle | ApiResponse<EquipmentAxle>
    >(`${this.basePath}/${id}`, data);
    return unwrap<EquipmentAxle>(response);
  }

  static async delete(id: number): Promise<string> {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Equipment axle deleted";
  }

  static async createWithPositions(data: {
    axle: {
      equipmentId: number;
      order: number;
      axleType: string;
      wheelCount: number;
      description?: string;
    };
    positions: Array<{
      positionKey: string;
      side: string;
      isDual: boolean;
    }>;
  }): Promise<any> {
    const response = await ApiClient.post(
      `${this.basePath}/with-positions`,
      data
    );
    return unwrap<any>(response);
  }

  static async getPositionsByEquipment(equipmentId: number): Promise<any> {
    const response = await ApiClient.get(
      `${this.basePath}/positions/equipment/${equipmentId}`
    );
    return unwrap<any>(response);
  }
}
