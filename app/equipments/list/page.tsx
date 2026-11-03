// filepath: sae-frontend/app/equipments/list/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter, Folder } from "lucide-react";
import type {
  Equipment,
  EquipmentCategory,
} from "@/lib/types/domain/equipment";
import { useEquipmentCategories } from "@/lib/hooks/useEquipments";
import { DataTable } from "@/components/data-table/data-table-v2";
import { useServerDataTable } from "@/components/hooks/useServerDataTable";
import { getEquipmentColumns } from "./columns";
import Link from "next/link";
import { Plus } from "lucide-react";
import { EquipmentStatus } from "@/lib/types/shared/enums";
import { ReportExportMenu } from "@/components/reports/report-export-menu";
import { ReportType } from "@/lib/types";
import { EntityListLayout } from "@/components/entities/entity-list-layout";
import { EntityErrorState } from "@/components/entities/entity-error-state";
import { EntityLoadingState } from "@/components/entities/entity-loading-state";
import { equipmentStatusLabels } from "@/lib/constants/equipment.constants";
import { EquipmentsService } from "@/lib/api/equipments";

export default function EquipmentListPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>(
    EquipmentStatus.ACTIVE,
  );
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const router = useRouter();

  const { useGetAll: useGetCategories } = useEquipmentCategories();
  const { data: categoriesResponse } = useGetCategories();

  // Query function for server-side data table
  const queryFn = async (params: {
    page: number;
    limit: number;
    filters?: Record<string, string>;
  }) => {
    const queryParams: any = {
      page: params.page,
      limit: params.limit,
    };

    // Map filters to query params
    if (params.filters) {
      if (params.filters.name) queryParams.q = params.filters.name;
      if (params.filters.internalCode)
        queryParams.q = params.filters.internalCode;
      if (params.filters.licensePlate)
        queryParams.q = params.filters.licensePlate;
      if (params.filters.status) queryParams.status = params.filters.status;
      if (params.filters.categoryId)
        queryParams.categoryId = parseInt(params.filters.categoryId);
      if (params.filters.typeId)
        queryParams.typeId = parseInt(params.filters.typeId);
      if (params.filters.modelId)
        queryParams.modelId = parseInt(params.filters.modelId);

      // Fix: Filter by Year
      if (params.filters.year) {
        queryParams.year = parseInt(params.filters.year);
      }

      if (params.filters.type) queryParams.q = params.filters.type;
      if (params.filters.model) queryParams.q = params.filters.model;
    }

    // Apply global filters
    if (selectedStatus && selectedStatus !== "ALL") {
      queryParams.status = selectedStatus;
    }
    if (selectedCategory) {
      queryParams.categoryId = selectedCategory;
    }

    return EquipmentsService.getAll(queryParams);
  };

  const { table, isLoading, error, totalItems } = useServerDataTable({
    queryKey: ["equipments"],
    queryFn,
    columns: getEquipmentColumns({
      onView: (item) => {
        router.push(`/equipments/${item.id}`);
      },
    }),
    defaultPageSize: 10,
  });

  const categories = useMemo(() => {
    const response = categoriesResponse as any;
    const data = Array.isArray(response?.data)
      ? response.data
      : response?.data?.data || [];
    return (data || []).sort((a: EquipmentCategory, b: EquipmentCategory) =>
      a.name.localeCompare(b.name),
    );
  }, [categoriesResponse]);

  return (
    <EntityListLayout
      title="Equipos"
      description="Gestiona todos los equipos del sistema"
      actions={
        <div className="flex items-center gap-2">
          <ReportExportMenu
            reportType={ReportType.EQUIPMENT_LIST}
            filter={{
              status:
                selectedStatus === "ALL"
                  ? undefined
                  : selectedStatus.toLowerCase(),
              category: selectedCategory
                ? categories.find((c: EquipmentCategory) => c.id === selectedCategory)?.name
                : undefined,
            }}
            title="Equipos"
          />
          <Link href="/equipments/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo equipo
            </Button>
          </Link>
        </div>
      }
      filters={
        <div className="flex flex-wrap gap-2">
          {/* Status filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[140px] justify-between border-dashed"
              >
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  {selectedStatus === "ALL"
                    ? "Todos los estados"
                    : equipmentStatusLabels[selectedStatus as EquipmentStatus]}
                </div>
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setSelectedStatus("ALL")}>
                Todos los estados
              </DropdownMenuItem>
              {Object.entries(equipmentStatusLabels).map(([value, label]) => (
                <DropdownMenuItem
                  key={value}
                  onClick={() => setSelectedStatus(value)}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Category filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[140px] justify-between border-dashed"
              >
                <div className="flex items-center">
                  <Folder className="mr-2 h-4 w-4" />
                  {selectedCategory
                    ? categories.find((c: EquipmentCategory) => c.id === selectedCategory)?.name ||
                      "Categoría no encontrada"
                    : "Todas las categorías"}
                </div>
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 overflow-y-auto max-h-60"
            >
              <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                Todas las categorías
              </DropdownMenuItem>
              {categories.map((category: EquipmentCategory) => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      }
    >
      <EntityErrorState error={error} />

      {isLoading ? (

        <EntityLoadingState />

      ) : (
        <DataTable<Equipment> table={table} totalItems={totalItems} />
      )}
    </EntityListLayout>
  );
}
