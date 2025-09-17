// filepath: sae-frontend/app/users/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UsersService } from "@/lib/api/users";

interface UserFormData {
  email: string;
  name: string;
  role: string;
}

export default function EditUserPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const userId = Number(params.id);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, setValue } = useForm<UserFormData>();

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.accessToken) {
        const users = await UsersService.getUsers(session.accessToken);
        const found = users.find((u) => u.id === userId);
        if (found) {
          setValue("email", found.email);
          setValue("name", found.name);
          setValue("role", found.role.toLowerCase());
        }
      }
    };
    fetchUser();
  }, [session, userId, setValue]);

  const onSubmit = async (data: UserFormData) => {
    try {
      setSubmitting(true);
      if (session?.accessToken) {
        await UsersService.updateUser(userId, data, session.accessToken);
        router.push("/users");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Editar Usuario</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" {...register("name", { required: true })} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <Label htmlFor="role">Rol</Label>
          <Select onValueChange={(value) => setValue("role", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">Usuario</SelectItem>
              <SelectItem value="admin">Administrador</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Guardando..." : "Guardar cambios"}
        </Button>
      </form>
    </>
  );
}
