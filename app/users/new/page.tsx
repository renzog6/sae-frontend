// filepath: sae-frontend/app/users/new/page.tsx
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

import { UserForm } from "@/components/forms/user-form";
import { useCreateUser } from "@/lib/hooks/useUsers";
import { UserFormData } from "@/lib/validations";

export default function NewUserPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const createUserMutation = useCreateUser(session?.accessToken || "");

  const handleSubmit = async (data: UserFormData) => {
    try {
      setError(null);
      await createUserMutation.mutateAsync(data);
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

  const handleCancel = () => {
    router.push("/users");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Crear Nuevo Usuario</CardTitle>
          <CardDescription>
            Completa los datos para crear un nuevo usuario en el sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm
            onSubmit={handleSubmit}
            isLoading={createUserMutation.isPending}
            onCancel={handleCancel}
            error={error}
          />
        </CardContent>
      </Card>
    </div>
  );
}
