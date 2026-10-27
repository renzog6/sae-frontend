// filepath: sae-frontend/lib/hooks/useEquipments.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateEquipmentRelatedQueries } from "@/lib/utils/cache-invalidation";
import {
  EquipmentsService,
  EquipmentCategoriesService,
  EquipmentTypesService,
  EquipmentModelsService,
  EquipmentAxlesService,
} from "@/lib/api/equipments";
import { CreateAxleWithPositionsDto } from "@/lib/types/domain/equipment";

//==== EQUIPMENT =====
export const useEquipments = () => {
  return {
    /**
     * Listado paginado de equipos.
     *
     * Acepta tanto `{ page, limit }` como la forma histórica `{ skip, take }`.
     * `status` se mantiene en la firma por compatibilidad, pero no se envía:
     * `BaseQueryDto` del backend no lo admite y el `ValidationPipe` global
     * rechazaría el request con 400. (Comportamiento idéntico al anterior.)
     */
    useGetAll: (options?: {
      skip?: number;
      take?: number;
      q?: string;
      page?: number;
      limit?: number;
      status?: string;
    }) => {
      const take = options?.limit ?? options?.take ?? 10;
      const page =
        options?.page ??
        (options?.skip && take ? Math.floor(options.skip / take) + 1 : 1);

      return useQuery({
        queryKey: ["equipments", "list", { page, limit: take, q: options?.q }],
        queryFn: () =>
          EquipmentsService.getAll({ page, limit: take, q: options?.q }),
      });
    },
    useGetById: (id: number) =>
      useQuery({
        queryKey: ["equipments", "detail", id],
        queryFn: () => EquipmentsService.getById(id),
        enabled: !!id,
      }),
    useCreate: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: (data: any) => EquipmentsService.create(data),
        onSuccess: () => {
          invalidateEquipmentRelatedQueries(queryClient);
        },
      });
    },
    useUpdate: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) =>
          EquipmentsService.update(id, data),
        onSuccess: (_, variables) => {
          invalidateEquipmentRelatedQueries(queryClient, variables.id);
        },
      });
    },
  };
};

// ===== EQUIPMENT CATEGORIES =====
export const useEquipmentCategories = () => {
  return {
    useGetAll: () =>
      useQuery({
        queryKey: ["equipmentCategories"],
        queryFn: () => EquipmentCategoriesService.getAll(),
      }),
    useGetById: (id: number) =>
      useQuery({
        queryKey: ["equipmentCategories", id],
        queryFn: () => EquipmentCategoriesService.getById(id),
        enabled: !!id,
      }),
    useCreate: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: (data: any) => EquipmentCategoriesService.create(data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["equipmentCategories"] });
        },
      });
    },
    useUpdate: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) =>
          EquipmentCategoriesService.update(id, data),
        onSuccess: (_, variables) => {
          queryClient.invalidateQueries({ queryKey: ["equipmentCategories"] });
          queryClient.invalidateQueries({
            queryKey: ["equipmentCategories", variables.id],
          });
        },
      });
    },
    useDelete: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: (id: number) => EquipmentCategoriesService.delete(id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["equipmentCategories"] });
        },
      });
    },
  };
};

//==== EQUIPMENT TYPES =====
export const useEquipmentTypes = () => {
  return {
    useGetAll: (options?: { skip?: number; take?: number; q?: string }) =>
      useQuery({
        queryKey: ["equipmentTypes", options?.skip, options?.take],
        queryFn: () => EquipmentTypesService.getAll(options),
      }),
    useGetByCategory: (categoryId: number) =>
      useQuery({
        queryKey: ["equipmentTypes", "byCategory", categoryId],
        queryFn: () => EquipmentTypesService.getByCategory(categoryId),
        enabled: !!categoryId,
      }),
  };
};

//==== EQUIPMENT MODELS =====
export const useEquipmentModels = () => {
  return {
    useGetAll: (options?: {
      skip?: number;
      take?: number;
      q?: string;
      typeId?: number;
    }) =>
      useQuery({
        queryKey: [
          "equipmentModels",
          options?.skip,
          options?.take,
          options?.typeId,
        ],
        queryFn: () => EquipmentModelsService.getAll(options),
      }),
    useGetByType: (typeId: number) =>
      useQuery({
        queryKey: ["equipmentModels", "byType", typeId],
        queryFn: () => EquipmentModelsService.getByType(typeId),
        enabled: !!typeId,
      }),
  };
};

//==== EQUIPMENT AXLES =====
export const useEquipmentAxles = () => {
  // GET ALL
  const useGetAll = (filter?: { equipmentId?: number }) =>
    useQuery({
      queryKey: ["equipmentAxles", filter?.equipmentId],
      queryFn: () => EquipmentAxlesService.getAll(filter),
    });

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
    useGetAll,
    useCreateAxleWithPositions,
    useAxlePositionsByEquipment,
  };
};
