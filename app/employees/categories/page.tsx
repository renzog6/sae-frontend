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
import type { EmployeeCategory } from "@/types/employee";
import { useEmployeeCategories } from "@/lib/hooks/useEmployees";
import { DataTable } from "@/components/data-table";
import { getEmployeeCategoryColumns } from "./columns";
import { EmployeeCategoryDialog } from "@/components/employees/employee-category-dialog";

export default function EmployeeCategoriesPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";

  const {
    data: categories = [],
    isLoading,
    error,
  } = useEmployeeCategories(accessToken);

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
              data={categories}
              searchableColumns={["name", "code"]}
              searchPlaceholder="Buscar por nombre o código..."
            />
          )}
        </CardContent>
      </Card>

      <EmployeeCategoryDialog
        accessToken={accessToken}
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
