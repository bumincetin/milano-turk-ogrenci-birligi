import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Özel tip tanımlamaları
declare module "next-auth" {
  interface User {
    id: string;
    name: string | null;
    email: string | null;
    jwt: string;
    image?: string | null;
  }

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

declare module "next-auth/jwt" {
  interface JWT {
    jwt: string;
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              identifier: credentials?.email,
              password: credentials?.password,
            }),
          })

          const data = await res.json()

          if (data.jwt) {
            return {
              id: data.user.id,
              name: data.user.username || null,
              email: data.user.email || null,
              jwt: data.jwt,
              image: null
            }
          }

          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = user.jwt;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          jwt: token.jwt,
          id: token.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image
        }
      };
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/giris',
    error: '/giris',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions) 