// filepath: sae-frontend/app/employees/[id]/layout.tsx

"use client";

import { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEmployeeDetail } from "@/lib/hooks/useEmployees";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Edit,
  History,
  FileText,
  Calendar,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { href: "", label: "Detalle", icon: User },
  { href: "/edit", label: "Editar", icon: Edit },
  { href: "/history", label: "Historial", icon: History },
  { href: "/documents", label: "Documentos", icon: FileText },
  { href: "/vacations", label: "Vacaciones", icon: Calendar },
  { href: "/trainings", label: "Capacitaciones", icon: GraduationCap },
];

export default function EmployeeLayout({ children }: { children: ReactNode }) {
  const params = useParams();
  const id = Number(params.id);
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";

  const {
    data: employee,
    isLoading,
    error,
  } = useEmployeeDetail(id, accessToken);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 p-6 md:flex-row">
        <Card className="w-full md:w-64">
          <CardContent className="p-6">
            <div className="space-y-4 animate-pulse">
              <div className="w-3/4 h-4 rounded bg-muted"></div>
              <div className="w-1/2 h-3 rounded bg-muted"></div>
              <div className="w-1/4 h-3 rounded bg-muted"></div>
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-8 rounded bg-muted"></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="p-6">
            <div className="space-y-4 animate-pulse">
              <div className="w-1/4 h-6 rounded bg-muted"></div>
              <div className="w-1/2 h-4 rounded bg-muted"></div>
              <div className="h-32 rounded bg-muted"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !employee) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:flex-row">
      {/* Sidebar con info básica del empleado */}
      <Card className="w-full md:w-64">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl">
            {employee.person?.firstName} {employee.person?.lastName}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Puesto: {employee.position?.name}
          </p>
          <p className="text-xs text-muted-foreground">
            Legajo: {employee.employeeCode}
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="justify-start px-3 h-9"
                asChild
              >
                <Link href={`/employees/${id}${item.href}`}>
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
        </CardContent>
      </Card>

      {/* Contenido dinámico de cada sección */}
      <Card className="flex-1">
        <CardContent className="p-0">{children}</CardContent>
      </Card>
    </div>
  );
}
