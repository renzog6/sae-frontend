// filepath: sae-frontend/app/companies/business-categories/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { BusinessCategory } from "@/lib/types/domain/company";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, RotateCcw, CheckCircle, XCircle } from "lucide-react";

export function getBusinessCategoryColumns({
  onEdit,
  onDelete,
  onRestore,
  showRestore = false,
}: {
  onEdit: (category: BusinessCategory) => void;
  onDelete: (category: BusinessCategory) => void;
  onRestore: (category: BusinessCategory) => void;
  showRestore?: boolean;
}): ColumnDef<BusinessCategory>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }: { row: Row<BusinessCategory> }) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "code",
      header: "Código",
      cell: ({ row }: { row: Row<BusinessCategory> }) => (
        <span className="text-muted-foreground">
          {row.original.code || "-"}
        </span>
      ),
    },
    {
      accessorKey: "information",
      header: "Información",
      cell: ({ row }: { row: Row<BusinessCategory> }) => (
        <span className="text-muted-foreground">
          {row.original.information || "-"}
        </span>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Estado",
      cell: ({ row }: { row: Row<BusinessCategory> }) => {
        const category = row.original;
        return (
          <div className="flex items-center gap-2">
            {category.isActive ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
            <span
              className={category.isActive ? "text-green-700" : "text-red-700"}
            >
              {category.isActive ? "Activo" : "Inactivo"}
            </span>
            {category.deletedAt && (
              <span className="text-xs text-muted-foreground">(Eliminado)</span>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<BusinessCategory> }) => {
        const category = row.original;
        const isDeleted = !!category.deletedAt;
        return (
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(category)}
              disabled={isDeleted}
              title={
                isDeleted
                  ? "No se puede editar un registro eliminado"
                  : "Editar"
              }
            >
              <Edit className="w-4 h-4" />
            </Button>

            {!isDeleted ? (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(category)}
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => onRestore(category)}
                title="Restaurar"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            )}
          </div>
        );
      },
    },
  ];
}
