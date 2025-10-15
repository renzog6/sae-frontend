// filepath: sae-frontend/app/equipments/page.tsx
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
import { Building2, Tags, Ruler } from "lucide-react";

export default function EquipmentsPage() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <>
      <div className="w-full max-w-5xl px-4 py-8 mx-auto">
        <motion.header
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.4, ease: "easeOut" }
          }
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100">
            Administra Empleados
          </h1>
        </motion.header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card: Equipos */}
          <Link
            href="/equipments/list"
            aria-label="Ir al listado de empleados"
            aria-describedby="equipments-list"
            className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:focus-visible:ring-emerald-400/60 rounded-2xl"
          >
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
              <Card className="transition-shadow border-t-4 shadow-md rounded-2xl hover:shadow-lg border-t-slate-300 dark:border-t-slate-400">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-200/20 dark:text-slate-300">
                      <Building2 className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <CardTitle className="text-lg font-semibold">
                      Equipos
                    </CardTitle>
                  </div>
                  <CardDescription id="desc-locations" className="text-sm">
                    Lista, Crea y Edita los equipos.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="inline-flex items-center gap-2 transition-colors text-slate-700 group-hover:text-slate-800">
                    <span className="text-sm font-medium">Abrir</span>
                    <svg
                      className="h-4 w-4 translate-x-0 group-hover:translate-x-0.5 transition-transform"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          {/* Card: Tipo de Equipos */}
          <Link
            href="/equipments/types"
            aria-label="Ir a manejos de vacaciones de los empleados"
            aria-describedby="equipments-types"
            className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:focus-visible:ring-emerald-400/60 rounded-2xl"
          >
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
              <Card className="transition-shadow border-t-4 shadow-md rounded-2xl hover:shadow-lg border-t-slate-300 dark:border-t-slate-400">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-200/20 dark:text-slate-300">
                      <Tags className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <CardTitle className="text-lg font-semibold">
                      Tipos de Equipos
                    </CardTitle>
                  </div>
                  <CardDescription id="desc-brands" className="text-sm">
                    Lista, Crea y Edita los tipos de equipos.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="inline-flex items-center gap-2 transition-colors text-slate-700 group-hover:text-slate-800">
                    <span className="text-sm font-medium">Abrir</span>
                    <svg
                      className="h-4 w-4 translate-x-0 group-hover:translate-x-0.5 transition-transform"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          {/* Card: Categorias de Equipos */}
          <Link
            href="/equipments/categories"
            aria-label="Ir a categorias empleados."
            aria-describedby="equipments-categories"
            className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:focus-visible:ring-emerald-400/60 rounded-2xl"
          >
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
              <Card className="transition-shadow border-t-4 shadow-md rounded-2xl hover:shadow-lg border-t-emerald-300 dark:border-t-emerald-400">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-200/20 dark:text-emerald-300">
                      <Ruler className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <CardTitle className="text-lg font-semibold">
                      Categorias de Equipos
                    </CardTitle>
                  </div>
                  <CardDescription id="desc-units" className="text-sm">
                    Lista, Crea y Edita las categorias de equipos.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="inline-flex items-center gap-2 transition-colors text-emerald-700 group-hover:text-emerald-800">
                    <span className="text-sm font-medium">Abrir</span>
                    <svg
                      className="h-4 w-4 translate-x-0 group-hover:translate-x-0.5 transition-transform"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          {/* Card: Modelos de Equipos */}
          <Link
            href="/equipments/models"
            aria-label="Ir a puestos de los empleados."
            aria-describedby="equipments-models"
            className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:focus-visible:ring-emerald-400/60 rounded-2xl"
          >
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
              <Card className="transition-shadow border-t-4 shadow-md rounded-2xl hover:shadow-lg border-t-emerald-300 dark:border-t-emerald-400">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-200/20 dark:text-emerald-300">
                      <Ruler className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <CardTitle className="text-lg font-semibold">
                      Modelos de Equipos
                    </CardTitle>
                  </div>
                  <CardDescription id="desc-units" className="text-sm">
                    Lista, Crea y Edita los modelos de equipos.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="inline-flex items-center gap-2 transition-colors text-emerald-700 group-hover:text-emerald-800">
                    <span className="text-sm font-medium">Abrir</span>
                    <svg
                      className="h-4 w-4 translate-x-0 group-hover:translate-x-0.5 transition-transform"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        </div>
      </div>
    </>
  );
}
