// filepath: sae-frontend/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
  }

  interface User extends DefaultUser {
    role: string;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    accessToken: string;
    refreshToken: string;
  }
}
