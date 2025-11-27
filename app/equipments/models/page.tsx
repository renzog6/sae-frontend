// filepath: /sae-frontend/app/equipments/models/page.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

import { useBrands } from "@/lib/hooks/useCatalogs";
import {
  useEquipmentModels,
  useEquipmentTypes,
} from "@/lib/hooks/useEquipments";

import { getEquipmentModelColumns } from "./columns";
import { EquipmentModelDialog } from "@/components/equipment/equipment-model-dialog";

import { PaginationBar } from "@/components/data-table/pagination-bar";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/data-table/use-data-table";
import { EquipmentModel } from "@/lib/types/domain/equipment";

export default function EquipmentModelsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const { data: brands = [] } = useBrands();
  const { data: typesData } = useEquipmentTypes();
  const types = Array.isArray(typesData) ? typesData : [];

  const selectedTypeId =
    selectedType !== ""
      ? types.find((t: any) => t.name === selectedType)?.id
      : undefined;

  const {
    data: modelsResponse,
    isLoading,
    error,
  } = useEquipmentModels({
    page,
    limit,
    typeId: selectedTypeId,
  });

  const models = modelsResponse?.data ?? [];

  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      const brandMatch = !selectedBrand || model.brand?.name === selectedBrand;

      const typeMatch = !selectedType || model.type?.name === selectedType;

      return brandMatch && typeMatch;
    });
  }, [models, selectedBrand, selectedType]);

  const columns = useMemo(
    () =>
      getEquipmentModelColumns({
        onEdit: (item) => {
          setDialogMode("edit");
          setSelected(item);
          setDialogOpen(true);
        },
      }),
    []
  );

  // TanStack Table
  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: filteredModels,
    columns,
    searchableColumns: ["name", "code"],
  });

  // Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selected, setSelected] = useState<EquipmentModel | null>(null);

  const meta = modelsResponse?.meta ?? {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };

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

          {/* Filtros */}
          <div className="flex flex-col gap-4 mt-4 sm:flex-row">
            <div className="flex gap-2">
              {/* Brand filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="min-w-[140px] justify-between"
                  >
                    <span className="mr-2">🏷️</span>
                    {selectedBrand || "Marca"}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 overflow-y-auto max-h-60"
                >
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
                    <span className="mr-2">🔧</span>
                    {selectedType || "Tipo"}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 overflow-y-auto max-h-60"
                >
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
            <DataTable
              table={table}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              searchPlaceholder="Buscar por nombre o código…"
            />
          )}

          <PaginationBar
            page={meta.page}
            totalPages={meta.totalPages}
            totalItems={meta.total}
            limit={meta.limit}
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
