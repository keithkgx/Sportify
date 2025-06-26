import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;
        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isValid) return null;
        // Strip out the password then return everything else, including id
        const { hashedPassword, ...safeUser } = user;
        return safeUser;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 10 * 60,
    updateAge: 5 * 60,
  },
  callbacks: {
    // 1️⃣ When first signing in, grab the `user` object (safeUser) and stuff its fields into the token:
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        // ...you can add other fields if you like
      }
      return token;
    },
    // 2️⃣ Whenever a session is checked (including getServerSession & useSession),
    // put that `id` onto session.user so you can read it on the client and server
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
