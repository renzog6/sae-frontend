// filepath: sae-frontend/app/equipments/list/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  EquipmentType,
} from "@/lib/types/domain/equipment";
import {
  useEquipments,
  useEquipmentCategories,
  useEquipmentTypes,
} from "@/lib/hooks/useEquipments";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/data-table/use-data-table";
import { getEquipmentColumns } from "./columns";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { EquipmentStatus } from "@/lib/types/shared/enums";
import { ReportExportMenu } from "@/components/reports/report-export-menu";
import { ReportType } from "@/lib/types";

export default function EquipmentListPage() {
  const [query, setQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>(
    EquipmentStatus.ACTIVE
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  // Debounce query
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  const { useGetAll: useEquipmentList } = useEquipments();
  const {
    data: equipmentResponse,
    isLoading,
    error,
  } = useEquipmentList({
    page: 1,
    limit: 100, // Get all equipment to enable client-side filtering
  });

  const { useGetAll: useGetCategories } = useEquipmentCategories();
  const {
    data: categoriesResponse = {
      data: [],
      meta: { total: 0, page: 1, limit: 10, totalPages: 1 },
    },
  } = useGetCategories();

  const { useGetAll: useGetTypes } = useEquipmentTypes();
  const { data: typesData } = useGetTypes();
  const types = Array.isArray(typesData) ? typesData : [];

  const categories = categoriesResponse.data;

  const columns = useMemo(
    () =>
      getEquipmentColumns({
        onView: (item) => {
          // Navigate to detail page
          window.location.href = `/equipments/${item.id}`;
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

    // Filter by type
    if (selectedType) {
      filtered = filtered.filter(
        (item: Equipment) => item.type?.name === selectedType
      );
    }

    // Sort by type name A-Z
    return filtered.sort((a: Equipment, b: Equipment) => {
      const typeA = a.type?.name || "";
      const typeB = b.type?.name || "";
      return typeA.localeCompare(typeB);
    });
  }, [equipmentResponse?.data, selectedStatus, selectedCategory, selectedType]);

  // Set the search query as global filter
  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: equipment,
    columns,
    searchableColumns: ["name", "internalCode", "licensePlate"],
  });

  // Update global filter when debounced query changes
  useEffect(() => {
    setGlobalFilter(debouncedQuery);
  }, [debouncedQuery, setGlobalFilter]);

  // Calculate pagination from table state
  const totalFilteredItems = table.getFilteredRowModel().rows.length;
  const totalPages = table.getPageCount();

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">Equipos</CardTitle>
            <Link href="/equipments/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nuevo equipo
              </Button>
            </Link>
          </div>
          <CardDescription>
            Gestiona todos los equipos del sistema
          </CardDescription>

          {/* Filters Row */}
          <div className="flex flex-col gap-4 mt-4 sm:flex-row">
            {/* Search Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Buscar equipos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-w-[200px]"
              />
              {/* Status filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="min-w-[140px] justify-between"
                  >
                    <span className="mr-2">📊</span>{" "}
                    {selectedStatus === "ALL"
                      ? "Todos"
                      : selectedStatus === EquipmentStatus.ACTIVE
                      ? "Activo"
                      : selectedStatus === EquipmentStatus.INACTIVE
                      ? "Inactivo"
                      : selectedStatus === EquipmentStatus.MAINTENANCE
                      ? "Mantenimiento"
                      : "Retirado"}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 overflow-y-auto max-h-60"
                >
                  <DropdownMenuItem onClick={() => setSelectedStatus("ALL")}>
                    Todos los estados
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedStatus(EquipmentStatus.ACTIVE)}
                  >
                    Activo
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedStatus(EquipmentStatus.INACTIVE)}
                  >
                    Inactivo
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      setSelectedStatus(EquipmentStatus.MAINTENANCE)
                    }
                  >
                    En mantenimiento
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedStatus(EquipmentStatus.RETIRED)}
                  >
                    Retirado
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Category filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="min-w-[140px] justify-between"
                  >
                    <span className="mr-2">🏷️</span>{" "}
                    {selectedCategory || "Categoría"}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 overflow-y-auto max-h-60"
                >
                  <div className="p-2">
                    <Input
                      placeholder="Buscar categoría..."
                      className="mb-2"
                      onChange={(e) => {
                        const searchTerm = e.target.value.toLowerCase();
                        // Filter is handled by the dropdown rendering below
                      }}
                    />
                  </div>
                  <DropdownMenuItem onClick={() => setSelectedCategory("")}>
                    Todas las categorías
                  </DropdownMenuItem>
                  {categories
                    ?.sort((a: EquipmentCategory, b: EquipmentCategory) =>
                      a.name.localeCompare(b.name)
                    )
                    .map((category: EquipmentCategory) => (
                      <DropdownMenuItem
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                      >
                        {category.name}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Type filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="min-w-[140px] justify-between"
                  >
                    <span className="mr-2">🔧</span> {selectedType || "Tipo"}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 overflow-y-auto max-h-60"
                >
                  <div className="p-2">
                    <Input
                      placeholder="Buscar tipo..."
                      className="mb-2"
                      onChange={(e) => {
                        const searchTerm = e.target.value.toLowerCase();
                        // Filter is handled by the dropdown rendering below
                      }}
                    />
                  </div>
                  <DropdownMenuItem onClick={() => setSelectedType("")}>
                    Todos los tipos
                  </DropdownMenuItem>
                  {types
                    ?.sort((a: EquipmentType, b: EquipmentType) =>
                      a.name.localeCompare(b.name)
                    )
                    .map((type: EquipmentType) => (
                      <DropdownMenuItem
                        key={type.id}
                        onClick={() => setSelectedType(type.name)}
                      >
                        {type.name}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Report generation dropdown */}
              <ReportExportMenu
                reportType={ReportType.EQUIPMENT_LIST}
                filter={{ status: "active" }}
                title="Equipos"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error.message}</p>
          ) : (
            <DataTable<Equipment>
              table={table}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
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
        </CardContent>
      </Card>
    </div>
  );
}
