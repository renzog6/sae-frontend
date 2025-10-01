// filepath: sae-frontend/app/companies/page.tsx

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSignIcon, UsersIcon, TrendingUpIcon, ActivityIcon } from "lucide-react";

export default function CompaniesMainPage() {
  return (
    <div className="w-full p-6 flex justify-center">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl">

        <Card>
          <Link href="/companies/list" className="block">
            <CardContent className="py-6 hover:bg-muted/60 transition-colors rounded-md">
              <div className="text-2xl font-bold">Empresas</div>
              <p className="text-xs text-muted-foreground">Gestionar empresas</p>
            </CardContent>
          </Link>
        </Card>

        <Card>
          <Link href="/companies/business-categories" className="block">
            <CardContent className="py-6 hover:bg-muted/60 transition-colors rounded-md">
              <div className="text-2xl font-bold">Categorias</div>
              <p className="text-xs text-muted-foreground">Gestionar rubros</p>
            </CardContent>
          </Link>
        </Card>

        <Card>
          <Link href="/companies/business-subcategories" className="block">
            <CardContent className="py-6 hover:bg-muted/60 transition-colors rounded-md">
              <div className="text-2xl font-bold">Sub-Categorias</div>
              <p className="text-xs text-muted-foreground">Gestionar sub-rubros</p>
            </CardContent>
          </Link>
        </Card>

      </div>
    </div>
  );
}