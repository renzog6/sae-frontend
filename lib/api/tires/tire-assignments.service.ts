// filepath: sae-frontend/lib/api/tires/tire-assignments.service.ts

import { BaseApiService } from "@/lib/api/base-api.service";
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

interface TireAssignmentsQueryParams extends BaseQueryParams {
  equipmentId?: number;
  tireId?: number;
  serialNumber?: string;
}

class TireAssignmentsServiceClass extends BaseApiService<
  TireAssignment,
  MountTireDto,
  UnmountTireDto
> {
  protected basePath = "/tires/assignments";

  /** Get all assignments with filters */
  async getAll(
    filter?: TireAssignmentsQueryParams
  ): Promise<PaginatedResponse<TireAssignment>> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const finalUrl = QueryBuilder.buildUrl(this.basePath, filter);
        return ApiClient.get<PaginatedResponse<TireAssignment>>(finalUrl);
      },
      this.constructor.name,
      "getAll",
      { filter }
    );
  }

  /** Open assignments for a specific equipment */
  async getOpenByEquipment(
    equipmentId: number,
    params: { page?: number; limit?: number } = {}
  ): Promise<PaginatedResponse<TireAssignment>> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const query = new URLSearchParams();
        if (params.page) query.append("page", params.page.toString());
        if (params.limit) query.append("limit", params.limit.toString());

        return ApiClient.get<PaginatedResponse<TireAssignment>>(
          `${this.basePath}/open?equipmentId=${equipmentId}&${query.toString()}`
        );
      },
      this.constructor.name,
      "getOpenByEquipment",
      { equipmentId, params }
    );
  }

  /** All open assignments */
  async getOpen(): Promise<TireAssignment[]> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        return ApiClient.get<TireAssignment[]>(`${this.basePath}/open`);
      },
      this.constructor.name,
      "getOpen"
    );
  }

  /** Mount a tire */
  async mount(dto: MountTireDto): Promise<TireAssignment> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.post<ApiResponse<TireAssignment>>(
          `${this.basePath}/mount`,
          dto
        );
        return response.data;
      },
      this.constructor.name,
      "mount",
      { dto }
    );
  }

  /** Unmount a tire */
  async unmount(
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
      this.constructor.name,
      "unmount",
      { assignmentId, dto }
    );
  }
}

export const TireAssignmentsService = new TireAssignmentsServiceClass();
