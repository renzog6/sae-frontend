// filepath: sae-frontend/lib/hooks/useEmployees.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { EmployeesService } from "@/lib/api/employees";
import { Employee, EmployeeCategory, EmployeePosition } from "@/types/employee";
import { PaginatedResponse } from "@/types/api";
import {
  CreateEmployeeFormData,
  UpdateEmployeeFormData,
  EmployeeCategoryFormData,
  UpdateEmployeeCategoryFormData,
  EmployeePositionFormData,
  UpdateEmployeePositionFormData,
} from "@/lib/validations/employee";

// Hook to fetch employees list
export function useEmployeesList(
  accessToken: string,
  params?: { page?: number; limit?: number; q?: string; status?: string }
) {
  return useQuery({
    queryKey: ["employees", params?.page ?? 1, params?.limit ?? 10, params?.q ?? "", params?.status ?? ""],
    queryFn: () => EmployeesService.getEmployees(accessToken, params),
    enabled: !!accessToken,
  });
}

export function useEmployeeDetail(id: number | undefined, accessToken: string) {
  return useQuery({
    queryKey: ["employees", id],
    queryFn: () => EmployeesService.getEmployeeById(id as number, accessToken),
    enabled: !!accessToken && typeof id === "number",
  });
}

export function useCreateEmployee(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["employees", "create"],
    mutationFn: (data: CreateEmployeeFormData) =>
      EmployeesService.createEmployee(data, accessToken),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employees"] });
    },
  });
}

export function useUpdateEmployee(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["employees", "update"],
    mutationFn: (vars: { id: number; data: UpdateEmployeeFormData }) =>
      EmployeesService.updateEmployee(vars.id, vars.data, accessToken),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["employees"] });
      qc.invalidateQueries({ queryKey: ["employees", vars.id] });
    },
  });
}

export function useDeleteEmployee(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["employees", "delete"],
    mutationFn: (id: number) =>
      EmployeesService.deleteEmployee(id, accessToken),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ["employees"] });
      qc.invalidateQueries({ queryKey: ["employees", id] });
    },
  });
}

// Categories
export function useEmployeeCategories(accessToken: string) {
  return useQuery<EmployeeCategory[], Error>({
    queryKey: ["employee-categories"],
    queryFn: () => EmployeesService.getCategories(accessToken),
    enabled: !!accessToken,
  });
}

export function useCreateEmployeeCategory(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: EmployeeCategoryFormData) =>
      EmployeesService.createCategory(data, accessToken),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee-categories"] });
    },
  });
}

export function useUpdateEmployeeCategory(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateEmployeeCategoryFormData }) =>
      EmployeesService.updateCategory(vars.id, vars.data, accessToken),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["employee-categories"] });
      qc.invalidateQueries({ queryKey: ["employee-category", vars.id] });
    },
  });
}

export function useDeleteEmployeeCategory(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      EmployeesService.deleteCategory(id, accessToken),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["employee-categories"] });
      qc.invalidateQueries({ queryKey: ["employee-category", id] });
    },
  });
}

// Positions
export function useEmployeePositions(accessToken: string) {
  return useQuery<EmployeePosition[], Error>({
    queryKey: ["employee-positions"],
    queryFn: () => EmployeesService.getPositions(accessToken),
    enabled: !!accessToken,
  });
}

export function useCreateEmployeePosition(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: EmployeePositionFormData) =>
      EmployeesService.createPosition(data, accessToken),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee-positions"] });
    },
  });
}

export function useUpdateEmployeePosition(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; data: UpdateEmployeePositionFormData }) =>
      EmployeesService.updatePosition(vars.id, vars.data, accessToken),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["employee-positions"] });
      qc.invalidateQueries({ queryKey: ["employee-position", vars.id] });
    },
  });
}

export function useDeleteEmployeePosition(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      EmployeesService.deletePosition(id, accessToken),
    onSuccess: (_message, id) => {
      qc.invalidateQueries({ queryKey: ["employee-positions"] });
      qc.invalidateQueries({ queryKey: ["employee-position", id] });
    },
  });
}

// filepath: sae-frontend/lib/hooks/useEmployees.ts
