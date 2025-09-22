// filepath: sae-frontend/app/settings/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-laurel-900">
            Administra Configuracion
          </h1>
        </div>
        <div className="flex justify-between items-center">
          <Button
            onClick={() => router.push("/settings/locations")}
            className="bg-laurel-600 hover:bg-laurel-700"
          >
            Ciudades
          </Button>
        </div>
      </div>
    </>
  );
}
