// filepath: sae-frontend/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/api/auth";

const handler = NextAuth(authOptions);

console.log("✅ NextAuth route loaded");

export const GET = handler;
export const POST = handler;
