// file: sae-frontend/lib/hooks/useCompanies.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CompaniesService,
  BusinessCategoriesService,
  BusinessSubCategoriesService,
} from "@/lib/api/companies";
import {
  Company,
  BusinessCategory,
  BusinessSubCategory,
} from "@/lib/types/domain/company";
import {
  CompanyFormData,
  UpdateCompanyFormData,
  BusinessCategoryFormData,
  UpdateBusinessCategoryFormData,
  BusinessSubcategoryFormData,
  UpdateBusinessSubcategoryFormData,
} from "@/lib/validations/company";
import { BaseQueryParams } from "../types/core/api";

// ========== Business Categories ==========
export function useBusinessCategories(params?: BaseQueryParams) {
  return useQuery<BusinessCategory[], Error>({
    queryKey: ["business-categories", params],
    queryFn: async () => {
      const response = await BusinessCategoriesService.getAll();
      return response.data;
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

export function useRestoreBusinessCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => BusinessCategoriesService.restoreCategory(id),
    onSuccess: (_m, id) => {
      queryClient.invalidateQueries({ queryKey: ["business-categories"] });
      queryClient.invalidateQueries({ queryKey: ["business-category", id] });
    },
  });
}

// ========== Business SubCategories ==========
export function useBusinessSubCategories(params?: BaseQueryParams) {
  return useQuery<BusinessSubCategory[], Error>({
    queryKey: ["business-subcategories", params],
    queryFn: async () => {
      const response = await BusinessSubCategoriesService.getAll();
      return response.data;
    },
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
    mutationFn: (data: BusinessSubcategoryFormData) =>
      BusinessSubCategoriesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-subcategories"] });
    },
  });
}

export function useUpdateBusinessSubCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateBusinessSubcategoryFormData;
    }) => BusinessSubCategoriesService.update(id, data),
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
export function useCompanies(params?: BaseQueryParams) {
  return useQuery<Company[], Error>({
    queryKey: ["companies", params],
    queryFn: async () => {
      const response = await CompaniesService.getAll(params);
      return response.data;
    },
  });
}

export function useCompany(id: number) {
  return useQuery<Company, Error>({
    queryKey: ["company", id],
    queryFn: () => CompaniesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CompanyFormData) => CompaniesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
}

export function useUpdateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCompanyFormData }) =>
      CompaniesService.update(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["company", variables.id] });
    },
  });
}

export function useDeleteCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => CompaniesService.delete(id),
    onSuccess: (_message, id) => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["company", id] });
    },
  });
}

export function useRestoreCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => CompaniesService.restore(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["company", id] });
    },
  });
}

// Backward compatibility aliases
export const useCreateBusinessSubcategory = useCreateBusinessSubCategory;
export const useUpdateBusinessSubcategory = useUpdateBusinessSubCategory;
export const useDeleteBusinessSubcategory = useDeleteBusinessSubCategory;
export const useRestoreBusinessSubcategory = useRestoreBusinessSubCategory;
export const useBusinessSubcategory = useBusinessSubCategory;
