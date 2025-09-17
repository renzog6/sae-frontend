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

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const handleLogout = () => {
    // Lógica de cierre de sesión
    console.log("Cerrando sesión...");
  };

  const handleSettings = () => {
    // Navegación a configuración
    console.log("Navegando a configuración...");
  };

  return (
    <header className="bg-white border-b border-laurel-200 p-4 flex items-center justify-between">
      <div className="flex items-center">
        {/* Botón del menú hamburguesa - IMPORTANTE: fuera del DropdownMenu */}
        <Button
          variant="ghost"
          size="icon"
          className="mr-4 text-laurel-700"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold text-laurel-900">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
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
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
            3
          </span>
        </Button>

        {/* Menú de usuario con Dropdown de shadcn/ui */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-laurel-700">
              <div className="w-8 h-8 rounded-full bg-laurel-600 flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 border-laurel-200 bg-zinc-100"
          >
            <DropdownMenuLabel className="flex flex-col">
              <span className="font-medium">Usuario SAE</span>
              <span className="text-xs text-laurel-600 font-normal">
                admin@example.com
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-laurel-100" />
            <DropdownMenuItem
              onClick={handleSettings}
              className="flex items-center cursor-pointer text-laurel-700 focus:bg-laurel-50"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-laurel-100" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center cursor-pointer text-red-600 focus:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
