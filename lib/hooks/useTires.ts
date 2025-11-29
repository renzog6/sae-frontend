// filepath: sae-frontend/lib/hooks/useTires.ts
import { createApiHooks } from "@/lib/hooks/createApiHooks";
import { useQuery } from "@tanstack/react-query";
import {
  TiresService,
  TireSizesService,
  TireSizeAliasesService,
  TireModelsService,
  TirePositionsService,
  TireAssignmentsService,
  TireInspectionsService,
  TireRecapsService,
  TireRotationsService,
  TireEventsService,
  TireReportsService,
} from "@/lib/api/tires";

// ===== TIRES =====
export const useTires = () => {
  const base = createApiHooks(TiresService, "tires");

  const useGetByBrand = (brandId: number) =>
    useQuery({
      queryKey: ["tires", "byBrand", brandId],
      queryFn: () => TiresService.getAll({ brandId }),
      enabled: !!brandId,
    });

  return {
    ...base,
    useGetByBrand,
  };
};

// ===== TIRE MODELS =====
export const useTireModels = () => {
  const base = createApiHooks(TireModelsService, "tireModels");

  const useGetByBrand = (brandId: number) =>
    useQuery({
      queryKey: ["tireModels", "byBrand", brandId],
      queryFn: () => TireModelsService.getAll({ brandId }),
      enabled: !!brandId,
    });

  return {
    ...base,
    useGetByBrand,
  };
};

// ===== TIRE SIZES =====
export const useTireSizes = () => {
  const base = createApiHooks(TireSizesService, "tireSizes");

  return {
    ...base,
  };
};

// ===== TIRE SIZE ALIASES =====
export const useTireSizeAliases = () => {
  const base = createApiHooks(TireSizeAliasesService, "tireSizeAliases");

  const useGetBySize = (sizeId: number) =>
    useQuery({
      queryKey: ["tireSizeAliases", "bySize", sizeId],
      queryFn: () => TireSizeAliasesService.getBySize(sizeId),
      enabled: !!sizeId,
    });

  return {
    ...base,
    useGetBySize,
  };
};

// ===== TIRE POSITION CONFIGS =====
export const useTirePositions = () => {
  const base = createApiHooks(TirePositionsService, "tirePositions");

  const useGetByEquipment = (equipmentId: number) =>
    useQuery({
      queryKey: ["tirePositions", "byEquipment", equipmentId],
      queryFn: () => TirePositionsService.getByEquipment(equipmentId),
      enabled: !!equipmentId,
    });

  return {
    ...base,
    useGetByEquipment,
  };
};

// ===== TIRE ASSIGNMENTS =====
export const useTireAssignments = () => {
  const base = createApiHooks(TireAssignmentsService, "tireAssignments");

  const useGetOpen = () =>
    useQuery({
      queryKey: ["tireAssignments", "open"],
      queryFn: () => TireAssignmentsService.getOpen(),
    });

  const useGetOpenByEquipment = (
    equipmentId: number,
    page?: number,
    limit?: number
  ) =>
    useQuery({
      queryKey: [
        "tireAssignments",
        "openByEquipment",
        equipmentId,
        page,
        limit,
      ],
      queryFn: () =>
        TireAssignmentsService.getOpenByEquipment(equipmentId, { page, limit }),
      enabled: !!equipmentId,
    });

  return {
    ...base,
    useGetOpen,
    useGetOpenByEquipment,
  };
};

// ===== TIRE INSPECTIONS =====
export const useTireInspections = () => {
  const base = createApiHooks(TireInspectionsService, "tireInspections");

  const useGetByTire = (tireId: number) =>
    useQuery({
      queryKey: ["tireInspections", "byTire", tireId],
      queryFn: () => TireInspectionsService.getByTire(tireId),
      enabled: !!tireId,
    });

  return {
    ...base,
    useGetByTire,
  };
};

// ===== TIRE RECAPS =====
export const useTireRecaps = () => {
  const base = createApiHooks(TireRecapsService, "tireRecaps");

  const useGetByTire = (tireId: number) =>
    useQuery({
      queryKey: ["tireRecaps", "byTire", tireId],
      queryFn: () => TireRecapsService.getByTire(tireId),
      enabled: !!tireId,
    });

  return {
    ...base,
    useGetByTire,
  };
};

// ===== TIRE ROTATIONS =====
export const useTireRotations = () => {
  const base = createApiHooks(TireRotationsService, "tireRotations");

  const useGetByTire = (tireId: number) =>
    useQuery({
      queryKey: ["tireRotations", "byTire", tireId],
      queryFn: () => TireRotationsService.getByTire(tireId),
      enabled: !!tireId,
    });

  return {
    ...base,
    useGetByTire,
  };
};

// ===== TIRE EVENTS =====
export const useTireEvents = () => {
  const base = createApiHooks(TireEventsService, "tireEvents");

  const useGetByTire = (tireId: number) =>
    useQuery({
      queryKey: ["tireEvents", "byTire", tireId],
      queryFn: () => TireEventsService.getByTire(tireId),
      enabled: !!tireId,
    });

  return {
    ...base,
    useGetByTire,
  };
};

// ===== TIRE REPORTS =====
export const useTireReports = () => {
  const useAverageLife = (brand?: string) =>
    useQuery({
      queryKey: ["tireReports", "averageLife", brand ?? "all"],
      queryFn: () => TireReportsService.getAverageLife({ brand }),
    });

  const useCostPerKm = (brand?: string) =>
    useQuery({
      queryKey: ["tireReports", "costPerKm", brand ?? "all"],
      queryFn: () => TireReportsService.getCostPerKm({ brand }),
    });

  const useOverRecapped = (threshold = 2) =>
    useQuery({
      queryKey: ["tireReports", "overRecapped", threshold],
      queryFn: () => TireReportsService.getOverRecapped(threshold),
    });

  const useBrandRanking = () =>
    useQuery({
      queryKey: ["tireReports", "brandRanking"],
      queryFn: () => TireReportsService.getBrandRanking(),
    });

  const useYearlyRecap = (year: number) =>
    useQuery({
      queryKey: ["tireReports", "yearlyRecap", year],
      queryFn: () => TireReportsService.getYearlyRecap(year),
      enabled: !!year,
    });

  return {
    useAverageLife,
    useCostPerKm,
    useOverRecapped,
    useBrandRanking,
    useYearlyRecap,
  };
};
