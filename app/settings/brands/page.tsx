// filepath: sae-frontend/app/settings/brands/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";
import { Brand } from "@/lib/types/shared/catalogs";
import { useBrands } from "@/lib/hooks";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/hooks/useDataTable";
import { getBrandColumns } from "./columns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BrandDialog } from "@/components/brands/brand-dialog";
import { useToast } from "@/components/ui/toaster";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { EntityListLayout } from "@/components/entities/entity-list-layout";
import { EntityErrorState } from "@/components/entities/entity-error-state";
import { EntityLoadingState } from "@/components/entities/entity-loading-state";

export default function BrandsPage() {
  const { toast } = useToast();

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  const {
    data: brandsResponse,
    isLoading,
    error,
  } = useBrands().useGetAll({
    page,
    limit,
    sortBy: "name",
    sortOrder: "asc",
    deleted: selectedStatus,
  });

  const { mutate: deleteBrand, isPending: deleting } = useBrands().useDelete();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const brands = brandsResponse?.data || [];
  const {
    page: metaPage,
    total,
    totalPages,
    limit: metaLimit,
  } = brandsResponse?.meta || {};

  const columns = useMemo(
    () =>
      getBrandColumns({
        onEdit: (brand) => {
          setSelectedBrand(brand);
          setDialogMode("edit");
          setDialogOpen(true);
        },
        onDelete: (brand) => {
          setSelectedBrand(brand);
          setConfirmOpen(true);
        },
      }),
    [deleteBrand]
  );

  // Set up data table with search (server-side pagination maintained)
  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: brands,
    columns,
    searchableColumns: ["name"],
  });

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <EntityListLayout
        title="Marcas"
        description="Gestiona todas las marcas del sistema"
        actions={
          <Button
            onClick={() => {
              setDialogMode("create");
              setSelectedBrand(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva marca
          </Button>
        }
        filters={
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
                    : selectedStatus === "ACTIVE"
                    ? "Activo"
                    : "Inactivo"}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setSelectedStatus("ALL")}>
                  Todos los estados
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("ACTIVE")}>
                  Activo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("INACTIVE")}>
                  Inactivo
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
          <>
            <DataTable<Brand>
              table={table}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />

            {/* Pagination controls */}
            <PaginationBar
              page={page}
              totalPages={totalPages ?? 1}
              totalItems={total ?? 0}
              limit={limit}
              onPageChange={setPage}
              onLimitChange={(newLimit) => {
                setLimit(newLimit);
                setPage(1);
              }}
            />
          </>
        )}
      </EntityListLayout>

      {/* Brand dialog (component) */}
      <BrandDialog
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setSelectedBrand(null);
        }}
        mode={dialogMode}
        brand={selectedBrand}
      />

      {/* Confirm delete dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar eliminación</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que deseas eliminar la marca "{selectedBrand?.name}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConfirmOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedBrand) {
                  deleteBrand(selectedBrand.id, {
                    onSuccess: () => {
                      toast({
                        title: "Marca eliminada",
                        description: `"${selectedBrand.name}" eliminada.`,
                        variant: "success",
                      });
                    },
                    onError: (e: any) => {
                      toast({
                        title: "Error al eliminar marca",
                        description: e?.message || "Intenta nuevamente.",
                        variant: "error",
                      });
                    },
                    onSettled: () => {
                      setConfirmOpen(false);
                      setSelectedBrand(null);
                    },
                  });
                }
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
