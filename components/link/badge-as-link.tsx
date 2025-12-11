import React from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LinkAsBadgeProps {
  href: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline" | null | undefined;
}

export function LinkAsBadge({
  href,
  title,
  icon: Icon,
  className,
  variant = "secondary",
}: LinkAsBadgeProps) {
  return (
    <Link href={href}>
      <Badge
        variant={variant}
        className={cn("flex items-center gap-2 mb-2", className)}
      >
        {Icon && <Icon className="w-4 h-4" />}
        {title}
      </Badge>
    </Link>
  );
}
