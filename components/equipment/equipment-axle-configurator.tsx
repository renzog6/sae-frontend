// filepath: sae-frontend/components/tire/axle-configurator.tsx
"use client";

import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Save, Settings, Eye, Plus, Trash2 } from "lucide-react";
import { AxleDiagram } from "../tire/tire-axle-diagram";
import { EquipmentSelector } from "@/components/equipment/equipment-selector";
import { useEquipments, useEquipmentAxles } from "@/lib/hooks/useEquipments";
import { axleTypeLabels } from "@/lib/constants";
import { AxleType, TireSide } from "@/lib/types/shared/enums";
import type { TirePositionConfig } from "@/lib/types/domain/tire";
import type { Equipment, EquipmentAxle } from "@/lib/types/domain/equipment";
import { EquipmentAxlesService } from "@/lib/api/equipments";
import { useTirePositionConfigsByEquipment } from "@/lib/hooks/useTires";

interface Props {
  equipmentId?: number;
  onComplete?: (axle?: EquipmentAxle) => void;
}

interface PositionForm {
  positionKey: string;
  side: TireSide | "";
  isDual: boolean;
}

export const EquipmentAxleConfigurator: React.FC<Props> = ({
  equipmentId,
  onComplete,
}) => {
  // Form state
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<number | null>(
    equipmentId || null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const [axleForm, setAxleForm] = useState({
    order: "",
    axleType: "" as AxleType | "",
    wheelCount: "",
    description: "",
  });

  const [positions, setPositions] = useState<PositionForm[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  // Data fetching
  const { useGetAll: useEquipmentList } = useEquipments();
  const { data: equipmentsData, isLoading: equipmentsLoading } =
    useEquipmentList({
      page: 1,
      limit: 100, // Get all active equipment
      status: "ACTIVE",
    });

  // Fetch existing axles for selected equipment
  const { useGetAll: useGetAxles } = useEquipmentAxles();
  const { data: existingAxles, isLoading: axlesLoading } = useGetAxles({
    equipmentId: selectedEquipmentId || 0,
  });

  // Fetch positions for selected equipment
  const { data: existingPositions, isLoading: positionsLoading } =
    useTirePositionConfigsByEquipment(selectedEquipmentId || 0);

  // Mutation for creating axle with positions
  const { useCreateAxleWithPositions } = useEquipmentAxles();
  const createAxleMutation = useCreateAxleWithPositions();

  const equipments: Equipment[] = Array.isArray(equipmentsData)
    ? equipmentsData
    : (equipmentsData as any)?.data ?? [];

  // Generate positions based on wheelCount
  const generatePositions = (
    wheelCount: number,
    axleOrder: number
  ): PositionForm[] => {
    const count = parseInt(wheelCount.toString());
    if (!count || count < 2) return [];

    const generated: PositionForm[] = [];

    if (count === 2) {
      // Simple axle: 2 wheels
      generated.push(
        {
          positionKey: `E${axleOrder}I`,
          side: "LEFT" as TireSide,
          isDual: false,
        },
        {
          positionKey: `E${axleOrder}D`,
          side: "RIGHT" as TireSide,
          isDual: false,
        }
      );
    } else if (count === 4) {
      // Dual axle: 4 wheels
      generated.push(
        {
          positionKey: `E${axleOrder}II`,
          side: "LEFT" as TireSide,
          isDual: true,
        },
        {
          positionKey: `E${axleOrder}ID`,
          side: "LEFT" as TireSide,
          isDual: true,
        },
        {
          positionKey: `E${axleOrder}DI`,
          side: "RIGHT" as TireSide,
          isDual: true,
        },
        {
          positionKey: `E${axleOrder}DD`,
          side: "RIGHT" as TireSide,
          isDual: true,
        }
      );
    } else if (count === 6) {
      // Triple axle: 6 wheels (typically dual + single)
      generated.push(
        {
          positionKey: `E${axleOrder}II`,
          side: "LEFT" as TireSide,
          isDual: true,
        },
        {
          positionKey: `E${axleOrder}ID`,
          side: "LEFT" as TireSide,
          isDual: true,
        },
        {
          positionKey: `E${axleOrder}I`,
          side: "LEFT" as TireSide,
          isDual: false,
        },
        {
          positionKey: `E${axleOrder}D`,
          side: "RIGHT" as TireSide,
          isDual: false,
        },
        {
          positionKey: `E${axleOrder}DI`,
          side: "RIGHT" as TireSide,
          isDual: true,
        },
        {
          positionKey: `E${axleOrder}DD`,
          side: "RIGHT" as TireSide,
          isDual: true,
        }
      );
    }

    return generated;
  };

  // Auto-generate positions when wheelCount changes
  const handleWheelCountChange = (value: string) => {
    setAxleForm((prev) => ({ ...prev, wheelCount: value }));

    const count = parseInt(value);
    const order = parseInt(axleForm.order);
    if (count && order) {
      const generated = generatePositions(count, order);
      setPositions(generated);
    }
  };

  // Preview axle data
  const previewAxle: EquipmentAxle = useMemo(() => {
    const axle = {
      id: 0,
      equipmentId: selectedEquipmentId || 0,
      order: parseInt(axleForm.order) || 0,
      axleType: axleForm.axleType as AxleType,
      wheelCount: parseInt(axleForm.wheelCount) || 0,
      description: axleForm.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      equipment: null as any, // Mock equipment for preview
      tirePositions: [] as any[], // Will be populated below
    };

    axle.tirePositions = positions.map((pos, index) => ({
      id: index + 1,
      axleId: axle.id,
      positionKey: pos.positionKey,
      side: pos.side as TireSide,
      isDual: pos.isDual,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      axle: axle,
    }));

    return axle;
  }, [selectedEquipmentId, axleForm, positions]);

  const previewPositions: TirePositionConfig[] = useMemo(
    () =>
      positions.map((pos, index) => ({
        id: index + 1,
        axleId: previewAxle.id,
        positionKey: pos.positionKey,
        side: pos.side as TireSide,
        isDual: pos.isDual,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        axle: null as any, // Avoid circular reference in preview
      })),
    [positions, previewAxle.id]
  );

  const handleSubmit = async () => {
    try {
      await createAxleMutation.mutateAsync({
        axle: {
          equipmentId: selectedEquipmentId!,
          order: parseInt(axleForm.order),
          axleType: axleForm.axleType as AxleType,
          wheelCount: parseInt(axleForm.wheelCount),
          description: axleForm.description,
        },
        positions: positions.map((pos) => ({
          positionKey: pos.positionKey,
          side: pos.side,
          isDual: pos.isDual,
        })),
      });

      // Reset form after successful creation
      setAxleForm({
        order: "",
        axleType: "" as AxleType | "",
        wheelCount: "",
        description: "",
      });
      setPositions([]);

      onComplete?.(undefined);
    } catch (error) {
      console.error("Error creating axle with positions:", error);
      alert("Error al crear el eje con posiciones");
    }
  };

  const addPosition = () => {
    setPositions((prev) => [
      ...prev,
      {
        positionKey: "",
        side: "" as TireSide | "",
        isDual: false,
      },
    ]);
  };

  const updatePosition = (
    index: number,
    field: keyof PositionForm,
    value: any
  ) => {
    setPositions((prev) =>
      prev.map((pos, i) => (i === index ? { ...pos, [field]: value } : pos))
    );
  };

  const removePosition = (index: number) => {
    setPositions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Equipment Selection - Only show if no equipmentId provided */}
      {!equipmentId && (
        <Card>
          <CardContent>
            <div className="flex justify-between">
              <div>
                {equipmentsLoading ? (
                  <div className="flex items-center justify-center p-8">
                    <div className="text-muted-foreground">
                      Cargando equipos...
                    </div>
                  </div>
                ) : (
                  <EquipmentSelector
                    equipments={equipments}
                    selectedEquipmentId={selectedEquipmentId}
                    setSelectedEquipmentId={setSelectedEquipmentId}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                )}
              </div>
              {/* Info de Ejes*/}
              <div className="flex flex-col items-start justify-center ml-4">
                {selectedEquipmentId ? (
                  <div className="space-y-2">
                    {axlesLoading ? (
                      <p className="text-sm text-muted-foreground">
                        Cargando información de ejes...
                      </p>
                    ) : existingAxles &&
                      Array.isArray(existingAxles) &&
                      existingAxles.length > 0 ? (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-green-700">
                          ✓ Tiene {existingAxles.length} eje
                          {existingAxles.length !== 1 ? "s" : ""} configurado
                          {existingAxles.length !== 1 ? "s" : ""}
                        </p>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          {existingAxles.map((axle: any) => (
                            <div
                              key={axle.id}
                              className="flex items-center gap-2"
                            >
                              <span className="font-medium">
                                Eje {axle.order}:
                              </span>
                              <span>{axle.wheelCount} ruedas</span>
                              <Badge variant="outline" className="text-xs">
                                {axleTypeLabels[axle.axleType as AxleType]}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-orange-600">
                        ⚠ No tiene ejes configurados
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-red-600">
                    Por favor, selecciona un equipo para continuar.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Axle Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">2. Configuración del Eje</CardTitle>
          <CardDescription>
            Define las características básicas del eje
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="order">Orden del Eje *</Label>
              <Input
                id="order"
                type="number"
                placeholder="Ej: 1"
                value={axleForm.order}
                onChange={(e) =>
                  setAxleForm((prev) => ({ ...prev, order: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="axleType">Tipo de Eje *</Label>
              <Select
                value={axleForm.axleType}
                onValueChange={(value) =>
                  setAxleForm((prev) => ({
                    ...prev,
                    axleType: value as AxleType,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo de eje" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(axleTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="wheelCount">Cantidad de Ruedas *</Label>
              <Input
                id="wheelCount"
                type="number"
                placeholder="Ej: 4"
                value={axleForm.wheelCount}
                onChange={(e) => handleWheelCountChange(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Descripción opcional del eje..."
              value={axleForm.description}
              onChange={(e) =>
                setAxleForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Positions Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">
                3. Posiciones de Neumáticos
              </CardTitle>
              <CardDescription>
                Configura las posiciones de neumáticos para este eje
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={addPosition}
                disabled={!axleForm.wheelCount}
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Posición
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                disabled={positions.length === 0}
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? "Ocultar" : "Vista Previa"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {positions.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>
                Configura la cantidad de ruedas para generar posiciones
                automáticamente
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {positions.map((position, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Clave de Posición *</Label>
                      <Input
                        placeholder="Ej: E1I"
                        value={position.positionKey}
                        onChange={(e) =>
                          updatePosition(index, "positionKey", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Lado *</Label>
                      <Select
                        value={position.side}
                        onValueChange={(value) =>
                          updatePosition(index, "side", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar lado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LEFT">Izquierdo</SelectItem>
                          <SelectItem value="RIGHT">Derecho</SelectItem>
                          <SelectItem value="INNER">Interno</SelectItem>
                          <SelectItem value="OUTER">Externo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Tipo</Label>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={position.isDual ? "default" : "secondary"}
                        >
                          {position.isDual ? "Dual" : "Simple"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removePosition(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview */}
      {showPreview && positions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vista Previa del Diagrama</CardTitle>
            <CardDescription>
              Así se verá el eje con las posiciones configuradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AxleDiagram
              axles={[previewAxle]}
              positions={previewPositions}
              selectedPosition={null}
              setSelectedPosition={() => {}}
              isLoading={false}
            />
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancelar</Button>
        <Button
          onClick={handleSubmit}
          disabled={
            !selectedEquipmentId ||
            !axleForm.order ||
            !axleForm.axleType ||
            !axleForm.wheelCount ||
            positions.length === 0
          }
        >
          <Save className="w-4 h-4 mr-2" />
          Crear Eje Completo
        </Button>
      </div>
    </div>
  );
};
