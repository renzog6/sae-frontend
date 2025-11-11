// filepath: sae-frontend/app/settings/units/page.tsx
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
import { ChevronDown, Plus } from "lucide-react";
import { Unit } from "@/lib/types/catalog";
import {
  useUnits,
  useDeleteUnit,
  useRestoreUnit,
} from "@/lib/hooks/useCatalogs";
import { DataTable } from "@/components/data-table";
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

export default function UnitsPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";
  const { toast } = useToast();

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [query, setQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // Debounce query
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, selectedStatus, limit]);

  const { data: unitsResponse, isLoading, error } = useUnits();

  const { mutate: deleteUnit, isPending: deleting } = useDeleteUnit();
  const { mutate: restoreUnit, isPending: restoring } = useRestoreUnit();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [restoreOpen, setRestoreOpen] = useState(false);

  const units = useMemo(() => {
    let filtered = unitsResponse || [];

    // Filter by search query (case-insensitive)
    if (debouncedQuery) {
      const query = debouncedQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name?.toLowerCase().includes(query) ||
          item.abbreviation?.toLowerCase().includes(query)
      );
    }

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
  }, [unitsResponse, debouncedQuery, selectedStatus]);

  // Calculate pagination based on filtered data
  const totalFilteredItems = units.length;
  const totalPages = Math.ceil(totalFilteredItems / limit);

  // Get paginated data
  const paginatedData = units.slice((page - 1) * limit, page * limit);

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

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">Unidades</CardTitle>
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
          </div>
          <CardDescription>
            Gestiona todas las unidades del sistema
          </CardDescription>

          {/* Filters Row */}
          <div className="flex flex-col gap-4 mt-4 sm:flex-row">
            {/* Search Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Buscar unidades..."
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
                  <DropdownMenuItem
                    onClick={() => setSelectedStatus("INACTIVE")}
                  >
                    Inactivo
                  </DropdownMenuItem>
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
                      setLimit(25);
                    }}
                  >
                    25
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
            <DataTable<Unit, unknown> columns={columns} data={paginatedData} />
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

      {/* Unit dialog (component) */}
      <UnitDialog
        accessToken={accessToken}
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
    </div>
  );
}
