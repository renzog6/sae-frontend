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
  { title: "Empleados", href: routes.employees.root, icon: Users },
  { title: "Vacaciones", href: routes.employees.vacation, icon: Calendar },
  { title: "Equipos", href: routes.equipments.root, icon: Wrench },
  { title: "Neumáticos", href: routes.tires.root, icon: CircleDot },
  { title: "Empresas", href: routes.companies.root, icon: Building2 },
  { title: "Configuración", href: routes.settings.root, icon: Settings },
];
