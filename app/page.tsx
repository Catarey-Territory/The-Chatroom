'use client'

import { useEffect } from 'react'
import Block from "@/components/chat/Block"
import { PwaPrompt } from "@/components/PwaPrompt"
import { registerServiceWorker } from "@/lib/pwa"
import ErrorBoundary from "@/components/ui/error-boundary"

export default function Page() {
  useEffect(() => {
    registerServiceWorker()
  }, [])

  return (
    <>
      <ErrorBoundary>
        <Block />
      </ErrorBoundary>
      <PwaPrompt />
    </>
  )
}
