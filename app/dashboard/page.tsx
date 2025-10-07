// filepath: sae-frontend/app/dashboard/page.tsx
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
      {/* Main Content */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Welcome Card */}
          <Card className="col-span-full border-laurel-200 bg-gradient-to-r from-laurel-50 to-white">
            <CardHeader>
              <CardTitle className="text-laurel-900">
                ¡Bienvenido al Sistema!
              </CardTitle>
              <CardDescription className="text-laurel-600">
                Has iniciado sesión exitosamente. Desde aquí puedes acceder a
                todas las funcionalidades del sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-laurel-500"></div>
                <span className="text-sm text-laurel-600">
                  Sistema operativo
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Empresas Card */}
          <Card className="transition-shadow border-laurel-200 hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-laurel-800">Empresas</CardTitle>
              <CardDescription className="text-laurel-600">
                Administración de empresas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LinkAsBadge
                icon={ChevronRight}
                href="/companies/list"
                title="Listado de Empresas"
              />
              <LinkAsBadge
                icon={ChevronRight}
                href="/companies/new"
                title="Nueva Empresa"
              />
            </CardContent>
          </Card>

          {/* Empleados Card */}
          <Card className="transition-shadow border-laurel-200 hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-laurel-800">Empleados</CardTitle>
              <CardDescription className="text-laurel-600">
                Gestión de los empleados de la empresa.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <LinkAsBadge
                icon={ChevronRight}
                href={routes.employees.list}
                title="Listado de Empledos"
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

          {/* Reportes Card */}
          <Card className="transition-shadow border-laurel-200 hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-laurel-800">Reportes</CardTitle>
              <CardDescription className="text-laurel-600">
                Informes y estadísticas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-laurel-700">--</div>
              <p className="text-xs text-laurel-500">Próximamente disponible</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
