// filepath: sae-frontend/app/users/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { User } from "@/lib/types/domain/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useUsers } from "@/lib/hooks/useUsers";
import { Plus } from "lucide-react";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/data-table/use-data-table";
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-laurel-900">
              Gestión de Usuarios
            </h1>
            <p className="text-laurel-600">
              Administra los usuarios del sistema
            </p>
          </div>
          <div>
            <Button variant="default" onClick={() => router.push("/users/new")}>
              <Plus className="w-4 h-4 mr-2" />
              Usuario
            </Button>
          </div>
        </div>

        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6 text-red-600">
              {error.message}
            </CardContent>
          </Card>
        )}

        <Card className="border-laurel-200">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-2xl">Lista de Usuarios</CardTitle>
            </div>
            <CardDescription className="text-laurel-600">
              {filteredCount} usuario{filteredCount !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <DataTable
                table={table}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                searchPlaceholder="Buscar usuarios..."
              />
            )}
          </CardContent>
        </Card>

        <PaginationBar
          page={table.getState().pagination.pageIndex + 1}
          totalPages={table.getPageCount()}
          totalItems={filteredCount}
          limit={table.getState().pagination.pageSize}
          onPageChange={(page) => table.setPageIndex(page - 1)}
          onLimitChange={(limit) => table.setPageSize(limit)}
        />
      </div>

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
