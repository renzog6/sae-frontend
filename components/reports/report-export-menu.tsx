//filepath: sae-frontend/components/reports/report-export-menu.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download } from "lucide-react";
import { ReportFormat, ReportType } from "@/lib/types/report";
import { useGenerateReport } from "@/lib/hooks/useReports";
import { toast } from "sonner";

interface ReportExportMenuProps {
  /** Tipo de reporte a exportar */
  reportType: ReportType;

  /** Filtros dinámicos */
  filter?: Record<string, any> | string;

  /** Título del reporte */
  title?: string;

  /** Formatos permitidos por esta vista */
  formats?: ReportFormat[];

  /** Texto del botón */
  label?: string;
}

export function ReportExportMenu({
  reportType,
  filter,
  title,
  formats = [
    ReportFormat.XLSX,
    ReportFormat.PDF,
    ReportFormat.CSV,
    ReportFormat.DOCX,
  ],
  label = "Exportar",
}: ReportExportMenuProps) {
  const generateReport = useGenerateReport();

  const formatLabels = {
    [ReportFormat.XLSX]: "Excel (XLSX)",
    [ReportFormat.PDF]: "PDF",
    [ReportFormat.CSV]: "CSV",
    [ReportFormat.DOCX]: "Word (DOCX)",
  };

  const formatIcons = {
    [ReportFormat.XLSX]: "📊",
    [ReportFormat.PDF]: "📄",
    [ReportFormat.CSV]: "📋",
    [ReportFormat.DOCX]: "📝",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          disabled={generateReport.isPending}
          className="min-w-[140px] justify-between"
        >
          <Download className="w-4 h-4 mr-2" />
          {generateReport.isPending ? "Exportando..." : label}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        {formats.map((format) => (
          <DropdownMenuItem
            key={format}
            onClick={() =>
              generateReport.mutate(
                {
                  reportType,
                  format,
                  filter,
                  title,
                },
                {
                  onSuccess: () => {
                    toast.success("Reporte exportado exitosamente");
                  },
                  onError: (error) => {
                    toast.error("Error al exportar reporte: " + error.message);
                  },
                }
              )
            }
          >
            <span className="mr-2">{formatIcons[format]}</span>
            {formatLabels[format]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
