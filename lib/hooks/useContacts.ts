// filepath: sae-frontend/lib/hooks/useContacts.ts
import { createApiHooks } from "@/lib/hooks/createApiHooks";
import { useQuery } from "@tanstack/react-query";
import { ContactsService } from "@/lib/api/contacts/contacts.service";

export const useContacts = () => {
    const base = createApiHooks(ContactsService, "contacts");

    const useByPerson = (personId?: number) =>
        useQuery({
            queryKey: ["contacts", "byPerson", personId],
            queryFn: () => ContactsService.getByPerson(personId!),
            enabled: !!personId,
        });

    const useByCompany = (companyId?: number) =>
        useQuery({
            queryKey: ["contacts", "byCompany", companyId],
            queryFn: () => ContactsService.getByCompany(companyId!),
            enabled: !!companyId,
        });

    return {
        ...base,
        useByPerson,
        useByCompany,
    };
};
