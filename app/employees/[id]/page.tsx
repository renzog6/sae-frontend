// filepath: sae-frontend/app/employees/[id]/page.tsx

"use client";

import { useParams } from "next/navigation";
import { useEmployees } from "@/lib/hooks/useEmployees";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Phone,
  User,
  Briefcase,
  IdCard,
  Edit,
  TrendingUp,
  CircleDot,
  Mail,
  Smartphone,
  Info
} from "lucide-react";
import { Address } from "@/lib/types/shared/location";
import {
  genderLabels,
  maritalLabels,
  employeeStatusLabels,
} from "@/lib/constants";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate, formatTenure, calcAge } from "@/lib/utils/date";
import { cn } from "@/lib/utils";

export default function EmployeePage() {
  const params = useParams();
  const id = Number(params.id);

  const { data: employee, isLoading } = useEmployees().useGetById(id);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4 animate-pulse">
          <div className="w-20 h-20 rounded-full bg-muted"></div>
          <div className="space-y-2">
            <div className="w-48 h-8 rounded bg-muted"></div>
            <div className="w-32 h-4 rounded bg-muted"></div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-lg bg-muted animate-pulse"></div>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-64 rounded-lg bg-muted animate-pulse"></div>
          <div className="h-64 rounded-lg bg-muted animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Info className="w-12 h-12 text-muted-foreground" />
        <p className="text-xl font-medium text-muted-foreground">Empleado no encontrado</p>
        <Button asChild variant="outline">
          <Link href="/employees/list">Volver al listado</Link>
        </Button>
      </div>
    );
  }

  const { person, position, category, status, hireDate, endDate } = employee;

  // Animación base para los elementos
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const getInitials = () => {
    return `${person?.firstName?.charAt(0) || ""}${person?.lastName?.charAt(0) || ""}`.toUpperCase();
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-1 space-y-6 sm:p-0"
    >
      {/* --- Profile Header --- */}
      <motion.div variants={item} className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-20 h-20 text-2xl font-bold bg-teal-100 rounded-full text-teal-700 border-4 border-white shadow-sm ring-1 ring-teal-200">
            {getInitials() || <User className="w-10 h-10" />}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              {person?.firstName} {person?.lastName}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-zinc-500 font-medium">
                <Briefcase className="w-4 h-4" />
                {position?.name || "Sin puesto"}
              </span>
              <span className="text-zinc-300">•</span>
              <Badge
                variant="outline"
                className={cn(
                  "font-semibold",
                  status === "ACTIVE"
                    ? "bg-teal-50 text-teal-700 border-teal-200"
                    : "bg-zinc-100 text-zinc-600 border-zinc-200"
                )}
              >
                {employeeStatusLabels[status] || status}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="shadow-sm border-zinc-200 hover:bg-zinc-50">
            <Link href={`/employees/${id}/edit`}>
              <Edit className="w-4 h-4 mr-2" />
              Editar Perfil
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* --- Summary KPI Rows --- */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[

          {
            title: "Legajo",
            value: employee.employeeCode || `#${employee.id}`,
            icon: IdCard,
            color: "text-blue-600",
            bg: "bg-blue-50"
          },
          {
            title: "Ingreso",
            value: formatDate(hireDate),
            icon: Calendar,
            color: "text-amber-600",
            bg: "bg-amber-50"
          }, {
            title: "Antigüedad",
            value: formatTenure(hireDate, status === "TERMINATED" ? endDate : undefined),
            icon: TrendingUp,
            color: "text-teal-600",
            bg: "bg-teal-50"
          }
        ].map((stat, i) => (
          <motion.div key={i} variants={item}>
            <Card className="shadow-sm border-zinc-200/60 overflow-hidden">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={cn("p-2 rounded-lg", stat.bg)}>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-0.5">{stat.title}</p>
                  <p className="text-lg font-bold text-zinc-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* --- Main Content Grid --- */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Col 1 & 2: Main Info */}
        <div className="space-y-6 md:col-span-2">
          {/* Información Personal */}
          <motion.div variants={item}>
            <Card className="shadow-sm border-zinc-200/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2 text-zinc-800">
                  <User className="w-5 h-5 text-teal-600" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-y-4 gap-x-8 sm:grid-cols-2">
                  <InfoField label="DNI" value={person?.dni} />
                  <InfoField label="CUIL" value={person?.cuil} />
                  <InfoField label="Fecha de Nacimiento" value={`${formatDate(person?.birthDate)} (${calcAge(person?.birthDate)} años)`} />
                  <InfoField label="Género" value={person?.gender ? genderLabels[person.gender] : undefined} />
                  <InfoField label="Estado Civil" value={person?.maritalStatus ? maritalLabels[person.maritalStatus] : undefined} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Información Laboral */}
          <motion.div variants={item}>
            <Card className="shadow-sm border-zinc-200/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2 text-zinc-800">
                  <Briefcase className="w-5 h-5 text-teal-600" />
                  Información Laboral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-y-4 gap-x-8 sm:grid-cols-2">
                  <InfoField label="Puesto / Función" value={position?.name} />
                  <InfoField label="Categoría" value={category?.name} />
                  <InfoField label="Fecha de Ingreso" value={formatDate(hireDate)} />
                  {endDate && <InfoField label="Fecha de Egreso" value={formatDate(endDate)} className="text-red-600" />}
                  <InfoField label="Legajo Interno" value={employee.employeeCode} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Col 3: Sidebar Info */}
        <div className="space-y-6">
          {/* Contactos */}
          <motion.div variants={item}>
            <Card className="shadow-sm border-zinc-200/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2 text-zinc-800">
                  <Phone className="w-5 h-5 text-teal-600" />
                  Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {person?.contacts && person.contacts.length > 0 ? (
                  person.contacts.map((link) => (
                    <div key={link.id} className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-zinc-50 mt-0.5">
                        {link.contact?.type === "EMAIL" ? <Mail className="w-3.5 h-3.5 text-zinc-500" /> : <Smartphone className="w-3.5 h-3.5 text-zinc-500" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900 break-all">{link.contact?.value || "N/A"}</p>
                        <p className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">
                          {link.contact?.label || link.contact?.type || "Contacto"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-zinc-500 italic">No hay información de contacto registrada.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Dirección */}
          <motion.div variants={item}>
            <Card className="shadow-sm border-zinc-200/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2 text-zinc-800">
                  <MapPin className="w-5 h-5 text-teal-600" />
                  Ubicación
                </CardTitle>
              </CardHeader>
              <CardContent>
                {person?.address ? (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-zinc-50 mt-0.5">
                      <CircleDot className="w-3.5 h-3.5 text-zinc-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-900 leading-snug">
                        {`${(person.address as Address).street} ${(person.address as Address).number}`}
                        {(person.address as Address).floor && `, Piso ${(person.address as Address).floor}`}
                        {(person.address as Address).apartment && `, Depto ${(person.address as Address).apartment}`}
                      </p>
                      <p className="text-sm text-zinc-500 mt-0.5">
                        {(person.address as Address).city?.name}, {(person.address as Address).city?.province?.name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500 italic">Domicilio no registrado.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function InfoField({ label, value, className }: { label: string; value?: string | null | number; className?: string }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-0.5">{label}</p>
      <p className={cn("text-sm font-medium text-zinc-900", className)}>
        {value || <span className="text-zinc-300 italic">No especificado</span>}
      </p>
    </div>
  );
}
