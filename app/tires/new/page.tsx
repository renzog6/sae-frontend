// filepath: sae-frontend/app/tires/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useCreateTire, useTireModels } from "@/lib/hooks/useTires";
import { CreateTireForm } from "@/components/forms/create-tire-form";
import { useToast } from "@/components/ui/toaster";
import { EntityFormLayout } from "@/components/entities/entity-form-layout";

export default function TireNewPage() {
  const router = useRouter();
  const { toast } = useToast();

  const { useGetAll: useGetModels } = useTireModels();
  const { data: modelsResponse, isLoading: modelsLoading } = useGetModels({
    page: 1,
    limit: 100,
  });

  const createTireMutation = useCreateTire();

  const handleCreateTire = async (data: any) => {
    try {
      if (data.tires) {
        for (const tireData of data.tires) {
          await createTireMutation.mutateAsync(tireData);
        }
        toast({
          title: "Éxito",
          description: `${data.tires.length} neumáticos creados exitosamente`,
          variant: "success",
        });
      } else {
        await createTireMutation.mutateAsync(data);
        toast({
          title: "Éxito",
          description: "Neumático creado exitosamente",
          variant: "success",
        });
      }
      router.push("/tires");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Error al crear neumático(s): " + error.message,
        variant: "error",
      });
    }
  };

  return (
    <EntityFormLayout
      title="Nuevo Neumático"
      description="Crear un nuevo neumático en el sistema"
      backHref="/tires"
    >
      <CreateTireForm
        onSubmit={handleCreateTire}
        onCancel={() => router.push("/tires")}
        tireModels={modelsResponse?.data || []}
        isLoading={createTireMutation.isPending || modelsLoading}
      />
    </EntityFormLayout>
  );
}
