// filepath: sae-frontend/app/companies/business-categories/page.tsx
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
import { BusinessCategory } from "@/lib/types/company";
import {
  useBusinessCategories,
  useDeleteBusinessCategory,
  useRestoreBusinessCategory,
} from "@/lib/hooks/useCompanies";
import { DataTable } from "@/components/data-table";
import { getBusinessCategoryColumns } from "./columns";
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
import { BusinessCategoryDialog } from "@/components/categories/business-category-dialog";
import { useToast } from "@/components/ui/toaster";

export default function BusinessCategoriesPage() {
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

  const {
    data: categoriesResponse,
    isLoading,
    error,
  } = useBusinessCategories();

  const { mutate: deleteCategory, isPending: deleting } =
    useDeleteBusinessCategory();
  const { mutate: restoreCategory, isPending: restoring } =
    useRestoreBusinessCategory();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedCategory, setSelectedCategory] =
    useState<BusinessCategory | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState<"delete" | "restore">(
    "delete"
  );

  const categories = useMemo(() => {
    let filtered = categoriesResponse?.data || [];

    // Filter by search query (case-insensitive)
    if (debouncedQuery) {
      const query = debouncedQuery.toLowerCase();
      filtered = filtered.filter(
        (item: BusinessCategory) =>
          item.name?.toLowerCase().includes(query) ||
          item.code?.toLowerCase().includes(query) ||
          item.information?.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (selectedStatus && selectedStatus !== "ALL") {
      const isActive = selectedStatus === "ACTIVE";
      filtered = filtered.filter(
        (item: BusinessCategory) => item.isActive === isActive
      );
    }

    // Sort by name A-Z
    return filtered.sort((a: BusinessCategory, b: BusinessCategory) => {
      const nameA = a.name || "";
      const nameB = b.name || "";
      return nameA.localeCompare(nameB);
    });
  }, [categoriesResponse, debouncedQuery, selectedStatus]);

  // Calculate pagination based on filtered data
  const totalFilteredItems = categories.length;
  const totalPages = Math.ceil(totalFilteredItems / limit);

  // Get paginated data
  const paginatedData = categories.slice((page - 1) * limit, page * limit);

  const columns = useMemo(
    () =>
      getBusinessCategoryColumns({
        onEdit: (category: BusinessCategory) => {
          setSelectedCategory(category);
          setDialogMode("edit");
          setDialogOpen(true);
        },
        onDelete: (category: BusinessCategory) => {
          setSelectedCategory(category);
          setConfirmType("delete");
          setConfirmOpen(true);
        },
        onRestore: (category: BusinessCategory) => {
          setSelectedCategory(category);
          setConfirmType("restore");
          setConfirmOpen(true);
        },
        showRestore: true,
      }),
    [deleteCategory]
  );

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">Categorías</CardTitle>
            <Button
              onClick={() => {
                setDialogMode("create");
                setSelectedCategory(null);
                setDialogOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva categoría
            </Button>
          </div>
          <CardDescription>
            Gestiona todas las categorías del sistema
          </CardDescription>

          {/* Filters Row */}
          <div className="flex flex-col gap-4 mt-4 sm:flex-row">
            {/* Search Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Buscar categorías..."
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
            <DataTable<BusinessCategory, unknown>
              columns={columns}
              data={paginatedData}
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

      {/* Category dialog (component) */}
      <BusinessCategoryDialog
        accessToken={accessToken}
        open={dialogOpen}
        onOpenChange={(open: boolean) => {
          setDialogOpen(open);
          if (!open) setSelectedCategory(null);
        }}
        mode={dialogMode}
        category={selectedCategory}
      />

      {/* Confirm delete dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmType === "delete"
                ? "Confirmar eliminación"
                : "Confirmar restauración"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmType === "delete"
                ? `¿Seguro que deseas eliminar la categoría "${selectedCategory?.name}"?`
                : `¿Seguro que deseas restaurar la categoría "${selectedCategory?.name}"?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConfirmOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedCategory) {
                  if (confirmType === "delete") {
                    deleteCategory(selectedCategory.id, {
                      onSuccess: () => {
                        toast({
                          title: "Categoría eliminada",
                          description: `"${selectedCategory.name}" eliminada.`,
                          variant: "success",
                        });
                      },
                      onError: (e: any) => {
                        toast({
                          title: "Error al eliminar categoría",
                          description: e?.message || "Intenta nuevamente.",
                          variant: "error",
                        });
                      },
                      onSettled: () => {
                        setConfirmOpen(false);
                        setSelectedCategory(null);
                      },
                    });
                  } else {
                    restoreCategory(selectedCategory.id, {
                      onSuccess: () => {
                        toast({
                          title: "Categoría restaurada",
                          description: `"${selectedCategory.name}" restaurada.`,
                          variant: "success",
                        });
                      },
                      onError: (e: any) => {
                        toast({
                          title: "Error al restaurar categoría",
                          description: e?.message || "Intenta nuevamente.",
                          variant: "error",
                        });
                      },
                      onSettled: () => {
                        setConfirmOpen(false);
                        setSelectedCategory(null);
                      },
                    });
                  }
                }
              }}
            >
              {confirmType === "delete" ? "Eliminar" : "Restaurar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
