// filepath: sae-frontend/app/settings/page.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Building2, Tags, Ruler, Users, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { routes } from "@/lib/routes";

// Config data for the cards to make the JSX cleaner
const settingsSections = [
  {
    title: "Ciudades",
    description: "Define y administra las ubicaciones disponibles.",
    icon: Building2,
    href: routes.settings.locations,
    ariaLabel: "Ir a configuración de ciudades",
    ariaDescribedBy: "desc-locations",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    hoverColor: "group-hover:text-blue-700",
    hoverBg: "group-hover:bg-blue-600",
  },
  {
    title: "Marcas",
    description: "Gestiona las marcas para clasificar tus productos.",
    icon: Tags,
    href: routes.settings.brands,
    ariaLabel: "Ir a configuración de marcas",
    ariaDescribedBy: "desc-brands",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    hoverColor: "group-hover:text-orange-700",
    hoverBg: "group-hover:bg-orange-600",
  },
  {
    title: "Unidades",
    description: "Configura unidades de medida para tus operaciones.",
    icon: Ruler,
    href: routes.settings.units,
    ariaLabel: "Ir a configuración de unidades",
    ariaDescribedBy: "desc-units",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    hoverColor: "group-hover:text-emerald-700",
    hoverBg: "group-hover:bg-emerald-600",
  },
  {
    title: "Usuarios",
    description: "Gestiona los usuarios del sistema.",
    icon: Users,
    href: routes.users.root,
    ariaLabel: "Ir a configuración de usuarios",
    ariaDescribedBy: "desc-users",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    hoverColor: "group-hover:text-purple-700",
    hoverBg: "group-hover:bg-purple-600",
  },
];

export default function SettingsPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Administra Configuración
          </h1>
          <p className="text-zinc-500">
            Gestiona las entidades base del sistema de forma simple y
            organizada.
          </p>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {settingsSections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link
              href={section.href}
              aria-label={section.ariaLabel}
              aria-describedby={section.ariaDescribedBy}
              className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:focus-visible:ring-emerald-400/60 rounded-2xl"
            >
              <Card className="h-full transition-all duration-300 border border-zinc-200 shadow-sm hover:shadow-lg hover:border-teal-200">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 rounded-lg ${section.bgColor} ${section.color} ${section.hoverBg} group-hover:text-white transition-colors duration-300`}
                    >
                      <section.icon className="h-5 w-5" />
                    </div>
                    <CardTitle
                      className={`text-xl font-semibold text-zinc-800 ${section.hoverColor} transition-colors`}
                    >
                      {section.title}
                    </CardTitle>
                  </div>
                  <CardDescription
                    id={section.ariaDescribedBy}
                    className="text-zinc-500 group-hover:text-zinc-600 transition-colors"
                  >
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm font-medium text-zinc-500 group-hover:text-teal-600 transition-colors">
                    Abrir sección
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
