// filepath: sae-frontend/app/equipments/[id]/edit/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEquipments } from "@/lib/hooks/useEquipments";
import { EquipmentForm } from "@/components/forms/equipment-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toaster";
import { FuelType } from "@/lib/types/shared/enums";
import { EntityFormLayout } from "@/components/entities/entity-form-layout";

export default function EquipmentEditPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const id = params?.id as string;

  const { useGetById: useEquipmentDetail, useUpdate: useUpdateEquipment } =
    useEquipments();

  const equipmentId = id ? parseInt(id) : 0;

  const { data: equipment, isLoading, error } = useEquipmentDetail(equipmentId);

  const { mutate: updateEquipment, isPending } = useUpdateEquipment();

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="w-1/4 h-8 bg-muted rounded"></div>
        <div className="h-64 bg-muted rounded"></div>
      </div>
    );
  }

  if (error || !equipment) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-destructive">Error</h1>
        <p className="text-muted-foreground">
          {(error as Error)?.message || "Equipo no encontrado"}
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
      },
    );
  };

  const handleCancel = () => {
    router.push(`/equipments/${equipment.id}`);
  };

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
    fuelType: equipment.fuelType || FuelType.NONE,
    status: equipment.status,
    companyId: (equipment.company as any)?.id || 1,
    categoryId: equipment.category?.id,
    typeId: equipment.type?.id,
    modelId: equipment.model?.id,
  };

  return (
    <EntityFormLayout
      title="Editar Equipo"
      description="Modifica la información del equipo seleccionado."
      backHref={`/equipments/${equipment.id}`}
    >
      <EquipmentForm
        defaultValues={defaultValues}
        isEdit={true}
        onSuccess={handleSubmit}
        onCancel={handleCancel}
      />
    </EntityFormLayout>
  );
}
