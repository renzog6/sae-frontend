// filepath: sae-frontend/app/companies/page.tsx
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
import { Building2, Tags, Layers } from "lucide-react";

export default function CompaniesMainPage() {
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
      href: "/companies/list",
      title: "Empresas",
      description: "Lista, crea y edita las empresas.",
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      href: "/companies/business-categories",
      title: "Categorías de Empresas",
      description: "Administra las categorías de empresas.",
      icon: <Tags className="w-4 h-4" />,
    },
    {
      href: "/companies/business-subcategories",
      title: "Subcategorías de Empresas",
      description: "Gestiona las subcategorías de empresas.",
      icon: <Layers className="w-4 h-4" />,
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
          Gestión de Empresas
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Administra todas las empresas, categorías y subcategorías de tu
          sistema.
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
