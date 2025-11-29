// filepath: sae-frontend/app/equipments/[id]/axle-configurator/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AxleDiagram } from "@/components/tire/tire-axle-diagram";
import { EquipmentAxleConfigurator } from "@/components/equipment/equipment-axle-configurator";
import { useEquipmentAxles } from "@/lib/hooks/useEquipments";
import { useTirePositions } from "@/lib/hooks/useTires";

export default function AxleConfiguratorPage() {
  const params = useParams();
  const equipmentId = params?.id as string;
  const [showConfigurator, setShowConfigurator] = useState(false);

  // Fetch existing axles and positions
  const { useGetAll: useGetAxles } = useEquipmentAxles();
  const { data: axlesData, isLoading: axlesLoading } = useGetAxles({
    equipmentId: parseInt(equipmentId),
  });

  const { useGetByEquipment } = useTirePositions();
  const { data: positions = [], isLoading: positionsLoading } =
    useGetByEquipment(parseInt(equipmentId));

  const axles = Array.isArray(axlesData)
    ? axlesData
    : (axlesData as any)?.data ?? [];

  const handleComplete = (axle?: any) => {
    setShowConfigurator(false);
    // Could add a toast notification here if needed
    console.log("Axle created successfully:", axle);
  };

  if (showConfigurator) {
    return (
      <>
        <Card>
          <CardContent className="space-y-6">
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowConfigurator(false)}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al diagrama
                </Button>
                <div>
                  <h2 className="text-2xl font-semibold">
                    Configurador de Ejes
                  </h2>
                  <p className="text-muted-foreground">
                    Crea ejes completos con posiciones de neumáticos
                    automáticamente
                  </p>
                </div>
              </div>

              <EquipmentAxleConfigurator
                equipmentId={parseInt(equipmentId)}
                onComplete={handleComplete}
              />
            </div>
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <div className="pt-4 space-y-6 border-t border-slate-200">
      <div className="flex items-center justify-between px-3">
        <div>
          <h2 className="text-2xl font-semibold">Diagrama de Ejes</h2>
          <p className="text-muted-foreground">
            Visualiza y configura los ejes del equipo
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowConfigurator(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Agregar Eje
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/equipments/${equipmentId}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al equipo
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuración Actual</CardTitle>
        </CardHeader>
        <CardContent>
          {axlesLoading || positionsLoading ? (
            <div className="py-8 text-center">
              <div className="w-8 h-8 mx-auto border-b-2 border-gray-900 rounded-full animate-spin"></div>
              <p className="mt-2 text-muted-foreground">Cargando diagrama...</p>
            </div>
          ) : (
            <AxleDiagram
              axles={axles}
              positions={positions}
              selectedPosition={null}
              setSelectedPosition={() => {}}
              isLoading={false}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
