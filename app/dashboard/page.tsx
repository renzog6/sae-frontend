//filepath: sae-frontend/app/dashboard/page.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { LinkAsBadge } from "@/components/link/badge-as-link";
import { routes } from "@/lib/routes";
import { ChevronRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Bienvenida */}
          <Card className="col-span-full border-laurel-200 bg-linear-to-r from-laurel-50 to-white">
            <CardHeader>
              <CardTitle className="text-laurel-900">
                ¡Bienvenido al Sistema!
              </CardTitle>
              <CardDescription className="text-laurel-600">
                Has iniciado sesión exitosamente. Desde aquí puedes acceder a
                todas las funcionalidades principales del sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-laurel-500"></div>
                <span className="text-sm text-laurel-600">
                  Sistema operativo SAE
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Empresas */}
          <Card className="transition-shadow border-laurel-200 hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-laurel-800">Empresas</CardTitle>
              <CardDescription className="text-laurel-600">
                Administración de compañías registradas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <LinkAsBadge
                icon={ChevronRight}
                href={routes.companies?.list || "/companies/list"}
                title="Listado de Empresas"
              />
              <LinkAsBadge
                icon={ChevronRight}
                href={routes.companies?.new || "/companies/new"}
                title="Nueva Empresa"
              />
            </CardContent>
          </Card>

          {/* Empleados */}
          <Card className="transition-shadow border-laurel-200 hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-laurel-800">Empleados</CardTitle>
              <CardDescription className="text-laurel-600">
                Gestión del personal y sus registros.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <LinkAsBadge
                icon={ChevronRight}
                href={routes.employees.list}
                title="Listado de Empleados"
              />
              <LinkAsBadge
                icon={ChevronRight}
                href={routes.employees.new}
                title="Nuevo Empleado"
              />
              <LinkAsBadge
                icon={ChevronRight}
                href="/employees/vacations"
                title="Vacaciones"
              />
            </CardContent>
          </Card>

          {/* Equipos */}
          <Card className="transition-shadow border-laurel-200 hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-laurel-800">Equipos</CardTitle>
              <CardDescription className="text-laurel-600">
                Gestión de equipos, tipos y modelos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <LinkAsBadge
                icon={ChevronRight}
                href={routes.equipments.list}
                title="Listado de Equipos"
              />
              <LinkAsBadge
                icon={ChevronRight}
                href={routes.equipments.new}
                title="Nuevo Equipo"
              />
              <LinkAsBadge
                icon={ChevronRight}
                href={routes.equipments.categories}
                title="Categorías"
              />
              <LinkAsBadge
                icon={ChevronRight}
                href={routes.equipments.models}
                title="Modelos"
              />
            </CardContent>
          </Card>

          {/* Neumáticos */}
          <Card className="transition-shadow border-laurel-200 hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-laurel-800">Neumáticos</CardTitle>
              <CardDescription className="text-laurel-600">
                Administración integral del ciclo de vida de los neumáticos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <LinkAsBadge
                icon={ChevronRight}
                href={routes.tires.list}
                title="Listado de Neumáticos"
              />
              <LinkAsBadge
                icon={ChevronRight}
                href={routes.tires.stock}
                title="Stock"
              />
              <LinkAsBadge
                icon={ChevronRight}
                href={routes.tires.inspections}
                title="Inspecciones"
              />
              <LinkAsBadge
                icon={ChevronRight}
                href={routes.tires.reports.root}
                title="Reportes y Métricas"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
