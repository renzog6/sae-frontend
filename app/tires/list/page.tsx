// filepath: sae-frontend/app/tires/list/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus, Filter } from "lucide-react";
import type { Tire } from "@/lib/types/domain/tire";
import { TiresService } from "@/lib/api/tires/tires.service";
import { DataTable } from "@/components/data-table/data-table-v2";
import { useServerDataTable } from "@/components/hooks/useServerDataTable";
import { getTireColumns } from "./columns";
import { ReportExportMenu } from "@/components/reports/report-export-menu";
import { ReportType } from "@/lib/types";
import Link from "next/link";
import { EntityListLayout } from "@/components/entities/entity-list-layout";
import { EntityErrorState } from "@/components/entities/entity-error-state";
import { EntityLoadingState } from "@/components/entities/entity-loading-state";

export default function TiresPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  const queryFn = async (params: {
    page: number;
    limit: number;
    filters?: Record<string, string>;
  }) => {
    const queryParams: any = {
      page: params.page,
      limit: params.limit,
    };

    if (params.filters) {
      // Map basic search fields to 'q' if they are used as column filters
      if (params.filters.serialNumber) queryParams.q = params.filters.serialNumber;
      if (params.filters.brand) queryParams.q = params.filters.brand;
      if (params.filters.model) queryParams.q = params.filters.model;
    }

    if (selectedStatus && selectedStatus !== "ALL") {
      queryParams.status = selectedStatus;
    }

    // Since TiresService.getAll returns Promise<PaginatedResponse<Tire>>,
    // but useServerDataTable expects { data: TData[]; meta: ... }
    const response = await TiresService.getAll(queryParams);
    return response;
  };

  const columns = useMemo(() => getTireColumns(), []);

  const { table, isLoading, error, totalItems } = useServerDataTable({
    queryKey: ["tires", selectedStatus],
    queryFn,
    columns,
    defaultPageSize: 10,
  });

  return (
    <EntityListLayout
      title="Neumáticos"
      description="Gestiona todos los neumáticos del sistema"
      actions={
        <div className="flex items-center gap-2">
          <ReportExportMenu
            reportType={ReportType.TIRE_LIST}
            filter={{ status: selectedStatus === "ALL" ? undefined : selectedStatus }}
            title="Neumáticos"
          />
          <Link href="/tires/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo neumático
            </Button>
          </Link>
        </div>
      }
      filters={
        <div className="flex gap-2">
          {/* Status filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[140px] justify-between border-dashed"
              >
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  {selectedStatus === "ALL" ? "Todos los estados" : selectedStatus}
                </div>
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedStatus("ALL")}>
                Todos los estados
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("IN_STOCK")}>
                En Stock
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("IN_USE")}>
                En Uso
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("UNDER_REPAIR")}>
                En Reparación
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("RECAP")}>
                Recapado
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("DISCARDED")}>
                Descartado
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      }
    >
      <EntityErrorState error={error} />

      {isLoading ? (
        <EntityLoadingState />
      ) : (
        <DataTable<Tire> table={table} totalItems={totalItems} />
      )}
    </EntityListLayout>
  );
}
