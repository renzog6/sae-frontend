// filepath: sae-frontend/app/settings/units/page.tsx
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

import { useUnits, useRestoreUnit } from "@/lib/hooks";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/hooks/useDataTable";
import { getUnitColumns } from "./columns";
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
import { UnitDialog } from "@/components/units/unit-dialog";
import { useToast } from "@/components/ui/toaster";
import { Unit } from "@/lib/types/shared/catalogs";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { EntityListLayout } from "@/components/entities/entity-list-layout";
import { EntityErrorState } from "@/components/entities/entity-error-state";
import { EntityLoadingState } from "@/components/entities/entity-loading-state";

export default function UnitsPage() {
  const { toast } = useToast();

  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  const { data: unitsResponse, isLoading, error } = useUnits().useGetAll();

  const { mutate: deleteUnit, isPending: deleting } = useUnits().useDelete();
  const { mutate: restoreUnit, isPending: restoring } = useRestoreUnit();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [restoreOpen, setRestoreOpen] = useState(false);

  const columns = useMemo(
    () =>
      getUnitColumns({
        onEdit: (unit) => {
          setSelectedUnit(unit);
          setDialogMode("edit");
          setDialogOpen(true);
        },
        onDelete: (unit) => {
          setSelectedUnit(unit);
          setConfirmOpen(true);
        },
        onRestore: (unit) => {
          setSelectedUnit(unit);
          setRestoreOpen(true);
        },
      }),
    [deleteUnit, restoreUnit]
  );

  // Filter units by status (client-side filtering)
  const filteredUnits = useMemo(() => {
    let filtered = unitsResponse?.data || [];

    // Filter by status
    if (selectedStatus && selectedStatus !== "ALL") {
      const isActive = selectedStatus === "ACTIVE";
      filtered = filtered.filter((item) => item.isActive === isActive);
    }

    // Sort by name A-Z
    return filtered.sort((a, b) => {
      const nameA = a.name || "";
      const nameB = b.name || "";
      return nameA.localeCompare(nameB);
    });
  }, [unitsResponse, selectedStatus]);

  // Set up data table with search and pagination
  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: filteredUnits,
    columns,
    searchableColumns: ["name", "abbreviation"],
  });

  // Calculate pagination from table state
  const totalFilteredItems = table.getFilteredRowModel().rows.length;
  const totalPages = table.getPageCount();

  return (
    <EntityListLayout
      title="Unidades"
      description="Gestiona todas las unidades del sistema"
      actions={
        <Button
          onClick={() => {
            setDialogMode("create");
            setSelectedUnit(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva unidad
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
          <DataTable<Unit>
            table={table}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />

          {/* Pagination controls */}
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
        </>
      )}

      {/* Unit dialog (component) */}
      <UnitDialog
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setSelectedUnit(null);
        }}
        mode={dialogMode}
        unit={selectedUnit}
      />

      {/* Confirm delete dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar eliminación</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que deseas eliminar la unidad "{selectedUnit?.name}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConfirmOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedUnit) {
                  deleteUnit(selectedUnit.id, {
                    onSuccess: () => {
                      toast({
                        title: "Unidad eliminada",
                        description: `"${selectedUnit.name}" eliminada.`,
                        variant: "success",
                      });
                    },
                    onError: (e: any) => {
                      toast({
                        title: "Error al eliminar unidad",
                        description: e?.message || "Intenta nuevamente.",
                        variant: "error",
                      });
                    },
                    onSettled: () => {
                      setConfirmOpen(false);
                      setSelectedUnit(null);
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

      {/* Confirm restore dialog */}
      <AlertDialog open={restoreOpen} onOpenChange={setRestoreOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar restauración</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que deseas restaurar la unidad "{selectedUnit?.name}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setRestoreOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedUnit) {
                  restoreUnit(selectedUnit.id, {
                    onSuccess: () => {
                      toast({
                        title: "Unidad restaurada",
                        description: `"${selectedUnit.name}" restaurada.`,
                        variant: "success",
                      });
                    },
                    onError: (e: any) => {
                      toast({
                        title: "Error al restaurar unidad",
                        description: e?.message || "Intenta nuevamente.",
                        variant: "error",
                      });
                    },
                    onSettled: () => {
                      setRestoreOpen(false);
                      setSelectedUnit(null);
                    },
                  });
                }
              }}
            >
              Restaurar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </EntityListLayout>
  );
}
