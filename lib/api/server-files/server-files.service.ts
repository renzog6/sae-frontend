// filepath: sae-frontend/lib/api/server-files/server-files.service.ts
import { BaseApiService } from "@/lib/api/base-api.service";
import { ApiClient } from "@/lib/api/apiClient";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";

import {
    BaseQueryParams,
    PaginatedResponse,
    ApiResponse,
} from "@/lib/types/core/api";

import {
    ServerFile,
    UploadServerFileData,
    CreateServerFileDto,
    UpdateServerFileDto,
} from "@/lib/types/domain/server-file";

import { QueryBuilder } from "@/lib/api/queryBuilder";

export interface ServerFileQueryParams extends BaseQueryParams {
    employeeId?: number;
    companyId?: number;
}

class ServerFilesServiceClass extends BaseApiService<
    ServerFile,
    CreateServerFileDto,
    UpdateServerFileDto
> {
    protected basePath = "/server-files";

    /**
     * Override: GET ALL with special filters
     */
    async getAll(
        filter?: ServerFileQueryParams
    ): Promise<PaginatedResponse<ServerFile>> {
        return ApiErrorHandler.handleApiCall(
            async () => {
                const baseUrl = QueryBuilder.buildUrl(this.basePath, filter);

                const specificParams = {
                    employeeId: filter?.employeeId,
                    companyId: filter?.companyId,
                };

                const specificQuery = QueryBuilder.buildSpecific(specificParams);
                const finalUrl = QueryBuilder.combineUrls(baseUrl, specificQuery);

                return ApiClient.get<PaginatedResponse<ServerFile>>(finalUrl);
            },
            this.constructor.name,
            "getAll",
            { filter }
        );
    }

    /**
     * UPLOAD with FormData
     */
    async upload(data: UploadServerFileData): Promise<ServerFile> {
        return ApiErrorHandler.handleApiCall(
            async () => {
                const formData = new FormData();

                formData.append("file", data.file);
                formData.append("entityType", data.entityType);
                formData.append("entityId", String(data.entityId));

                if (data.description) formData.append("description", data.description);

                const res = await ApiClient.post<ApiResponse<ServerFile>>(
                    `${this.basePath}/upload`,
                    formData
                );
                return res.data;
            },
            this.constructor.name,
            "upload",
            { data }
        );
    }

    /**
     * DOWNLOAD
     */
    async downloadById(id: number, filename?: string): Promise<void> {
        // If filename is not provided, we might rely on content-disposition or just a default
        const name = filename || `file_${id}`;
        return this.downloadFile(`${id}/download`, name);
    }

    /**
     * Preview in new tab
     */
    async preview(id: number): Promise<void> {
        return this.openInNewTab(`${id}/download`);
    }

    private async downloadFile(relativePath: string, filename: string) {
        return super.download(relativePath, filename);
    }
}

export const ServerFilesService = new ServerFilesServiceClass();
