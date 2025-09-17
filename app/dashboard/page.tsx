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
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-laurel-900 mb-2">
          Panel de Control
        </h1>
        <p className="text-laurel-600">
          Bienvenido al Sistema de Administración Empresarial
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="h-2 w-2 bg-laurel-500 rounded-full"></div>
                <span className="text-sm text-laurel-600">
                  Sistema operativo
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-laurel-200 hover:shadow-md transition-shadow">
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

          <Card className="border-laurel-200 hover:shadow-md transition-shadow">
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

          <Card className="border-laurel-200 hover:shadow-md transition-shadow">
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
                <div className="flex justify-between items-center py-2 border-b border-laurel-100">
                  <span className="font-medium text-laurel-700">Email:</span>
                  <span className="text-laurel-600">
                    {session?.user?.email}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-laurel-100">
                  <span className="font-medium text-laurel-700">Nombre:</span>
                  <span className="text-laurel-600">
                    {session?.user?.name || "No especificado"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-laurel-100">
                  <span className="font-medium text-laurel-700">Rol:</span>
                  <span className="px-2 py-1 bg-laurel-100 text-laurel-700 rounded-md text-sm font-medium">
                    {session?.user?.role || "Usuario"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-laurel-700">
                    ID de Usuario:
                  </span>
                  <span className="font-mono text-sm text-laurel-500 bg-laurel-50 px-2 py-1 rounded">
                    {session?.user?.id || "N/A"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
