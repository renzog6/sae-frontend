// filepath: sae-frontend/components/layouts/mobile-sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Users, User, BarChart3, Settings, Leaf, X, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Definir tipos de roles
type UserRole = "ADMIN" | "USER";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  requiredRole?: UserRole;
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Empresas", href: "/companies", icon: Building },
  { name: "Empleados", href: "/employees", icon: User },
  { name: "Usuarios", href: "/users", icon: Users, requiredRole: "ADMIN" },
  { name: "Reportes", href: "/reports", icon: BarChart3 },
  { name: "Configuración", href: "/settings", icon: Settings },
];

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userRole = (session?.user?.role as UserRole) || "USER";

  const filteredNavigation = navigation.filter((item) => {
    if (!item.requiredRole) return true;
    return item.requiredRole === userRole;
  });

  return (
    <>
      {/* Overlay de fondo */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-zinc-800 text-zinc-100 p-4 z-50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Leaf className="w-8 h-8 mr-2 text-zinc-300" />
            <span className="text-xl font-bold">SAE Dashboard</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-300"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <nav className="space-y-2">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
                )}
                onClick={onClose}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
