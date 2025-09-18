// filepath: sae-frontend/app/dashboard/page.tsx
"use client";

import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-laurel-900">
          Panel de Control
        </h1>
        <p className="text-laurel-600">
          Bienvenido al Sistema de Administración Empresarial
        </p>
      </div>

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

          {/* Quick Stats */}
          <Card className="transition-shadow border-laurel-200 hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-laurel-800">Usuarios</CardTitle>
              <CardDescription className="text-laurel-600">
                Gestión de usuarios del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-laurel-700">--</div>
              <p className="text-xs text-laurel-500">Próximamente disponible</p>
            </CardContent>
          </Card>

          <Card className="transition-shadow border-laurel-200 hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-laurel-800">Empresas</CardTitle>
              <CardDescription className="text-laurel-600">
                Administración de empresas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-laurel-700">--</div>
              <p className="text-xs text-laurel-500">Próximamente disponible</p>
            </CardContent>
          </Card>

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

        {/* Session Info */}
        <div className="mt-8">
          <Card className="border-laurel-200 bg-gradient-to-r from-white to-laurel-50">
            <CardHeader>
              <CardTitle className="text-laurel-900">
                Información de Sesión
              </CardTitle>
              <CardDescription className="text-laurel-600">
                Detalles de tu sesión actual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-laurel-100">
                  <span className="font-medium text-laurel-700">Email:</span>
                  <span className="text-laurel-600">
                    {session?.user?.email}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-laurel-100">
                  <span className="font-medium text-laurel-700">Nombre:</span>
                  <span className="text-laurel-600">
                    {session?.user?.name || "No especificado"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-laurel-100">
                  <span className="font-medium text-laurel-700">Rol:</span>
                  <span className="px-2 py-1 text-sm font-medium rounded-md bg-laurel-100 text-laurel-700">
                    {session?.user?.role || "Usuario"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium text-laurel-700">
                    ID de Usuario:
                  </span>
                  <span className="px-2 py-1 font-mono text-sm rounded text-laurel-500 bg-laurel-50">
                    {session?.user?.id || "N/A"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
