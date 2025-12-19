// filepath: sae-frontend/app/companies/business-subcategories/page.tsx
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
import { BusinessSubCategory } from "@/lib/types/domain/company";
import {
  useBusinessSubCategories,
  useDeleteBusinessSubCategory,
  useRestoreBusinessSubCategory,
} from "@/lib/hooks";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/hooks/useDataTable";
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
import { EntityListLayout } from "@/components/entities/entity-list-layout";
import { EntityErrorState } from "@/components/entities/entity-error-state";
import { EntityLoadingState } from "@/components/entities/entity-loading-state";

export default function BusinessSubCategoriesPage() {
  const { toast } = useToast();

  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

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

  // Filter subcategories by status (client-side filtering)
  const filteredSubcategories = useMemo(() => {
    let filtered = subcategoriesResponse || [];

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
  }, [subcategoriesResponse, selectedStatus]);

  // Set up data table with search and pagination
  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: filteredSubcategories,
    columns,
    searchableColumns: ["name", "description", "businessCategory.name"],
  });

  // Calculate pagination from table state
  const totalFilteredItems = table.getFilteredRowModel().rows.length;
  const totalPages = table.getPageCount();

  return (
    <>
      <EntityListLayout
        title="Subcategorías"
        description="Gestiona todas las subcategorías del sistema"
        actions={
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
            <DataTable<BusinessSubCategory>
              table={table}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />

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
      </EntityListLayout>

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
    </>
  );
}
