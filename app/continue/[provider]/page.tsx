// app/continue/[provider]/page.tsx
"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { signIn } from "next-auth/react"

export default function ContinuePage() {
  const { provider } = useParams()

  useEffect(() => {
    if (provider) {
      // This will POST to /api/auth/signin/[provider], handle CSRF,
      // and redirect you to the provider’s consent page:
      signIn(provider)
    }
  }, [provider])

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <p>Redirecting you to {provider?.toUpperCase()}…</p>
    </div>
  )
}
