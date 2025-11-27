// filepath: sae-frontend/components/data-table/pagination-bar.tsx
"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface PaginationBarProps {
  page: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function PaginationBar({
  page,
  totalPages,
  totalItems,
  limit,
  onPageChange,
  onLimitChange,
}: PaginationBarProps) {
  return (
    <div className="flex items-center justify-between px-1 py-2 mt-4 border-t">
      {/* Left: Result count */}
      <div className="flex items-center gap-2 mt-4 text-sm">
        <span className="font-semibold">Resultados:</span>
        <span>{totalItems}</span>
      </div>

      {/* Center: Pagination */}
      <Pagination>
        <PaginationContent>
          {/* First page */}
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(1)}
              disabled={page === 1}
            >
              «
            </PaginationLink>
          </PaginationItem>

          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              disabled={page <= 1}
              onClick={() => onPageChange(Math.max(1, page - 1))}
            />
          </PaginationItem>

          {/* Current page (only shows current / total like: 1 de 22) */}
          <PaginationItem>
            <span className="px-3 py-2 text-sm text-muted-foreground">
              {page} de {totalPages}
            </span>
          </PaginationItem>

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              disabled={page >= totalPages}
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            />
          </PaginationItem>

          {/* Last page */}
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(totalPages)}
              disabled={page === totalPages}
            >
              »
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Right: Page size selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="min-w-[90px] justify-between">
            {limit}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-24">
          {[10, 25, 50, 100].map((n) => (
            <DropdownMenuItem key={n} onClick={() => onLimitChange(n)}>
              {n}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
