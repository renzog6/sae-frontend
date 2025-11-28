//filepath: sae-frontend/lib/hooks/useDocuments.ts
import { createApiHooks } from "@/lib/hooks/createApiHooks";
import { DocumentsService } from "@/lib/api/documents/documents.service";
import { UploadDocumentData } from "@/lib/types/domain/document";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDocuments = () => {
  const base = createApiHooks(DocumentsService, "documents");
  const qc = useQueryClient();

  const useUpload = () =>
    useMutation({
      mutationFn: (data: UploadDocumentData) => DocumentsService.upload(data),
      onSuccess: () =>
        qc.invalidateQueries({ queryKey: ["documents", "list"] }),
    });

  const useDownload = () =>
    useMutation({
      mutationFn: (id: number) => DocumentsService.downloadById(id),
    });

  const usePreview = () =>
    useMutation({
      mutationFn: (id: number) => DocumentsService.preview(id),
    });

  return {
    ...base,
    useUpload,
    useDownload,
    usePreview,
  };
};
