// filepath: sae-frontend/app/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (session) {
      // Usuario autenticado, redirigir al dashboard
      router.push("/dashboard");
    } else {
      // Usuario no autenticado, redirigir al login
      router.push("/login");
    }
  }, [session, status, router]);

  // Mostrar loading mientras se determina el estado de autenticación
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="mx-auto w-32 h-32 rounded-full border-b-2 border-gray-900 animate-spin"></div>
        <p className="mt-4 text-gray-600">Cargando...</p>
      </div>
    </div>
  );
}
