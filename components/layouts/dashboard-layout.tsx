// filepath: sae-frontend/components/layouts/dashboard-layout.tsx
"use client";

import { useState, useEffect } from "react";
import { MobileSidebar } from "@/components/layouts/mobile-sidebar";
import { Header } from "@/components/layouts/header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (!isMounted || status === "loading") return null;

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50">
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
