// filepath: sae-frontend/lib/hooks/useTires.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  TiresService,
  TireSizesService,
  TireSizeAliasesService,
  TireModelsService,
  TirePositionConfigsService,
  TireAssignmentsService,
} from "@/lib/api/tires";
import { EquipmentService } from "@/lib/api/equipment";
import {
  CreateTireDto,
  UpdateTireDto,
  CreateTireSizeDto,
  UpdateTireSizeDto,
  CreateTireSizeAliasDto,
  UpdateTireSizeAliasDto,
  CreateTireModelDto,
  UpdateTireModelDto,
} from "@/lib/types/tire";

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
    queryFn: () => TiresService.getAll(params),
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
      EquipmentService.getEquipmentAxlePositions(equipmentId as number),
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
