// filepath: sae-frontend/app/users/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { User } from "@/lib/types/domain/user";
import { Button } from "@/components/ui/button";

import { useUsers } from "@/lib/hooks";
import { Plus } from "lucide-react";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/hooks/useDataTable";
import { getUserColumns } from "./columns";
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
import { EntityListLayout } from "@/components/entities/entity-list-layout";
import { EntityErrorState } from "@/components/entities/entity-error-state";
import { EntityLoadingState } from "@/components/entities/entity-loading-state";

export default function UsersPage() {
  const {
    data: usersResponse,
    isLoading: loading,
    error,
  } = useUsers().useGetAll();
  const { mutate: deleteUser, isPending: deleting } = useUsers().useDelete();
  const router = useRouter();
  const { toast } = useToast();

  // Extract data from standardized response
  const users = usersResponse?.data || [];

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    router.push(`/users/${user.id}`);
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setConfirmOpen(true);
  };

  const columns = getUserColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: users,
    columns,
    searchableColumns: ["name", "email"],
  });

  const filteredCount = table.getFilteredRowModel().rows.length;

  return (
    <>
      <EntityListLayout
        title="Gestión de Usuarios"
        description={`Administra los usuarios del sistema - ${filteredCount} usuario${
          filteredCount !== 1 ? "s" : ""
        }`}
        actions={
          <Button variant="default" onClick={() => router.push("/users/new")}>
            <Plus className="w-4 h-4 mr-2" />
            Usuario
          </Button>
        }
      >
        <EntityErrorState error={error} />

        {loading ? (
          <EntityLoadingState />
        ) : (
          <DataTable
            table={table}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            searchPlaceholder="Buscar usuarios..."
          />
        )}
      </EntityListLayout>

      <PaginationBar
        page={table.getState().pagination.pageIndex + 1}
        totalPages={table.getPageCount()}
        totalItems={filteredCount}
        limit={table.getState().pagination.pageSize}
        onPageChange={(page) => table.setPageIndex(page - 1)}
        onLimitChange={(limit) => table.setPageSize(limit)}
      />

      {/* Confirm delete dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar usuario</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que deseas eliminar el usuario "{userToDelete?.name}"?
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              onClick={() => {
                if (userToDelete) {
                  deleteUser(userToDelete.id, {
                    onSuccess: () => {
                      toast({
                        title: "Usuario eliminado",
                        description: `"${userToDelete.name}" eliminado correctamente.`,
                        variant: "success",
                      });
                    },
                    onError: (e: any) => {
                      toast({
                        title: "Error al eliminar usuario",
                        description: e?.message || "Intenta nuevamente.",
                        variant: "error",
                      });
                    },
                    onSettled: () => {
                      setConfirmOpen(false);
                      setUserToDelete(null);
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
    </>
  );
}
