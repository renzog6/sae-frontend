// filepath: sae-frontend/app/users/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useUsers } from "@/lib/hooks/useUsers";
import { Link, Plus, Edit, Trash2 } from "lucide-react";

export default function UsersPage() {
  const { data: session } = useSession();
  const { data: usersResponse, isLoading: loading, error } = useUsers();
  const router = useRouter();

  // Extract data from standardized response
  const users = usersResponse?.data || [];
  const meta = usersResponse?.meta;

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
              {users.length} usuario{users.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Último Login</TableHead>
                    <TableHead>Fecha de Creación</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.role === "ADMIN" ? "Administrador" : "Usuario"}
                      </TableCell>
                      <TableCell>{user.companyId}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            user.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.isActive ? "Activo" : "Inactivo"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {user.lastLoginAt
                          ? new Date(user.lastLoginAt).toLocaleDateString(
                              "es-ES"
                            )
                          : "Nunca"}
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString("es-ES")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/users/${user.id}`)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              // TODO: Implement delete functionality
                              console.log("Delete user:", user.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
