//filepath: sae-frontend/lib/api/equipments/equipment-types.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import {
  EquipmentType,
  CreateEquipmentTypeDto,
  UpdateEquipmentTypeDto,
} from "@/lib/types/domain/equipment";

// Interface específica para tipos de equipo
interface EquipmentTypesQueryParams extends BaseQueryParams {
  categoryId?: number;
}
export class EquipmentTypesService {
  private static basePath = "/equipments/types";

  static async getAll(
    filter?: EquipmentTypesQueryParams
  ): Promise<PaginatedResponse<EquipmentType>> {
    // 1. URL base con filtros comunes (paginación, búsqueda, etc.)
    const baseUrl = QueryBuilder.buildUrl(this.basePath, filter);

    // 2. Filtros específicos de documentos
    const specificParams = {
      categoryId: filter?.categoryId,
    };
    const specificQuery = QueryBuilder.buildSpecific(specificParams);

    // 3. Combinar URLs
    const finalUrl = QueryBuilder.combineUrls(baseUrl, specificQuery);

    const response = await ApiClient.get<PaginatedResponse<EquipmentType>>(
      finalUrl
    );

    return response;
  }

  static async getById(id: number): Promise<EquipmentType> {
    const response = await ApiClient.get<EquipmentType>(
      `${this.basePath}/${id}`
    );
    return response;
  }

  static async create(dto: CreateEquipmentTypeDto): Promise<EquipmentType> {
    const response = await ApiClient.post<EquipmentType>(this.basePath, dto);
    return response;
  }

  static async update(
    id: number,
    dto: UpdateEquipmentTypeDto
  ): Promise<EquipmentType> {
    const response = await ApiClient.put<EquipmentType>(
      `${this.basePath}/${id}`,
      dto
    );
    return response;
  }

  static async delete(id: number): Promise<string> {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Type deleted";
  }

  static async getByCategory(categoryId: number): Promise<EquipmentType[]> {
    const response = await ApiClient.get<EquipmentType[]>(
      `${this.basePath}/category/${categoryId}`
    );
    return response;
  }
}
