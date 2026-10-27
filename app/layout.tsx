// filepath: sae-frontend/app/layout.tsx

import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/providers";
import { ToasterProvider } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="es" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
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
