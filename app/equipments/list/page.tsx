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
import { ChevronDown } from "lucide-react";
import type {
  Equipment,
  EquipmentCategory,
} from "@/lib/types/domain/equipment";
import {
  useEquipmentCategories,
  useEquipmentTypes,
} from "@/lib/hooks/useEquipments";
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
import { equipmentStatusLabels } from "@/lib/constants/equipment.constants";
import { EquipmentsService } from "@/lib/api/equipments";
import type { EquipmentType } from "@/lib/types/domain/equipment";

export default function EquipmentListPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>(
    EquipmentStatus.ACTIVE
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const router = useRouter();

  const { useGetAll: useGetCategories } = useEquipmentCategories();
  const { data: categoriesResponse } = useGetCategories();

  const { useGetAll: useGetTypes } = useEquipmentTypes();
  const { data: typesResponse } = useGetTypes();

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

      // Fix: Filter by Type (text input mapped to ID)
      if (params.filters.type && typesResponse?.data) {
        const filterValue = params.filters.type.toLowerCase();
        // Find best matching type
        const matchedType = typesResponse.data.find((t: EquipmentType) =>
          t.name.toLowerCase().includes(filterValue)
        );

        if (matchedType) {
          queryParams.typeId = matchedType.id;
        } else {
          // If user typed something that doesn't match any type, potentially send a dummy ID to return 0 results?
          // Or just ignore. For now, let's ignore or set a non-existent ID.
          // Setting -1 to ensure no results if no type matches the text
          queryParams.typeId = -1;
        }
      }
    }

    // Apply global filters
    if (selectedStatus && selectedStatus !== "ALL") {
      queryParams.status = selectedStatus;
    }
    if (selectedCategory) {
      // Find category by name and get ID
      const category = categoriesResponse?.data?.find(
        (cat: EquipmentCategory) => cat.name === selectedCategory
      );
      if (category) {
        queryParams.categoryId = category.id;
      }
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
    return (categoriesResponse?.data || []).sort(
      (a: EquipmentCategory, b: EquipmentCategory) =>
        a.name.localeCompare(b.name)
    );
  }, [categoriesResponse?.data]);

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
              category: selectedCategory || undefined,
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
                className="min-w-[140px] justify-between"
              >
                <span className="mr-2">📊</span>
                {selectedStatus === "ALL"
                  ? "Todos los estados"
                  : equipmentStatusLabels[selectedStatus as EquipmentStatus]}
                <ChevronDown className="w-4 h-4" />
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
                className="min-w-[140px] justify-between"
              >
                <span className="mr-2">🏷️</span>
                {selectedCategory || "Todas las categorías"}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 overflow-y-auto max-h-60"
            >
              <DropdownMenuItem onClick={() => setSelectedCategory("")}>
                Todas las categorías
              </DropdownMenuItem>
              {categories.map((category: EquipmentCategory) => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
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
        <div className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">Cargando equipos...</p>
        </div>
      ) : (
        <DataTable<Equipment> table={table} totalItems={totalItems} />
      )}
    </EntityListLayout>
  );
}
