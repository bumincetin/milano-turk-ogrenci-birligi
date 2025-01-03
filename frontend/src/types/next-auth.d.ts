import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      jwt: string;
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
} 