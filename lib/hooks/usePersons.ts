// filepath: sae-frontend/lib/hooks/usePersons.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PersonsService } from "@/lib/api/persons";
import { Person } from "@/lib/types/employee";
import { PaginatedResponse } from "@/lib/types/api";
import {
  CreatePersonFormData,
  UpdatePersonFormData,
} from "@/lib/validations/person";

export function usePersonsList(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["persons", params],
    queryFn: () => PersonsService.getPersons(params),
  });
}

export function usePersonDetail(id: number | undefined) {
  return useQuery({
    queryKey: ["persons", id],
    queryFn: () => PersonsService.getPersonById(id as number),
    enabled: typeof id === "number",
  });
}

export function useCreatePerson() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["persons", "create"],
    mutationFn: (data: CreatePersonFormData) =>
      PersonsService.createPerson(data),
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
      PersonsService.updatePerson(vars.id, vars.data),
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
    mutationFn: (id: number) => PersonsService.deletePerson(id),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ["persons"] });
      qc.invalidateQueries({ queryKey: ["persons", id] });
    },
  });
}
