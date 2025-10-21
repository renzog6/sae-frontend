// file: sae-frontend/lib/hooks/useCompanies.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BusinessCategoriesService,
  BusinessSubcategoriesService,
  CompaniesService,
} from "@/lib/api/companies";
import {
  BusinessCategory,
  BusinessSubcategory,
  Company,
} from "@/lib/types/company";
import {
  BusinessCategoryFormData,
  BusinessSubcategoryFormData,
  CompanyFormData,
  UpdateBusinessCategoryFormData,
  UpdateBusinessSubcategoryFormData,
  UpdateCompanyFormData,
} from "@/lib/validations/company";

// ========== Business Categories ==========
export function useBusinessCategories(accessToken: string) {
  return useQuery<BusinessCategory[], Error>({
    queryKey: ["business-categories"],
    queryFn: async () => {
      const resp = await BusinessCategoriesService.getCategories(accessToken);
      return Array.isArray(resp) ? resp : resp.data; // soporta paginado o arreglo plano
    },
    enabled: !!accessToken,
  });
}

export function useCreateBusinessCategory(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BusinessCategoryFormData) =>
      BusinessCategoriesService.createCategory(data, accessToken),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["business-categories"] }),
  });
}

export function useUpdateBusinessCategory(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateBusinessCategoryFormData;
    }) => BusinessCategoriesService.updateCategory(id, data, accessToken),
    onSuccess: (_d, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["business-categories"] });
      queryClient.invalidateQueries({ queryKey: ["business-category", id] });
    },
  });
}

export function useDeleteBusinessCategory(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      BusinessCategoriesService.deleteCategory(id, accessToken),
    onSuccess: (_m, id) => {
      queryClient.invalidateQueries({ queryKey: ["business-categories"] });
      queryClient.invalidateQueries({ queryKey: ["business-category", id] });
    },
  });
}

// ========== Business Subcategories ==========
export function useBusinessSubcategories(
  accessToken: string,
  params?: { categoryId?: number }
) {
  return useQuery<BusinessSubcategory[], Error>({
    queryKey: ["business-subcategories", params?.categoryId ?? "all"],
    queryFn: async () => {
      const resp = await BusinessSubcategoriesService.getSubcategories(
        accessToken,
        params
      );
      return Array.isArray(resp) ? resp : resp.data;
    },
    enabled: !!accessToken,
  });
}

export function useCreateBusinessSubcategory(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BusinessSubcategoryFormData) =>
      BusinessSubcategoriesService.createSubcategory(data, accessToken),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["business-subcategories"] }),
  });
}

export function useUpdateBusinessSubcategory(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateBusinessSubcategoryFormData;
    }) => BusinessSubcategoriesService.updateSubcategory(id, data, accessToken),
    onSuccess: (_d, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["business-subcategories"] });
      queryClient.invalidateQueries({ queryKey: ["business-subcategory", id] });
    },
  });
}

export function useDeleteBusinessSubcategory(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      BusinessSubcategoriesService.deleteSubcategory(id, accessToken),
    onSuccess: (_m, id) => {
      queryClient.invalidateQueries({ queryKey: ["business-subcategories"] });
      queryClient.invalidateQueries({ queryKey: ["business-subcategory", id] });
    },
  });
}

// ========== Companies ==========
export function useCompanies(
  accessToken: string,
  params?: { page?: number; limit?: number }
) {
  return useQuery<Company[], Error>({
    queryKey: ["companies", params?.page ?? 1, params?.limit ?? 50],
    queryFn: async () => {
      const resp = await CompaniesService.getCompanies(accessToken, params);
      return Array.isArray(resp) ? resp : resp.data;
    },
    enabled: !!accessToken,
  });
}

export function useCreateCompany(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CompanyFormData) =>
      CompaniesService.createCompany(data, accessToken),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["companies"] }),
  });
}

export function useUpdateCompany(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCompanyFormData }) =>
      CompaniesService.updateCompany(id, data, accessToken),
    onSuccess: (_d, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["company", id] });
    },
  });
}

export function useDeleteCompany(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => CompaniesService.deleteCompany(id, accessToken),
    onSuccess: (_m, id) => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["company", id] });
    },
  });
}
