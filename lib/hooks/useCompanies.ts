// file: sae-frontend/lib/hooks/useCompanies.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateCompanyRelatedQueries } from "@/lib/utils/cache-invalidation";
import {
  useFindAllCompaniesQuery,
  useFindOneCompanyQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useRemoveCompanyMutation,
  useRestoreCompanyMutation,
  useFindAllBusinessCategoriesQuery,
  useFindOneBusinessCategoryQuery,
  useFindAllBusinessSubCategoriesQuery,
} from "@/lib/graphql/generated";
import { BusinessSubCategory } from "@/lib/types/domain/company";
import {
  CreateBusinessCategoryDto,
  UpdateBusinessCategoryDto,
} from "@/lib/types/domain/company";

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:3305/graphql";

// ========== Business Categories ==========
export function useBusinessCategories() {
  return useFindAllBusinessCategoriesQuery(
    { endpoint: GRAPHQL_ENDPOINT },
    {},
    {
      select: (data: any) => {
        const result = data?.findAllBusinessCategories;
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
  );
}

export function useBusinessCategory(id: number) {
  return useFindOneBusinessCategoryQuery(
    { endpoint: GRAPHQL_ENDPOINT },
    { id },
    {
      select: (data: any) => {
        const result = data?.findOneBusinessCategory;
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
  );
}

export function useCreateBusinessCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateBusinessCategoryDto) => {
      const { BusinessCategoriesService } = await import("@/lib/api/companies");
      return BusinessCategoriesService.create(data);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["business-categories"] }),
  });
}

export function useUpdateBusinessCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateBusinessCategoryDto;
    }) => {
      const { BusinessCategoriesService } = await import("@/lib/api/companies");
      return BusinessCategoriesService.update(id, data);
    },
    onSuccess: (_d, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["business-categories"] });
      queryClient.invalidateQueries({ queryKey: ["business-category", id] });
    },
  });
}

export function useDeleteBusinessCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { BusinessCategoriesService } = await import("@/lib/api/companies");
      return BusinessCategoriesService.delete(id);
    },
    onSuccess: (_m, id) => {
      queryClient.invalidateQueries({ queryKey: ["business-categories"] });
      queryClient.invalidateQueries({ queryKey: ["business-category", id] });
    },
  });
}

export function useRestoreBusinessCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { BusinessCategoriesService } = await import("@/lib/api/companies");
      return BusinessCategoriesService.restore(id);
    },
    onSuccess: (_m, id) => {
      queryClient.invalidateQueries({ queryKey: ["business-categories"] });
      queryClient.invalidateQueries({ queryKey: ["business-category", id] });
    },
  });
}

// ========== Business SubCategories ==========
export function useBusinessSubCategories() {
  return useFindAllBusinessSubCategoriesQuery(
    { endpoint: GRAPHQL_ENDPOINT },
    {},
    {
      select: (data: any) => {
        const result = data?.findAllBusinessSubCategories;
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
  );
}

export function useBusinessSubCategory(id: number) {
  return useQuery<BusinessSubCategory, Error>({
    queryKey: ["business-subcategory", id],
    queryFn: async () => {
      const { BusinessSubCategoriesService } =
        await import("@/lib/api/companies");
      return BusinessSubCategoriesService.getById(id);
    },
    enabled: !!id,
  });
}

export function useCreateBusinessSubCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const { BusinessSubCategoriesService } =
        await import("@/lib/api/companies");
      return BusinessSubCategoriesService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-subcategories"] });
    },
  });
}

export function useUpdateBusinessSubCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const { BusinessSubCategoriesService } =
        await import("@/lib/api/companies");
      return BusinessSubCategoriesService.update(id, data);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["business-subcategories"] });
      queryClient.invalidateQueries({
        queryKey: ["business-subcategory", variables.id],
      });
    },
  });
}

export function useDeleteBusinessSubCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { BusinessSubCategoriesService } =
        await import("@/lib/api/companies");
      return BusinessSubCategoriesService.delete(id);
    },
    onSuccess: (_message, id) => {
      queryClient.invalidateQueries({ queryKey: ["business-subcategories"] });
      queryClient.invalidateQueries({ queryKey: ["business-subcategory", id] });
    },
  });
}

export function useRestoreBusinessSubCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { BusinessSubCategoriesService } =
        await import("@/lib/api/companies");
      return BusinessSubCategoriesService.restore(id);
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["business-subcategories"] });
      queryClient.invalidateQueries({ queryKey: ["business-subcategory", id] });
    },
  });
}

// ========== Companies ==========
export function useCompanies(params?: {
  skip?: number;
  take?: number;
  q?: string;
}) {
  return useFindAllCompaniesQuery(
    { endpoint: GRAPHQL_ENDPOINT },
    {
      skip: params?.skip ?? 0,
      take: params?.take ?? 10,
      q: params?.q,
    },
    {
      select: (data: any) => {
        const result = data?.findAllCompanies;
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
  );
}

export function useCompany(id: number) {
  return useFindOneCompanyQuery(
    { endpoint: GRAPHQL_ENDPOINT },
    { id },
    {
      select: (data: any) => {
        const result = data?.findOneCompany;
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
  );
}

export function useCreateCompany() {
  const queryClient = useQueryClient();
  return useCreateCompanyMutation(
    { endpoint: GRAPHQL_ENDPOINT },
    {
      onSuccess: () => {
        invalidateCompanyRelatedQueries(queryClient);
      },
    },
  );
}

export function useUpdateCompany() {
  const queryClient = useQueryClient();
  return useUpdateCompanyMutation(
    { endpoint: GRAPHQL_ENDPOINT },
    {
      onSuccess: (_data, variables) => {
        invalidateCompanyRelatedQueries(queryClient, Number(variables.id));
      },
    },
  );
}

export function useDeleteCompany() {
  const queryClient = useQueryClient();
  return useRemoveCompanyMutation(
    { endpoint: GRAPHQL_ENDPOINT },
    {
      onSuccess: (_message, id) => {
        invalidateCompanyRelatedQueries(queryClient, Number(id));
      },
    },
  );
}

export function useRestoreCompany() {
  const queryClient = useQueryClient();
  return useRestoreCompanyMutation(
    { endpoint: GRAPHQL_ENDPOINT },
    {
      onSuccess: (_data, id) => {
        queryClient.invalidateQueries({ queryKey: ["companies"] });
        queryClient.invalidateQueries({ queryKey: ["company", id] });
      },
    },
  );
}

// Backward compatibility aliases
export const useCreateBusinessSubcategory = useCreateBusinessSubCategory;
export const useUpdateBusinessSubcategory = useUpdateBusinessSubCategory;
export const useDeleteBusinessSubcategory = useDeleteBusinessSubCategory;
export const useRestoreBusinessSubcategory = useRestoreBusinessSubCategory;
export const useBusinessSubcategory = useBusinessSubCategory;
