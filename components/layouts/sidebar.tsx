// filepath: sae-frontend/components/layouts/sidebar.tsx

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Users, BarChart3, Settings, Leaf } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Usuarios", href: "/users", icon: Users },
  { name: "Reportes", href: "/reports", icon: BarChart3 },
  { name: "Configuración", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-laurel-800 text-white">
      <div className="flex items-center justify-center h-16 flex-shrink-0 px-4 border-b border-laurel-700">
        <Leaf className="h-8 w-8 text-laurel-400 mr-2" />
        <span className="text-xl font-bold">SAE Dashboard</span>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-laurel-700 text-white"
                  : "text-laurel-200 hover:bg-laurel-700 hover:text-white"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
