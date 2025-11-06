// filepath: sae-frontend/app/equipments/layout.tsx
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export const metadata = {
  title: "SAE | Neumaticos",
  description: "Gestión integral de Neumaticos",
};

export default function TiresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
