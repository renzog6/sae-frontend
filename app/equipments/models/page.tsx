// filepath: sae-frontend/app/equipments/models/page.tsx
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
import type { EquipmentModel } from "@/lib/types/equipment";
import {
  useEquipmentModels,
  useEquipmentTypes,
} from "@/lib/hooks/useEquipments";
import { useBrands } from "@/lib/hooks/useCatalogs";
import { DataTable } from "@/components/data-table";
import { getEquipmentModelColumns } from "./columns";
import { EquipmentModelDialog } from "@/components/equipment/equipment-model-dialog";
import { PaginationBar } from "@/components/table/pagination-bar";

export default function EquipmentModelsPage() {
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

  const { data: brands = [] } = useBrands();
  const { data: typesData } = useEquipmentTypes();
  const types = Array.isArray(typesData) ? typesData : [];

  const {
    data: modelsResponse,
    isLoading,
    error,
  } = useEquipmentModels({
    page,
    limit,
    typeId: selectedType
      ? types.find((t: any) => t.name === selectedType)?.id
      : undefined,
  });
  const models = modelsResponse?.data || [];
  const meta = modelsResponse?.meta || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };
  const totalPages = meta.totalPages || Math.ceil(meta.total / meta.limit);
  const totalItems = meta.total || 0;

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
              data={models.filter(
                (model: any) =>
                  !selectedBrand || model.brand?.name === selectedBrand
              )}
              searchableColumns={["name", "code"]}
              searchPlaceholder="Buscar por nombre o código..."
            />
          )}
          <PaginationBar
            page={page}
            totalPages={totalPages}
            totalItems={totalItems}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={(newLimit) => {
              setLimit(newLimit);
              setPage(1);
            }}
          />
        </CardContent>
      </Card>

      <EquipmentModelDialog
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
