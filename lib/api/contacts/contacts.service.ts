// filepath: sae-frontend/lib/api/contacts/contacts.service.ts

import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { QueryBuilder } from "@/lib/api/queryBuilder";

import { CreateContactDto, UpdateContactDto } from "@/lib/types/domain/contact";
import { Contact } from "@/lib/types/shared/contact";
import { PaginatedResponse } from "@/lib/types/core/api";

class ContactsServiceClass extends BaseApiService<
  Contact,
  CreateContactDto,
  UpdateContactDto
> {
  protected basePath = "/contacts";

  /**
   * Obtener contactos de una empresa
   * GET /contacts/company/:companyId
   */
  async getContactsByCompany(
    companyId: number,
    params?: { page?: number; limit?: number }
  ): Promise<PaginatedResponse<Contact>> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const baseUrl = `${this.basePath}/company/${companyId}`;
        const url = QueryBuilder.buildUrl(baseUrl, params);
        return ApiClient.get<PaginatedResponse<Contact>>(url);
      },
      this.constructor.name,
      "getContactsByCompany",
      { companyId, params }
    );
  }

  /**
   * Obtener contactos por persona
   * GET /contacts/person/:personId
   */
  async getContactsByPerson(
    personId: number,
    params?: { page?: number; limit?: number }
  ): Promise<PaginatedResponse<Contact>> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const baseUrl = `${this.basePath}/person/${personId}`;
        const url = QueryBuilder.buildUrl(baseUrl, params);
        return ApiClient.get<PaginatedResponse<Contact>>(url);
      },
      this.constructor.name,
      "getContactsByPerson",
      { personId, params }
    );
  }
}

export const ContactsService = new ContactsServiceClass();
