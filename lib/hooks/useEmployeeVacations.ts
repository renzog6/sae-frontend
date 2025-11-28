// filepath: sae-frontend/lib/hooks/useEmployeeVacations.ts
import { createApiHooks } from "@/lib/hooks/createApiHooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EmployeeVacationsService } from "@/lib/api/employees";

/**
 * Hook base que provee: useGetAll, useGetById, useCreate, useUpdate, useDelete.
 */
const baseHooks = createApiHooks(EmployeeVacationsService, "employeeVacations");

/**
 * Hooks extendidos para métodos extra del servicio,
 * como descargar PDFs u otros endpoints que no son CRUD.
 */
export const useEmployeeVacations = () => {
  const qc = useQueryClient();

  const useDownloadPdf = () =>
    useMutation({
      mutationFn: (id: number) => EmployeeVacationsService.downloadPdf(id),
    });

  return {
    ...baseHooks,
    useDownloadPdf,
  };
};
