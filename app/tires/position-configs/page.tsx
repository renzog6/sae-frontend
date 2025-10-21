// filepath: sae-frontend/app/tires/position-configs/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";
import type { TirePositionConfig } from "@/lib/types/tire";
import { useTirePositionConfigs } from "@/lib/hooks/useTires";
import { DataTable } from "@/components/data-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getTirePositionConfigColumns } from "./columns";

export default function PositionConfigsPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [axleId, setAxleId] = useState<number | undefined>();

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [axleId, limit]);

  const {
    data: configsData,
    isLoading,
    error,
  } = useTirePositionConfigs(accessToken, {
    axleId,
  });

  const configs: TirePositionConfig[] = Array.isArray(configsData)
    ? configsData
    : (configsData as any)?.data ?? [];

  const columns = useMemo(() => getTirePositionConfigColumns(), []);

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">
              Configuraciones de Posición
            </CardTitle>
            <Button asChild>
              <a href="/tires/position-configs/new">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Configuración
              </a>
            </Button>
          </div>
          <CardDescription>
            Configuración de posiciones de neumáticos por eje
          </CardDescription>

          {/* Filters Row */}
          <div className="flex flex-col gap-4 mt-4 sm:flex-row">
            <div className="flex-1">
              <Input
                placeholder="🔍 Buscar por ID de eje..."
                value={axleId || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setAxleId(value ? parseInt(value) : undefined);
                }}
                type="number"
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              {/* Page size selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="min-w-[120px] justify-between"
                  >
                    <span className="mr-2">📊</span> {limit}/pág
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem
                    onClick={() => {
                      setPage(1);
                      setLimit(10);
                    }}
                  >
                    10
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setPage(1);
                      setLimit(50);
                    }}
                  >
                    50
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setPage(1);
                      setLimit(100);
                    }}
                  >
                    100
                  </DropdownMenuItem>
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
            <DataTable columns={columns} data={configs} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
