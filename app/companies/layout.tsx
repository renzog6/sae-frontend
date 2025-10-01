// filepath: sae-frontend/app/companies/layout.tsx
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function CompaniesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
