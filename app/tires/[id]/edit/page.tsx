// filepath: sae-frontend/app/tires/[id]/edit/page.tsx
"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";

import { EntityFormLayout } from "@/components/entities/entity-form-layout";
import { TireEditForm } from "@/components/forms/tire-edit-form";
import { useTireById } from "@/lib/hooks/useTires";

export default function TireEditPage() {
  const params = useParams();
  const router = useRouter();

  const id = useMemo(() => {
    const p = params?.id;
    const asStr = Array.isArray(p) ? p[0] : (p as string | undefined);
    const n = asStr ? Number(asStr) : NaN;
    return Number.isNaN(n) ? undefined : n;
  }, [params]);

  const { data: tire, isLoading } = useTireById(id ?? 0);

  if (isLoading) {
    return (
      <EntityFormLayout title="Editar Neumático" description="Cargando datos del neumático..." backHref="/tires/list">
        <div className="space-y-4 animate-pulse">
          <div className="w-1/2 h-4 rounded bg-muted" />
          <div className="w-1/3 h-4 rounded bg-muted" />
          <div className="w-1/4 h-4 rounded bg-muted" />
        </div>
      </EntityFormLayout>
    );
  }

  if (id === undefined) {
    return (
      <EntityFormLayout title="Editar Neumático" description="ID de neumático inválido" backHref="/tires/list">
        <div className="p-3 text-sm text-destructive border border-destructive/30 rounded-md bg-destructive/10">
          El ID proporcionado no es válido. Verifique la URL e intente nuevamente.
        </div>
      </EntityFormLayout>
    );
  }

  if (!tire) {
    return (
      <EntityFormLayout title="Editar Neumático" description="Neumático no encontrado" backHref="/tires/list">
        <p className="text-sm text-muted-foreground">No se encontró el neumático solicitado.</p>
      </EntityFormLayout>
    );
  }

  return (
    <EntityFormLayout
      title="Editar Neumático"
      description="Modificar información básica del neumático"
      backHref="/tires/list"
    >
      <TireEditForm tire={tire} tireId={id} onSuccess={() => router.back()} />
    </EntityFormLayout>
  );
}
