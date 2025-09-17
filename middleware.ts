// filepath: sae-frontend/middleware.ts
// Middleware para proteger rutas y redirigir usuarios autenticados
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Si el usuario está autenticado y trata de acceder a /login, redirigir a dashboard
    if (req.nextUrl.pathname === "/login" && req.nextauth.token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Si el usuario no está autenticado y trata de acceder a rutas protegidas
    if (!req.nextauth.token && req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Permitir acceso a la página de login sin token
        if (req.nextUrl.pathname === "/login") {
          return true;
        }

        // Para rutas protegidas, requerir token
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return !!token;
        }

        // Permitir acceso a otras rutas públicas
        return true;
      },
    },
  }
);

// Configurar qué rutas debe procesar el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
