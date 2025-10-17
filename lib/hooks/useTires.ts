// filepath: sae-frontend/lib/hooks/useTires.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TireSizesService } from "@/lib/api/tires";
import { TireSize, CreateTireSizeDto, UpdateTireSizeDto } from "@/types/tire";
import { PaginatedResponse } from "@/types/api";

// Tire Sizes
export function useTireSizes(
  accessToken: string,
  params?: { page?: number; limit?: number }
) {
  return useQuery({
    queryKey: ["tire-sizes", params?.page ?? 1, params?.limit ?? 10],
    queryFn: () => TireSizesService.getTireSizes(accessToken),
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
