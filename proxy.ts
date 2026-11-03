// filepath: sae-frontend/proxy.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// 🔧 Rutas que requieren autenticación general
const protectedRoutes = [
  "/dashboard",
  "/equipments",
  "/employees",
  "/companies",
  "/tires",
  "/settings",
  "/users",
];

// 🔧 Rutas que requieren rol admin
const adminRoutes = ["/users/new", "/users/[id]/edit", "/users/[id]/delete"];

export default withAuth(
  function proxy(req) {
    const { pathname, origin } = req.nextUrl;
    const token = req.nextauth.token as any;

    // 🔹 Si ya está logueado e intenta entrar al login → redirigir
    if (pathname === "/login" && token) {
      return NextResponse.redirect(new URL("/dashboard", origin));
    }

    // 🔹 Si no está logueado y entra a rutas protegidas → redirigir a login
    if (!token && protectedRoutes.some((r) => pathname.startsWith(r))) {
      return NextResponse.redirect(new URL("/login", origin));
    }

    // 🔹 Si es ruta de administración (usuarios críticos)
    if (token && adminRoutes.some((r) => matchRoute(pathname, r))) {
      if (token.role !== "ADMIN") {
        // En vez de redirigir podrías enviar al forbidden page
        return NextResponse.redirect(new URL("/forbidden", origin));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Página pública
        if (pathname === "/login") return true;

        // Rutas protegidas → requieren login
        if (protectedRoutes.some((r) => pathname.startsWith(r))) {
          return !!token;
        }

        // Rutas públicas → permitir
        return true;
      },
    },
  }
);

// 🔍 Utilidad simple para detectar rutas dinámicas
function matchRoute(pathname: string, routePattern: string) {
  // Reemplaza [id] por cualquier segmento
  const regex = new RegExp("^" + routePattern.replace("[id]", "[^/]+") + "$");
  return regex.test(pathname);
}

// Configuración del matcher de Next
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
