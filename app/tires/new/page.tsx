// filepath: sae-frontend/app/tires/new/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useCreateTire, useTireModels } from "@/lib/hooks/useTires";
import { CreateTireForm } from "@/components/forms/create-tire-form";
import { useToast } from "@/components/ui/toaster";

export default function TireNewPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const accessToken = session?.accessToken || "";

  // Fetch tire models for the form
  const { data: modelsResponse, isLoading: modelsLoading } = useTireModels(
    accessToken,
    { page: 1, limit: 100 } // Get all models for selection
  );

  const createTireMutation = useCreateTire(accessToken);

  const handleCreateTire = async (data: any) => {
    try {
      if (data.tires) {
        // Bulk creation - create multiple tires
        for (const tireData of data.tires) {
          await createTireMutation.mutateAsync(tireData);
        }
        toast({
          title: "Éxito",
          description: `${data.tires.length} neumáticos creados exitosamente`,
          variant: "success",
        });
      } else {
        // Single creation
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

  const handleCancel = () => {
    router.push("/tires");
  };

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
            <div>
              <CardTitle className="text-2xl">Nuevo Neumático</CardTitle>
              <CardDescription>
                Crear un nuevo neumático en el sistema
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CreateTireForm
            onSubmit={handleCreateTire}
            onCancel={handleCancel}
            tireModels={modelsResponse?.data || []}
            isLoading={createTireMutation.isPending || modelsLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
