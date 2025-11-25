// filepath: sae-frontend/lib/hooks/useReports.ts

import { useMutation } from "@tanstack/react-query";
import { ReportsService } from "@/lib/api/reports";
import { GenerateReportDto } from "@/lib/types/report";

export function useGenerateReport() {
  return useMutation({
    mutationFn: (reportData: GenerateReportDto) =>
      ReportsService.generate(reportData),
  });
}
