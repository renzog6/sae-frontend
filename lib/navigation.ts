// filepath: sae-frontend/lib/navigation.ts

import { routes } from "./routes";
import {
  Users,
  Calendar,
  Building2,
  LayoutDashboard,
  Settings,
  Wrench,
  CircleDot,
} from "lucide-react";

export const mainMenu = [
  { title: "Dashboard", href: routes.dashboard, icon: LayoutDashboard },
  { title: "Empleados", href: routes.employees.list, icon: Users },
  { title: "Vacaciones", href: routes.employees.vacation, icon: Calendar },
  { title: "Equipos", href: routes.equipments.list, icon: Wrench },
  { title: "Neumáticos", href: routes.tires.list, icon: CircleDot },
  { title: "Empresas", href: routes.companies.list, icon: Building2 },
  { title: "Configuración", href: routes.settings.root, icon: Settings },
];
