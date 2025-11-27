// filepath: sae-frontend/app/equipments/categories/page.tsx
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import type { EquipmentCategory } from "@/lib/types/domain/equipment";
import { useEquipmentCategories } from "@/lib/hooks/useEquipments";
import { DataTable } from "@/components/data-table";
import { getEquipmentCategoryColumns } from "./columns";
import { EquipmentCategoryDialog } from "@/components/equipment/equipment-category-dialog";
import { PaginationBar } from "@/components/data-table/pagination-bar";

export default function EquipmentCategoriesPage() {
  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [query, setQuery] = useState("");

  // Debounce query
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, limit]);

  const {
    data: categoriesResponse,
    isLoading,
    error,
  } = useEquipmentCategories({ page, limit });
  console.log("Categories response:", categoriesResponse);
  console.log("Categories error:", error);

  const categories = categoriesResponse?.data || [];
  const meta = categoriesResponse?.meta || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };
  const totalPages = meta.totalPages || Math.ceil(meta.total / meta.limit);
  const totalItems = meta.total || 0;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selected, setSelected] = useState<EquipmentCategory | null>(null);

  const columns = useMemo(
    () =>
      getEquipmentCategoryColumns({
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
            <CardTitle className="text-2xl">Categorías de equipos</CardTitle>
            <Button
              onClick={() => {
                setDialogMode("create");
                setSelected(null);
                setDialogOpen(true);
              }}
            >
              Nueva categoría
            </Button>
          </div>
          <CardDescription>Gestión de categorías de equipos</CardDescription>

          {/* Filters Row */}
          <div className="flex flex-col gap-4 mt-4 sm:flex-row">
            <div className="flex gap-2"></div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error.message}</p>
          ) : (
            <DataTable<EquipmentCategory, unknown>
              columns={columns}
              data={categories}
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

      <EquipmentCategoryDialog
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setSelected(null);
        }}
        mode={dialogMode}
        category={selected}
      />
    </div>
  );
}
