// filepath: sae-frontend/app/companies/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CompanyForm } from "@/components/companies/company-form";
import type { CompanyFormData } from "@/lib/validations/company";
import { CompaniesService } from "@/lib/api/companies";
import { useQueryClient } from "@tanstack/react-query";

export default function NewCompanyPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";
  const queryClient = useQueryClient();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: CompanyFormData) {
    if (!accessToken) return;
    setSaving(true);
    setError(null);
    try {
      const created = await CompaniesService.createCompany(data, accessToken);
      // Invalidate list so it shows the new company later
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      // Go to edit/detail page of the newly created company
      if (created?.id) {
        router.push(`/companies/${created.id}`);
      } else {
        router.push("/companies/list");
      }
    } catch (e: any) {
      setError(e?.message || "Error al crear empresa");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-4 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Crear empresa</CardTitle>
          <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>Volver</Button>
        </div>
          </div>
          <CardDescription>Completa los datos para crear una nueva empresa</CardDescription>
        </CardHeader>
        <CardContent>
          <CompanyForm
            onSubmit={handleSubmit}
            isLoading={saving}
            defaultValues={undefined}
            isEdit={false}
            onCancel={() => router.back()}
            error={error}
          />
        </CardContent>
      </Card>
    </div>
  );
}
