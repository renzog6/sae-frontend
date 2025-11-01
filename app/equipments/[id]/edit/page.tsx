// filepath: sae-frontend/app/equipments/[id]/edit/page.tsx
"use client";

import { useParams } from "next/navigation";
import {
  useEquipmentDetail,
  useUpdateEquipment,
} from "@/lib/hooks/useEquipments";
import { EquipmentForm } from "@/components/forms/equipment-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toaster";
import { Card, CardContent } from "@/components/ui/card";

export default function EquipmentEditPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const id = params?.id as string;

  const {
    data: equipment,
    isLoading,
    error,
  } = useEquipmentDetail(id ? parseInt(id) : undefined);

  const { mutate: updateEquipment, isPending } = useUpdateEquipment();

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

  const handleSubmit = (data: any) => {
    updateEquipment(
      { id: equipment.id, data },
      {
        onSuccess: () => {
          toast({
            title: "Equipo actualizado",
            description: "Los cambios se han guardado correctamente.",
            variant: "success",
          });
          router.push(`/equipments/${equipment.id}`);
        },
        onError: (error: any) => {
          toast({
            title: "Error al actualizar equipo",
            description: error?.message || "Intenta nuevamente.",
            variant: "error",
          });
        },
      }
    );
  };

  const handleCancel = () => {
    router.push(`/equipments/${equipment.id}`);
  };

  // Transform equipment data to form format
  const defaultValues = {
    id: equipment.id,
    internalCode: equipment.internalCode || "",
    name: equipment.name || "",
    description: equipment.description || "",
    observation: equipment.observation || "",
    year: equipment.year || undefined,
    licensePlate: equipment.licensePlate || "",
    chassis: equipment.chassis || "",
    engine: equipment.engine || "",
    color: equipment.color || "",
    diesel: equipment.diesel || false,
    status: equipment.status,
    companyId: (equipment.company as any)?.id || 1,
    categoryId: equipment.category?.id,
    typeId: equipment.type?.id,
    modelId: equipment.model?.id,
  };

  return (
    <>
      <Card>
        <CardContent className="space-y-6">
          <div className="pt-4 border-t border-slate-200">
            <h2 className="text-2xl font-semibold">Editar Equipo</h2>
            <p className="text-muted-foreground">
              Modifica la información del equipo seleccionado.
            </p>
          </div>

          <EquipmentForm
            defaultValues={defaultValues}
            isEdit={true}
            onSuccess={handleSubmit}
            onCancel={handleCancel}
          />
        </CardContent>
      </Card>
    </>
  );
}
