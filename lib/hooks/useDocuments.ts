// filepath: sae-frontend/lib/hooks/useDocuments.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DocumentsService } from "@/lib/api/documents";
import { Document, UploadDocumentData } from "@/lib/types/document";

export function useDocuments(filter?: {
  employeeId?: number;
  companyId?: number;
}) {
  return useQuery({
    queryKey: ["documents", filter?.employeeId ?? 0, filter?.companyId ?? 0],
    queryFn: () => DocumentsService.getDocuments(filter),
  });
}

export function useDocument(id: number | undefined) {
  return useQuery({
    queryKey: ["documents", id],
    queryFn: () => DocumentsService.getDocumentById(id as number),
    enabled: typeof id === "number",
  });
}

export function useUploadDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UploadDocumentData) =>
      DocumentsService.uploadDocument(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["documents"] });
    },
  });
}

export function useDeleteDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => DocumentsService.deleteDocument(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["documents"] });
    },
  });
}

export function useDownloadDocument() {
  return useMutation({
    mutationFn: (id: number) => DocumentsService.downloadDocument(id),
  });
}
