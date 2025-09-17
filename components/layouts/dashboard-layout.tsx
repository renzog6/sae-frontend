// filepath: sae-frontend/components/layouts/dashboard-layout.tsx
"use client";

import { useState, useEffect } from "react";
import { MobileSidebar } from "@/components/layouts/mobile-sidebar";
import { Header } from "@/components/layouts/header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex h-screen bg-laurel-50 overflow-hidden">
      {/* Sidebar móvil - siempre usado */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
