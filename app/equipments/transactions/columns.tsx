// filepath: sae-frontend/app/equipments/transactions/columns.tsx
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { EquipmentTransaction } from "@/lib/types/domain/equipment-transaction";
import { Badge } from "@/components/ui/badge";
import { equipmentTransactionUtils } from "@/lib/utils/equipment-transaction";

export function getEquipmentTransactionColumns(): ColumnDef<EquipmentTransaction>[] {
  return [
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => {
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
      cell: ({ row }) => (
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
      cell: ({ row }) => (
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
      cell: ({ row }) => (
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
      cell: ({ row }) => (
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
      cell: ({ row }) => (
        <Badge variant="outline">
          {equipmentTransactionUtils.formatCurrency(row.original.currency)}
        </Badge>
      ),
    },
    {
      accessorKey: "observation",
      header: "Observación",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.observation || "-"}
        </span>
      ),
    },
  ];
}
