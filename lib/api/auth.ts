// filepath: sae-frontend/lib/api/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ApiClient } from "./apiClient";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await ApiClient.login({
            email: credentials?.email!,
            password: credentials?.password!,
          });

          if (response && response.accessToken && response.user) {
            return {
              id: response.user.id,
              name: response.user.name,
              email: response.user.email,
              role: response.user.role,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
            } as any; // 👈 Forzamos tipo para evitar conflicto con el User de NextAuth
          }

          return null;
        } catch (err) {
          console.error("authorize error:", err);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
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
