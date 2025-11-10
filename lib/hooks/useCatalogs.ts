//filepath: sae-frontend/lib/hooks/useCatalogs.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BrandsService, UnitsService } from "@/lib/api/catalogs";
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
    queryFn: async () => {
      const response = await BrandsService.getAll();
      return response.data;
    },
  });
}

export function useBrand(id: number) {
  return useQuery<Brand, Error>({
    queryKey: ["brand", id],
    queryFn: () => BrandsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BrandFormData) => BrandsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
}

export function useUpdateBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBrandFormData }) =>
      BrandsService.update(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      queryClient.invalidateQueries({ queryKey: ["brand", variables.id] });
    },
  });
}

export function useDeleteBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => BrandsService.delete(id),
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
    queryFn: () => UnitsService.getAll(),
  });
}

export function useUnit(id: number) {
  return useQuery<Unit, Error>({
    queryKey: ["unit", id],
    queryFn: () => UnitsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UnitFormData) => UnitsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
}

export function useUpdateUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUnitFormData }) =>
      UnitsService.update(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
      queryClient.invalidateQueries({ queryKey: ["unit", variables.id] });
    },
  });
}

export function useDeleteUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => UnitsService.delete(id),
    onSuccess: (_message, id) => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
      queryClient.invalidateQueries({ queryKey: ["unit", id] });
    },
  });
}
