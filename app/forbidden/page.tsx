// filepath: sae-frontend/app/forbidden/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 text-center">
      <h1 className="text-4xl font-bold text-red-600">Acceso denegado</h1>
      <p className="text-gray-600">
        No tenés los permisos necesarios para acceder a esta sección.
      </p>
      <Button asChild variant="outline">
        <Link href="/dashboard">Volver al Dashboard</Link>
      </Button>
    </div>
  );
}
