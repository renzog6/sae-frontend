// filepath: sae-frontend/app/tires/position-configs/new/page.tsx
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
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save } from "lucide-react";
import { useCreateTirePositionConfig } from "@/lib/hooks/useTires";
import { tireSideLabels } from "@/lib/constants";
import { TireSide } from "@/lib/types/enums";
import Link from "next/link";

export default function NewPositionConfigPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";
  const router = useRouter();

  const [formData, setFormData] = useState({
    axleId: "",
    positionKey: "",
    side: "" as TireSide | "",
    isDual: false,
  });

  const createMutation = useCreateTirePositionConfig(accessToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.axleId || !formData.positionKey || !formData.side) {
      alert("Por favor complete todos los campos requeridos");
      return;
    }

    try {
      await createMutation.mutateAsync({
        axleId: parseInt(formData.axleId),
        positionKey: formData.positionKey,
        side: formData.side as TireSide,
        isDual: formData.isDual,
      });

      router.push("/tires/position-configs");
    } catch (error) {
      console.error("Error creating position config:", error);
      alert("Error al crear la configuración de posición");
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/tires/position-configs">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Link>
            </Button>
            <div>
              <CardTitle className="text-2xl">
                Nueva Configuración de Posición
              </CardTitle>
              <CardDescription>
                Crear una nueva configuración de posición para neumáticos
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="axleId">ID del Eje *</Label>
                <Input
                  id="axleId"
                  type="number"
                  placeholder="Ej: 1"
                  value={formData.axleId}
                  onChange={(e) => handleInputChange("axleId", e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  ID del eje de equipo al que pertenece esta posición
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="positionKey">Clave de Posición *</Label>
                <Input
                  id="positionKey"
                  placeholder="Ej: E1I"
                  value={formData.positionKey}
                  onChange={(e) =>
                    handleInputChange("positionKey", e.target.value)
                  }
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Identificador único de la posición (ej: E1I, E1D, E2II)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="side">Lado *</Label>
                <Select
                  value={formData.side}
                  onValueChange={(value) => handleInputChange("side", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar lado" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(tireSideLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  ¿Es posición dual?
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isDual"
                    checked={formData.isDual}
                    onCheckedChange={(checked) =>
                      handleInputChange("isDual", checked as boolean)
                    }
                  />
                  <Label htmlFor="isDual" className="text-sm">
                    Sí, esta posición tiene neumáticos duales
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/tires/position-configs")}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={createMutation.isPending}>
                <Save className="w-4 h-4 mr-2" />
                {createMutation.isPending
                  ? "Creando..."
                  : "Crear Configuración"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
