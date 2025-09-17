// filepath: sae-frontend/app/layout.tsx

import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/providers";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SAE Dashboard",
  description: "Sistema de Administración Escolar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <DashboardLayout>{children}</DashboardLayout>
        </Providers>
      </body>
    </html>
  );
}
