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
    <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/10">
      <p className="text-destructive">
        Error: {error instanceof Error ? error.message : "Error inesperado"}
      </p>
      {children}
    </div>
  );
}
