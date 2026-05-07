// filepath: sae-frontend/app/users/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserForm } from "@/components/forms/user-form";
import { useCreateUser } from "@/lib/hooks/useUsers";
import { UpdateUserFormData } from "@/lib/validations/auth";
import { EntityFormLayout } from "@/components/entities/entity-form-layout";

export default function NewUserPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const createUserMutation = useCreateUser();

  const handleSubmit = async (data: UpdateUserFormData) => {
    try {
      setError(null);
      await createUserMutation.mutateAsync(data as any);
      router.push("/users");
    } catch (err) {
      console.error("Error creating user:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Error al crear el usuario. Inténtalo de nuevo."
      );
    }
  };

  return (
    <EntityFormLayout
      title="Crear Nuevo Usuario"
      description="Completa los datos para crear un nuevo usuario en el sistema."
      backHref="/users"
    >
      <UserForm
        onSubmit={handleSubmit}
        isLoading={createUserMutation.isPending}
        onCancel={() => router.push("/users")}
        error={error}
      />
    </EntityFormLayout>
  );
}
