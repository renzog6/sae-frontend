// filepath: sae-frontend/lib/api/reports/reports.service.ts
import { ApiClient } from "@/lib/api/apiClient";
import { GenerateReportDto } from "@/lib/types/domain/report";

export class ReportsService {
  private static basePath = "/reports";

  static async generate(dto: GenerateReportDto): Promise<void> {
    console.log("Generating report with dto:", dto);
    try {
      const blob = await ApiClient.postBlob(`${this.basePath}/generate`, dto);

      // Extract filename from response or generate one
      const filename = `report_${dto.reportType}_${
        new Date().toISOString().split("T")[0]
      }.${dto.format}`;

      const link = document.createElement("a");
      const blobUrl = URL.createObjectURL(blob);
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error generating report:", error);
      throw error;
    }
  }
}
