// filepath: sae-frontend/components/entities/entity-loading-state.tsx
"use client";

import { ReactNode } from "react";

interface EntityLoadingStateProps {
  message?: string;
  children?: ReactNode;
}

export function EntityLoadingState({
  message = "Cargando...",
  children,
}: EntityLoadingStateProps) {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-gray-600">{children || message}</div>
    </div>
  );
}
