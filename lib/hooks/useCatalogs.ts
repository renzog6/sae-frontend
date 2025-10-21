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
export function useBrands(accessToken: string) {
  return useQuery<Brand[], Error>({
    queryKey: ["brands"],
    queryFn: () => CatalogsService.getBrands(accessToken),
    enabled: !!accessToken,
  });
}

export function useBrand(accessToken: string, id: number) {
  return useQuery<Brand, Error>({
    queryKey: ["brand", id],
    queryFn: () => CatalogsService.getBrandById(id, accessToken),
    enabled: !!accessToken && !!id,
  });
}

export function useCreateBrand(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BrandFormData) =>
      CatalogsService.createBrand(data, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
}

export function useUpdateBrand(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBrandFormData }) =>
      CatalogsService.updateBrand(id, data, accessToken),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      queryClient.invalidateQueries({ queryKey: ["brand", variables.id] });
    },
  });
}

export function useDeleteBrand(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => CatalogsService.deleteBrand(id, accessToken),
    onSuccess: (_message, id) => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      queryClient.invalidateQueries({ queryKey: ["brand", id] });
    },
  });
}

// ===== Units =====
export function useUnits(accessToken: string) {
  return useQuery<Unit[], Error>({
    queryKey: ["units"],
    queryFn: () => CatalogsService.getUnits(accessToken),
    enabled: !!accessToken,
  });
}

export function useUnit(accessToken: string, id: number) {
  return useQuery<Unit, Error>({
    queryKey: ["unit", id],
    queryFn: () => CatalogsService.getUnitById(id, accessToken),
    enabled: !!accessToken && !!id,
  });
}

export function useCreateUnit(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UnitFormData) =>
      CatalogsService.createUnit(data, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
}

export function useUpdateUnit(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUnitFormData }) =>
      CatalogsService.updateUnit(id, data, accessToken),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
      queryClient.invalidateQueries({ queryKey: ["unit", variables.id] });
    },
  });
}

export function useDeleteUnit(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => CatalogsService.deleteUnit(id, accessToken),
    onSuccess: (_message, id) => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
      queryClient.invalidateQueries({ queryKey: ["unit", id] });
    },
  });
}
