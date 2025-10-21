// filepath: sae-frontend/app/tires/equipment-axles/new/page.tsx
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { useCreateEquipmentAxle } from "@/lib/hooks/useTires";
import { useEquipmentList } from "@/lib/hooks/useEquipment";
import { axleTypeLabels } from "@/lib/constants";
import { AxleType } from "@/lib/types/enums";
import { EquipmentSelector } from "@/components/equipment/equipment-selector";
import Link from "next/link";
import type { Equipment } from "@/lib/types/equipment";

export default function NewEquipmentAxlePage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";
  const router = useRouter();

  const [formData, setFormData] = useState({
    equipmentId: "",
    order: "",
    axleType: "" as AxleType | "",
    wheelCount: "",
    description: "",
  });

  const [selectedEquipmentId, setSelectedEquipmentId] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const createMutation = useCreateEquipmentAxle(accessToken);

  // Data fetching for equipment selector
  const { data: equipmentsData, isLoading: equipmentsLoading } =
    useEquipmentList(accessToken, {
      page: 1,
      limit: 100, // Get all for selector
    });

  const equipments: Equipment[] = Array.isArray(equipmentsData)
    ? equipmentsData
    : (equipmentsData as any)?.data ?? [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const equipmentId =
      selectedEquipmentId ||
      (formData.equipmentId ? parseInt(formData.equipmentId) : null);

    if (
      !equipmentId ||
      !formData.order ||
      !formData.axleType ||
      !formData.wheelCount
    ) {
      alert("Por favor complete todos los campos requeridos");
      return;
    }

    try {
      await createMutation.mutateAsync({
        equipmentId,
        order: parseInt(formData.order),
        axleType: formData.axleType as AxleType,
        wheelCount: parseInt(formData.wheelCount),
        description: formData.description || undefined,
      });

      router.push("/tires/equipment-axles");
    } catch (error) {
      console.error("Error creating equipment axle:", error);
      alert("Error al crear el eje de equipo");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/tires/equipment-axles">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Link>
            </Button>
            <div>
              <CardTitle className="text-2xl">Nuevo Eje de Equipo</CardTitle>
              <CardDescription>
                Crear un nuevo eje para un equipo
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {equipmentsLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="text-muted-foreground">Cargando equipos...</div>
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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="order">Orden del Eje *</Label>
                <Input
                  id="order"
                  type="number"
                  placeholder="Ej: 1"
                  value={formData.order}
                  onChange={(e) => handleInputChange("order", e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Número de orden del eje (1, 2, 3, etc.)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="axleType">Tipo de Eje *</Label>
                <Select
                  value={formData.axleType}
                  onValueChange={(value) =>
                    handleInputChange("axleType", value)
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
                  value={formData.wheelCount}
                  onChange={(e) =>
                    handleInputChange("wheelCount", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Descripción opcional del eje..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/tires/equipment-axles")}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={createMutation.isPending}>
                <Save className="w-4 h-4 mr-2" />
                {createMutation.isPending ? "Creando..." : "Crear Eje"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
