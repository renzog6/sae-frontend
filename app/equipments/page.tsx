//filepath: sae-frontend/app/equipments/page.tsx
"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { motion, useReducedMotion } from "framer-motion";
import { Truck, Tags, Layers, Ruler, Wrench } from "lucide-react";
import { routes } from "@/lib/routes";

export default function EquipmentsPage() {
  const prefersReducedMotion = useReducedMotion();

  const MotionWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 300, damping: 20 }
      }
      className="rounded-2xl"
    >
      {children}
    </motion.div>
  );

  const cards = [
    {
      href: "/equipments/list",
      title: "Equipos",
      description: "Lista, crea y edita los equipos.",
      icon: <Truck className="w-4 h-4" />,
    },
    {
      href: "/equipments/types",
      title: "Tipos de Equipos",
      description: "Administra los tipos de equipos.",
      icon: <Tags className="w-4 h-4" />,
    },
    {
      href: "/equipments/categories",
      title: "Categorías de Equipos",
      description: "Gestiona las categorías de equipos.",
      icon: <Layers className="w-4 h-4" />,
    },
    {
      href: "/equipments/models",
      title: "Modelos de Equipos",
      description: "Lista, crea y edita los modelos de equipos.",
      icon: <Ruler className="w-4 h-4" />,
    },
    {
      href: routes.tires.root,
      title: "Neumáticos",
      description: "Accede al módulo completo de neumáticos.",
      icon: <Wrench className="w-4 h-4" />,
    },
  ];

  return (
    <div className="w-full max-w-5xl px-4 py-8 mx-auto">
      {/* Header */}
      <motion.header
        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.4, ease: "easeOut" }
        }
        className="mb-10 text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100">
          Gestión de Equipos
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Administra todos los equipos, categorías y modelos de tu flota.
        </p>
      </motion.header>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="block group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
          >
            <MotionWrapper>
              <Card className="transition-shadow border-t-4 shadow-md rounded-2xl hover:shadow-lg border-t-emerald-300 dark:border-t-emerald-400">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-200/20 dark:text-emerald-300">
                      {card.icon}
                    </span>
                    <CardTitle className="text-lg font-semibold">
                      {card.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 group-hover:text-emerald-800">
                    Abrir →
                  </span>
                </CardContent>
              </Card>
            </MotionWrapper>
          </Link>
        ))}
      </div>
    </div>
  );
}
