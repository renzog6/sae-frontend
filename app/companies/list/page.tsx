//filepath: sae-frontend/app/companies/list/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus, Filter } from "lucide-react";
import type { Company, BusinessCategory } from "@/lib/types/domain/company";
import { useBusinessCategories } from "@/lib/hooks";
import { DataTable } from "@/components/data-table/data-table-v2";
import { useServerDataTable } from "@/components/hooks/useServerDataTable";
import { CompaniesService } from "@/lib/api/companies/companies.service";
import { getCompanyColumns } from "./columns";
import Link from "next/link";
import { EntityListLayout } from "@/components/entities/entity-list-layout";
import { EntityErrorState } from "@/components/entities/entity-error-state";
import { EntityLoadingState } from "@/components/entities/entity-loading-state";

export default function CompaniesPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");

  const { data: categoriesResponse } = useBusinessCategories();
  const categories: BusinessCategory[] = categoriesResponse || [];

  const columns = useMemo(() => getCompanyColumns(), []);

  // Query function for server-side data table
  const queryFn = async (params: {
    page: number;
    limit: number;
    filters?: Record<string, string>;
  }) => {
    const queryParams: any = {
      page: params.page,
      limit: params.limit,
    };

    // Add search query
    // useServerDataTable puts column filters into params.filters
    // If we have a global search (q), we need to handle it.
    // NOTE: useServerDataTable maps column filters.
    // Usually q comes from a specific search input.
    // Current DataTable V2 has a unified search bar that usually works via 'q' prop passed to it?
    // No, DataTable V2 handles 'globalFilter' state.

    // BUT useServerDataTable does NOT automatically pass 'globalFilter' to queryParams in the current implementation I saw.
    // Let's re-read useServerDataTable.ts carefully.
    // It maps 'debouncedColumnFilters'. It DOES NOT seem to map globalFilter.
    // However, the DataTable component uses standard 'globalFilter' state.

    // In companies/list/page.tsx (original), 'searchableColumns' was used.

    // FOR NOW, let's assume useServerDataTable handles column filters.
    // If I want global search 'q', I might need to check if useServerDataTable supports it or I need to patch it.
    // Looking at useServerDataTable again (Step 46):
    // It has NO globalFilter logic.
    // It returns 'table', which has 'state.globalFilter'.
    // If we want to send 'q', we must extract it from table state?
    // Or we should update useServerDataTable to support globalFilter like 'q'.

    // Decision: standard simple implementation first.
    // For sorting/search:
    // References to employees/vacations/page.tsx showed queryParams.q being set from filters?
    // "if (params.filters.employeeCode) queryParams.q = params.filters.employeeCode;"

    // BaseController findAll supports 'q'.
    // We should probably rely on column filters "name" or "cuit" to map to 'q' if we want simple search,
    // OR we simply pass extra params.

    if (params.filters) {
      // If the user types in "name" column filter, send it as q?
      if (params.filters.name) queryParams.q = params.filters.name;
      if (params.filters.businessName) queryParams.q = params.filters.businessName;
      if (params.filters.cuit) queryParams.q = params.filters.cuit;
    }

    // Add category filter
    if (selectedCategoryId) {
      queryParams.businessCategoryId = selectedCategoryId;
    }

    return CompaniesService.getAll(queryParams);
  };

  const { table, isLoading, error, totalItems } = useServerDataTable({
    queryKey: ["companies", selectedCategoryId],
    queryFn,
    columns,
    defaultPageSize: 10,
  });

  return (
    <EntityListLayout
      title="Empresas"
      description="Gestiona todas las empresas del sistema"
      actions={
        <Link href="/companies/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nueva empresa
          </Button>
        </Link>
      }
      filters={
        <div className="flex gap-2">
          {/* Category filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[140px] justify-between border-dashed"
              >
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  {selectedCategoryName || "Categoría"}
                </div>
                {selectedCategoryId && (
                  <span className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    1
                  </span>
                )}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 overflow-y-auto max-h-60"
            >
              <div className="p-2">
                <Input
                  placeholder="Buscar categoría..."
                  className="mb-2 h-8"
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    // This is only visual filtering for the dropdown items
                    // We can implement local state filtering here if needed
                  }}
                />
              </div>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedCategoryId(null);
                  setSelectedCategoryName("");
                }}
              >
                Todas las categorías
              </DropdownMenuItem>
              {categories
                ?.sort((a: BusinessCategory, b: BusinessCategory) =>
                  a.name.localeCompare(b.name)
                )
                .map((category: BusinessCategory) => (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => {
                      setSelectedCategoryId(category.id);
                      setSelectedCategoryName(category.name);
                    }}
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
        <EntityLoadingState />
      ) : (
        <DataTable<Company> table={table} totalItems={totalItems} />
      )}
    </EntityListLayout>
  );
}
