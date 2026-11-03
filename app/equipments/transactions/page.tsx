// filepath: sae-frontend/app/equipments/transactions/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { routes } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useEquipmentTransactions, useDeleteEquipmentTransaction } from "@/lib/hooks/useEquipmentTransactions";
import { getEquipmentTransactionColumns } from "./columns";

import { PaginationBar } from "@/components/data-table/pagination-bar";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/hooks/useDataTable";
import { EquipmentTransactionType, EquipmentTransaction } from "@/lib/types/domain/equipment-transaction";
import { EntityErrorState } from "@/components/entities/entity-error-state";
import { EntityLoadingState } from "@/components/entities/entity-loading-state";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/toaster";

export default function EquipmentTransactionsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedType, setSelectedType] = useState<
    EquipmentTransactionType | ""
  >("");
  const [selectedTransaction, setSelectedTransaction] = useState<
    EquipmentTransaction | null
  >(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");

  const {
    data: transactionsResponse,
    isLoading,
    error,
  } = useEquipmentTransactions({
    page,
    limit,
    ...(selectedType ? { type: selectedType } : {}),
  });

  const { mutate: deleteTransaction, isPending: deleting } =
    useDeleteEquipmentTransaction();

  const transactions = transactionsResponse?.data ?? [];

  const columns = useMemo(
    () =>
      getEquipmentTransactionColumns({
        onEdit: (transaction) => {
          setSelectedTransaction(transaction);
          setDialogMode("edit");
          setDialogOpen(true);
        },
        onDelete: (transaction) => {
          setSelectedTransaction(transaction);
          setConfirmOpen(true);
        },
      }),
    [deleteTransaction]
  );

  const meta = {
    total: transactionsResponse?.meta?.total ?? 0,
    page: transactionsResponse?.meta?.page ?? 1,
    limit: transactionsResponse?.meta?.limit ?? 10,
    totalPages: transactionsResponse?.meta?.totalPages ?? 1,
  };

  // TanStack Table
  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: transactions,
    columns,
    pageCount: meta.totalPages,
    rowCount: meta.total,
    manualPagination: true,
    manualFiltering: true,
  });

  const filteredCount = table.getFilteredRowModel().rows.length;

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">Transacciones de equipos</CardTitle>

            {/* Create transaction button */}
            <Button
              onClick={() => router.push(routes.equipments.transactions.new)}
            >
              <span className="mr-2">➕</span>
              Nueva transacción
            </Button>
          </div>

          <CardDescription>
            Gestión de compras y ventas de equipos
          </CardDescription>

          {/* Filtros */}
          <div className="flex flex-col gap-4 mt-4 sm:flex-row">
            <div className="flex gap-2">
              {/* Type filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="min-w-[140px] justify-between"
                  >
                    <span className="mr-2">🔄</span>
                    {selectedType || "Tipo"}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 overflow-y-auto max-h-60"
                >
                  <DropdownMenuItem onClick={() => setSelectedType("")}>
                    Todos los tipos
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      setSelectedType(EquipmentTransactionType.PURCHASE)
                    }
                  >
                    📥 Compras
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      setSelectedType(EquipmentTransactionType.SALE)
                    }
                  >
                    📤 Ventas
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <EntityErrorState error={error} />

          {isLoading ? (
            <EntityLoadingState />
          ) : (
            <DataTable
              table={table}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              searchPlaceholder="Buscar por observación…"
            />
          )}

          <PaginationBar
            page={meta.page}
            totalPages={meta.totalPages}
            totalItems={meta.total}
            limit={meta.limit}
            onPageChange={setPage}
            onLimitChange={(newLimit) => {
              setLimit(newLimit);
              setPage(1);
            }}
          />
        </CardContent>
      </Card>

      {/* Confirm delete dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar eliminación</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que deseas eliminar la transacción de{" "}
              {selectedTransaction?.equipment?.name}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConfirmOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedTransaction) {
                  deleteTransaction(selectedTransaction.id, {
                    onSuccess: () => {
                      toast({
                        title: "Transacción eliminada",
                        description: `Transacción eliminada correctamente.`,
                        variant: "success",
                      });
                    },
                    onError: (e: any) => {
                      toast({
                        title: "Error al eliminar transacción",
                        description: e?.message || "Intenta nuevamente.",
                        variant: "error",
                      });
                    },
                    onSettled: () => {
                      setConfirmOpen(false);
                      setSelectedTransaction(null);
                    },
                  });
                }
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
