// filepath: sae-frontend/lib/hooks/usePersons.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PersonsService } from "@/lib/api/persons";
import { Person } from "@/types/employee";
import { PaginatedResponse } from "@/types/api";
import { CreatePersonFormData, UpdatePersonFormData } from "@/lib/validations/person";

export function usePersonsList(accessToken: string, params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["persons", params],
    queryFn: () => PersonsService.getPersons(accessToken, params),
    enabled: !!accessToken,
  });
}

export function usePersonDetail(id: number | undefined, accessToken: string) {
  return useQuery({
    queryKey: ["persons", id],
    queryFn: () => PersonsService.getPersonById(id as number, accessToken),
    enabled: !!accessToken && typeof id === "number",
  });
}

export function useCreatePerson(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["persons", "create"],
    mutationFn: (data: CreatePersonFormData) => PersonsService.createPerson(data, accessToken),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["persons"] });
    },
  });
}

export function useUpdatePerson(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["persons", "update"],
    mutationFn: (vars: { id: number; data: UpdatePersonFormData }) =>
      PersonsService.updatePerson(vars.id, vars.data, accessToken),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["persons"] });
      qc.invalidateQueries({ queryKey: ["persons", vars.id] });
    },
  });
}

export function useDeletePerson(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["persons", "delete"],
    mutationFn: (id: number) => PersonsService.deletePerson(id, accessToken),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ["persons"] });
      qc.invalidateQueries({ queryKey: ["persons", id] });
    },
  });
}
