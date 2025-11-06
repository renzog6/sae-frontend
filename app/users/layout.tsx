// filepath: sae-frontend/app/users/layout.tsx
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export const metadata = {
  title: "SAE | Usuarios",
  description: "Gestión integral de Usuarios.",
};

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
