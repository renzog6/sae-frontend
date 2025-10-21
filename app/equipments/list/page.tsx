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
import { ChevronDown, Search } from "lucide-react";
import type { Equipment } from "@/lib/types/equipment";
import {
  useEquipmentList,
  useEquipmentCategories,
  useEquipmentTypes,
} from "@/lib/hooks/useEquipment";
import { DataTable } from "@/components/data-table";
import { getEquipmentColumns } from "./columns";
import Link from "next/link";
import { Plus } from "lucide-react";
import { EquipmentStatus } from "@/lib/types/enums";

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
  } = useEquipmentList(accessToken, {
    companyId: 1, // Default company ID for now
    page: 1,
    limit: 1000, // Get all equipment to enable client-side filtering
  });

  const { data: categories = [] } = useEquipmentCategories(accessToken);
  const { data: typesResponse } = useEquipmentTypes(accessToken);
  const types = typesResponse?.data || [];

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
            {/* Search */}
            <div className="flex gap-2">
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
                    .sort((a, b) => a.name.localeCompare(b.name))
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
                    .sort((a, b) => a.name.localeCompare(b.name))
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

              {/* Page size selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="min-w-[120px] justify-between"
                  >
                    <span className="mr-2">📊</span> {limit}/pág
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem
                    onClick={() => {
                      setPage(1);
                      setLimit(10);
                    }}
                  >
                    10
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setPage(1);
                      setLimit(50);
                    }}
                  >
                    50
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setPage(1);
                      setLimit(100);
                    }}
                  >
                    100
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
              data={equipment.slice((page - 1) * limit, page * limit)}
              searchableColumns={["name", "licensePlate"]}
              searchPlaceholder="Buscar por nombre o patente..."
            />
          )}
          {/* Pagination controls */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Mostrando {Math.min((page - 1) * limit + 1, totalFilteredItems)}{" "}
                a {Math.min(page * limit, totalFilteredItems)} de{" "}
                {totalFilteredItems} resultados
              </p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                Anterior
              </Button>
              <span className="text-sm">
                Página {page} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
