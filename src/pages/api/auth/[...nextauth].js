// src/pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // 1) Lookup the user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        // 2) If no user or no password match, reject
        if (!user) {
          return null
        }
        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )
        if (!isValid) {
          return null
        }

        // 3) Remove sensitive fields before returning
        const { hashedPassword, ...safeUser } = user
        return safeUser
      }
    })
  ],

  session: {
    strategy: 'jwt',
    maxAge: 10 * 60,    // expire after 10 minutes
    updateAge: 5 * 60   // refresh session every 5 minutes
  },

  callbacks: {
    async jwt({ token, user }) {
      // On sign-in, attach user data to token
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      // Make token.user available on the client
      session.user = token.user
      return session
    }
  },

  pages: {
    // Optional: custom signIn page
    signIn: '/login'
  },

  secret: process.env.NEXTAUTH_SECRET
})
