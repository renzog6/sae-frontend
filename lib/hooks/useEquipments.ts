// filepath: sae-frontend/lib/hooks/useEquipments.ts
import { createApiHooks } from "@/lib/hooks/createApiHooks";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  EquipmentsService,
  EquipmentModelsService,
  EquipmentTypesService,
  EquipmentCategoriesService,
  EquipmentAxlesService,
} from "@/lib/api/equipments";
import { CreateAxleWithPositionsDto } from "@/lib/types/domain/equipment";
import { BaseQueryParams } from "@/lib/types/core/api";

// ===== EQUIPMENT AXLES =====
export const useEquipmentAxles = () => {
  const base = createApiHooks(EquipmentAxlesService, "equipmentAxles");

  // CREATE WITH POSITIONS
  const useCreateAxleWithPositions = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: CreateAxleWithPositionsDto) =>
        EquipmentAxlesService.createWithPositions(data),
      onSuccess: (_, variables) => {
        // invalidate both: axles list and positions list
        queryClient.invalidateQueries({
          queryKey: ["equipmentAxles", "list"],
        });

        if (variables.axle?.equipmentId) {
          queryClient.invalidateQueries({
            queryKey: [
              "equipmentAxles",
              "positions",
              variables.axle.equipmentId,
            ],
          });
        }
      },
    });
  };

  // GET POSITIONS BY EQUIPMENT
  const useAxlePositionsByEquipment = (equipmentId: number) => {
    return useQuery({
      queryKey: ["equipmentAxles", "positions", equipmentId],
      queryFn: () => EquipmentAxlesService.getPositionsByEquipment(equipmentId),
      enabled: !!equipmentId,
    });
  };

  return {
    ...base,
    useCreateAxleWithPositions,
    useAxlePositionsByEquipment,
  };
};

//==== EQUIPMENT CATEGORIES =====
// Si en el futuro querés agregar filtros, esto se puede extender.
export interface EquipmentCategoriesQueryParams extends BaseQueryParams {}

export const useEquipmentCategories = () => {
  const base = createApiHooks(
    EquipmentCategoriesService,
    "equipmentCategories"
  );

  // 🟦 Ejemplo de endpoint adicional (placeholder):
  // const useGetSomethingExtra = () => ...

  return {
    ...base,
    // useGetSomethingExtra, // <--- futuro
  };
};

//==== EQUIPMENT TYPES =====
export const useEquipmentTypes = () => {
  const base = createApiHooks(EquipmentTypesService, "equipmentTypes");

  const useGetByCategory = (categoryId: number) =>
    useQuery({
      queryKey: ["equipmentTypes", "byCategory", categoryId],
      queryFn: () => EquipmentTypesService.getByCategory(categoryId),
      enabled: !!categoryId,
    });

  return {
    ...base,
    useGetByCategory,
  };
};

//==== EQUIPMENT MODELS =====
export const useEquipmentModels = () => {
  const base = createApiHooks(EquipmentModelsService, "equipmentModels");

  const useGetByType = (typeId: number) =>
    useQuery({
      queryKey: ["equipmentModels", "byType", typeId],
      queryFn: () => EquipmentModelsService.getByType(typeId),
      enabled: !!typeId,
    });

  return {
    ...base,
    useGetByType,
  };
};

//==== EQUIPMENT =====
// Si en el futuro querés agregar filtros, esto se puede extender.
export interface EquipmentsQueryParams extends BaseQueryParams {}

export const useEquipments = () => {
  const base = createApiHooks(EquipmentsService, "equipments");

  // 🟦 Ejemplo de endpoint adicional (placeholder):
  // const useGetSomethingExtra = () => ...

  return {
    ...base,
    // useGetSomethingExtra, // <--- futuro
  };
};
