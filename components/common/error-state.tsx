// filepath: sae-frontend/components/common/error-state.tsx
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorStateProps {
  message?: string;
  title?: string;
}

export function ErrorState({
  message = "Ha ocurrido un error al cargar los datos.",
  title = "Error",
}: ErrorStateProps) {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="w-4 h-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
