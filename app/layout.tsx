// filepath: sae-frontend/app/layout.tsx

import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/providers";
import { ToasterProvider } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SAE Dashboard",
  description: "Sistema de Administración Empresarial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <Providers>
            <ToasterProvider>{children}</ToasterProvider>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
