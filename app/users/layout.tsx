// filepath: sae-frontend/components/layouts/public-layout.tsx

import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
