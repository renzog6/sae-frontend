// filepath: sae-frontend/app/equipments/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEquipments } from "@/lib/hooks/useEquipments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { EquipmentStatus } from "@/lib/types/shared/enums";
import { equipmentStatusLabels } from "@/lib/constants";

const statusColors: Record<EquipmentStatus, string> = {
  ACTIVE: "bg-green-100 text-green-800",
  INACTIVE: "bg-gray-100 text-gray-800",
  MAINTENANCE: "bg-yellow-100 text-yellow-800",
  RETIRED: "bg-red-100 text-red-800",
  SOLD: "bg-purple-100 text-purple-800",
};

export default function EquipmentDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { useGetById: useEquipmentDetail } = useEquipments();

  const equipmentId = id ? parseInt(id) : 0;

  const { data: equipment, isLoading, error } = useEquipmentDetail(equipmentId);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error || !equipment) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="text-gray-600">
          {error?.message || "Equipo no encontrado"}
        </p>
        <Link href="/equipments/list">
          <Button className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a la lista
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Información básica */}
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Estado
              </label>
              <div className="mt-1">
                <Badge
                  className={statusColors[equipment.status as EquipmentStatus]}
                >
                  {equipmentStatusLabels[equipment.status as EquipmentStatus]}
                </Badge>
              </div>
            </div>

            {equipment.internalCode && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Código Interno
                </label>
                <p className="mt-1">{equipment.internalCode}</p>
              </div>
            )}

            {equipment.name && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Nombre
                </label>
                <p className="mt-1">{equipment.name}</p>
              </div>
            )}

            {equipment.year && (
              <div>
                <label className="text-sm font-medium text-gray-500">Año</label>
                <p className="mt-1">{equipment.year}</p>
              </div>
            )}

            {equipment.color && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Color
                </label>
                <p className="mt-1">{equipment.color}</p>
              </div>
            )}

            {equipment.fuelType && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Tipo de Combustible
                </label>
                <p className="mt-1">
                  {equipment.fuelType === "DIESEL"
                    ? "Diésel"
                    : equipment.fuelType === "GASOLINE"
                    ? "Nafta/Gasolina"
                    : equipment.fuelType === "ELECTRIC"
                    ? "Eléctrico"
                    : equipment.fuelType === "HYBRID"
                    ? "Híbrido"
                    : equipment.fuelType === "LPG" ||
                      equipment.fuelType === "CNG"
                    ? "GNC"
                    : "Ninguno"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Identificación */}
        <Card>
          <CardHeader>
            <CardTitle>Identificación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {equipment.licensePlate && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Patente
                </label>
                <p className="mt-1">{equipment.licensePlate}</p>
              </div>
            )}

            {equipment.chassis && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Chasis
                </label>
                <p className="mt-1">{equipment.chassis}</p>
              </div>
            )}

            {equipment.engine && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Motor
                </label>
                <p className="mt-1">{equipment.engine}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Clasificación */}
        <Card>
          <CardHeader>
            <CardTitle>Clasificación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {equipment.category && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Categoría
                </label>
                <p className="mt-1">{equipment.category.name}</p>
              </div>
            )}

            {equipment.type && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Tipo
                </label>
                <p className="mt-1">{equipment.type.name}</p>
              </div>
            )}

            {equipment.model && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Modelo
                </label>
                <p className="mt-1">{equipment.model.name}</p>
                {equipment.model.year && (
                  <p className="text-xs text-gray-500">
                    Año {equipment.model.year}
                  </p>
                )}
              </div>
            )}

            {(equipment.company as any) && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Empresa
                </label>
                <p className="mt-1">
                  {(equipment.company as any)?.name || "N/A"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Descripción */}
        {(equipment.description || equipment.observation) && (
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Detalles Adicionales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {equipment.description && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Descripción
                  </label>
                  <p className="mt-1">{equipment.description}</p>
                </div>
              )}

              {equipment.observation && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Observaciones
                  </label>
                  <p className="mt-1">{equipment.observation}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
