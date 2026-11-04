import { redirect } from "next/navigation";

type LegacyVacationDetailPageProps = {
  searchParams: Promise<{ id?: string }>;
};

export default async function LegacyVacationDetailPage({
  searchParams,
}: LegacyVacationDetailPageProps) {
  const { id } = await searchParams;
  const employeeId = Number(id);

  if (Number.isInteger(employeeId) && employeeId > 0) {
    redirect(`/employees/${employeeId}/vacations`);
  }

  redirect("/employees/vacations");
}
