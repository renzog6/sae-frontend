// filepath: sae-frontend/app/tires/equipment-axles/page.tsx
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
import type { EquipmentAxle } from "@/lib/types/tire";
import { useEquipmentAxles } from "@/lib/hooks/useTires";
import { DataTable } from "@/components/data-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getEquipmentAxleColumns } from "./columns";

export default function EquipmentAxlesPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [equipmentId, setEquipmentId] = useState<number | undefined>();

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [equipmentId, limit]);

  const {
    data: axlesData,
    isLoading,
    error,
  } = useEquipmentAxles(accessToken, {
    equipmentId,
  });

  const axles: EquipmentAxle[] = Array.isArray(axlesData)
    ? axlesData
    : (axlesData as any)?.data ?? [];

  const columns = useMemo(() => getEquipmentAxleColumns(), []);

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">Ejes de Equipos</CardTitle>
            <Button asChild>
              <a href="/tires/equipment-axles/new">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Eje
              </a>
            </Button>
          </div>
          <CardDescription>Configuración de ejes para equipos</CardDescription>

          {/* Filters Row */}
          <div className="flex flex-col gap-4 mt-4 sm:flex-row">
            <div className="flex-1">
              <Input
                placeholder="🔍 Buscar por ID de equipo..."
                value={equipmentId || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setEquipmentId(value ? parseInt(value) : undefined);
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
            <DataTable columns={columns} data={axles} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
