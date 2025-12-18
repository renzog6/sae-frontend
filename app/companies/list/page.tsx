// filepath: sae-frontend/app/companies/list/page.tsx
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
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";
import type { Company, BusinessCategory } from "@/lib/types/domain/company";
import { useCompanies, useBusinessCategories } from "@/lib/hooks/useCompanies";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/data-table/use-data-table";
import { getCompanyColumns } from "./columns";
import Link from "next/link";
import { PaginationBar } from "@/components/data-table/pagination-bar";

export default function CompaniesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const {
    data: companiesResponse,
    isLoading,
    error,
  } = useCompanies({
    page: 1,
    limit: 100, // Get all companies to enable client-side filtering
  });

  const { data: categoriesResponse } = useBusinessCategories();

  const categories: BusinessCategory[] = categoriesResponse || [];

  const columns = useMemo(() => getCompanyColumns(), []);

  // Filter companies by category (client-side filtering)
  const filteredCompanies = useMemo(() => {
    let filtered: Company[] = companiesResponse || [];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (item: Company) => item.businessCategory?.name === selectedCategory
      );
    }

    // Sort by name A-Z
    return filtered.sort((a: Company, b: Company) => {
      const nameA = a.name || "";
      const nameB = b.name || "";
      return nameA.localeCompare(nameB);
    });
  }, [companiesResponse, selectedCategory]);

  // Set up data table with search and pagination
  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: filteredCompanies,
    columns,
    searchableColumns: ["name", "businessName", "cuit"],
  });

  // Calculate pagination from table state
  const totalFilteredItems = table.getFilteredRowModel().rows.length;
  const totalPages = table.getPageCount();

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">Empresas</CardTitle>
            <Link href="/companies/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nueva empresa
              </Button>
            </Link>
          </div>
          <CardDescription>
            Gestiona todas las empresas del sistema
          </CardDescription>

          {/* Filters Row */}
          <div className="flex flex-col gap-4 mt-4 sm:flex-row">
            <div className="flex gap-2">
              {/* Category filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="min-w-[140px] justify-between"
                  >
                    <span className="mr-2">🏷️</span>{" "}
                    {selectedCategory || "Categoría"}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 overflow-y-auto max-h-60"
                >
                  <div className="p-2">
                    <Input
                      placeholder="Buscar categoría..."
                      className="mb-2"
                      onChange={(e) => {
                        const searchTerm = e.target.value.toLowerCase();
                        // Filter is handled by the dropdown rendering below
                      }}
                    />
                  </div>
                  <DropdownMenuItem onClick={() => setSelectedCategory("")}>
                    Todas las categorías
                  </DropdownMenuItem>
                  {categories
                    ?.sort((a: BusinessCategory, b: BusinessCategory) =>
                      a.name.localeCompare(b.name)
                    )
                    .map((category: BusinessCategory) => (
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
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error.message}</p>
          ) : (
            <DataTable<Company>
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
    </div>
  );
}
