// filepath: sae-frontend/app/equipments/transactions/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ShoppingBag, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EntityFormLayout } from "@/components/entities/entity-form-layout";
import { EquipmentTransactionForm } from "@/components/forms/equipment-transaction-form";

import { useCreateEquipmentTransaction } from "@/lib/hooks/useEquipmentTransactions";
import { useQuery } from "@tanstack/react-query";
import { EquipmentsService } from "@/lib/api/equipments";
import { CompaniesService } from "@/lib/api/companies";
import {
  EquipmentTransactionType,
  Currency,
  Equipment,
  Company,
} from "@/lib/types";
import { routes } from "@/lib/routes";
import { toast } from "sonner";

export default function NewTransactionPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<EquipmentTransactionType | null>(null);

  const { mutateAsync: createTransaction, isPending } = useCreateEquipmentTransaction();

  const { data: equipmentsResponse } = useQuery({
    queryKey: ["equipments", "all"],
    queryFn: () => EquipmentsService.getAllNoLimit(),
  });

  const { data: companiesResponse } = useQuery({
    queryKey: ["companies", "all"],
    queryFn: () => CompaniesService.getAll(),
  });

  const rawEquipments: Equipment[] = equipmentsResponse?.data ?? [];
  const companiesList: Company[] = companiesResponse?.data ?? [];

  const handleSubmit = async (data: any) => {
    try {
      await createTransaction({
        equipmentId: data.equipmentId,
        companyId: data.companyId,
        type: data.type,
        date: data.date.toISOString(),
        amount: data.amount,
        currency: data.currency,
        exchangeRate: data.exchangeRate ?? undefined,
        observation: data.observation ?? undefined,
      });
      toast.success("Transacción creada exitosamente");
      router.push(routes.equipments.transactions.root);
    } catch (error: any) {
      toast.error("Error al crear la transacción");
    }
  };

  // Step 1: Type selection screen
  if (!selectedType) {
    return (
      <div className="container max-w-4xl py-10 space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Nueva Transacción
            </h2>
            <p className="text-muted-foreground">
              Seleccione el tipo de operación que desea registrar
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card
            className="transition-colors cursor-pointer hover:border-primary hover:bg-muted/50"
            onClick={() => setSelectedType(EquipmentTransactionType.PURCHASE)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-blue-500" />
                Compra
              </CardTitle>
              <CardDescription>Registrar compra o ingreso de un equipo</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-balance">
                Seleccione esta opción para registrar la adquisición de un nuevo equipo.
                Listará equipos que no están activos actualmente.
              </p>
            </CardContent>
          </Card>

          <Card
            className="transition-colors cursor-pointer hover:border-primary hover:bg-muted/50"
            onClick={() => setSelectedType(EquipmentTransactionType.SALE)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-green-500" />
                Venta
              </CardTitle>
              <CardDescription>Registrar venta o salida de un equipo</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-balance">
                Seleccione esta opción para registrar la venta de un equipo de la flota.
                Solo mostrará equipos que están actualmente activos.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Step 2: Transaction form
  return (
    <EntityFormLayout
      title={selectedType === EquipmentTransactionType.PURCHASE ? "Registrar Compra" : "Registrar Venta"}
      description="Complete los datos de la transacción"
      backLabel="Cambiar tipo"
      onBack={() => setSelectedType(null)}
    >
      <EquipmentTransactionForm
        transactionType={selectedType}
        equipments={rawEquipments}
        companies={companiesList}
        isPending={isPending}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
      />
    </EntityFormLayout>
  );
}
