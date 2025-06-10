//this implementation is [next-auth] in [Next.js] deploying to [oauth.ara.team] ~ standard bearer

//this file is ./auth.ts
import NextAuth, {NextAuthConfig} from 'next-auth'//Auth.js's old name, still called NextAuth in npm and this code

import GoogleProvider  from 'next-auth/providers/google'
import TwitterProvider from 'next-auth/providers/twitter'

export const authOptions: NextAuthConfig = {

	session: {
		strategy: 'jwt'//not using any database, sessions are stateless JWTs in cookies
	},
	secret: process.env.AUTH_SECRET,//signed by this random string we generated

	providers: [
		GoogleProvider({}),//automatically brings in secrets named AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET
		TwitterProvider({}),
	],

	events: {
		async signIn({user, account, profile, isNewUser}) {//our proof of control trigger
			console.log("✅ User signed in:", user.email, "via", account.provider)
		},
	},

}

const handler = NextAuth(authOptions)//create our Auth.js (formerly NextAuth) handler instance to do OAuth for us, as we configured it above
export const {handlers, signIn, signOut, auth} = handler//and exports its endpoints to Next.js
