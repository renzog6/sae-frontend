import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EntityFormLayoutProps {
  title: string | React.ReactNode;
  description?: string;
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
  onBack?: () => void;
}

export function EntityFormLayout({
  title,
  description,
  children,
  backHref,
  backLabel = "Volver",
  onBack,
}: EntityFormLayoutProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              {description && (
                <CardDescription className="mt-1">
                  {description}
                </CardDescription>
              )}
            </div>
            <Button variant="outline" onClick={handleBack}>
              {backLabel}
            </Button>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
