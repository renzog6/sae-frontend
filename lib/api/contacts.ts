// file: sae-frontend/lib/api/contacts.ts
import { ApiClient } from "./apiClient";
import { ApiResponse, PaginatedResponse } from "@/lib/types/api";
import { Contact } from "@/lib/types/contact";
import {
  ContactFormData,
  UpdateContactFormData,
} from "@/lib/validations/contact";
function unwrap<T>(resp: any): T {
  if (resp && typeof resp === "object" && "data" in resp) {
    return resp.data as T;
  }
  return resp as T;
}

export class ContactsService {
  static async getContacts(
    accessToken: string,
    params?: { page?: number; limit?: number }
  ) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    const response = await ApiClient.request<
      PaginatedResponse<Contact> | Contact[]
    >(`/contacts${qs ? `?${qs}` : ""}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return unwrap<PaginatedResponse<Contact> | Contact[]>(response);
  }

  static async getContactsByCompany(
    accessToken: string,
    companyId: number,
    params?: { page?: number; limit?: number }
  ) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    const response = await ApiClient.request<PaginatedResponse<Contact>>(
      `/contacts/company/${companyId}${qs ? `?${qs}` : ""}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return unwrap<PaginatedResponse<Contact>>(response);
  }

  static async getContactsByPerson(
    accessToken: string,
    personId: number,
    params?: { page?: number; limit?: number }
  ) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    const response = await ApiClient.request<PaginatedResponse<Contact>>(
      `/contacts/person/${personId}${qs ? `?${qs}` : ""}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return unwrap<PaginatedResponse<Contact>>(response);
  }

  static async getContactById(id: number, accessToken: string) {
    const response = await ApiClient.request<Contact | ApiResponse<Contact>>(
      `/contacts/${id}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return unwrap<Contact>(response);
  }

  static async createContact(data: ContactFormData, accessToken: string) {
    const response = await ApiClient.request<Contact | ApiResponse<Contact>>(
      "/contacts",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return unwrap<Contact>(response);
  }

  static async updateContact(
    id: number,
    data: UpdateContactFormData,
    accessToken: string
  ) {
    const response = await ApiClient.request<Contact | ApiResponse<Contact>>(
      `/contacts/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return unwrap<Contact>(response);
  }

  static async deleteContact(id: number, accessToken: string) {
    await ApiClient.request(`/contacts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return "Contact deleted";
  }
}
