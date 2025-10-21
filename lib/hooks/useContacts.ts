// file: sae-frontend/lib/hooks/useContacts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ContactsService } from "@/lib/api/contacts";
import { Contact } from "@/lib/types/contact";
import {
  ContactFormData,
  UpdateContactFormData,
} from "@/lib/validations/contact";

// ========== Queries ==========
export function useContacts(
  accessToken: string,
  params?: { page?: number; limit?: number }
) {
  return useQuery<Contact[], Error>({
    queryKey: ["contacts", params?.page ?? 1, params?.limit ?? 50],
    queryFn: async () => {
      const resp = await ContactsService.getContacts(accessToken, params);
      return Array.isArray(resp) ? resp : resp.data;
    },
    enabled: !!accessToken,
  });
}

export function useContactsByPerson(
  accessToken: string,
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
      const resp = await ContactsService.getContactsByPerson(
        accessToken,
        personId,
        params
      );
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
    enabled: !!accessToken && !!personId,
  });
}

export function useContactsByCompany(
  accessToken: string,
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
        accessToken,
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
    enabled: !!accessToken && !!companyId,
  });
}

export function useContact(accessToken: string, id: number) {
  return useQuery<Contact, Error>({
    queryKey: ["contact", id],
    queryFn: () => ContactsService.getContactById(id, accessToken),
    enabled: !!accessToken && !!id,
  });
}

// ========== Mutations ==========
export function useCreateContact(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ContactFormData) =>
      ContactsService.createContact(data, accessToken),
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

export function useUpdateContact(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateContactFormData }) =>
      ContactsService.updateContact(id, data, accessToken),
    onSuccess: (_d, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["contact", id] });
      queryClient.invalidateQueries({ queryKey: ["contacts-by-company"] });
      queryClient.invalidateQueries({ queryKey: ["contacts-by-person"] });
    },
  });
}

export function useDeleteContact(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => ContactsService.deleteContact(id, accessToken),
    onSuccess: (_m, id) => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["contact", id] });
      queryClient.invalidateQueries({ queryKey: ["contacts-by-company"] });
      queryClient.invalidateQueries({ queryKey: ["contacts-by-person"] });
    },
  });
}
