// filepath: sae-frontend/app/equipments/layout.tsx
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export const metadata = {
  title: "SAE | Equipos",
  description: "Gestión integral de equipamiento",
};

export default function CompaniesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
