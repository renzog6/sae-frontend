// filepath: sae-frontend/app/tires/[id]/page.tsx

"use client";

import { useParams } from "next/navigation";
import { useTireDetail } from "@/lib/hooks/useTires";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Wrench, Truck, Gauge, Ruler } from "lucide-react";

export default function TireDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";

  const { data: tire, isLoading } = useTireDetail(id, accessToken);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="w-1/4 h-6 rounded animate-pulse bg-muted"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 animate-pulse">
              <div className="w-1/2 h-4 rounded bg-muted"></div>
              <div className="w-1/3 h-4 rounded bg-muted"></div>
              <div className="w-1/4 h-4 rounded bg-muted"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!tire) {
    return <div>Neumático no encontrado</div>;
  }

  const statusLabels: Record<string, string> = {
    IN_STOCK: "En Stock",
    IN_USE: "En Uso",
    UNDER_REPAIR: "En Reparación",
    RECAP: "Recapado",
    DISCARDED: "Descartado",
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Información del Neumático
            </CardTitle>
            <Button asChild>
              <a href={`/tires/${id}/edit`}>Editar neumático</a>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Número de Serie
              </label>
              <p className="font-mono text-lg">{tire.serialNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Estado
              </label>
              <div className="flex items-center gap-2">
                <Badge
                  variant={tire.status === "IN_STOCK" ? "default" : "secondary"}
                >
                  {statusLabels[tire.status] || tire.status}
                </Badge>
                {tire.recapCount > 0 && (
                  <Badge variant="secondary">Recapado</Badge>
                )}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Marca
              </label>
              <p>{tire.model?.brand?.name || "No especificada"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Modelo
              </label>
              <p>{tire.model?.name || "No especificado"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Medida
              </label>
              <p>{tire.model?.size?.mainCode || "No especificada"}</p>
            </div>
            {tire.position && tire.position !== "UNKNOWN" && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Posición Actual
                </label>
                <p>{tire.position}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Km Totales
              </label>
              <p>{tire.totalKm || "0"} km</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Conteo de Recapados
              </label>
              <p>{tire.recapCount || 0}</p>
            </div>
            {tire.lastRecapAt && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Último Recapado
                </label>
                <p>{new Date(tire.lastRecapAt).toLocaleDateString()}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Fecha de Creación
              </label>
              <p>{new Date(tire.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Última Actualización
              </label>
              <p>{new Date(tire.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {tire.model && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="w-5 h-5" />
              Especificaciones Técnicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Índice de Carga
                </label>
                <p>{tire.model.loadIndex || "No especificado"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Símbolo de Velocidad
                </label>
                <p>{tire.model.speedSymbol || "No especificado"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Capas (PR)
                </label>
                <p>{tire.model.plyRating || "No especificado"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Dibujo de Banda
                </label>
                <p>{tire.model.treadPattern || "No especificado"}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Información Adicional
                </label>
                <p>{tire.model.information || "No especificada"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {tire.assignments && tire.assignments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Historial de Asignaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tire.assignments.map((assignment) => (
                <div key={assignment.id} className="p-4 border rounded-lg">
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Equipo
                      </label>
                      <p>
                        {assignment.positionConfig?.axle?.equipment?.name ||
                          "No especificado"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Posición
                      </label>
                      <p>
                        {assignment.positionConfig?.positionKey ||
                          "No especificada"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Fecha de Inicio
                      </label>
                      <p>
                        {new Date(assignment.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    {assignment.endDate && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Fecha de Fin
                        </label>
                        <p>
                          {new Date(assignment.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Km al Inicio
                      </label>
                      <p>{assignment.kmAtStart || "No especificado"}</p>
                    </div>
                    {assignment.kmAtEnd && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Km al Fin
                        </label>
                        <p>{assignment.kmAtEnd}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {tire.recaps && tire.recaps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Historial de Recapados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tire.recaps.map((recap) => (
                <div key={recap.id} className="p-4 border rounded-lg">
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Fecha
                      </label>
                      <p>{new Date(recap.recapDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Número de Recapado
                      </label>
                      <p>N°{recap.recapNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Tipo
                      </label>
                      <p>{recap.recapType || "No especificado"}</p>
                    </div>
                    {recap.provider && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Proveedor
                        </label>
                        <p>{recap.provider}</p>
                      </div>
                    )}
                    {recap.kmAtRecap && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Km al Recapado
                        </label>
                        <p>{recap.kmAtRecap} km</p>
                      </div>
                    )}
                    {recap.cost && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Costo
                        </label>
                        <p>${recap.cost.toLocaleString()}</p>
                      </div>
                    )}
                    {recap.notes && (
                      <div className="md:col-span-3">
                        <label className="text-sm font-medium text-muted-foreground">
                          Notas
                        </label>
                        <p>{recap.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {tire.inspections && tire.inspections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="w-5 h-5" />
              Historial de Inspecciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tire.inspections.map((inspection) => (
                <div key={inspection.id} className="p-4 border rounded-lg">
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Fecha
                      </label>
                      <p>
                        {new Date(
                          inspection.inspectionDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Presión
                      </label>
                      <p>
                        {inspection.pressure
                          ? `${inspection.pressure} PSI`
                          : "No medida"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Profundidad de Banda
                      </label>
                      <p>
                        {inspection.treadDepth
                          ? `${inspection.treadDepth} mm`
                          : "No medida"}
                      </p>
                    </div>
                    {inspection.observation && (
                      <div className="md:col-span-3">
                        <label className="text-sm font-medium text-muted-foreground">
                          Observaciones
                        </label>
                        <p>{inspection.observation}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
