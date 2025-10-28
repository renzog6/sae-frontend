import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import { TireAssignment, MountTireDto, UnmountTireDto } from "@/lib/types/tire";

// Interfaz para parámetros de consultas de asignaciones
interface TireAssignmentParams {
  page?: number;
  limit?: number;
  equipmentId?: number;
  tireId?: number;
  status?: string;
  serialNumber?: string; // Soporte para búsqueda por serialNumber
}

export class TireAssignmentsService {
  private static basePath = "/tires/assignments";

  /**
   * Obtiene todas las asignaciones de neumáticos con filtros opcionales
   * @param params - Parámetros de paginación y filtrado
   * @returns Lista paginada de asignaciones
   * @throws Error si la solicitud falla
   */
  static async getAll(
    params: TireAssignmentParams = {}
  ): Promise<PaginatedResponse<TireAssignment>> {
    try {
      const query = new URLSearchParams();
      if (params.page) query.append("page", params.page.toString());
      if (params.limit) query.append("limit", params.limit.toString());
      if (params.equipmentId)
        query.append("equipmentId", params.equipmentId.toString());
      if (params.tireId) query.append("tireId", params.tireId.toString());
      if (params.status) query.append("status", params.status);
      if (params.serialNumber)
        query.append("serialNumber", params.serialNumber);

      const response = await ApiClient.get<PaginatedResponse<TireAssignment>>(
        `${this.basePath}?${query.toString()}`
      );
      return response;
    } catch (error) {
      throw new Error(
        `Error al obtener asignaciones: ${(error as Error).message}`
      );
    }
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
    try {
      const query = new URLSearchParams();
      if (params.page) query.append("page", params.page.toString());
      if (params.limit) query.append("limit", params.limit.toString());

      const response = await ApiClient.get<PaginatedResponse<TireAssignment>>(
        `${this.basePath}/open?equipmentId=${equipmentId}&${query.toString()}`
      );
      return response;
    } catch (error) {
      throw new Error(
        `Error al obtener asignaciones abiertas para equipo ${equipmentId}: ${
          (error as Error).message
        }`
      );
    }
  }

  /**
   * Obtiene todas las asignaciones abiertas
   * @returns Lista de asignaciones abiertas
   * @throws Error si la solicitud falla
   */
  static async getOpen(): Promise<TireAssignment[]> {
    try {
      const response = await ApiClient.get<TireAssignment[]>(
        `${this.basePath}/open`
      );
      return response;
    } catch (error) {
      throw new Error(
        `Error al obtener asignaciones abiertas: ${(error as Error).message}`
      );
    }
  }

  /**
   * Obtiene una asignación por su ID
   * @param id - ID de la asignación
   * @returns Detalle de la asignación
   * @throws Error si la asignación no existe
   */
  static async getById(id: number): Promise<TireAssignment> {
    try {
      const response = await ApiClient.get<TireAssignment>(
        `${this.basePath}/${id}`
      );
      return response;
    } catch (error) {
      throw new Error(
        `Error al obtener asignación ${id}: ${(error as Error).message}`
      );
    }
  }

  /**
   * Crea una nueva asignación (montaje de neumático)
   * @param dto - Datos de la asignación
   * @returns Asignación creada
   * @throws Error si el montaje falla (e.g., posición ocupada)
   */
  static async mount(dto: MountTireDto): Promise<TireAssignment> {
    try {
      const response = await ApiClient.post<TireAssignment>(
        `${this.basePath}/mount`,
        dto
      );
      return response;
    } catch (error) {
      throw new Error(`Error al montar neumático: ${(error as Error).message}`);
    }
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
    try {
      const response = await ApiClient.put<TireAssignment>(
        `${this.basePath}/unmount`,
        dto
      );
      return response;
    } catch (error) {
      throw new Error(
        `Error al desmontar asignación ${assignmentId}: ${
          (error as Error).message
        }`
      );
    }
  }

  /**
   * Elimina una asignación
   * @param id - ID de la asignación
   * @returns Asignación eliminada
   * @throws Error si la eliminación falla
   */
  static async delete(id: number): Promise<string> {
    try {
      await ApiClient.delete(`${this.basePath}/${id}`);
      return "Assignment deleted";
    } catch (error) {
      throw new Error(
        `Error al eliminar asignación ${id}: ${(error as Error).message}`
      );
    }
  }
}
