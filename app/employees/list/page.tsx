// filepath: sae-frontend/app/employees/list/page.tsx
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
import type { Employee, EmployeeCategory } from "@/lib/types/domain/employee";
import { EmployeeStatus } from "@/lib/types/domain/employee";
import { useEmployeeCategories } from "@/lib/hooks/useEmployees";
import { employeeStatusLabels } from "@/lib/constants";
import { DataTable } from "@/components/data-table/data-table-v2";
import { useGraphQLDataTable } from "@/components/hooks/useGraphQLDataTable";
import { useGetEmployeesQuery, GetEmployeesQuery } from "@/lib/graphql/generated";
import { getEmployeeColumns } from "./columns";
import { ReportExportMenu } from "@/components/reports/report-export-menu";
import { ReportType } from "@/lib/types/domain/report";
import Link from "next/link";
import { EntityListLayout } from "@/components/entities/entity-list-layout";
import { EntityErrorState } from "@/components/entities/entity-error-state";
import { useRouter } from "next/navigation";

export default function EmployeesPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>(
    EmployeeStatus.ACTIVE
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const router = useRouter();

  const { useGetAll: useGetCategories } = useEmployeeCategories();
  const { data: categoriesResponse } = useGetCategories();

  const categories = useMemo(() => {
    return (categoriesResponse?.data || []).sort(
      (a: EmployeeCategory, b: EmployeeCategory) =>
        a.name.localeCompare(b.name)
    );
  }, [categoriesResponse?.data]);

  // GraphQL Table Hook
  // Map dropdown filters to additionalWhere
  const additionalWhere = useMemo(() => {
    const where: any = {};
    if (selectedStatus && selectedStatus !== "ALL") {
      where.status = selectedStatus;
    }
    if (selectedCategory) {
      const category = categories.find(c => c.name === selectedCategory);
      if (category) {
        where.categoryId = category.id;
      }
    }
    return where;
  }, [selectedStatus, selectedCategory, categories]);

  const { table, isLoading, error, totalItems } = useGraphQLDataTable({
    useQueryHook: useGetEmployeesQuery,
    dataAccessor: (data: GetEmployeesQuery) => data.findAllEmployees,
    columns: getEmployeeColumns() as any,
    additionalWhere,
    defaultPageSize: 10,
  });

  return (
    <EntityListLayout
      title="Empleados"
      description="Gestiona todos los empleados del sistema"
      actions={
        <div className="flex items-center gap-2">
          <ReportExportMenu
            reportType={ReportType.EMPLOYEE_LIST}
            filter={{
              status: selectedStatus === "ALL" ? undefined : selectedStatus.toLowerCase()
            }}
            title="Empleados"
          />
          <Link href="/employees/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo empleado
            </Button>
          </Link>
        </div>
      }
      filters={
        <div className="flex flex-wrap gap-2">
          {/* Status filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[140px] justify-between"
              >
                <span className="mr-2">🏷️</span>
                {selectedStatus === "ALL"
                  ? "Todos"
                  : employeeStatusLabels[selectedStatus as EmployeeStatus]}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setSelectedStatus("ALL")}>
                Todos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus(EmployeeStatus.ACTIVE)}>
                {employeeStatusLabels[EmployeeStatus.ACTIVE]}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus(EmployeeStatus.SUSPENDED)}>
                {employeeStatusLabels[EmployeeStatus.SUSPENDED]}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus(EmployeeStatus.TERMINATED)}>
                {employeeStatusLabels[EmployeeStatus.TERMINATED]}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Category filter - New Feature mimicking Equipments */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[140px] justify-between"
              >
                <span className="mr-2">📂</span>
                {selectedCategory || "Todas las categorías"}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 overflow-y-auto max-h-60"
            >
              <DropdownMenuItem onClick={() => setSelectedCategory("")}>
                Todas las categorías
              </DropdownMenuItem>
              {categories.map((category: EmployeeCategory) => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      }
    >
      <EntityErrorState error={error} />

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">Cargando empleados...</p>
        </div>
      ) : (
        <DataTable<Employee> table={table as any} totalItems={totalItems} />
      )}
    </EntityListLayout>
  );
}
