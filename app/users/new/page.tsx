// filepath: sae-frontend/app/users/new/page.tsx
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
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
  password: string;
  role: string;
}

export default function NewUserPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, control } = useForm<UserFormData>();

  const onSubmit = async (data: UserFormData) => {
    try {
      setSubmitting(true);
      if (session?.accessToken) {
        await UsersService.createUser(data, session.accessToken);
        router.push("/users");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Crear Usuario</h1>
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
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            {...register("password", { required: true, minLength: 6 })}
          />
        </div>
        <div>
          <Label htmlFor="role">Rol</Label>
          <Controller
            name="role"
            control={control}
            defaultValue="USER"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">Usuario</SelectItem>
                  <SelectItem value="ADMIN">Administrador</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Creando..." : "Crear"}
        </Button>
      </form>
    </>
  );
}
