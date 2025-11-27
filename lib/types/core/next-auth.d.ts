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
      companyId: number;
      isActive?: boolean;
    };
    accessToken: string;
    refreshToken: string;
  }

  interface User extends DefaultUser {
    role: string;
    companyId: number;
    isActive?: boolean;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    companyId: number;
    isActive?: boolean;
    accessToken: string;
    refreshToken: string;
  }
}
