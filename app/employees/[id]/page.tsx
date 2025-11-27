// filepath: sae-frontend/app/employees/[id]/page.tsx

"use client";

import { useParams } from "next/navigation";
import { useEmployeeDetail } from "@/lib/hooks/useEmployees";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Phone, Mail, User } from "lucide-react";
import { Address } from "@/lib/types/shared/location";
import { Contact } from "@/lib/types/shared/contact";
import {
  genderLabels,
  maritalLabels,
  employeeStatusLabels,
} from "@/lib/constants";

export default function EmployeePage() {
  const params = useParams();
  const id = Number(params.id);
  const { data: session } = useSession();

  const { data: employee, isLoading } = useEmployeeDetail(id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="w-1/4 h-6 rounded animate-pulse bg-muted"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 animate-pulse">
              <div className="w-1/2 h-4 rounded bg-muted"></div>
              <div className="w-1/3 h-4 rounded bg-muted"></div>
              <div className="w-1/4 h-4 rounded bg-muted"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!employee) {
    return <div>Empleado no encontrado</div>;
  }

  const { person, position, category, status, hireDate, endDate } = employee;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Información Personal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Nombre
              </label>
              <p className="text-lg">
                {person?.firstName} {person?.lastName}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                DNI
              </label>
              <p>{person?.dni || "No especificado"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                CUIL
              </label>
              <p>{person?.cuil || "No especificado"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Fecha de Nacimiento
              </label>
              <p>
                {person?.birthDate
                  ? new Date(person.birthDate).toLocaleDateString()
                  : "No especificada"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Género
              </label>
              <p>
                {person?.gender
                  ? genderLabels[person.gender]
                  : "No especificado"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Estado Civil
              </label>
              <p>
                {person?.maritalStatus
                  ? maritalLabels[person.maritalStatus]
                  : "No especificado"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Información Laboral
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Legajo
              </label>
              <p>{employee.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Estado
              </label>
              <Badge variant={status === "ACTIVE" ? "default" : "secondary"}>
                {employeeStatusLabels[status]}
              </Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Fecha de Ingreso
              </label>
              <p>{new Date(hireDate).toLocaleDateString()}</p>
            </div>
            {endDate && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Fecha de Egreso
                </label>
                <p>{new Date(endDate).toLocaleDateString()}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Categoría
              </label>
              <p>{category?.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Puesto
              </label>
              <p>{position?.name}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {person?.contacts && person.contacts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contactos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {person.contacts.map((contactLink) => (
                <div key={contactLink.id} className="flex items-center gap-2">
                  <span>{contactLink.contactId}</span>
                  <span className="text-sm text-muted-foreground">
                    (Contact ID: {contactLink.contactId})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {person?.address ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Dirección
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {(person.address as Address).street}{" "}
              {(person.address as Address).number}
              {(person.address as Address).floor &&
                `, Piso ${(person.address as Address).floor}`}
              {(person.address as Address).apartment &&
                `, Depto ${(person.address as Address).apartment}`}
            </p>
            <p className="text-sm text-muted-foreground">
              {(person.address as Address).city?.name},{" "}
              {(person.address as Address).city?.province?.name}
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
