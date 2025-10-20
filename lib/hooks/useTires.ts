// filepath: sae-frontend/lib/hooks/useTires.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  TireSizesService,
  TireSizeAliasesService,
  TireModelsService,
} from "@/lib/api/tires";
import {
  TireSize,
  CreateTireSizeDto,
  UpdateTireSizeDto,
  TireSizeAlias,
  CreateTireSizeAliasDto,
  UpdateTireSizeAliasDto,
  TireModel,
  CreateTireModelDto,
  UpdateTireModelDto,
} from "@/types/tire";
import { PaginatedResponse } from "@/types/api";

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
