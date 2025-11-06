// filepath: sae-frontend/app/employees/layout.tsx
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export const metadata = {
  title: "SAE | Empleados",
  description: "Gestión integral del personal",
};

export default function CompaniesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
