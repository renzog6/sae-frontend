// filepath: sae-frontend/app/employees/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { EntityFormLayout } from "@/components/entities/entity-form-layout";
import { EmployeeCreateForm } from "@/components/forms/employee-create-form";
import { useCreateEmployeeApplication } from "@/lib/application/employee-application.hooks";
import { EmployeeStatus } from "@/lib/types/domain/employee";
import type { CreatePersonFormInput, CreatePersonFormData } from "@/lib/validations/person";

export default function EmployeeNewPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createEmployeeApplicationMutation = useCreateEmployeeApplication();

  async function handleSubmit(data: CreatePersonFormInput) {
    try {
      const applicationData = {
        personData: data as CreatePersonFormData,
        employeeData: {
          companyId: 1,
          employeeCode: "00000",
          information: "",
          hireDate: new Date().toISOString(),
          endDate: undefined,
          categoryId: 4,
          positionId: 9,
          status: EmployeeStatus.ACTIVE,
        },
      };

      const employeeResult = await createEmployeeApplicationMutation.mutateAsync(applicationData);
      const employee = (employeeResult as any).employee;
      const employeeId = employee?.id ?? employee?.data?.id;

      if (!employeeId) throw new Error("Failed to create employee - no ID returned");

      router.push(`/employees/${employeeId}/edit`);
    } catch (e: any) {
      console.error("Error creating employee:", e);
    }
  }

  return (
    <EntityFormLayout
      title="Nuevo Empleado"
      description="Completa los datos del nuevo empleado"
      backHref="/employees/list"
    >
      <EmployeeCreateForm
        onSubmit={handleSubmit}
        isLoading={createEmployeeApplicationMutation.isPending}
        onCancel={() => router.back()}
      />
    </EntityFormLayout>
  );
}