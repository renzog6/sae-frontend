// filepath: sae-frontend/lib/hooks/useEmployeeVacations.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { EmployeeVacationsService } from "@/lib/api/employees";
import {
  EmployeeVacationFormData,
  UpdateEmployeeVacationFormData,
} from "@/lib/validations/employeeVacation";
import {
  EmployeeVacation,
  CreateEmployeeVacationDto,
  UpdateEmployeeVacationDto,
} from "@/lib/types/employee";

export function useEmployeeVacations(page?: number, limit?: number) {
  return useQuery<EmployeeVacation[], Error>({
    queryKey: ["employeeVacations", page, limit],
    queryFn: () => EmployeeVacationsService.getAll({ page, limit }),
  });
}

export function useEmployeeVacation(id: number) {
  return useQuery<EmployeeVacation, Error>({
    queryKey: ["employeeVacation", id],
    queryFn: () => EmployeeVacationsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateEmployeeVacation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vacationData: CreateEmployeeVacationDto) =>
      EmployeeVacationsService.create(vacationData),
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
      vacationData: UpdateEmployeeVacationDto;
    }) => EmployeeVacationsService.update(id, vacationData),
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
    mutationFn: (id: number) => EmployeeVacationsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeVacations"] });
    },
  });
}

export function useDownloadVacationPdf() {
  return useMutation({
    mutationFn: (id: number) => EmployeeVacationsService.downloadPdf(id),
  });
}
