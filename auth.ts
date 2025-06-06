//./auth.ts
import NextAuth, { NextAuthConfig } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthConfig = {
  // Use JWTs only—no database adapter:
  session: { strategy: "jwt" },

  // List the OAuth providers you’ve registered:
  providers: [
    GoogleProvider({}),//automatically brings in secrets named AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET
  ],

  //soon, we'll have a callbacks property here to define custom methods like jwt(), but not yet

  // This secret signs your JWTs. In Production, set NEXTAUTH_SECRET in Cloudflare Pages.
  secret: process.env.AUTH_SECRET,
}

// Create a single handler instance; NextAuth will return an Edge‐compatible Response automatically.
const handler = NextAuth(authOptions)

// Destructure what you need for your Route Handler:
export const { handlers, signIn, signOut, auth } = handler
