// file: sae-frontend/lib/hooks/useCompanies.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateCompanyRelatedQueries } from "@/lib/utils/cache-invalidation";
import {
  BusinessCategoriesService,
  BusinessSubCategoriesService,
  CompaniesService,
} from "@/lib/api/companies";
import {
  BusinessSubCategory,
  CreateBusinessCategoryDto,
  UpdateBusinessCategoryDto,
} from "@/lib/types/domain/company";

// ========== Business Categories ==========
export function useBusinessCategories() {
  return useQuery({
    queryKey: ["business-categories", "list", "all"],
    queryFn: () => BusinessCategoriesService.getAllNoLimit(),
  });
}

export function useBusinessCategory(id: number) {
  return useQuery({
    queryKey: ["business-category", id],
    queryFn: () => BusinessCategoriesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateBusinessCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBusinessCategoryDto) =>
      BusinessCategoriesService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["business-categories"] }),
  });
}

export function useUpdateBusinessCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateBusinessCategoryDto;
    }) => BusinessCategoriesService.update(id, data),
    onSuccess: (_d, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["business-categories"] });
      queryClient.invalidateQueries({ queryKey: ["business-category", id] });
    },
  });
}

export function useDeleteBusinessCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => BusinessCategoriesService.delete(id),
    onSuccess: (_m, id) => {
      queryClient.invalidateQueries({ queryKey: ["business-categories"] });
      queryClient.invalidateQueries({ queryKey: ["business-category", id] });
    },
  });
}

export function useRestoreBusinessCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => BusinessCategoriesService.restore(id),
    onSuccess: (_m, id) => {
      queryClient.invalidateQueries({ queryKey: ["business-categories"] });
      queryClient.invalidateQueries({ queryKey: ["business-category", id] });
    },
  });
}

// ========== Business SubCategories ==========
export function useBusinessSubCategories() {
  return useQuery({
    queryKey: ["business-subcategories", "list", "all"],
    queryFn: () => BusinessSubCategoriesService.getAllNoLimit(),
  });
}

export function useBusinessSubCategory(id: number) {
  return useQuery<BusinessSubCategory, Error>({
    queryKey: ["business-subcategory", id],
    queryFn: () => BusinessSubCategoriesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateBusinessSubCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => BusinessSubCategoriesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-subcategories"] });
    },
  });
}

export function useUpdateBusinessSubCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      BusinessSubCategoriesService.update(id, data),
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
    mutationFn: (id: number) => BusinessSubCategoriesService.delete(id),
    onSuccess: (_message, id) => {
      queryClient.invalidateQueries({ queryKey: ["business-subcategories"] });
      queryClient.invalidateQueries({ queryKey: ["business-subcategory", id] });
    },
  });
}

export function useRestoreBusinessSubCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => BusinessSubCategoriesService.restore(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["business-subcategories"] });
      queryClient.invalidateQueries({ queryKey: ["business-subcategory", id] });
    },
  });
}

// ========== Companies ==========
/**
 * Listado paginado de empresas.
 *
 * Nota: se conserva la firma histórica `{ skip, take, q }` para no romper a los
 * consumidores existentes, traduciéndola a los parámetros REST `{ page, limit }`.
 */
export function useCompanies(params?: {
  skip?: number;
  take?: number;
  q?: string;
}) {
  const take = params?.take ?? 10;
  const page =
    params?.skip && take ? Math.floor(params.skip / take) + 1 : 1;

  return useQuery({
    queryKey: ["companies", "list", { page, limit: take, q: params?.q }],
    queryFn: () => CompaniesService.getAll({ page, limit: take, q: params?.q }),
  });
}

export function useCompany(id: number) {
  return useQuery({
    queryKey: ["companies", "detail", id],
    queryFn: () => CompaniesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => CompaniesService.create(data),
    onSuccess: () => {
      invalidateCompanyRelatedQueries(queryClient);
    },
  });
}

export function useUpdateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: any }) =>
      CompaniesService.update(id, dto),
    onSuccess: (_data, variables) => {
      invalidateCompanyRelatedQueries(queryClient, variables.id);
    },
  });
}

export function useDeleteCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => CompaniesService.delete(id),
    onSuccess: (_message, id) => {
      invalidateCompanyRelatedQueries(queryClient, id);
    },
  });
}

export function useRestoreCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => CompaniesService.restore(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["companies", "detail", id] });
    },
  });
}

// Backward compatibility aliases
export const useCreateBusinessSubcategory = useCreateBusinessSubCategory;
export const useUpdateBusinessSubcategory = useUpdateBusinessSubCategory;
export const useDeleteBusinessSubcategory = useDeleteBusinessSubCategory;
export const useRestoreBusinessSubcategory = useRestoreBusinessSubCategory;
export const useBusinessSubcategory = useBusinessSubCategory;
