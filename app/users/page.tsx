// filepath: sae-frontend/app/users/page.tsx
"use client";

import { useEffect, useState } from "react";
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

import { UsersService } from "@/lib/api/users";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      if (session?.accessToken) {
        const data = await UsersService.getUsers(session.accessToken);
        setUsers(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

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
          <Button
            onClick={() => router.push("/users/new")}
            className="bg-laurel-600 hover:bg-laurel-700"
          >
            Nuevo Usuario
          </Button>
        </div>

        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6 text-red-600">{error}</CardContent>
          </Card>
        )}

        <Card className="border-laurel-200">
          <CardHeader>
            <CardTitle className="text-laurel-900">Lista de Usuarios</CardTitle>
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
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString("es-ES")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/users/${user.id}`)}
                        >
                          Editar
                        </Button>
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
