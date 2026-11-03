// filepath: sae-frontend/app/employees/[id]/edit/page.tsx
"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";

import { EntityFormLayout } from "@/components/entities/entity-form-layout";
import { EmployeeEditForm } from "@/components/forms/employee-edit-form";
import { useEmployees, useEmployeeCategories, useEmployeePositions } from "@/lib/hooks/useEmployees";

export default function EmployeeDetailPage() {
  const params = useParams();

  const id = useMemo(() => {
    const p = params?.id;
    const asStr = Array.isArray(p) ? p[0] : (p as string | undefined);
    const n = asStr ? Number(asStr) : NaN;
    return Number.isNaN(n) ? undefined : n;
  }, [params]);

  const { data: employee, isLoading, error: fetchError } = useEmployees().useGetById(id ?? 0);
  const { useGetAll: useGetCategories } = useEmployeeCategories();
  const { data: categoriesData } = useGetCategories();
  const { useGetAll: useGetPositions } = useEmployeePositions();
  const { data: positionsData } = useGetPositions();

  const categories = categoriesData?.data ?? [];
  const positions = positionsData?.data ?? [];

  if (id === undefined) {
    return (
      <EntityFormLayout title="Editar Empleado" description="ID inválido" backHref="/employees/list">
        <p className="text-sm text-muted-foreground">El ID proporcionado no es válido.</p>
      </EntityFormLayout>
    );
  }

  return (
    <EntityFormLayout
      title="Editar Empleado"
      description="Actualiza los datos personales y laborales del empleado"
      backHref="/employees/list"
    >
      {isLoading || !employee ? (
        <div className="space-y-4 animate-pulse">
          <div className="w-1/2 h-4 rounded bg-muted" />
          <div className="w-1/3 h-4 rounded bg-muted" />
          <div className="w-2/3 h-4 rounded bg-muted" />
        </div>
      ) : (
        <EmployeeEditForm
          employee={employee}
          employeeId={id}
          categories={categories}
          positions={positions}
          isLoading={isLoading}
          fetchError={fetchError as Error | null}
        />
      )}
    </EntityFormLayout>
  );
}
