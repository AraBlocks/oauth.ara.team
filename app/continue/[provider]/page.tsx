// app/continue/[provider]/page.tsx

"use client" // Marks this component as a React Client Component, enabling hooks like useEffect
export const runtime = "edge" // Tell Next.js that this page has to be an edge function for cloudflare, not Node

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { signIn } from "next-auth/react"

export default function ContinuePage() {
  const raw = useParams().provider // raw can be string | string[] | undefined
  const provider = Array.isArray(raw) ? raw[0] : raw

  useEffect(() => {
    if (provider) {
      // This will POST to /api/auth/signin/[provider], handle CSRF,
      // and redirect you to the provider’s consent page:
      signIn(provider)
    }
  }, [provider])

  // Render nothing (blank page)
  return null
}
