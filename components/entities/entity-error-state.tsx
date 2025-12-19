// filepath: sae-frontend/components/entities/entity-error-state.tsx
"use client";

import { ReactNode } from "react";

interface EntityErrorStateProps {
  error: Error | null;
  children?: ReactNode;
}

export function EntityErrorState({ error, children }: EntityErrorStateProps) {
  if (!error) return null;

  return (
    <div className="p-4 border border-red-200 rounded-lg bg-red-50">
      <p className="text-red-600">
        Error: {error instanceof Error ? error.message : "Error inesperado"}
      </p>
      {children}
    </div>
  );
}
