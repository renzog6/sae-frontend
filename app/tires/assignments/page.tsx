// app/tires/assignments/page.tsx
"use client";

import { TireAssignmentsContainer } from "./TireAssignmentsContainer";

export default function TireAssignmentsPage() {
  return (
    <div className="container p-6 mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          Asignaciones de Neumáticos
        </h1>
        <p className="text-muted-foreground">
          Gestiona la asignación y rotación de neumáticos en tus equipos
        </p>
      </header>

      <TireAssignmentsContainer />
    </div>
  );
}
