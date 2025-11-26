// filepath: sae-frontend/app/equipments/list/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
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
import type { Equipment } from "@/lib/types/equipment";
import {
  useEquipmentList,
  useEquipmentCategories,
  useEquipmentTypes,
} from "@/lib/hooks/useEquipments";
import { DataTable } from "@/components/data-table";
import { getEquipmentColumns } from "./columns";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PaginationBar } from "@/components/table/pagination-bar";
import { EquipmentStatus } from "@/lib/types/enums";
import { ReportExportMenu } from "@/components/reports/report-export-menu";
import { ReportType } from "@/lib/types";

export default function EquipmentListPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

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

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, selectedStatus, selectedCategory, selectedType, limit]);

  const {
    data: equipmentResponse,
    isLoading,
    error,
  } = useEquipmentList({
    page: 1,
    limit: 100, // Get all equipment to enable client-side filtering
  });

  const {
    data: categoriesResponse = {
      data: [],
      meta: { total: 0, page: 1, limit: 10, totalPages: 1 },
    },
  } = useEquipmentCategories();
  const { data: typesData } = useEquipmentTypes();
  const types = Array.isArray(typesData) ? typesData : [];

  const categories = categoriesResponse.data;

  const equipment = useMemo(() => {
    let filtered = equipmentResponse?.data || [];

    // Filter by search query (case-insensitive)
    if (debouncedQuery) {
      const query = debouncedQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name?.toLowerCase().includes(query) ||
          item.internalCode?.toLowerCase().includes(query) ||
          item.licensePlate?.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (selectedStatus && selectedStatus !== "ALL") {
      filtered = filtered.filter((item) => item.status === selectedStatus);
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (item) => item.category?.name === selectedCategory
      );
    }

    // Filter by type
    if (selectedType) {
      filtered = filtered.filter((item) => item.type?.name === selectedType);
    }

    // Sort by type name A-Z
    return filtered.sort((a, b) => {
      const typeA = a.type?.name || "";
      const typeB = b.type?.name || "";
      return typeA.localeCompare(typeB);
    });
  }, [
    equipmentResponse?.data,
    debouncedQuery,
    selectedStatus,
    selectedCategory,
    selectedType,
  ]);

  // Calculate pagination based on filtered data
  const totalFilteredItems = equipment.length;
  const totalPages = Math.ceil(totalFilteredItems / limit);

  // Get paginated data
  const paginatedData = equipment.slice((page - 1) * limit, page * limit);

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
                    ?.sort((a, b) => a.name.localeCompare(b.name))
                    .map((category) => (
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
                    ?.sort((a, b) => a.name.localeCompare(b.name))
                    .map((type) => (
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
            <DataTable<Equipment, unknown>
              columns={columns}
              data={paginatedData}
            />
          )}
          <PaginationBar
            page={page}
            totalPages={totalPages}
            totalItems={totalFilteredItems}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={(newLimit) => {
              setLimit(newLimit);
              setPage(1);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
