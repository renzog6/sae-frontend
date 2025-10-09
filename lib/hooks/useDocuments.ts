// filepath: sae-frontend/lib/hooks/useDocuments.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DocumentsService } from "@/lib/api/documents";
import { Document, UploadDocumentData } from "@/types/document";

export function useDocuments(
  accessToken: string,
  filter?: { employeeId?: number; companyId?: number }
) {
  return useQuery({
    queryKey: ["documents", filter?.employeeId ?? 0, filter?.companyId ?? 0],
    queryFn: () => DocumentsService.getDocuments(accessToken, filter),
    enabled: !!accessToken,
  });
}

export function useDocument(id: number | undefined, accessToken: string) {
  return useQuery({
    queryKey: ["documents", id],
    queryFn: () => DocumentsService.getDocumentById(id as number, accessToken),
    enabled: !!accessToken && typeof id === "number",
  });
}

export function useUploadDocument(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UploadDocumentData) =>
      DocumentsService.uploadDocument(data, accessToken),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["documents"] });
    },
  });
}

export function useDeleteDocument(accessToken: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      DocumentsService.deleteDocument(id, accessToken),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["documents"] });
    },
  });
}

export function useDownloadDocument(accessToken: string) {
  return useMutation({
    mutationFn: (id: number) =>
      DocumentsService.downloadDocument(id, accessToken),
  });
}
