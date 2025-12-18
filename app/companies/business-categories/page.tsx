// filepath: sae-frontend/app/companies/business-categories/page.tsx
"use client";

import { useMemo, useState } from "react";
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
import { ChevronDown, Plus } from "lucide-react";
import { BusinessCategory } from "@/lib/types/domain/company";
import {
  useBusinessCategories,
  useDeleteBusinessCategory,
  useRestoreBusinessCategory,
} from "@/lib/hooks/useCompanies";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/data-table/use-data-table";
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
import { PaginationBar } from "@/components/data-table/pagination-bar";

export default function BusinessCategoriesPage() {
  const { toast } = useToast();

  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

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

  // Filter categories by status (client-side filtering)
  const filteredCategories = useMemo(() => {
    let filtered = categoriesResponse || [];

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
  }, [categoriesResponse, selectedStatus]);

  // Set up data table with search and pagination
  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: filteredCategories,
    columns,
    searchableColumns: ["name", "code", "information"],
  });

  // Calculate pagination from table state
  const totalFilteredItems = table.getFilteredRowModel().rows.length;
  const totalPages = table.getPageCount();

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
            <DataTable<BusinessCategory>
              table={table}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          )}

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
        </CardContent>
      </Card>

      {/* Category dialog (component) */}
      <BusinessCategoryDialog
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
