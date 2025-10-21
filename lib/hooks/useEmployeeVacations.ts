// filepath: sae-frontend/lib/hooks/useEmployeeVacations.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { EmployeeVacationsService } from "@/lib/api/employeeVacations";
import {
  EmployeeVacationFormData,
  UpdateEmployeeVacationFormData,
} from "@/lib/validations/employeeVacation";
import { EmployeeVacation } from "@/lib/types/employee";

export function useEmployeeVacations(
  accessToken: string,
  page?: number,
  limit?: number
) {
  return useQuery<EmployeeVacation[], Error>({
    queryKey: ["employeeVacations", page, limit],
    queryFn: () =>
      EmployeeVacationsService.getEmployeeVacations(accessToken, page, limit),
    enabled: !!accessToken, // solo se ejecuta si hay token
  });
}

export function useEmployeeVacation(accessToken: string, id: number) {
  return useQuery<EmployeeVacation, Error>({
    queryKey: ["employeeVacation", id],
    queryFn: () =>
      EmployeeVacationsService.getEmployeeVacationById(id, accessToken),
    enabled: !!accessToken && !!id, // solo se ejecuta si hay token e ID
  });
}

export function useCreateEmployeeVacation(accessToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vacationData: EmployeeVacationFormData) =>
      EmployeeVacationsService.createVacation(vacationData, accessToken),
    onSuccess: () => {
      // Invalidar y refetch la lista de vacaciones de empleados
      queryClient.invalidateQueries({ queryKey: ["employeeVacations"] });
    },
  });
}

export function useUpdateEmployeeVacation(accessToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      vacationData,
    }: {
      id: number;
      vacationData: UpdateEmployeeVacationFormData;
    }) =>
      EmployeeVacationsService.updateVacation(id, vacationData, accessToken),
    onSuccess: () => {
      // Invalidar tanto la lista de vacaciones como la vacación individual
      queryClient.invalidateQueries({ queryKey: ["employeeVacations"] });
      queryClient.invalidateQueries({ queryKey: ["employeeVacation"] });
    },
  });
}

export function useDeleteEmployeeVacation(accessToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      EmployeeVacationsService.deleteVacation(id, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeVacations"] });
    },
  });
}

export function useDownloadVacationPdf(accessToken: string) {
  return useMutation({
    mutationFn: (id: number) =>
      EmployeeVacationsService.downloadVacationPdf(id, accessToken),
  });
}

export function useExportVacationsToExcel(accessToken: string) {
  return useMutation({
    mutationFn: (employeeId: number) =>
      EmployeeVacationsService.exportVacationsToExcel(employeeId, accessToken),
  });
}

export function useExportEmployeesVacationsToExcel(accessToken: string) {
  return useMutation({
    mutationFn: () =>
      EmployeeVacationsService.exportEmployeesVacationsToExcel(accessToken),
  });
}
