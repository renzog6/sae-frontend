// filepath: sae-frontend/components/forms/user-form.tsx
"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  userSchema,
  updateUserSchema,
  UserFormData,
  UpdateUserFormData,
} from "@/lib/validations/auth";
import { Role } from "@/types/enums";

interface UserFormProps {
  onSubmit: (data: UserFormData | UpdateUserFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<UserFormData | UpdateUserFormData>;
  isEdit?: boolean;
  onCancel?: () => void;
  error?: string | null;
}

export function UserForm({
  onSubmit,
  isLoading = false,
  defaultValues,
  isEdit = false,
  onCancel,
  error,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserFormData | UpdateUserFormData>({
    resolver: zodResolver(isEdit ? updateUserSchema : userSchema),
    defaultValues: {
      role: Role.USER,
      password: "", // Valor por defecto para password
      ...defaultValues,
    },
  });

  const handleFormSubmit = (data: UserFormData | UpdateUserFormData) => {
    // En modo edición, si el password está vacío, lo removemos del payload
    if (isEdit && (data as UpdateUserFormData).password === "") {
      const { password, ...dataWithoutPassword } = data;
      onSubmit(dataWithoutPassword as UpdateUserFormData);
    } else {
      onSubmit(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-md mx-auto space-y-4"
    >
      {error && (
        <div className="p-3 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Nombre completo</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Ingresa el nombre completo"
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="usuario@ejemplo.com"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Nombre de usuario (opcional)</Label>
        <Input
          id="username"
          {...register("username")}
          placeholder="nombre_usuario"
        />
        {errors.username && (
          <p className="text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          {isEdit
            ? "Nueva contraseña (dejar vacío para mantener la actual)"
            : "Contraseña"}
        </Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          placeholder={
            isEdit ? "Mínimo 6 caracteres (opcional)" : "Mínimo 6 caracteres"
          }
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Rol</Label>
        <Controller
          name="role"
          control={control}
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
        {errors.role && (
          <p className="text-sm text-red-600">{errors.role.message}</p>
        )}
      </div>

      <div className="flex justify-center gap-4 pt-6">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 max-w-xs"
          >
            Cancelar
          </Button>
        )}
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 max-w-xs text-white bg-green-700 hover:bg-green-600"
        >
          {isLoading
            ? isEdit
              ? "Actualizando..."
              : "Creando..."
            : isEdit
            ? "Actualizar Usuario"
            : "Crear Usuario"}
        </Button>
      </div>
    </form>
  );
}
