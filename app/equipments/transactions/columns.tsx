// filepath: sae-frontend/app/equipments/transactions/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { EquipmentTransaction } from "@/lib/types/domain/equipment-transaction";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { equipmentTransactionUtils } from "@/lib/utils/equipment-transaction";
import { Edit, Trash2 } from "lucide-react";

export function getEquipmentTransactionColumns({
  onEdit,
  onDelete,
}: {
  onEdit?: (transaction: EquipmentTransaction) => void;
  onDelete?: (transaction: EquipmentTransaction) => void;
}): ColumnDef<EquipmentTransaction>[] {
  return [
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }: { row: Row<EquipmentTransaction> }) => {
        const type = row.original.type;
        const icon = equipmentTransactionUtils.getTransactionIcon(type);
        const label = equipmentTransactionUtils.formatType(type);

        return (
          <div className="flex items-center gap-2">
            <span className="text-lg">{icon}</span>
            <Badge variant={type === "PURCHASE" ? "default" : "secondary"}>
              {label}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "transactionDate",
      header: "Fecha",
      cell: ({ row }: { row: Row<EquipmentTransaction> }) => (
        <span className="font-medium">
          {equipmentTransactionUtils.formatTransactionDate(
            row.original.transactionDate
          )}
        </span>
      ),
    },
    {
      accessorKey: "equipment",
      header: "Equipo",
      cell: ({ row }: { row: Row<EquipmentTransaction> }) => (
        <div className="flex flex-col">
          <span className="font-medium">
            {row.original.equipment?.name || "-"}
          </span>
          <span className="text-sm text-muted-foreground">
            {row.original.equipment?.internalCode || "-"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "company",
      header: "Empresa",
      cell: ({ row }: { row: Row<EquipmentTransaction> }) => (
        <div className="flex flex-col">
          <span className="font-medium">
            {row.original.company?.name || "-"}
          </span>
          <span className="text-sm text-muted-foreground">
            {row.original.company?.businessName || "-"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Monto",
      cell: ({ row }: { row: Row<EquipmentTransaction> }) => (
        <span className="font-medium">
          {equipmentTransactionUtils.formatAmount(
            row.original.amount,
            row.original.currency
          )}
        </span>
      ),
    },
    {
      accessorKey: "currency",
      header: "Moneda",
      cell: ({ row }: { row: Row<EquipmentTransaction> }) => (
        <Badge variant="outline">
          {equipmentTransactionUtils.formatCurrency(row.original.currency)}
        </Badge>
      ),
    },
    {
      accessorKey: "observation",
      header: "Observación",
      cell: ({ row }: { row: Row<EquipmentTransaction> }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.observation || "-"}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<EquipmentTransaction> }) => {
        const transaction = row.original;
        return (
          <div className="flex justify-end gap-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(transaction)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(transaction)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        );
      },
    },
  ];
}
