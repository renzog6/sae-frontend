//filepath: sae-frontend/lib/api/equipments/equipment-axles.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { EquipmentAxle } from "@/lib/types/domain/equipment";

// Interface específica para ejes de equipo
interface EquipmentAxlesQueryParams extends BaseQueryParams {
  equipmentId?: number;
}

export class EquipmentAxlesService {
  private static basePath = "/equipments/axles";

  static async getAll(
    filter?: EquipmentAxlesQueryParams
  ): Promise<PaginatedResponse<EquipmentAxle>> {
    // 1. URL base con filtros comunes (paginación, búsqueda, etc.)
    const baseUrl = QueryBuilder.buildUrl(this.basePath, filter);

    // 2. Filtros específicos de documentos
    const specificParams = {
      equipmentId: filter?.equipmentId,
    };
    const specificQuery = QueryBuilder.buildSpecific(specificParams);

    // 3. Combinar URLs
    const finalUrl = QueryBuilder.combineUrls(baseUrl, specificQuery);

    const response = await ApiClient.get<PaginatedResponse<EquipmentAxle>>(
      finalUrl
    );

    return response;
  }

  static async getById(id: number): Promise<EquipmentAxle> {
    const response = await ApiClient.get<{ data: EquipmentAxle }>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  static async create(data: {
    equipmentId: number;
    order: number;
    axleType: string;
    wheelCount: number;
    description?: string;
  }): Promise<EquipmentAxle> {
    const response = await ApiClient.post<{ data: EquipmentAxle }>(
      this.basePath,
      data
    );
    return response.data;
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
    const response = await ApiClient.put<{ data: EquipmentAxle }>(
      `${this.basePath}/${id}`,
      data
    );
    return response.data;
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
    const response = await ApiClient.post<{ data: any }>(
      `${this.basePath}/with-positions`,
      data
    );
    return response.data;
  }

  static async getPositionsByEquipment(equipmentId: number): Promise<any> {
    const response = await ApiClient.get<{ data: any }>(
      `${this.basePath}/positions/equipment/${equipmentId}`
    );
    return response.data;
  }
}
