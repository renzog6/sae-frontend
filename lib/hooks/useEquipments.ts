// filepath: sae-frontend/lib/hooks/useEquipments.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateEquipmentRelatedQueries } from "@/lib/utils/cache-invalidation";
import {
  useFindAllEquipmentQuery,
  useFindOneEquipmentQuery,
  useRemoveEquipmentMutation,
  useRestoreEquipmentMutation,
  useHardDeleteEquipmentMutation,
} from "@/lib/graphql/generated";
import {
  EquipmentCategoriesService,
  EquipmentTypesService,
  EquipmentModelsService,
  EquipmentAxlesService,
} from "@/lib/api/equipments";
import { CreateAxleWithPositionsDto } from "@/lib/types/domain/equipment";

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:3305/graphql";

//==== EQUIPMENT =====
export const useEquipments = () => {
  return {
    useGetAll: (options?: {
      skip?: number;
      take?: number;
      q?: string;
      page?: number;
      limit?: number;
      status?: string;
    }) =>
      useFindAllEquipmentQuery(
        { endpoint: GRAPHQL_ENDPOINT },
        {
          skip: options?.page
            ? (options.page - 1) * (options.limit || 10)
            : (options?.skip ?? 0),
          take: options?.limit ?? options?.take ?? 10,
          q: options?.q,
        },
        {
          select: (data: any) => {
            const result = data?.findAllEquipment;
            if (result && "data" in result) {
              return {
                ...result,
                data: result.data.map((item: any) => ({
                  ...item,
                  __typename: undefined,
                })),
              };
            }
            return { data: [], meta: { total: 0, page: 0, limit: 0 } };
          },
        },
      ),
    useGetById: (id: number) =>
      useFindOneEquipmentQuery(
        { endpoint: GRAPHQL_ENDPOINT },
        { id },
        {
          select: (data: any) => {
            const result = data?.findOneEquipment;
            if (result) {
              return {
                ...result,
                __typename: undefined,
              };
            }
            return undefined;
          },
          enabled: !!id,
        },
      ),
    useCreate: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: async (data: any) => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${typeof window !== "undefined" ? localStorage.getItem("token") : ""}`,
              },
              body: JSON.stringify({
                query: `
                mutation CreateEquipment($input: CreateEquipmentDto!) {
                  createEquipment(input: $input) {
                    id
                    name
                    internalCode
                  }
                }
              `,
                variables: { input: data },
              }),
            },
          );
          const json = await response.json();
          if (json.errors) throw new Error(json.errors[0].message);
          return json.data.createEquipment;
        },
        onSuccess: () => {
          invalidateEquipmentRelatedQueries(queryClient);
        },
      });
    },
    useUpdate: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: any }) => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${typeof window !== "undefined" ? localStorage.getItem("token") : ""}`,
              },
              body: JSON.stringify({
                query: `
                mutation UpdateEquipment($id: Int!, $input: UpdateEquipmentDto!) {
                  updateEquipment(id: $id, input: $input) {
                    id
                    name
                    internalCode
                  }
                }
              `,
                variables: { id, input: data },
              }),
            },
          );
          const json = await response.json();
          if (json.errors) throw new Error(json.errors[0].message);
          return json.data.updateEquipment;
        },
        onSuccess: (_, variables) => {
          invalidateEquipmentRelatedQueries(queryClient, variables.id);
        },
      });
    },
    useRemove: () => {
      const queryClient = useQueryClient();
      return useRemoveEquipmentMutation(
        { endpoint: GRAPHQL_ENDPOINT },
        {
          onSuccess: () => {
            invalidateEquipmentRelatedQueries(queryClient);
          },
        },
      );
    },
    useRestore: () => {
      const queryClient = useQueryClient();
      return useRestoreEquipmentMutation(
        { endpoint: GRAPHQL_ENDPOINT },
        {
          onSuccess: () => {
            invalidateEquipmentRelatedQueries(queryClient);
          },
        },
      );
    },
    useHardDelete: () => {
      const queryClient = useQueryClient();
      return useHardDeleteEquipmentMutation(
        { endpoint: GRAPHQL_ENDPOINT },
        {
          onSuccess: () => {
            invalidateEquipmentRelatedQueries(queryClient);
          },
        },
      );
    },
  };
};

// ===== EQUIPMENT CATEGORIES (REST API for now) =====
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

//==== EQUIPMENT TYPES (REST API for now) =====
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

//==== EQUIPMENT MODELS (REST API for now) =====
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

//==== EQUIPMENT AXLES (REST API for now) =====
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
