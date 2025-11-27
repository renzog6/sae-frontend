// file: sae-frontend/lib/api/contacts.ts
import { ApiClient } from "./apiClient";
import { PaginatedResponse, ApiResponse } from "@/lib/types/core/api";
import { QueryBuilder } from "@/lib/api/queryBuilder";
import { Contact } from "@/lib/types/shared/contact";
import {
  ContactFormData,
  UpdateContactFormData,
} from "@/lib/validations/contact";

export class ContactsService {
  private static basePath = "/contacts";

  static async getContacts(params?: { page?: number; limit?: number }) {
    const url = QueryBuilder.buildUrl(this.basePath, params);
    const response = await ApiClient.get<PaginatedResponse<Contact>>(url);
    return response;
  }

  static async getContactsByCompany(
    companyId: number,
    params?: { page?: number; limit?: number }
  ) {
    const baseUrl = `${this.basePath}/company/${companyId}`;
    const url = QueryBuilder.buildUrl(baseUrl, params);
    const response = await ApiClient.get<PaginatedResponse<Contact>>(url);
    return response;
  }

  static async getContactsByPerson(
    personId: number,
    params?: { page?: number; limit?: number }
  ) {
    const baseUrl = `${this.basePath}/person/${personId}`;
    const url = QueryBuilder.buildUrl(baseUrl, params);
    const response = await ApiClient.get<PaginatedResponse<Contact>>(url);
    return response;
  }

  static async getContactById(id: number) {
    const response = await ApiClient.get<ApiResponse<Contact>>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  static async createContact(data: ContactFormData) {
    const response = await ApiClient.post<ApiResponse<Contact>>(
      this.basePath,
      data
    );
    return response.data;
  }

  static async updateContact(id: number, data: UpdateContactFormData) {
    const response = await ApiClient.put<ApiResponse<Contact>>(
      `${this.basePath}/${id}`,
      data
    );
    return response.data;
  }

  static async deleteContact(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Contact deleted";
  }
}
