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
export function useBusinessCategories() {
  return useQuery<BusinessCategory[], Error>({
    queryKey: ["business-categories"],
    queryFn: async () => {
      const resp = await BusinessCategoriesService.getCategories();
      return resp.data; // standardized backend response
    },
  });
}

export function useCreateBusinessCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BusinessCategoryFormData) =>
      BusinessCategoriesService.createCategory(data),
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
      data: UpdateBusinessCategoryFormData;
    }) => BusinessCategoriesService.updateCategory(id, data),
    onSuccess: (_d, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["business-categories"] });
      queryClient.invalidateQueries({ queryKey: ["business-category", id] });
    },
  });
}

export function useDeleteBusinessCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => BusinessCategoriesService.deleteCategory(id),
    onSuccess: (_m, id) => {
      queryClient.invalidateQueries({ queryKey: ["business-categories"] });
      queryClient.invalidateQueries({ queryKey: ["business-category", id] });
    },
  });
}

// ========== Business Subcategories ==========
export function useBusinessSubcategories(params?: { categoryId?: number }) {
  return useQuery<BusinessSubcategory[], Error>({
    queryKey: ["business-subcategories", params?.categoryId ?? "all"],
    queryFn: async () => {
      const resp = await BusinessSubcategoriesService.getSubcategories(params);
      return resp.data; // standardized backend response
    },
  });
}

export function useCreateBusinessSubcategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BusinessSubcategoryFormData) =>
      BusinessSubcategoriesService.createSubcategory(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["business-subcategories"] }),
  });
}

export function useUpdateBusinessSubcategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateBusinessSubcategoryFormData;
    }) => BusinessSubcategoriesService.updateSubcategory(id, data),
    onSuccess: (_d, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["business-subcategories"] });
      queryClient.invalidateQueries({ queryKey: ["business-subcategory", id] });
    },
  });
}

export function useDeleteBusinessSubcategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      BusinessSubcategoriesService.deleteSubcategory(id),
    onSuccess: (_m, id) => {
      queryClient.invalidateQueries({ queryKey: ["business-subcategories"] });
      queryClient.invalidateQueries({ queryKey: ["business-subcategory", id] });
    },
  });
}

// ========== Companies ==========
export function useCompanies(params?: { page?: number; limit?: number }) {
  return useQuery<Company[], Error>({
    queryKey: ["companies", params?.page ?? 1, params?.limit ?? 50],
    queryFn: async () => {
      const resp = await CompaniesService.getCompanies(params);
      return resp.data; // standardized backend response
    },
  });
}

export function useCreateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CompanyFormData) => CompaniesService.createCompany(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["companies"] }),
  });
}

export function useUpdateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCompanyFormData }) =>
      CompaniesService.updateCompany(id, data),
    onSuccess: (_d, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["company", id] });
    },
  });
}

export function useDeleteCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => CompaniesService.deleteCompany(id),
    onSuccess: (_m, id) => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["company", id] });
    },
  });
}
