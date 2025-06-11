//in the [oauth.ara.team] [Next.js] repo using [next-auth], this is the file ./auth.ts

import NextAuth, {NextAuthConfig} from 'next-auth'//Auth.js's old name, still called NextAuth in npm and this code

import GoogleProvider  from 'next-auth/providers/google'
import TwitterProvider from 'next-auth/providers/twitter'

export const authOptions: NextAuthConfig = {
	providers: [
		GoogleProvider({}),//automatically brings in secrets named AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET
		TwitterProvider({}),
	],
	session: {
		strategy: 'jwt'//not using any database, sessions are stateless JWTs in cookies
	},
	secret: process.env.AUTH_SECRET,//signed by this random string we generated
	events: {
		async signIn({account, profile, user, isNewUser}) {//our proof of control trigger

			console.log('proof has arrived ✉️', JSON.stringify({account, profile, user}, null, 2))

		},
		/*
		we may add this later:
		async redirect({token, baseUrl, url}) {
			return url
		},
		*/
	},
}

const handler = NextAuth(authOptions)//create our Auth.js (formerly NextAuth) handler instance to do OAuth for us, as we configured it above
export const {handlers, signIn, signOut, auth} = handler//and exports its endpoints to Next.js
