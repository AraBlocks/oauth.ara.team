//./auth.ts
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  // Use JWTs only—no database adapter:
  session: { strategy: "jwt" },

  // List the OAuth providers you’ve registered:
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  // If you want to inspect or pass through raw profile responses:
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.provider      = account.provider
        token.id            = profile.id
        token.email         = profile.email
        token.name          = profile.name
        token.picture       = profile.picture
        // If you need the raw ID token (e.g. from OIDC flows):
        token.rawIdToken    = account.id_token ?? null
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id:      token.id as string,
          name:    token.name as string,
          email:   token.email as string,
          image:   token.picture as string,
          provider: token.provider as string,
          rawIdToken: token.rawIdToken as string | null,
        }
      }
      return session
    },
  },

  // This secret signs your JWTs. In Production, set NEXTAUTH_SECRET in Cloudflare Pages.
  secret: process.env.AUTH_SECRET,
}

// Create a single handler instance; NextAuth will return an Edge‐compatible Response automatically.
const handler = NextAuth(authOptions)

// Destructure what you need for your Route Handler:
export const { handlers, signIn, signOut, auth } = handler
