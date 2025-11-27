//filepath: sae-frontend/lib/api/equipments/equipment-models.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import {
  EquipmentModel,
  CreateEquipmentModelDto,
  UpdateEquipmentModelDto,
} from "@/lib/types/domain/equipment";

// Interface específica para modelos de equipo
interface EquipmentModelsQueryParams extends BaseQueryParams {
  typeId?: number;
}

export class EquipmentModelsService {
  private static basePath = "/equipments/models";

  static async getAll(
    filter?: EquipmentModelsQueryParams
  ): Promise<PaginatedResponse<EquipmentModel>> {
    // 1. URL base con filtros comunes (paginación, búsqueda, etc.)
    const baseUrl = QueryBuilder.buildUrl(this.basePath, filter);

    // 2. Filtros específicos de documentos
    const specificParams = {
      typeId: filter?.typeId,
    };
    const specificQuery = QueryBuilder.buildSpecific(specificParams);

    // 3. Combinar URLs
    const finalUrl = QueryBuilder.combineUrls(baseUrl, specificQuery);

    const response = await ApiClient.get<PaginatedResponse<EquipmentModel>>(
      finalUrl
    );
    return response;
  }

  static async getById(id: number): Promise<EquipmentModel> {
    const response = await ApiClient.get<EquipmentModel>(
      `${this.basePath}/${id}`
    );
    return response;
  }

  static async create(dto: CreateEquipmentModelDto): Promise<EquipmentModel> {
    const response = await ApiClient.post<EquipmentModel>(this.basePath, dto);
    return response;
  }

  static async update(
    id: number,
    dto: UpdateEquipmentModelDto
  ): Promise<EquipmentModel> {
    const response = await ApiClient.put<EquipmentModel>(
      `${this.basePath}/${id}`,
      dto
    );
    return response;
  }

  static async delete(id: number): Promise<string> {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Model deleted";
  }

  static async getByType(typeId: number): Promise<EquipmentModel[]> {
    const response = await ApiClient.get<EquipmentModel[]>(
      `${this.basePath}/type/${typeId}`
    );
    return response;
  }
}
