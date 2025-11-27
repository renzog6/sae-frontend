//filepath: sae-frontend/lib/api/tires/tire-assignments.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import {
  BaseQueryParams,
  PaginatedResponse,
  ApiResponse,
} from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  TireAssignment,
  MountTireDto,
  UnmountTireDto,
} from "@/lib/types/domain/tire";

// Interface específica para asignaciones de neumáticos
interface TireAssignmentsQueryParams extends BaseQueryParams {
  equipmentId?: number;
  tireId?: number;
  serialNumber?: string;
}

export class TireAssignmentsService {
  private static basePath = "/tires/assignments";

  static async getAll(
    filter?: TireAssignmentsQueryParams
  ): Promise<PaginatedResponse<TireAssignment>> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        // 1. URL base con filtros comunes (paginación, búsqueda, etc.)
        const baseUrl = QueryBuilder.buildUrl(this.basePath, filter);

        // 2. Filtros específicos de documentos
        const specificParams = {
          equipmentId: filter?.equipmentId,
        };
        const specificQuery = QueryBuilder.buildSpecific(specificParams);

        // 3. Combinar URLs
        const finalUrl = QueryBuilder.combineUrls(baseUrl, specificQuery);

        const response = await ApiClient.get<PaginatedResponse<TireAssignment>>(
          finalUrl
        );

        return response;
      },
      "TireAssignmentsService",
      "getAll",
      { filter }
    );
  }

  /**
   * Obtiene asignaciones abiertas para un equipo específico
   * @param equipmentId - ID del equipo
   * @param params - Parámetros de paginación
   * @returns Lista paginada de asignaciones abiertas
   * @throws Error si la solicitud falla
   */
  static async getOpenByEquipment(
    equipmentId: number,
    params: { page?: number; limit?: number } = {}
  ): Promise<PaginatedResponse<TireAssignment>> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const query = new URLSearchParams();
        if (params.page) query.append("page", params.page.toString());
        if (params.limit) query.append("limit", params.limit.toString());

        const response = await ApiClient.get<PaginatedResponse<TireAssignment>>(
          `${this.basePath}/open?equipmentId=${equipmentId}&${query.toString()}`
        );
        return response;
      },
      "TireAssignmentsService",
      "getOpenByEquipment",
      { equipmentId, params }
    );
  }

  /**
   * Obtiene todas las asignaciones abiertas
   * @returns Lista de asignaciones abiertas
   * @throws Error si la solicitud falla
   */
  static async getOpen(): Promise<TireAssignment[]> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<TireAssignment[]>(
          `${this.basePath}/open`
        );
        return response;
      },
      "TireAssignmentsService",
      "getOpen"
    );
  }

  /**
   * Obtiene una asignación por su ID
   * @param id - ID de la asignación
   * @returns Detalle de la asignación
   * @throws Error si la asignación no existe
   */
  static async getById(id: number): Promise<TireAssignment> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<ApiResponse<TireAssignment>>(
          `${this.basePath}/${id}`
        );
        return response.data;
      },
      "TireAssignmentsService",
      "getById",
      { id }
    );
  }

  /**
   * Crea una nueva asignación (montaje de neumático)
   * @param dto - Datos de la asignación
   * @returns Asignación creada
   * @throws Error si el montaje falla (e.g., posición ocupada)
   */
  static async mount(dto: MountTireDto): Promise<TireAssignment> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<TireAssignment>>(
          `${this.basePath}/mount`,
          dto
        );
        return response.data;
      },
      "TireAssignmentsService",
      "mount",
      { dto }
    );
  }

  /**
   * Actualiza una asignación existente (desmontaje)
   * @param assignmentId - ID de la asignación
   * @param dto - Datos de actualización
   * @returns Asignación actualizada
   * @throws Error si el desmontaje falla
   */
  static async unmount(
    assignmentId: number,
    dto: UnmountTireDto
  ): Promise<TireAssignment> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.put<ApiResponse<TireAssignment>>(
          `${this.basePath}/unmount`,
          dto
        );
        return response.data;
      },
      "TireAssignmentsService",
      "unmount",
      { assignmentId, dto }
    );
  }

  /**
   * Elimina una asignación
   * @param id - ID de la asignación
   * @returns Asignación eliminada
   * @throws Error si la eliminación falla
   */
  static async delete(id: number): Promise<string> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        await ApiClient.delete(`${this.basePath}/${id}`);
        return "Assignment deleted";
      },
      "TireAssignmentsService",
      "delete",
      { id }
    );
  }
}
