// filepath: sae-frontend/app/equipments/[id]/tires/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useTireAssignments } from "@/lib/hooks/useTires";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EquipmentTiresPage() {
  const params = useParams();

  const equipmentId = params?.id as string;

  const { useGetOpenByEquipment } = useTireAssignments();
  const {
    data: tireAssignments,
    isLoading,
    error,
  } = useGetOpenByEquipment(parseInt(equipmentId));

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error || !tireAssignments) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="text-gray-600">
          {error?.message || "No se pudieron cargar los neumáticos"}
        </p>
        <Link href={`/equipments/${equipmentId}`}>
          <Button className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al equipo
          </Button>
        </Link>
      </div>
    );
  }

  const assignments = Array.isArray(tireAssignments) ? tireAssignments : [];

  return (
    <>
      <Card>
        <CardContent className="space-y-6">
          <div className="pt-4 border-t border-slate-200">
            <div>
              <h2 className="text-2xl font-semibold">Neumáticos Instalados</h2>
              <p className="text-muted-foreground">
                Lista completa de neumáticos actualmente instalados en este
                equipo
              </p>
            </div>

            {assignments.length === 0 ? (
              <Card>
                <CardContent className="py-8">
                  <div className="text-center text-muted-foreground">
                    <p className="text-lg">No hay neumáticos instalados</p>
                    <p className="text-sm">
                      Los neumáticos instalados aparecerán aquí
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {assignments.map((assignment: any) => (
                  <Card
                    key={assignment.id}
                    className="transition-shadow hover:shadow-md"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {assignment.tire?.serialNumber ||
                            `Neumático ${assignment.id}`}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {assignment.positionConfig?.positionKey}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* Información del neumático */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Modelo:</span>
                          <span className="font-medium">
                            {assignment.tire?.model?.name || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Marca:</span>
                          <span className="font-medium">
                            {assignment.tire?.model?.brand?.name || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Medida:</span>
                          <span className="font-medium">
                            {assignment.tire?.model?.size?.mainCode || "N/A"}
                          </span>
                        </div>
                      </div>

                      {/* Información de la instalación */}
                      <div className="pt-3 space-y-2 border-t">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Eje:</span>
                          <span className="font-medium">
                            {assignment.positionConfig?.axle?.order || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Lado:</span>
                          <span className="font-medium">
                            {assignment.positionConfig?.side === "LEFT"
                              ? "Izquierdo"
                              : assignment.positionConfig?.side === "RIGHT"
                              ? "Derecho"
                              : assignment.positionConfig?.side || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tipo:</span>
                          <span className="font-medium">
                            {assignment.positionConfig?.isDual
                              ? "Dual"
                              : "Simple"}
                          </span>
                        </div>
                      </div>

                      {/* Información de kilometraje */}
                      {(assignment.kmAtStart || assignment.kmAtEnd) && (
                        <div className="pt-3 space-y-2 border-t">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              KM Inicio:
                            </span>
                            <span className="font-medium">
                              {assignment.kmAtStart?.toLocaleString() || "N/A"}
                            </span>
                          </div>
                          {assignment.kmAtEnd && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                KM Fin:
                              </span>
                              <span className="font-medium">
                                {assignment.kmAtEnd.toLocaleString()}
                              </span>
                            </div>
                          )}
                          {assignment.kmAtStart && assignment.kmAtEnd && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                KM Recorridos:
                              </span>
                              <span className="font-medium text-green-600">
                                {(
                                  assignment.kmAtEnd - assignment.kmAtStart
                                ).toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Estado */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-muted-foreground">
                          Estado:
                        </span>
                        <Badge
                          className={
                            assignment.status === "ACTIVE"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {assignment.status === "ACTIVE"
                            ? "Activo"
                            : "Inactivo"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="flex justify-center pt-4 border-t border-slate-200">
              <Link href={`/equipments/${equipmentId}`}>
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al equipo
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
