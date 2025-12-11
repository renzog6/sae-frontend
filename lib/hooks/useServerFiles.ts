import { createApiHooks } from "@/lib/hooks/createApiHooks";
import { ServerFilesService } from "@/lib/api/server-files/server-files.service";
import { UploadServerFileData } from "@/lib/types/domain/server-file";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
            mutationFn: (id: number) => ServerFilesService.downloadById(id),
        });

    const usePreview = () =>
        useMutation({
            mutationFn: (id: number) => ServerFilesService.preview(id),
        });

    return {
        ...base,
        useUpload,
        useDownload,
        usePreview,
    };
};
