// filepath: sae-frontend/app/employees/positions/page.tsx
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
import type { EmployeePosition } from "@/lib/types/employee";
import { useEmployeePositions } from "@/lib/hooks/useEmployees";
import { DataTable } from "@/components/data-table";
import { getEmployeePositionColumns } from "./columns";
import { EmployeePositionDialog } from "@/components/employees/employee-position-dialog";
import { PaginationBar } from "@/components/table/pagination-bar";

export default function EmployeePositionsPage() {
  const { data: session } = useSession();

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: positionsData, isLoading, error } = useEmployeePositions();
  const positions = positionsData?.data ?? [];

  // Calculate pagination based on filtered data
  const totalFilteredItems = positions.length;
  const totalPages = Math.ceil(totalFilteredItems / limit);

  // Get paginated data
  const paginatedData = positions.slice((page - 1) * limit, page * limit);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selected, setSelected] = useState<EmployeePosition | null>(null);

  const columns = useMemo(
    () =>
      getEmployeePositionColumns({
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
        <h1 className="text-2xl font-bold">Puestos de empleados</h1>
        <Button
          onClick={() => {
            setDialogMode("create");
            setSelected(null);
            setDialogOpen(true);
          }}
        >
          Nuevo puesto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado</CardTitle>
          <CardDescription>Gestiona los puestos</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <DataTable<EmployeePosition, unknown>
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

      <EmployeePositionDialog
        accessToken=""
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setSelected(null);
        }}
        mode={dialogMode}
        position={selected}
      />
    </div>
  );
}
