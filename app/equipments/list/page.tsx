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
  useEquipments,
  useEquipmentCategories,
} from "@/lib/hooks/useEquipments";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/hooks/useDataTable";
import { getEquipmentColumns } from "./columns";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { EquipmentStatus } from "@/lib/types/shared/enums";
import { ReportExportMenu } from "@/components/reports/report-export-menu";
import { ReportType } from "@/lib/types";
import { EntityListLayout } from "@/components/entities/entity-list-layout";
import { EntityErrorState } from "@/components/entities/entity-error-state";
import { equipmentStatusLabels } from "@/lib/constants/equipment.constants";

export default function EquipmentListPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>(
    EquipmentStatus.ACTIVE
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const router = useRouter();

  const { useGetAll: useEquipmentList } = useEquipments();
  const {
    data: equipmentResponse,
    isLoading,
    error,
  } = useEquipmentList({
    page: 1,
    limit: 0, // Get all equipment to enable client-side filtering
  });

  const { useGetAll: useGetCategories } = useEquipmentCategories();
  const { data: categoriesResponse } = useGetCategories();

  const categories = useMemo(() => {
    return (categoriesResponse?.data || []).sort(
      (a: EquipmentCategory, b: EquipmentCategory) =>
        a.name.localeCompare(b.name)
    );
  }, [categoriesResponse?.data]);

  const columns = useMemo(
    () =>
      getEquipmentColumns({
        onView: (item) => {
          // Navigate to detail page
          router.push(`/equipments/${item.id}`);
        },
      }),
    []
  );

  const equipment = useMemo(() => {
    let filtered = equipmentResponse?.data || [];

    // Filter by status
    if (selectedStatus && selectedStatus !== "ALL") {
      filtered = filtered.filter(
        (item: Equipment) => item.status === selectedStatus
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (item: Equipment) => item.category?.name === selectedCategory
      );
    }

    // Sort by type name A-Z
    return filtered.sort((a: Equipment, b: Equipment) => {
      const typeA = a.type?.name || "";
      const typeB = b.type?.name || "";
      return typeA.localeCompare(typeB);
    });
  }, [equipmentResponse?.data, selectedStatus, selectedCategory]);

  // Set the search query as global filter
  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: equipment,
    columns,
    searchableColumns: ["name", "internalCode", "licensePlate"],
  });

  // Calculate pagination from table state
  const totalFilteredItems = table.getFilteredRowModel().rows.length;
  const totalPages = table.getPageCount();

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
        <DataTable<Equipment>
          table={table}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          searchPlaceholder="Buscar por nombre, código o patente..."
        />
      )}

      <PaginationBar
        page={table.getState().pagination.pageIndex + 1}
        totalPages={totalPages}
        totalItems={totalFilteredItems}
        limit={table.getState().pagination.pageSize}
        onPageChange={(newPage) => {
          table.setPagination({
            pageIndex: newPage - 1,
            pageSize: table.getState().pagination.pageSize,
          });
        }}
        onLimitChange={(newLimit) => {
          table.setPagination({ pageIndex: 0, pageSize: newLimit });
        }}
      />
    </EntityListLayout>
  );
}
