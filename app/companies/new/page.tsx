// filepath: sae-frontend/app/companies/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CompanyForm } from "@/components/companies/company-form";
import { EntityFormLayout } from "@/components/entities/entity-form-layout";
import type { CompanyFormData } from "@/lib/validations/company";
import { useCreateCompany } from "@/lib/api/companies";
import { useQueryClient } from "@tanstack/react-query";

export default function NewCompanyPage() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const createCompanyMutation = useCreateCompany();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: CompanyFormData) {
    setError(null);
    try {
      const created = await createCompanyMutation.mutateAsync(data);
      // Go to edit/detail page of the newly created company
      if (created?.id) {
        router.push(`/companies/${created.id}`);
      } else {
        router.push("/companies/list");
      }
    } catch (e: any) {
      setError((e as Error)?.message || "Error al crear empresa");
    }
  }

  return (
    <EntityFormLayout
      title="Crear empresa"
      description="Completa los datos para crear una nueva empresa"
      backHref="/companies/list"
    >
      <CompanyForm
        onSubmit={handleSubmit}
        isLoading={createCompanyMutation.isPending}
        defaultValues={undefined}
        isEdit={false}
        onCancel={() => router.back()}
        error={error}
      />
    </EntityFormLayout>
  );
}
