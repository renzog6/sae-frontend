// file: sae-frontend/lib/api/contacts.ts
import { ApiClient } from "./apiClient";
import { PaginatedResponse } from "@/lib/types/api";
import { Contact } from "@/lib/types/contact";
import {
  ContactFormData,
  UpdateContactFormData,
} from "@/lib/validations/contact";

export class ContactsService {
  private static basePath = "/contacts";

  static async getContacts(params?: { page?: number; limit?: number }) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    const response = await ApiClient.get<PaginatedResponse<Contact>>(
      `${this.basePath}${qs ? `?${qs}` : ""}`
    );
    return response;
  }

  static async getContactsByCompany(
    companyId: number,
    params?: { page?: number; limit?: number }
  ) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    const response = await ApiClient.get<PaginatedResponse<Contact>>(
      `${this.basePath}/company/${companyId}${qs ? `?${qs}` : ""}`
    );
    return response;
  }

  static async getContactsByPerson(
    personId: number,
    params?: { page?: number; limit?: number }
  ) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    const response = await ApiClient.get<PaginatedResponse<Contact>>(
      `${this.basePath}/person/${personId}${qs ? `?${qs}` : ""}`
    );
    return response;
  }

  static async getContactById(id: number) {
    const response = await ApiClient.get<Contact>(`${this.basePath}/${id}`);
    return response;
  }

  static async createContact(data: ContactFormData) {
    const response = await ApiClient.post<Contact>(this.basePath, data);
    return response;
  }

  static async updateContact(id: number, data: UpdateContactFormData) {
    const response = await ApiClient.put<Contact>(
      `${this.basePath}/${id}`,
      data
    );
    return response;
  }

  static async deleteContact(id: number) {
    await ApiClient.delete(`${this.basePath}/${id}`);
    return "Contact deleted";
  }
}
