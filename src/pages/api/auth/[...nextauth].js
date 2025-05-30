// src/pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      // You can call this “Login with Email & Password”
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // ─── STUB (no database yet) ──────────────────────────────────
        // “credentials” is an object: { email: '...', password: '...' }
        // Here we hard-code one valid user. Anyone else fails.
        if (
          credentials.email === 'demo@demo.com' &&
          credentials.password === 'demo'
        ) {
          // Return any object. Its properties go into the session.
          return { id: 1, name: 'Demo User', email: 'demo@demo.com' }
        }
        // Return null => sign-in fails
        return null
      }
    })
  ],

  // ─── SESSION SETTINGS ─────────────────────────────────────────
  session: {
    strategy: 'jwt',        // use JSON Web Tokens
    maxAge: 10 * 60,        // session expires after 10 minutes (600 seconds)
    updateAge: 5 * 60       // refresh JWT every 5 minutes
  },

  // ─── CALLBACKS TO SHAPE THE TOKEN & SESSION ──────────────────
  callbacks: {
    async jwt({ token, user }) {
      // On initial sign-in, “user” is the object returned by authorize()
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      // Expose token.user on the client via useSession()
      session.user = token.user
      return session
    }
  },

  // ─── SECURITY ─────────────────────────────────────────────────
  // You MUST set this in .env.local in your project root:
  secret: process.env.NEXTAUTH_SECRET
})
