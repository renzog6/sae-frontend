// filepath: sae-frontend/components/layouts/public-layout.tsx
"use client";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center min-h-screen bg-zinc-50">
      {children}
    </div>
  );
}
