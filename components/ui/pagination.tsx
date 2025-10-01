// filepath: sae-frontend/components/ui/pagination.tsx
"use client";

import * as React from "react";
import clsx from "clsx";

export function Pagination({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <nav role="navigation" aria-label="pagination" className={clsx("mx-auto flex w-full justify-center", className)}>{children}</nav>;
}

export function PaginationContent({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <ul className={clsx("flex flex-row items-center gap-1", className)}>{children}</ul>;
}

export function PaginationItem({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <li className={className}>{children}</li>;
}

export function PaginationLink({ className, isActive, onClick, children, disabled }: { className?: string; isActive?: boolean; onClick?: () => void; children: React.ReactNode; disabled?: boolean; }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm",
        isActive ? "bg-emerald-600 text-white border-emerald-600" : "bg-white hover:bg-zinc-50 border-zinc-200",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
}

type WithoutChildren<T> = Omit<T, "children">;

export function PaginationPrevious(props: WithoutChildren<React.ComponentProps<typeof PaginationLink>>) {
  return <PaginationLink {...props}>{"<"}</PaginationLink>;
}

export function PaginationNext(props: WithoutChildren<React.ComponentProps<typeof PaginationLink>>) {
  return <PaginationLink {...props}>{">"}</PaginationLink>;
}

export function PaginationEllipsis() {
  return <span className="px-2 text-sm text-zinc-500">…</span>;
}
