// file: sae-frontend/lib/hooks/useContacts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ContactsService } from "@/lib/api/contacts";
import { Contact } from "@/lib/types/shared/contact";
import {
  ContactFormData,
  UpdateContactFormData,
} from "@/lib/validations/contact";

// ========== Queries ==========
export function useContacts(params?: { page?: number; limit?: number }) {
  return useQuery<Contact[], Error>({
    queryKey: ["contacts", params?.page ?? 1, params?.limit ?? 50],
    queryFn: async () => {
      const resp = await ContactsService.getAll(params);
      return Array.isArray(resp) ? resp : resp.data;
    },
  });
}

export function useContactsByPerson(
  personId: number,
  params?: { page?: number; limit?: number }
) {
  return useQuery<Contact[], Error>({
    queryKey: [
      "contacts-by-person",
      personId,
      params?.page ?? 1,
      params?.limit ?? 50,
    ],
    queryFn: async () => {
      const resp = await ContactsService.getContactsByPerson(personId, params);
      if (Array.isArray(resp)) return resp as any as Contact[];
      if (
        resp &&
        typeof resp === "object" &&
        "data" in resp &&
        Array.isArray((resp as any).data)
      ) {
        return (resp as any).data as Contact[];
      }
      return [] as Contact[];
    },
    enabled: !!personId,
  });
}

export function useContactsByCompany(
  companyId: number,
  params?: { page?: number; limit?: number }
) {
  return useQuery<Contact[], Error>({
    queryKey: [
      "contacts-by-company",
      companyId,
      params?.page ?? 1,
      params?.limit ?? 50,
    ],
    queryFn: async () => {
      const resp = await ContactsService.getContactsByCompany(
        companyId,
        params
      );
      // Handle different shapes and ensure we never return undefined
      if (Array.isArray(resp)) return resp;
      if (
        resp &&
        typeof resp === "object" &&
        "data" in resp &&
        Array.isArray((resp as any).data)
      ) {
        return (resp as any).data as Contact[];
      }
      return [] as Contact[];
    },
    enabled: !!companyId,
  });
}

export function useContact(id: number) {
  return useQuery<Contact, Error>({
    queryKey: ["contact", id],
    queryFn: () => ContactsService.getById(id),
    enabled: !!id,
  });
}

// ========== Mutations ==========
export function useCreateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ContactFormData) => ContactsService.create(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      // Invalidate all company-scoped contact lists
      queryClient.invalidateQueries({ queryKey: ["contacts-by-company"] });
      // Invalidate all person-scoped contact lists
      queryClient.invalidateQueries({ queryKey: ["contacts-by-person"] });
      if (variables?.companyId) {
        queryClient.invalidateQueries({
          queryKey: ["contacts-by-company", variables.companyId],
        });
      }
      if (variables?.personId) {
        queryClient.invalidateQueries({
          queryKey: ["contacts-by-person", variables.personId],
        });
      }
    },
  });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateContactFormData }) =>
      ContactsService.update(id, data),
    onSuccess: (_d, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["contact", id] });
      queryClient.invalidateQueries({ queryKey: ["contacts-by-company"] });
      queryClient.invalidateQueries({ queryKey: ["contacts-by-person"] });
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => ContactsService.delete(id),
    onSuccess: (_m, id) => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["contact", id] });
      queryClient.invalidateQueries({ queryKey: ["contacts-by-company"] });
      queryClient.invalidateQueries({ queryKey: ["contacts-by-person"] });
    },
  });
}
