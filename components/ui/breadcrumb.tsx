import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Breadcrumb = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <nav aria-label="breadcrumb" className={cn("w-full", className)} {...props} />
);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = ({ className, ...props }: React.OlHTMLAttributes<HTMLOListElement>) => (
  <ol className={cn("flex items-center gap-1 text-sm text-muted-foreground", className)} {...props} />
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = ({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
  <li className={cn("inline-flex items-center gap-1", className)} {...props} />
);
BreadcrumbItem.displayName = "BreadcrumbItem";

type BreadcrumbSeparatorProps = React.SVGProps<SVGSVGElement>;
const BreadcrumbSeparator = ({ className, ...props }: BreadcrumbSeparatorProps) => {
  return <ChevronRight className={cn("h-4 w-4 text-laurel-400", className)} {...props} />;
};
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbLink = ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a className={cn("hover:text-foreground text-laurel-700", className)} {...props} />
);
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span aria-current="page" className={cn("font-semibold text-foreground", className)} {...props} />
);
BreadcrumbPage.displayName = "BreadcrumbPage";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
