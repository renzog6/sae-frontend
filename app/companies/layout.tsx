// filepath: sae-frontend/app/companies/layout.tsx
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export const metadata = {
  title: "SAE | Empresas",
  description: "Gestión integral de Empresas",
};

export default function CompaniesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
