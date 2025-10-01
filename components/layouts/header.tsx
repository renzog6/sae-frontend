// filepath: sae-frontend/components/layouts/header.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Menu, Bell, Search, User, Settings, LogOut } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();

  const LABEL_MAP: Record<string, string> = {
    dashboard: "Dashboard",
    companies: "Empresas",
    employees: "Empleados",
    users: "Usuarios",
    reports: "Reportes",
    settings: "Configuración",
    profile: "Perfil",
  };

  const segments = (pathname || "/")
    .split("?")[0]
    .split("#")[0]
    .split("/")
    .filter(Boolean);

  const crumbs = segments.map((seg, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    const label = LABEL_MAP[seg] || seg.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
    const isLast = idx === segments.length - 1;
    return { href, label, isLast };
  });

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false, callbackUrl: "/login" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleSettings = () => router.push("/settings");
  const handleProfile = () => router.push("/profile");

  return (
    <header className="flex justify-between items-center p-4 bg-white border-b border-laurel-200">
      <div className="flex items-center">
        {/* Botón del menú hamburguesa - IMPORTANTE: fuera del DropdownMenu */}
        <Button variant="ghost" size="icon" className="mr-4 text-laurel-700" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </Button>
        {/*MODIFICAR*/}
        <div className="flex flex-col">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/dashboard" className="text-laurel-700 hover:text-foreground">
                  Inicio
                </Link>
              </BreadcrumbItem>
              {crumbs.length > 0 && <BreadcrumbSeparator />}
              {crumbs.map((c, i) => (
                <React.Fragment key={c.href}>
                  {!c.isLast ? (
                    <BreadcrumbItem>
                      <Link href={c.href} className="text-laurel-700 hover:text-foreground">
                        {c.label}
                      </Link>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem>
                      <BreadcrumbPage>{c.label}</BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                  {i < crumbs.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
        </Breadcrumb>
        {/* Fuerza re-render cuando cambia la sesión */}
        <span className="sr-only">{session?.user?.email ?? ""}</span>
      </div>
      {/* Cierre del contenedor izquierdo */}
      </div>

      <div className="flex gap-4 items-center">
        <div className="hidden relative md:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-laurel-400" />
          <Input type="text" placeholder="Buscar..." className="pl-10 w-64 border-laurel-200 focus:border-laurel-500" />
        </div>

        <Button variant="ghost" size="icon" className="relative text-laurel-600">
          <Bell className="w-5 h-5" />
          <span className="flex absolute -top-1 -right-1 justify-center items-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-laurel-700">
              <div className="flex justify-center items-center w-8 h-8 rounded-full bg-laurel-600">
                <User className="w-5 h-5" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 border-laurel-200 bg-zinc-100">
            <DropdownMenuLabel className="flex flex-col">
              <span className="font-medium">{session?.user.username}</span>
              <span className="text-xs font-normal text-laurel-600">{session?.user.email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-laurel-100" />
            <DropdownMenuItem onClick={handleSettings} className="flex items-center cursor-pointer text-laurel-700 focus:bg-laurel-50">
              <Settings className="mr-2 w-4 h-4" />
              Configuración
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-laurel-100" />
            <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600 cursor-pointer focus:bg-red-50">
              <LogOut className="mr-2 w-4 h-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
