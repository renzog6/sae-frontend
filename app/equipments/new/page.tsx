// filepath: sae-frontend/app/equipments/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { EquipmentForm } from "@/components/forms/equipment-form";
import { EntityFormLayout } from "@/components/entities/entity-form-layout";

export default function NewEquipmentPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/equipments/list");
  };

  return (
    <EntityFormLayout
      title="Nuevo equipo"
      description="Completa los datos para registrar un nuevo equipo"
      backHref="/equipments/list"
    >
      <EquipmentForm
        onSuccess={handleSuccess}
        onCancel={() => router.push("/equipments/list")}
      />
    </EntityFormLayout>
  );
}
