// filepath: sae-frontend/app/tires/axle-configurator/page.tsx
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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AxleConfigurator } from "@/components/tire/axle-configurator";

export default function AxleConfiguratorPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";
  const router = useRouter();

  const handleComplete = (axle: any) => {
    // Redirect to equipment axles list or axle detail
    router.push("/tires/equipment-axles");
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
              <CardTitle className="text-2xl">Configurador de Ejes</CardTitle>
              <CardDescription>
                Crea ejes completos con posiciones de neumáticos automáticamente
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <AxleConfigurator
            accessToken={accessToken}
            onComplete={handleComplete}
          />
        </CardContent>
      </Card>
    </div>
  );
}
