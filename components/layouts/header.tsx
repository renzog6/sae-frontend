// filepath: sae-frontend/components/layouts/header.tsx
"use client";

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
import { Menu, Bell, Search, User, Settings, LogOut } from "lucide-react";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      // Cerrar sesión con NextAuth
      await signOut({
        redirect: false,
        callbackUrl: "/login",
      });

      // Redirigir al login
      router.push("/login");
      router.refresh(); // Forzar recarga para limpiar estado
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleSettings = () => {
    // Navegación a configuración
    router.push("/settings");
  };

  const handleProfile = () => {
    // Navegación al perfil del usuario
    router.push("/profile");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white border-b border-laurel-200">
      <div className="flex items-center">
        {/* Botón del menú hamburguesa - IMPORTANTE: fuera del DropdownMenu */}
        <Button
          variant="ghost"
          size="icon"
          className="mr-4 text-laurel-700"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold text-laurel-900">Dashboard</h2>
      </div>

      <div className="flex gap-4 items-center">
        <div className="hidden relative md:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-laurel-400" />
          <Input
            type="text"
            placeholder="Buscar..."
            className="pl-10 w-64 border-laurel-200 focus:border-laurel-500"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="relative text-laurel-600"
        >
          <Bell className="w-5 h-5" />
          <span className="flex absolute -top-1 -right-1 justify-center items-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
            3
          </span>
        </Button>

        {/* Menú de usuario con Dropdown de shadcn/ui */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-laurel-700">
              <div className="flex justify-center items-center w-8 h-8 rounded-full bg-laurel-600">
                <User className="w-5 h-5" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 border-laurel-200 bg-zinc-100"
          >
            <DropdownMenuLabel className="flex flex-col">
              <span className="font-medium">{session?.user.username}</span>
              <span className="text-xs font-normal text-laurel-600">
                {session?.user.email}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-laurel-100" />
            <DropdownMenuItem
              onClick={handleSettings}
              className="flex items-center cursor-pointer text-laurel-700 focus:bg-laurel-50"
            >
              <Settings className="mr-2 w-4 h-4" />
              Configuración
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-laurel-100" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center text-red-600 cursor-pointer focus:bg-red-50"
            >
              <LogOut className="mr-2 w-4 h-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
