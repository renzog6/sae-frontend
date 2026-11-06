import { createApiHooks } from "@/lib/hooks/createApiHooks";
import { ServerFilesService } from "@/lib/api/server-files/server-files.service";
import type { UploadServerFileData } from "@/lib/types/domain/server-file";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useServerFiles = () => {
    const base = createApiHooks(ServerFilesService, "server-files");
    const qc = useQueryClient();

    const useUpload = () =>
        useMutation({
            mutationFn: (data: UploadServerFileData) => ServerFilesService.upload(data),
            onSuccess: () =>
                qc.invalidateQueries({ queryKey: ["server-files", "list"] }),
        });

    const useDownload = () =>
        useMutation({
            mutationFn: ({ documentId, filename }: { documentId: number; filename: string }) =>
                ServerFilesService.downloadById(documentId, filename),
        });

    const usePreview = () =>
        useMutation({
            mutationFn: (id: number) => ServerFilesService.preview(id),
        });

    const useAuditLog = (enabled = false) =>
        useQuery({
            queryKey: ["server-files", "audit"],
            queryFn: () => ServerFilesService.getAuditLog(),
            enabled,
        });

    return {
        ...base,
        useUpload,
        useDownload,
        usePreview,
        useAuditLog,
    };
};
