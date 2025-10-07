// file: sae-frontend/components/link/badge-as-link.tsx
import React from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

interface LinkAsBadgeProps {
  href: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function LinkAsBadge({ href, title, icon: Icon }: LinkAsBadgeProps) {
  return (
    <Link href={href}>
      <Badge variant={"secondary"} className="flex items-center gap-2 mb-2">
        {Icon && <Icon className="w-4 h-4" />}
        {title}
      </Badge>
    </Link>
  );
}
