// filepath: sae-frontend/components/entities/entity-list-layout.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";

interface EntityListLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  filters?: ReactNode;
}

export function EntityListLayout({
  title,
  description,
  children,
  actions,
  filters,
}: EntityListLayoutProps) {
  return (
    <div className="space-y-8">
      <Card className="transition-shadow shadow-sm border-border hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
              {title}
            </CardTitle>
            {actions}
          </div>
          {description && (
            <CardDescription className="text-muted-foreground">
              {description}
            </CardDescription>
          )}
          {filters && (
            <div className="flex flex-col gap-4 mt-4 sm:flex-row">
              {filters}
            </div>
          )}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
