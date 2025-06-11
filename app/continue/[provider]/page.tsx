//in the [oauth.ara.team] [Next.js] repo using [next-auth], this is the file ./app/continue/[provider]/page.tsx

'use client'//mark this component as a React Client Component so we can use React hooks like useEffect
export const runtime = 'edge'//tell Next.js that this page has to be an edge function for Cloudflare, not Node

import {useEffect} from 'react'
import {useParams} from 'next/navigation'
import {signIn} from 'next-auth/react'

export default function ContinuePage() {
	const p = useParams().provider//p can be string | string[] | undefined
	const provider = Array.isArray(p) ? p[0] : p

	useEffect(() => {
		if (provider) {
			signIn(provider, {callbackUrl: '/'})
		}
	}, [provider])

	return null//render nothing, a blank page
}
