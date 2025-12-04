//filepath: sae-frontend/lib/hooks/useCatalogs.ts
import { createApiHooks } from "@/lib/hooks/createApiHooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BrandsService, UnitsService } from "@/lib/api/catalogs";
import { Brand, Unit } from "@/lib/types/shared/catalogs";
import {
  CreateBrandDto,
  UpdateBrandDto,
  CreateUnitDto,
  UpdateUnitDto,
} from "@/lib/types/shared/catalogs";

// ===== Brands =====
export const useBrands = () =>
  createApiHooks<Brand, CreateBrandDto, UpdateBrandDto>(
    BrandsService,
    "brands"
  );

/**
 * Hook adicional para el método custom: restore
 */
export function useRestoreBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => BrandsService.restore(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      queryClient.invalidateQueries({ queryKey: ["brand", id] });
    },
  });
}

// ===== Units =====
export const useUnits = () =>
  createApiHooks<Unit, CreateUnitDto, UpdateUnitDto>(UnitsService, "units");

/**
 * Hook adicional para el método custom: restore
 */
export const useRestoreUnit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => UnitsService.restore(id),
    onSuccess: () => {
      // Refetch lists para mantener UI actualizada
      queryClient.invalidateQueries({ queryKey: ["units", "list"] });
    },
  });
};
