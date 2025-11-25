// filepath: sae-frontend/lib/hooks/useDocuments.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DocumentsService } from "@/lib/api/documents/";
import { Document, UploadDocumentData } from "@/lib/types/document";

export function useDocuments(filter?: {
  employeeId?: number;
  companyId?: number;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: [
      "documents",
      filter?.employeeId ?? 0,
      filter?.companyId ?? 0,
      filter?.page ?? 1,
      filter?.limit ?? 10,
    ],
    queryFn: () => DocumentsService.getAll(filter).then((resp) => resp.data),
    staleTime: 0, // Always refetch to ensure fresh data
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true, // Always refetch on mount
  });
}

export function useDocument(id: number | undefined) {
  return useQuery({
    queryKey: ["documents", id],
    queryFn: () => DocumentsService.getById(id as number),
    enabled: typeof id === "number",
  });
}

export function useUploadDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UploadDocumentData) => DocumentsService.upload(data),
    onSuccess: (result, variables) => {
      // Invalidate all documents queries with broader pattern
      qc.invalidateQueries({ queryKey: ["documents"] });
      // Also invalidate specific employee/company queries if we know the ID
      if (variables.employeeId) {
        qc.invalidateQueries({
          queryKey: ["documents", variables.employeeId],
          exact: false,
        });
      }
      if (variables.companyId) {
        qc.invalidateQueries({
          queryKey: ["documents", undefined, variables.companyId],
          exact: false,
        });
      }
    },
  });
}

export function useDeleteDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => DocumentsService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["documents"] });
    },
  });
}

export function useDownloadDocument() {
  return useMutation({
    mutationFn: (id: number) => DocumentsService.download(id),
  });
}
