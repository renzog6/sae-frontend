// filepath: sae-frontend/lib/api/reports/reports.service.ts

import { ApiClient } from "@/lib/api/apiClient";
import { ApiErrorHandler } from "@/lib/utils/api-error-handler";
import { GenerateReportDto } from "@/lib/types/domain/report";

class ReportsServiceClass {
  private basePath = "/reports";

  async generate(dto: GenerateReportDto): Promise<void> {
    return ApiErrorHandler.handleApiCall(
      async () => {
        const blob = await ApiClient.postBlob(`${this.basePath}/generate`, dto);

        const filename = `report_${dto.reportType}_${
          new Date().toISOString().split("T")[0]
        }.${dto.format}`;

        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(blobUrl);
      },
      "ReportsService",
      "generate",
      { dto }
    );
  }
}

export const ReportsService = new ReportsServiceClass();
