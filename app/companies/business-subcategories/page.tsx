// filepath: sae-frontend/app/companies/business-subcategories/page.tsx
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
import { ChevronDown, Plus } from "lucide-react";
import { BusinessSubCategory } from "@/lib/types/domain/company";
import {
  useBusinessSubCategories,
  useDeleteBusinessSubCategory,
  useRestoreBusinessSubCategory,
} from "@/lib/hooks/useCompanies";
import { DataTable } from "@/components/data-table";
import { getBusinessSubcategoryColumns } from "./columns";
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
import { BusinessSubCategoryDialog } from "@/components/categories/business-subcategory-dialog";
import { useToast } from "@/components/ui/toaster";
import { PaginationBar } from "@/components/data-table/pagination-bar";

export default function BusinessSubCategoriesPage() {
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
    data: subcategoriesResponse,
    isLoading,
    error,
  } = useBusinessSubCategories();

  const { mutate: deleteSubcategory, isPending: deleting } =
    useDeleteBusinessSubCategory();
  const { mutate: restoreSubcategory, isPending: restoring } =
    useRestoreBusinessSubCategory();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<BusinessSubCategory | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState<"delete" | "restore">(
    "delete"
  );

  const subcategories = useMemo(() => {
    let filtered = subcategoriesResponse || [];

    // Filter by search query (case-insensitive)
    if (debouncedQuery) {
      const query = debouncedQuery.toLowerCase();
      filtered = filtered.filter(
        (item: BusinessSubCategory) =>
          item.name?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.businessCategory?.name?.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (selectedStatus && selectedStatus !== "ALL") {
      const isActive = selectedStatus === "ACTIVE";
      filtered = filtered.filter(
        (item: BusinessSubCategory) => item.isActive === isActive
      );
    }

    // Sort by name A-Z
    return filtered.sort((a: BusinessSubCategory, b: BusinessSubCategory) => {
      const nameA = a.name || "";
      const nameB = b.name || "";
      return nameA.localeCompare(nameB);
    });
  }, [subcategoriesResponse, debouncedQuery, selectedStatus]);

  // Calculate pagination based on filtered data
  const totalFilteredItems = subcategories.length;
  const totalPages = Math.ceil(totalFilteredItems / limit);

  // Get paginated data
  const paginatedData = subcategories.slice((page - 1) * limit, page * limit);

  const columns = useMemo(
    () =>
      getBusinessSubcategoryColumns({
        onEdit: (subcategory: BusinessSubCategory) => {
          setSelectedSubcategory(subcategory);
          setDialogMode("edit");
          setDialogOpen(true);
        },
        onDelete: (subcategory: BusinessSubCategory) => {
          setSelectedSubcategory(subcategory);
          setConfirmType("delete");
          setConfirmOpen(true);
        },
        onRestore: (subcategory: BusinessSubCategory) => {
          setSelectedSubcategory(subcategory);
          setConfirmType("restore");
          setConfirmOpen(true);
        },
        showRestore: true,
      }),
    [deleteSubcategory]
  );

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">Subcategorías</CardTitle>
            <Button
              onClick={() => {
                setDialogMode("create");
                setSelectedSubcategory(null);
                setDialogOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva subcategoría
            </Button>
          </div>
          <CardDescription>
            Gestiona todas las subcategorías del sistema
          </CardDescription>

          {/* Filters Row */}
          <div className="flex flex-col gap-4 mt-4 sm:flex-row">
            {/* Search Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Buscar subcategorías..."
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
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error.message}</p>
          ) : (
            <DataTable<BusinessSubCategory, unknown>
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

      {/* Subcategory dialog (component) */}
      <BusinessSubCategoryDialog
        open={dialogOpen}
        onOpenChange={(open: boolean) => {
          setDialogOpen(open);
          if (!open) setSelectedSubcategory(null);
        }}
        mode={dialogMode}
        subcategory={selectedSubcategory}
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
                ? `¿Seguro que deseas eliminar la subcategoría "${selectedSubcategory?.name}"?`
                : `¿Seguro que deseas restaurar la subcategoría "${selectedSubcategory?.name}"?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConfirmOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedSubcategory) {
                  if (confirmType === "delete") {
                    deleteSubcategory(selectedSubcategory.id, {
                      onSuccess: () => {
                        toast({
                          title: "Subcategoría eliminada",
                          description: `"${selectedSubcategory.name}" eliminada.`,
                          variant: "success",
                        });
                      },
                      onError: (e: any) => {
                        toast({
                          title: "Error al eliminar subcategoría",
                          description: e?.message || "Intenta nuevamente.",
                          variant: "error",
                        });
                      },
                      onSettled: () => {
                        setConfirmOpen(false);
                        setSelectedSubcategory(null);
                      },
                    });
                  } else {
                    restoreSubcategory(selectedSubcategory.id, {
                      onSuccess: () => {
                        toast({
                          title: "Subcategoría restaurada",
                          description: `"${selectedSubcategory.name}" restaurada.`,
                          variant: "success",
                        });
                      },
                      onError: (e: any) => {
                        toast({
                          title: "Error al restaurar subcategoría",
                          description: e?.message || "Intenta nuevamente.",
                          variant: "error",
                        });
                      },
                      onSettled: () => {
                        setConfirmOpen(false);
                        setSelectedSubcategory(null);
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
