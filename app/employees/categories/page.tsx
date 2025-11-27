// filepath: sae-frontend/app/employees/categories/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { EmployeeCategory } from "@/lib/types/domain/employee";
import { useEmployeeCategories } from "@/lib/hooks/useEmployees";
import { DataTable } from "@/components/data-table";
import { getEmployeeCategoryColumns } from "./columns";
import { EmployeeCategoryDialog } from "@/components/employees/employee-category-dialog";
import { PaginationBar } from "@/components/data-table/pagination-bar";

export default function EmployeeCategoriesPage() {
  const { data: session } = useSession();

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: categoriesData, isLoading, error } = useEmployeeCategories();
  const categories = categoriesData?.data ?? [];

  // Calculate pagination based on filtered data
  const totalFilteredItems = categories.length;
  const totalPages = Math.ceil(totalFilteredItems / limit);

  // Get paginated data
  const paginatedData = categories.slice((page - 1) * limit, page * limit);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selected, setSelected] = useState<EmployeeCategory | null>(null);

  const columns = useMemo(
    () =>
      getEmployeeCategoryColumns({
        onEdit: (item) => {
          setSelected(item);
          setDialogMode("edit");
          setDialogOpen(true);
        },
      }),
    []
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categorías de empleados</h1>
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

      <Card>
        <CardHeader>
          <CardTitle>Listado</CardTitle>
          <CardDescription>Gestiona las categorías</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <DataTable<EmployeeCategory, unknown>
              columns={columns}
              data={paginatedData}
              searchableColumns={["name", "code"]}
              searchPlaceholder="Buscar por nombre o código..."
            />
          )}
        </CardContent>
      </Card>

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

      <EmployeeCategoryDialog
        accessToken=""
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
