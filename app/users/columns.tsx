// filepath: sae-frontend/app/users/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { User } from "@/lib/types/domain/user";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export function getUserColumns({
  onEdit,
  onDelete,
}: {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}): ColumnDef<User>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }: { row: Row<User> }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }: { row: Row<User> }) => <span>{row.original.email}</span>,
    },
    {
      accessorKey: "role",
      header: "Rol",
      cell: ({ row }: { row: Row<User> }) => (
        <span>
          {row.original.role === "ADMIN" ? "Administrador" : "Usuario"}
        </span>
      ),
    },
    {
      accessorKey: "companyId",
      header: "Empresa",
      cell: ({ row }: { row: Row<User> }) => (
        <span>{row.original.companyId}</span>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Estado",
      cell: ({ row }: { row: Row<User> }) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            row.original.isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.original.isActive ? "Activo" : "Inactivo"}
        </span>
      ),
    },
    {
      accessorKey: "lastLoginAt",
      header: "Último Login",
      cell: ({ row }: { row: Row<User> }) => (
        <span>
          {row.original.lastLoginAt
            ? new Date(row.original.lastLoginAt).toLocaleDateString("es-ES")
            : "Nunca"}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Fecha de Creación",
      cell: ({ row }: { row: Row<User> }) => (
        <span>
          {new Date(row.original.createdAt).toLocaleDateString("es-ES")}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<User> }) => {
        const user = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(user)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(user)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
