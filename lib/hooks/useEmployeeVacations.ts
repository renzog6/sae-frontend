// filepath: sae-frontend/lib/hooks/useEmployeeVacations.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { EmployeeVacationsService } from "@/lib/api/employeeVacations";
import {
  EmployeeVacationFormData,
  UpdateEmployeeVacationFormData,
} from "@/lib/validations/employeeVacation";
import { EmployeeVacation } from "@/lib/types/employee";

export function useEmployeeVacations(page?: number, limit?: number) {
  return useQuery<EmployeeVacation[], Error>({
    queryKey: ["employeeVacations", page, limit],
    queryFn: () => EmployeeVacationsService.getEmployeeVacations(page, limit),
  });
}

export function useEmployeeVacation(id: number) {
  return useQuery<EmployeeVacation, Error>({
    queryKey: ["employeeVacation", id],
    queryFn: () => EmployeeVacationsService.getEmployeeVacationById(id),
    enabled: !!id,
  });
}

export function useCreateEmployeeVacation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vacationData: EmployeeVacationFormData) =>
      EmployeeVacationsService.createVacation(vacationData),
    onSuccess: () => {
      // Invalidar y refetch la lista de vacaciones de empleados
      queryClient.invalidateQueries({ queryKey: ["employeeVacations"] });
    },
  });
}

export function useUpdateEmployeeVacation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      vacationData,
    }: {
      id: number;
      vacationData: UpdateEmployeeVacationFormData;
    }) => EmployeeVacationsService.updateVacation(id, vacationData),
    onSuccess: () => {
      // Invalidar tanto la lista de vacaciones como la vacación individual
      queryClient.invalidateQueries({ queryKey: ["employeeVacations"] });
      queryClient.invalidateQueries({ queryKey: ["employeeVacation"] });
    },
  });
}

export function useDeleteEmployeeVacation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => EmployeeVacationsService.deleteVacation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeVacations"] });
    },
  });
}

export function useDownloadVacationPdf() {
  return useMutation({
    mutationFn: (id: number) =>
      EmployeeVacationsService.downloadVacationPdf(id),
  });
}

export function useExportVacationsToExcel() {
  return useMutation({
    mutationFn: (employeeId: number) =>
      EmployeeVacationsService.exportVacationsToExcel(employeeId),
  });
}

export function useExportEmployeesVacationsToExcel() {
  return useMutation({
    mutationFn: () =>
      EmployeeVacationsService.exportEmployeesVacationsToExcel(),
  });
}
