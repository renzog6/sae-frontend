// filepath: sae-frontend/app/employees/new/page.tsx
"use client";

import { useRouter } from "next/navigation";

import { EntityFormLayout } from "@/components/entities/entity-form-layout";
import { EmployeeCreateForm } from "@/components/forms/employee-create-form";
import { useCreateEmployeeApplication } from "@/lib/hooks/useEmployees";
import { EmployeeStatus } from "@/lib/types/domain/employee";
import type { CreatePersonFormInput } from "@/lib/validations/person";

export default function EmployeeNewPage() {
  const router = useRouter();
  const createEmployeeApplicationMutation = useCreateEmployeeApplication();

  async function handleSubmit(data: CreatePersonFormInput) {
    try {
      const applicationData = {
        personData: {
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          birthDate: data.birthDate,
          dni: data.dni,
          cuil: data.cuil,
          gender: data.gender,
          maritalStatus: data.maritalStatus,
          information: data.information,
        },
        employeeData: {
          companyId: 1,
          employeeCode: data.dni || "00000",
          information: "",
          hireDate: data.hireDate || new Date().toISOString(),
          endDate: undefined,
          categoryId: data.categoryId!,
          positionId: data.positionId!,
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