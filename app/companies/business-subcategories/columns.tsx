// filepath: sae-frontend/app/companies/business-subcategories/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { BusinessSubCategory } from "@/lib/types/company";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, RotateCcw, CheckCircle, XCircle } from "lucide-react";

export function getBusinessSubcategoryColumns({
  onEdit,
  onDelete,
  onRestore,
  showRestore = false,
}: {
  onEdit: (subcategory: BusinessSubCategory) => void;
  onDelete: (subcategory: BusinessSubCategory) => void;
  onRestore: (subcategory: BusinessSubCategory) => void;
  showRestore?: boolean;
}): ColumnDef<BusinessSubCategory>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }: { row: Row<BusinessSubCategory> }) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "businessCategory",
      header: "Categoría",
      cell: ({ row }: { row: Row<BusinessSubCategory> }) => (
        <span className="text-muted-foreground">
          {row.original.businessCategory?.name || "-"}
        </span>
      ),
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }: { row: Row<BusinessSubCategory> }) => (
        <span className="text-muted-foreground">
          {row.original.description || "-"}
        </span>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Estado",
      cell: ({ row }: { row: Row<BusinessSubCategory> }) => {
        const subcategory = row.original;
        return (
          <div className="flex items-center gap-2">
            {subcategory.isActive ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
            <span
              className={
                subcategory.isActive ? "text-green-700" : "text-red-700"
              }
            >
              {subcategory.isActive ? "Activo" : "Inactivo"}
            </span>
            {subcategory.deletedAt && (
              <span className="text-xs text-muted-foreground">(Eliminado)</span>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<BusinessSubCategory> }) => {
        const subcategory = row.original;
        const isDeleted = !!subcategory.deletedAt;
        return (
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(subcategory)}
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
                onClick={() => onDelete(subcategory)}
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => onRestore(subcategory)}
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
