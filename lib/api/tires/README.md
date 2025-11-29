# SAE Frontend - Tires API Services and Hooks

This document contains the complete code for all tire-related API services and hooks in the SAE frontend application.

## API Services

### tires.service.ts

```typescript
// filepath: sae-frontend/lib/api/tires/tires.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { BaseQueryParams, PaginatedResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { Tire, CreateTireDto, UpdateTireDto } from "@/lib/types/domain/tire";

// Interface específica para neumáticos
interface TiresQueryParams extends BaseQueryParams {
  brandId?: number;
}

class TiresServiceClass extends BaseApiService<
  Tire,
  CreateTireDto,
  UpdateTireDto
> {
  protected basePath = "/tires";

  async getAll(filter?: TiresQueryParams): Promise<PaginatedResponse<Tire>> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        // 1. URL base con filtros comunes (paginación, búsqueda, etc.)
        const baseUrl = QueryBuilder.buildUrl(this.basePath, filter);

        // 2. Filtros específicos de documentos
        const specificParams = {
          brandId: filter?.brandId,
        };
        const specificQuery = QueryBuilder.buildSpecific(specificParams);

        // 3. Combinar URLs
        const finalUrl = QueryBuilder.combineUrls(baseUrl, specificQuery);

        const response = await ApiClient.get<PaginatedResponse<Tire>>(finalUrl);

        return response;
      },
      "TiresService",
      "getAll",
      { filter }
    );
  }
}

export const TiresService = new TiresServiceClass();
```

### tire-models.service.ts

```typescript
// filepath: sae-frontend/lib/api/tires/tire-models.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/core/api";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  TireModel,
  CreateTireModelDto,
  UpdateTireModelDto,
} from "@/lib/types/domain/tire";

class TireModelsServiceClass extends BaseApiService<
  TireModel,
  CreateTireModelDto,
  UpdateTireModelDto
> {
  protected basePath = "/tires/models";

  async getAll(
    params: { page?: number; limit?: number; brandId?: number } = {}
  ) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const query = new URLSearchParams();
        if (params.page) query.append("page", params.page.toString());
        if (params.limit) query.append("limit", params.limit.toString());
        if (params.brandId) query.append("brandId", params.brandId.toString());

        const response = await ApiClient.get<PaginatedResponse<TireModel>>(
          `${this.basePath}?${query.toString()}`
        );
        return response;
      },
      "TireModelsService",
      "getAll",
      { params }
    );
  }
}

export const TireModelsService = new TireModelsServiceClass();
```

### tire-sizes.service.ts

```typescript
// filepath: sae-frontend/lib/api/tires/tire-sizes.service.ts
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
  TireSize,
  CreateTireSizeDto,
  UpdateTireSizeDto,
  TireSizeAlias,
  CreateTireSizeAliasDto,
  UpdateTireSizeAliasDto,
} from "@/lib/types/domain/tire";

// ===== TIRE SIZE =====
class TireSizesServiceClass extends BaseApiService<
  TireSize,
  CreateTireSizeDto,
  UpdateTireSizeDto
> {
  protected basePath = "/tires/sizes";
}

export const TireSizesService = new TireSizesServiceClass();

// ===== TIRE SIZE ALIASES =====
class TireSizeAliasesServiceClass extends BaseApiService<
  TireSizeAlias,
  CreateTireSizeAliasDto,
  UpdateTireSizeAliasDto
> {
  protected basePath = "/tires/size-aliases";

  async getBySize(sizeId: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<
          TireSizeAlias[] | PaginatedResponse<TireSizeAlias>
        >(`/tires/sizes/${sizeId}/aliases`);
        if (response && typeof response === "object" && "data" in response) {
          return response.data;
        }
        return response;
      },
      "TireSizeAliasesService",
      "getBySize",
      { sizeId }
    );
  }
}

export const TireSizeAliasesService = new TireSizeAliasesServiceClass();
```

### tire-rotations.service.ts

```typescript
// filepath: sae-frontend/lib/api/tires/tire-rotations.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  TireRotation,
  CreateTireRotationDto,
  UpdateTireRotationDto,
} from "@/lib/types/domain/tire";

class TireRotationsServiceClass extends BaseApiService<
  TireRotation,
  CreateTireRotationDto,
  UpdateTireRotationDto
> {
  protected basePath = "/tires/rotations";

  async getByTire(tireId: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<TireRotation[]>(
          `${this.basePath}/tire/${tireId}`
        );
        return response;
      },
      "TireRotationsService",
      "getByTire",
      { tireId }
    );
  }
}

export const TireRotationsService = new TireRotationsServiceClass();
```

### tire-positions.service.ts

```typescript
// filepath: sae-frontend/lib/api/tires/tire-positions.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse, BaseQueryParams } from "@/lib/types/core/api";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { TirePositionConfig } from "@/lib/types/domain/tire";

interface TirePositionQueryParams extends BaseQueryParams {
  axleId?: number;
}

class TirePositionConfigsServiceClass extends BaseApiService<
  TirePositionConfig,
  {
    axleId: number;
    positionKey: string;
    side: string;
    isDual: boolean;
  },
  Partial<{
    axleId: number;
    positionKey: string;
    side: string;
    isDual: boolean;
  }>
> {
  protected basePath = "/tires/positions";

  async getAll(query?: TirePositionQueryParams) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const params = new URLSearchParams();
        if (query?.page) params.append("page", query.page.toString());
        if (query?.limit) params.append("limit", query.limit.toString());
        if ((query as any)?.search)
          params.append("search", (query as any).search);
        if (query?.axleId) params.append("axleId", query.axleId.toString());

        const response = await ApiClient.get<
          PaginatedResponse<TirePositionConfig>
        >(`${this.basePath}?${params.toString()}`);
        return response;
      },
      "TirePositionConfigsService",
      "getAll",
      { query }
    );
  }

  async getByEquipment(equipmentId: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<TirePositionConfig[]>(
          `/equipments/axles/positions/equipment/${equipmentId}`
        );
        return response;
      },
      "TirePositionConfigsService",
      "getByEquipment",
      { equipmentId }
    );
  }
}

export const TirePositionConfigsService = new TirePositionConfigsServiceClass();
```

### tire-recaps.service.ts

```typescript
// filepath: sae-frontend/lib/api/tires/tire-recaps.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  TireRecap,
  CreateTireRecapDto,
  UpdateTireRecapDto,
} from "@/lib/types/domain/tire";

class TireRecapsServiceClass extends BaseApiService<
  TireRecap,
  CreateTireRecapDto,
  UpdateTireRecapDto
> {
  protected basePath = "/tires/recaps";

  async getByTire(tireId: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<TireRecap[]>(
          `${this.basePath}/tire/${tireId}`
        );
        return response;
      },
      "TireRecapsService",
      "getByTire",
      { tireId }
    );
  }
}

export const TireRecapsService = new TireRecapsServiceClass();
```

### tire-assignments.service.ts

```typescript
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

// Interface específica para asignaciones de neumáticos
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

  async getAll(
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
  async getOpenByEquipment(
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
  async getOpen(): Promise<TireAssignment[]> {
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
   * Crea una nueva asignación (montaje de neumático)
   * @param dto - Datos de la asignación
   * @returns Asignación creada
   * @throws Error si el montaje falla (e.g., posición ocupada)
   */
  async mount(dto: MountTireDto): Promise<TireAssignment> {
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
      "TireAssignmentsService",
      "unmount",
      { assignmentId, dto }
    );
  }
}

export const TireAssignmentsService = new TireAssignmentsServiceClass();
```

### tire-events.service.ts

```typescript
// filepath: sae-frontend/lib/api/tires/tire-events.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/core/api";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { TireEvent } from "@/lib/types/domain/tire";

class TireEventsServiceClass {
  private basePath = "/tires/events";

  async getByTire(tireId: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<TireEvent[]>(
          `${this.basePath}/tire/${tireId}`
        );
        return response;
      },
      "TireEventsService",
      "getByTire",
      { tireId }
    );
  }

  async getAll(
    params: {
      page?: number;
      limit?: number;
      q?: string;
      eventType?: string;
      fromDate?: string;
      toDate?: string;
    } = {}
  ) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const query = new URLSearchParams();
        if (params.page) query.append("page", params.page.toString());
        if (params.limit) query.append("limit", params.limit.toString());
        if (params.q) query.append("q", params.q);
        if (params.eventType) query.append("eventType", params.eventType);
        if (params.fromDate) query.append("fromDate", params.fromDate);
        if (params.toDate) query.append("toDate", params.toDate);

        const response = await ApiClient.get<PaginatedResponse<TireEvent>>(
          `${this.basePath}?${query.toString()}`
        );
        return response;
      },
      "TireEventsService",
      "getAll",
      { params }
    );
  }
}

export const TireEventsService = new TireEventsServiceClass();
```

### tire-inspections.service.ts

```typescript
// filepath: sae-frontend/lib/api/tires/tire-inspections.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/core/api";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import {
  TireInspection,
  CreateTireInspectionDto,
  UpdateTireInspectionDto,
} from "@/lib/types/domain/tire";

class TireInspectionsServiceClass extends BaseApiService<
  TireInspection,
  CreateTireInspectionDto,
  UpdateTireInspectionDto
> {
  protected basePath = "/tires/inspections";

  async getAll(params?: { page?: number; limit?: number; q?: string }) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.q) queryParams.append("q", params.q);

        const url = queryParams.toString()
          ? `${this.basePath}?${queryParams.toString()}`
          : this.basePath;

        const response = await ApiClient.get<PaginatedResponse<TireInspection>>(
          url
        );
        return response;
      },
      "TireInspectionsService",
      "getAll",
      { params }
    );
  }

  async getByTire(tireId: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const response = await ApiClient.get<TireInspection[]>(
          `${this.basePath}/tire/${tireId}`
        );
        return response;
      },
      "TireInspectionsService",
      "getByTire",
      { tireId }
    );
  }
}

export const TireInspectionsService = new TireInspectionsServiceClass();
```

### tire-reports.service.ts

```typescript
// filepath: sae-frontend/lib/api/tires/tire-reports.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";

export interface TireReportFilter {
  brand?: string;
}

export interface AverageLifeReport {
  count: number;
  averageKm: number;
}

export interface CostPerKmReport {
  tireId: number;
  brand: string;
  totalCost: number;
  km: number;
  costPerKm: number | null;
}

export interface OverRecappedReport {
  tireId: number;
  recapCount: number;
}

export interface BrandRankingReport {
  brand: string;
  avgKm: number;
}

export interface YearlyRecapReport {
  year: number;
  totalRecaps: number;
  totalCost: number;
  costByBrand: Record<string, number>;
}

class TireReportsServiceClass {
  private basePath = "/tires/reports";

  async getAverageLife(filter?: TireReportFilter) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const params = new URLSearchParams();
        if (filter?.brand) params.append("brand", filter.brand);

        return ApiClient.get<AverageLifeReport>(
          `${this.basePath}/average-life?${params.toString()}`
        );
      },
      "TireReportsService",
      "getAverageLife",
      { filter }
    );
  }

  async getCostPerKm(filter?: TireReportFilter) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const params = new URLSearchParams();
        if (filter?.brand) params.append("brand", filter.brand);

        return ApiClient.get<CostPerKmReport[]>(
          `${this.basePath}/cost-per-km?${params.toString()}`
        );
      },
      "TireReportsService",
      "getCostPerKm",
      { filter }
    );
  }

  async getOverRecapped(threshold = 2) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        return ApiClient.get<OverRecappedReport[]>(
          `${this.basePath}/over-recap?threshold=${threshold}`
        );
      },
      "TireReportsService",
      "getOverRecapped",
      { threshold }
    );
  }

  async getBrandRanking() {
    return ApiErrorHandler.handleApiCall(
      async () => {
        return ApiClient.get<BrandRankingReport[]>(
          `${this.basePath}/brand-ranking`
        );
      },
      "TireReportsService",
      "getBrandRanking"
    );
  }

  async getYearlyRecap(year: number) {
    return ApiErrorHandler.handleApiCall(
      async () => {
        return ApiClient.get<YearlyRecapReport>(
          `${this.basePath}/yearly-recaps?year=${year}`
        );
      },
      "TireReportsService",
      "getYearlyRecap",
      { year }
    );
  }
}

export const TireReportsService = new TireReportsServiceClass();
```

### index.ts

```typescript
// filepath: sae-frontend/lib/api/tires/index.ts

export * from "./tires.service";
export * from "./tire-models.service";
export * from "./tire-sizes.service";
export * from "./tire-assignments.service";
export * from "./tire-rotations.service";
export * from "./tire-recaps.service";
export * from "./tire-inspections.service";
export * from "./tire-events.service";
export * from "./tire-reports.service";
export * from "./tire-positions.service";
```

## Hooks

### useTires.ts

```typescript
// filepath: sae-frontend/lib/hooks/useTires.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  TiresService,
  TireSizesService,
  TireSizeAliasesService,
  TireModelsService,
  TirePositionConfigsService,
  TireAssignmentsService,
  TireInspectionsService,
  TireRecapsService,
  TireRotationsService,
  TireEventsService,
} from "@/lib/api/tires";
import { EquipmentAxlesService } from "@/lib/api/equipments";
import {
  CreateTireDto,
  UpdateTireDto,
  CreateTireSizeDto,
  UpdateTireSizeDto,
  CreateTireSizeAliasDto,
  UpdateTireSizeAliasDto,
  CreateTireModelDto,
  UpdateTireModelDto,
} from "@/lib/types/domain/tire";

// Tire Models
export function useTireModels(
  accessToken: string,
  params?: { page?: number; limit?: number; brandId?: number }
) {
  return useQuery({
    queryKey: [
      "tire-models",
      params?.page ?? 1,
      params?.limit ?? 10,
      params?.brandId ?? "",
    ],
    queryFn: () => TireModelsService.getAll(params),
    enabled: !!accessToken,
  });
}

export function useTireModelDetail(
  id: number | undefined,
  accessToken: string
) {
  return useQuery({
    queryKey: ["tire-models", id],
    queryFn: () => TireModelsService.getById(id as number),
    enabled: !!accessToken && typeof id === "number",
  });
}

export function useCreateTireModel(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTireModelDto) => TireModelsService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tire-models"] });
    },
  });
}

export function useUpdateTireModel(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateTireModelDto }) =>
      TireModelsService.update(vars.id, vars.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["tire-models"] });
      qc.invalidateQueries({ queryKey: ["tire-models", vars.id] });
    },
  });
}

export function useDeleteTireModel(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => TireModelsService.delete(id),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["tire-models"] });
      qc.invalidateQueries({ queryKey: ["tire-models", id] });
    },
  });
}

// Tire Sizes
export function useTireSizes(
  accessToken: string,
  params?: { page?: number; limit?: number; query?: string }
) {
  return useQuery({
    queryKey: [
      "tire-sizes",
      params?.page ?? 1,
      params?.limit ?? 10,
      params?.query ?? "",
    ],
    queryFn: () => TireSizesService.getAll(params),
    enabled: !!accessToken,
  });
}

export function useTireSizeDetail(id: number | undefined, accessToken: string) {
  return useQuery({
    queryKey: ["tire-sizes", id],
    queryFn: () => TireSizesService.getById(id as number),
    enabled: !!accessToken && typeof id === "number",
  });
}

export function useCreateTireSize(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTireSizeDto) => TireSizesService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tire-sizes"] });
    },
  });
}

export function useUpdateTireSize(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateTireSizeDto }) =>
      TireSizesService.update(vars.id, vars.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["tire-sizes"] });
      qc.invalidateQueries({ queryKey: ["tire-sizes", vars.id] });
    },
  });
}

export function useDeleteTireSize(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => TireSizesService.delete(id),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["tire-sizes"] });
      qc.invalidateQueries({ queryKey: ["tire-sizes", id] });
    },
  });
}

// Tire Size Aliases
export function useTireSizeAliases(sizeId: number, accessToken: string) {
  return useQuery({
    queryKey: ["tire-size-aliases", sizeId],
    queryFn: () => TireSizeAliasesService.getBySize(sizeId),
    enabled: !!accessToken && !!sizeId,
  });
}

export function useCreateTireSizeAlias(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTireSizeAliasDto) =>
      TireSizeAliasesService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tire-sizes"] });
      qc.invalidateQueries({ queryKey: ["tire-size-aliases"] });
    },
  });
}

export function useUpdateTireSizeAlias(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateTireSizeAliasDto }) =>
      TireSizeAliasesService.update(vars.id, vars.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["tire-sizes"] });
      qc.invalidateQueries({ queryKey: ["tire-size-aliases"] });
      qc.invalidateQueries({ queryKey: ["tire-size-aliases", vars.id] });
    },
  });
}

export function useDeleteTireSizeAlias(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => TireSizeAliasesService.delete(id),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["tire-sizes"] });
      qc.invalidateQueries({ queryKey: ["tire-size-aliases"] });
      qc.invalidateQueries({ queryKey: ["tire-size-aliases", id] });
    },
  });
}

// ===== TIRES =====

export function useTires(params?: {
  page?: number;
  limit?: number;
  status?: string;
  brandId?: number;
}) {
  return useQuery({
    queryKey: [
      "tires",
      params?.page ?? 1,
      params?.limit ?? 10,
      params?.status ?? "",
      params?.brandId ?? "",
    ],
    queryFn: () => TiresService.getAll(params).then((resp) => resp.data),
  });
}

export function useTireDetail(id: number | undefined, accessToken: string) {
  return useQuery({
    queryKey: ["tires", id],
    queryFn: () => TiresService.getById(id as number),
    enabled: !!accessToken && typeof id === "number",
  });
}

export function useCreateTire(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTireDto) => TiresService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tires"] });
    },
  });
}

export function useUpdateTire(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateTireDto }) =>
      TiresService.update(vars.id, vars.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["tires"] });
      qc.invalidateQueries({ queryKey: ["tires", vars.id] });
    },
  });
}

export function useDeleteTire(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => TiresService.delete(id),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["tires"] });
      qc.invalidateQueries({ queryKey: ["tires", id] });
    },
  });
}

// ===== TIRE POSITION CONFIGS =====

export function useTirePositionConfigs(
  accessToken: string,
  params?: { axleId?: number }
) {
  return useQuery({
    queryKey: ["tire-position-configs", params?.axleId ?? ""],
    queryFn: () => TirePositionConfigsService.getAll(params),
    enabled: !!accessToken,
  });
}

export function useTirePositionConfigsByEquipment(equipmentId?: number) {
  return useQuery({
    queryKey: ["tire-position-configs-equipment", equipmentId ?? ""],
    queryFn: () =>
      TirePositionConfigsService.getByEquipment(equipmentId as number),
    enabled: !!equipmentId,
  });
}

// Hook to get positions by equipment using the new endpoint
export function useTirePositionsByEquipment(equipmentId?: number) {
  return useQuery({
    queryKey: ["tire-positions-equipment", equipmentId ?? ""],
    queryFn: () =>
      EquipmentAxlesService.getPositionsByEquipment(equipmentId as number),
    enabled: !!equipmentId,
  });
}

export function useTirePositionConfigDetail(
  id: number | undefined,
  accessToken: string
) {
  return useQuery({
    queryKey: ["tire-position-configs", id],
    queryFn: () => TirePositionConfigsService.getById(id as number),
    enabled: !!accessToken && typeof id === "number",
  });
}

export function useCreateTirePositionConfig(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      axleId: number;
      positionKey: string;
      side: string;
      isDual: boolean;
    }) => TirePositionConfigsService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tire-position-configs"] });
    },
  });
}

export function useUpdateTirePositionConfig(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      id: number;
      data: Partial<{
        axleId: number;
        positionKey: string;
        side: string;
        isDual: boolean;
      }>;
    }) => TirePositionConfigsService.update(vars.id, vars.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["tire-position-configs"] });
      qc.invalidateQueries({ queryKey: ["tire-position-configs", vars.id] });
    },
  });
}

export function useDeleteTirePositionConfig(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => TirePositionConfigsService.delete(id),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["tire-position-configs"] });
      qc.invalidateQueries({ queryKey: ["tire-position-configs", id] });
    },
  });
}

// ===== TIRE ASSIGNMENTS =====

export function useTireAssignments(params?: {
  equipmentId?: number;
  tireId?: number;
  status?: string;
}) {
  return useQuery({
    queryKey: [
      "tire-assignments",
      params?.equipmentId ?? "",
      params?.tireId ?? "",
      params?.status ?? "",
    ],
    queryFn: () => {
      if (params?.equipmentId) {
        // Get assignments for specific equipment
        return TireAssignmentsService.getOpenByEquipment(params.equipmentId);
      }
      // Get all assignments with filters
      return TireAssignmentsService.getAll(params);
    },
    enabled: !!params, // Only run if params are provided
  });
}

// ===== TIRE INSPECTIONS =====

export function useTireInspections(params?: {
  page?: number;
  limit?: number;
  q?: string;
}) {
  return useQuery({
    queryKey: [
      "tire-inspections",
      params?.page ?? 1,
      params?.limit ?? 10,
      params?.q ?? "",
    ],
    queryFn: () => TireInspectionsService.getAll(params),
  });
}

// ===== TIRE RECAPS =====

export function useTireRecaps(params?: {
  page?: number;
  limit?: number;
  q?: string;
}) {
  return useQuery({
    queryKey: [
      "tire-recaps",
      params?.page ?? 1,
      params?.limit ?? 10,
      params?.q ?? "",
    ],
    queryFn: () => TireRecapsService.getAll(),
  });
}

// ===== TIRE ROTATIONS =====

export function useTireRotations(params?: {
  page?: number;
  limit?: number;
  q?: string;
}) {
  return useQuery({
    queryKey: [
      "tire-rotations",
      params?.page ?? 1,
      params?.limit ?? 10,
      params?.q ?? "",
    ],
    queryFn: () => TireRotationsService.getAll(params),
  });
}

// ===== TIRE EVENTS =====

export function useTireEvents(params?: {
  page?: number;
  limit?: number;
  q?: string;
  eventType?: string;
  fromDate?: string;
  toDate?: string;
}) {
  return useQuery({
    queryKey: [
      "tire-events",
      params?.page ?? 1,
      params?.limit ?? 10,
      params?.q ?? "",
      params?.eventType ?? "",
      params?.fromDate ?? "",
      params?.toDate ?? "",
    ],
    queryFn: () => TireEventsService.getAll(params),
  });
}

// ===== TIRE REPORTS =====
import { TireReportsService } from "@/lib/api/tires";
import type {
  TireReportFilter,
  AverageLifeReport,
  CostPerKmReport,
  OverRecappedReport,
  BrandRankingReport,
  YearlyRecapReport,
} from "@/lib/api/tires/tire-reports.service";

export function useAverageLifeReport(filter?: TireReportFilter) {
  return useQuery({
    queryKey: ["tire-reports", "average-life", filter?.brand ?? ""],
    queryFn: () => TireReportsService.getAverageLife(filter),
  });
}

export function useCostPerKmReport(filter?: TireReportFilter) {
  return useQuery({
    queryKey: ["tire-reports", "cost-per-km", filter?.brand ?? ""],
    queryFn: () => TireReportsService.getCostPerKm(filter),
  });
}

export function useOverRecappedReport(threshold = 2) {
  return useQuery({
    queryKey: ["tire-reports", "over-recap", threshold],
    queryFn: () => TireReportsService.getOverRecapped(threshold),
  });
}

export function useBrandRankingReport() {
  return useQuery({
    queryKey: ["tire-reports", "brand-ranking"],
    queryFn: () => TireReportsService.getBrandRanking(),
  });
}

export function useYearlyRecapReport(year: number) {
  return useQuery({
    queryKey: ["tire-reports", "yearly-recaps", year],
    queryFn: () => TireReportsService.getYearlyRecap(year),
    enabled: !!year,
  });
}
```
