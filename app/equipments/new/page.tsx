// filepath: sae-frontend/app/equipments/new/page.tsx
"use client";

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
import Link from "next/link";
import { EquipmentForm } from "@/components/forms/equipment-form";

export default function NewEquipmentPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const accessToken = session?.accessToken || "";

  const handleSuccess = () => {
    router.push("/equipments/list");
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-4">
        <Link href="/equipments/list">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Nuevo equipo</h1>
          <p className="text-gray-600">
            Completa los datos para registrar un nuevo equipo
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del equipo</CardTitle>
          <CardDescription>
            Ingresa todos los datos requeridos para el registro del equipo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EquipmentForm
            accessToken={accessToken}
            onSuccess={handleSuccess}
            onCancel={() => router.push("/equipments/list")}
          />
        </CardContent>
      </Card>
    </div>
  );
}
