// file: sae-frontend/lib/hooks/useCatalogs.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CatalogsService } from "@/lib/api/catalogs";
import { Brand, Unit } from "@/lib/types/catalog";
import {
  BrandFormData,
  UpdateBrandFormData,
  UnitFormData,
  UpdateUnitFormData,
} from "@/lib/validations/catalog";

// ===== Brands =====
export function useBrands() {
  return useQuery<Brand[], Error>({
    queryKey: ["brands"],
    queryFn: () => CatalogsService.getBrands(),
  });
}

export function useBrand(id: number) {
  return useQuery<Brand, Error>({
    queryKey: ["brand", id],
    queryFn: () => CatalogsService.getBrandById(id),
    enabled: !!id,
  });
}

export function useCreateBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BrandFormData) => CatalogsService.createBrand(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
}

export function useUpdateBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBrandFormData }) =>
      CatalogsService.updateBrand(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      queryClient.invalidateQueries({ queryKey: ["brand", variables.id] });
    },
  });
}

export function useDeleteBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => CatalogsService.deleteBrand(id),
    onSuccess: (_message, id) => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      queryClient.invalidateQueries({ queryKey: ["brand", id] });
    },
  });
}

// ===== Units =====
export function useUnits() {
  return useQuery<Unit[], Error>({
    queryKey: ["units"],
    queryFn: () => CatalogsService.getUnits(),
  });
}

export function useUnit(id: number) {
  return useQuery<Unit, Error>({
    queryKey: ["unit", id],
    queryFn: () => CatalogsService.getUnitById(id),
    enabled: !!id,
  });
}

export function useCreateUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UnitFormData) => CatalogsService.createUnit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
}

export function useUpdateUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUnitFormData }) =>
      CatalogsService.updateUnit(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
      queryClient.invalidateQueries({ queryKey: ["unit", variables.id] });
    },
  });
}

export function useDeleteUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => CatalogsService.deleteUnit(id),
    onSuccess: (_message, id) => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
      queryClient.invalidateQueries({ queryKey: ["unit", id] });
    },
  });
}
