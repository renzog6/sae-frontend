import { BaseApiService } from "@/lib/api/base-api.service";
import {
    Contact,
    CreateContactDto,
    UpdateContactDto,
} from "@/lib/types/domain/contact";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { ApiClient } from "@/lib/api/apiClient";
import { PaginatedResponse } from "@/lib/types/core/api";

class ContactsServiceClass extends BaseApiService<
    Contact,
    CreateContactDto,
    UpdateContactDto
> {
    protected basePath = "/contacts";

    async getByPerson(personId: number): Promise<Contact[]> {
        return ApiErrorHandler.handleApiCall(
            async () => {
                const res = await ApiClient.get<PaginatedResponse<Contact>>(
                    `${this.basePath}/person/${personId}`
                );
                return res.data ?? [];
            },
            this.constructor.name,
            "getByPerson",
            { personId }
        );
    }

    async getByCompany(companyId: number): Promise<Contact[]> {
        return ApiErrorHandler.handleApiCall(
            async () => {
                const res = await ApiClient.get<PaginatedResponse<Contact>>(
                    `${this.basePath}/company/${companyId}`
                );
                return res.data ?? [];
            },
            this.constructor.name,
            "getByCompany",
            { companyId }
        );
    }
}

export const ContactsService = new ContactsServiceClass();
