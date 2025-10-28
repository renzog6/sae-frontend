// filepath: sae-frontend/app/companies/list/page.tsx
"use client";

import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Company } from "@/lib/types/company";
import { useCompanies } from "@/lib/hooks/useCompanies";
import { DataTable } from "@/components/data-table";
import { getCompanyColumns } from "./columns";

export default function CompaniesPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";
  const router = useRouter();

  const { data: companiesData } = useCompanies();
  const companies = Array.isArray(companiesData)
    ? companiesData
    : (companiesData as any)?.data ?? [];
  // Eliminado: eliminación desde la lista (se reemplaza por botón de ver detalle)

  // Eliminado: diálogo inline de crear/editar empresa; se mueve a /companies/new
  // Eliminado: confirmación de eliminación

  const columns = useMemo(() => getCompanyColumns(), []);

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Listado</CardTitle>
            <Button onClick={() => router.push("/companies/new")}>
              Nueva empresa
            </Button>
          </div>
          <CardDescription>Gestión de empresas</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={companies}
            searchableColumn={"name" as keyof Company}
            searchPlaceholder="Buscar por nombre..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
