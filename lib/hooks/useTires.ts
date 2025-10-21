// filepath: sae-frontend/lib/hooks/useTires.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  TiresService,
  TireSizesService,
  TireSizeAliasesService,
  TireModelsService,
  EquipmentAxlesService,
  TirePositionConfigsService,
} from "@/lib/api/tires";
import {
  Tire,
  CreateTireDto,
  UpdateTireDto,
  TireSize,
  CreateTireSizeDto,
  UpdateTireSizeDto,
  TireSizeAlias,
  CreateTireSizeAliasDto,
  UpdateTireSizeAliasDto,
  TireModel,
  CreateTireModelDto,
  UpdateTireModelDto,
  EquipmentAxle,
  TirePositionConfig,
} from "@/lib/types/tire";
import { PaginatedResponse } from "@/lib/types/api";

// Tire Models
export function useTireModels(
  accessToken: string,
  params?: { page?: number; limit?: number }
) {
  return useQuery({
    queryKey: ["tire-models", params?.page ?? 1, params?.limit ?? 10],
    queryFn: () => TireModelsService.getTireModels(accessToken, params),
    enabled: !!accessToken,
  });
}

export function useTireModelDetail(
  id: number | undefined,
  accessToken: string
) {
  return useQuery({
    queryKey: ["tire-models", id],
    queryFn: () =>
      TireModelsService.getTireModelById(id as number, accessToken),
    enabled: !!accessToken && typeof id === "number",
  });
}

export function useCreateTireModel(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTireModelDto) =>
      TireModelsService.createTireModel(data, accessToken),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tire-models"] });
    },
  });
}

export function useUpdateTireModel(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateTireModelDto }) =>
      TireModelsService.updateTireModel(vars.id, vars.data, accessToken),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["tire-models"] });
      qc.invalidateQueries({ queryKey: ["tire-models", vars.id] });
    },
  });
}

export function useDeleteTireModel(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      TireModelsService.deleteTireModel(id, accessToken),
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
    queryFn: () => TireSizesService.getTireSizes(accessToken, params),
    enabled: !!accessToken,
  });
}

export function useTireSizeDetail(id: number | undefined, accessToken: string) {
  return useQuery({
    queryKey: ["tire-sizes", id],
    queryFn: () => TireSizesService.getTireSizeById(id as number, accessToken),
    enabled: !!accessToken && typeof id === "number",
  });
}

export function useCreateTireSize(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTireSizeDto) =>
      TireSizesService.createTireSize(data, accessToken),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tire-sizes"] });
    },
  });
}

export function useUpdateTireSize(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateTireSizeDto }) =>
      TireSizesService.updateTireSize(vars.id, vars.data, accessToken),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["tire-sizes"] });
      qc.invalidateQueries({ queryKey: ["tire-sizes", vars.id] });
    },
  });
}

export function useDeleteTireSize(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      TireSizesService.deleteTireSize(id, accessToken),
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
    queryFn: () => TireSizeAliasesService.getAliasesBySize(sizeId, accessToken),
    enabled: !!accessToken && !!sizeId,
  });
}

export function useCreateTireSizeAlias(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTireSizeAliasDto) =>
      TireSizeAliasesService.createTireSizeAlias(data, accessToken),
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
      TireSizeAliasesService.updateTireSizeAlias(
        vars.id,
        vars.data,
        accessToken
      ),
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
    mutationFn: (id: number) =>
      TireSizeAliasesService.deleteTireSizeAlias(id, accessToken),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["tire-sizes"] });
      qc.invalidateQueries({ queryKey: ["tire-size-aliases"] });
      qc.invalidateQueries({ queryKey: ["tire-size-aliases", id] });
    },
  });
}

// ===== TIRES =====

export function useTires(
  accessToken: string,
  params?: {
    status?: string;
    brand?: string;
    size?: string;
    page?: number;
    limit?: number;
    q?: string;
  }
) {
  return useQuery({
    queryKey: [
      "tires",
      params?.status ?? "",
      params?.brand ?? "",
      params?.size ?? "",
      params?.q ?? "",
      params?.page ?? 1,
      params?.limit ?? 10,
    ],
    queryFn: () => TiresService.getTires(accessToken, params),
    enabled: !!accessToken,
  });
}

export function useTireDetail(id: number | undefined, accessToken: string) {
  return useQuery({
    queryKey: ["tires", id],
    queryFn: () => TiresService.getTireById(id as number, accessToken),
    enabled: !!accessToken && typeof id === "number",
  });
}

export function useCreateTire(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTireDto) =>
      TiresService.createTire(data, accessToken),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tires"] });
    },
  });
}

export function useUpdateTire(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateTireDto }) =>
      TiresService.updateTire(vars.id, vars.data, accessToken),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["tires"] });
      qc.invalidateQueries({ queryKey: ["tires", vars.id] });
    },
  });
}

export function useDeleteTire(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => TiresService.deleteTire(id, accessToken),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["tires"] });
      qc.invalidateQueries({ queryKey: ["tires", id] });
    },
  });
}

export function useTireStats(accessToken: string) {
  return useQuery({
    queryKey: ["tire-stats"],
    queryFn: () => TiresService.getTireStats(accessToken),
    enabled: !!accessToken,
  });
}

// ===== EQUIPMENT AXLES =====

export function useEquipmentAxles(
  accessToken: string,
  params?: { equipmentId?: number }
) {
  return useQuery({
    queryKey: ["equipment-axles", params?.equipmentId ?? ""],
    queryFn: () => EquipmentAxlesService.getEquipmentAxles(accessToken, params),
    enabled: !!accessToken,
  });
}

export function useEquipmentAxleDetail(
  id: number | undefined,
  accessToken: string
) {
  return useQuery({
    queryKey: ["equipment-axles", id],
    queryFn: () =>
      EquipmentAxlesService.getEquipmentAxleById(id as number, accessToken),
    enabled: !!accessToken && typeof id === "number",
  });
}

export function useCreateEquipmentAxle(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      equipmentId: number;
      order: number;
      axleType: string;
      wheelCount: number;
      description?: string;
    }) => EquipmentAxlesService.createEquipmentAxle(data, accessToken),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipment-axles"] });
    },
  });
}

export function useUpdateEquipmentAxle(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      id: number;
      data: Partial<{
        equipmentId: number;
        order: number;
        axleType: string;
        wheelCount: number;
        description?: string;
      }>;
    }) =>
      EquipmentAxlesService.updateEquipmentAxle(
        vars.id,
        vars.data,
        accessToken
      ),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["equipment-axles"] });
      qc.invalidateQueries({ queryKey: ["equipment-axles", vars.id] });
    },
  });
}

export function useDeleteEquipmentAxle(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      EquipmentAxlesService.deleteEquipmentAxle(id, accessToken),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["equipment-axles"] });
      qc.invalidateQueries({ queryKey: ["equipment-axles", id] });
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
    queryFn: () =>
      TirePositionConfigsService.getTirePositionConfigs(accessToken, params),
    enabled: !!accessToken,
  });
}

export function useTirePositionConfigDetail(
  id: number | undefined,
  accessToken: string
) {
  return useQuery({
    queryKey: ["tire-position-configs", id],
    queryFn: () =>
      TirePositionConfigsService.getTirePositionConfigById(
        id as number,
        accessToken
      ),
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
    }) =>
      TirePositionConfigsService.createTirePositionConfig(data, accessToken),
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
    }) =>
      TirePositionConfigsService.updateTirePositionConfig(
        vars.id,
        vars.data,
        accessToken
      ),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["tire-position-configs"] });
      qc.invalidateQueries({ queryKey: ["tire-position-configs", vars.id] });
    },
  });
}

export function useDeleteTirePositionConfig(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      TirePositionConfigsService.deleteTirePositionConfig(id, accessToken),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["tire-position-configs"] });
      qc.invalidateQueries({ queryKey: ["tire-position-configs", id] });
    },
  });
}
