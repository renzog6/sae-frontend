//filepath: sae-frontend/lib/api/auth.ts
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ApiClient } from "./apiClient";

// Definir tipo extendido para el User de NextAuth
interface ExtendedUser extends User {
  id: string; // NextAuth espera id como string
  role: string;
  accessToken: string;
  refreshToken: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son requeridos");
        }

        try {
          const response = await ApiClient.login({
            email: credentials.email,
            password: credentials.password,
          });

          if (!response || !response.accessToken || !response.user) {
            throw new Error("Respuesta de autenticación inválida");
          }

          return {
            id: response.user.id.toString(), // Convertir a string
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          } as ExtendedUser;
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("Error en authorize:", error);
          }
          throw new Error(
            error instanceof Error ? error.message : "Error de autenticación"
          );
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const extendedUser = user as ExtendedUser;
        token.sub = extendedUser.id;
        token.role = extendedUser.role;
        token.accessToken = extendedUser.accessToken;
        token.refreshToken = extendedUser.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = Number(token.sub);
        session.user.role = token.role as string;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};
