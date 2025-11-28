// filepath: sae-frontend/lib/hooks/usePersons.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PersonsService } from "@/lib/api/persons/persons.service";
import { Person } from "@/lib/types/domain/employee";
import { PaginatedResponse } from "@/lib/types/core/api";
import {
  CreatePersonFormData,
  UpdatePersonFormData,
} from "@/lib/validations/person";

export function usePersonsList(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["persons", params],
    queryFn: () => PersonsService.getAll(params),
  });
}

export function usePersonDetail(id: number | undefined) {
  return useQuery({
    queryKey: ["persons", id],
    queryFn: () => PersonsService.getById(id as number),
    enabled: typeof id === "number",
  });
}

export function useCreatePerson() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["persons", "create"],
    mutationFn: (data: CreatePersonFormData) => PersonsService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["persons"] });
    },
  });
}

export function useUpdatePerson() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["persons", "update"],
    mutationFn: (vars: { id: number; data: UpdatePersonFormData }) =>
      PersonsService.update(vars.id, vars.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["persons"] });
      qc.invalidateQueries({ queryKey: ["persons", vars.id] });
    },
  });
}

export function useDeletePerson() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["persons", "delete"],
    mutationFn: (id: number) => PersonsService.delete(id),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ["persons"] });
      qc.invalidateQueries({ queryKey: ["persons", id] });
    },
  });
}
