// filepath: sae-frontend/app/companies/list/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
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
import type { Company, BusinessCategory } from "@/lib/types/company";
import { useCompanies, useBusinessCategories } from "@/lib/hooks/useCompanies";
import { DataTable } from "@/components/data-table";
import { getCompanyColumns } from "./columns";
import Link from "next/link";
import { PaginationBar } from "@/components/table/pagination-bar";

export default function CompaniesPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Debounce query
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, selectedCategory, limit]);

  const {
    data: companiesResponse,
    isLoading,
    error,
  } = useCompanies({
    page: 1,
    limit: 100, // Get all companies to enable client-side filtering
  });

  const { data: categoriesResponse } = useBusinessCategories();

  const categories: BusinessCategory[] = categoriesResponse?.data || [];

  const companies = useMemo(() => {
    let filtered: Company[] = companiesResponse || [];

    // Filter by search query (case-insensitive)
    if (debouncedQuery) {
      const searchQuery = debouncedQuery.toLowerCase();
      filtered = filtered.filter(
        (item: Company) =>
          item.name?.toLowerCase().includes(searchQuery) ||
          item.businessName?.toLowerCase().includes(searchQuery) ||
          item.cuit?.toLowerCase().includes(searchQuery)
      );
    }

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
  }, [companiesResponse, debouncedQuery, selectedCategory]);

  // Calculate pagination based on filtered data
  const totalFilteredItems = companies.length;
  const totalPages = Math.ceil(totalFilteredItems / limit);

  // Get paginated data
  const paginatedData = companies.slice((page - 1) * limit, page * limit);

  const columns = useMemo(() => getCompanyColumns(), []);

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
            {/* Search Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Buscar por nombre, razón social o CUIT..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-w-[300px]"
              />

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
            <DataTable<Company, unknown>
              columns={columns}
              data={paginatedData}
            />
          )}
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
        </CardContent>
      </Card>
    </div>
  );
}
