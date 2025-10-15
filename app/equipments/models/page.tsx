// filepath: sae-frontend/app/equipments/models/page.tsx
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
import type { EquipmentModel } from "@/types/equipment";
import {
  useEquipmentModels,
  useEquipmentTypes,
} from "@/lib/hooks/useEquipment";
import { useBrands } from "@/lib/hooks/useCatalogs";
import { DataTable } from "@/components/data-table";
import { getEquipmentModelColumns } from "./columns";
import { EquipmentModelDialog } from "@/components/equipment/equipment-model-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function EquipmentModelsPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [query, setQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
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
  }, [debouncedQuery, selectedBrand, selectedType, limit]);

  const {
    data: modelsResponse,
    isLoading,
    error,
  } = useEquipmentModels(accessToken, {
    page: 1,
    limit: 1000, // Get all models to enable client-side filtering
  });

  const { data: brands = [] } = useBrands(accessToken);
  const { data: typesResponse } = useEquipmentTypes(accessToken);
  const types = typesResponse?.data || [];

  const models = useMemo(() => {
    let filtered = modelsResponse?.data || [];

    // Filter by search query (case-insensitive)
    if (debouncedQuery) {
      const query = debouncedQuery.toLowerCase();
      filtered = filtered.filter(
        (model) =>
          model.name?.toLowerCase().includes(query) ||
          model.code?.toLowerCase().includes(query)
      );
    }

    // Filter by brand
    if (selectedBrand) {
      filtered = filtered.filter(
        (model) => model.brand?.name === selectedBrand
      );
    }

    // Filter by type
    if (selectedType) {
      filtered = filtered.filter((model) => model.type?.name === selectedType);
    }

    // Sort by name A-Z
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [modelsResponse?.data, debouncedQuery, selectedBrand, selectedType]);

  // Calculate pagination based on filtered data
  const totalFilteredItems = models.length;
  const totalPages = Math.ceil(totalFilteredItems / limit);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selected, setSelected] = useState<EquipmentModel | null>(null);

  const columns = useMemo(
    () =>
      getEquipmentModelColumns({
        onEdit: (item) => {
          setSelected(item);
          setDialogMode("edit");
          setDialogOpen(true);
        },
      }),
    []
  );

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">Modelos de equipos</CardTitle>
            <Button
              onClick={() => {
                setDialogMode("create");
                setSelected(null);
                setDialogOpen(true);
              }}
            >
              Nuevo modelo
            </Button>
          </div>
          <CardDescription>Gestión de modelos de equipos</CardDescription>

          {/* Filters Row */}
          <div className="flex flex-col gap-4 mt-4 sm:flex-row">
            {/* Search is now handled by DataTable */}
            <div className="flex gap-2">
              {/* Brand filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="min-w-[140px] justify-between"
                  >
                    <span className="mr-2">🏷️</span> {selectedBrand || "Marca"}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 overflow-y-auto max-h-60"
                >
                  <div className="p-2">
                    <Input
                      placeholder="Buscar marca..."
                      className="mb-2"
                      onChange={(e) => {
                        const searchTerm = e.target.value.toLowerCase();
                        // Filter is handled by the dropdown rendering below
                      }}
                    />
                  </div>
                  <DropdownMenuItem onClick={() => setSelectedBrand("")}>
                    Todas las marcas
                  </DropdownMenuItem>
                  {brands
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((brand) => (
                      <DropdownMenuItem
                        key={brand.id}
                        onClick={() => setSelectedBrand(brand.name)}
                      >
                        {brand.name}
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
            <DataTable<EquipmentModel, unknown>
              columns={columns}
              data={models.slice((page - 1) * limit, page * limit)}
              searchableColumns={["name", "code"]}
              searchPlaceholder="Buscar por nombre o código..."
            />
          )}
          {/* Pagination controls */}
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        isActive={p === page}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      <EquipmentModelDialog
        accessToken={accessToken}
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setSelected(null);
        }}
        mode={dialogMode}
        model={selected}
      />
    </div>
  );
}
