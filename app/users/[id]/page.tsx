// filepath: sae-frontend/app/users/[id]/page.tsx
"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { UserForm } from "@/components/forms/user-form";
import { useUsers } from "@/lib/hooks/useUsers";
import { UpdateUserFormData } from "@/lib/validations/auth";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = Number(params.id);

  const [error, setError] = useState<string | null>(null);

  const { data: user, isLoading: isLoadingUser } =
    useUsers().useGetById(userId);

  const updateUserMutation = useUsers().useUpdate();

  const handleSubmit = async (data: UpdateUserFormData) => {
    try {
      setError(null);
      await updateUserMutation.mutateAsync({ id: userId, dto: data });
      router.push("/users");
    } catch (err) {
      console.error("Error updating user:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Error al actualizar el usuario. Inténtalo de nuevo."
      );
    }
  };

  const handleCancel = () => {
    router.push("/users");
  };

  if (isLoadingUser) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">Cargando usuario...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-600">
              Usuario no encontrado
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Editar Usuario</CardTitle>
          <CardDescription>
            Modifica los datos del usuario en el sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm
            onSubmit={handleSubmit}
            isLoading={updateUserMutation.isPending}
            defaultValues={{
              name: user.name,
              email: user.email,
              username: user.username || "",
              role: user.role,
              companyId: user.companyId,
              isActive: user.isActive,
              preferences: user.preferences,
            }}
            isEdit={true}
            onCancel={handleCancel}
            error={error}
          />
        </CardContent>
      </Card>
    </div>
  );
}
