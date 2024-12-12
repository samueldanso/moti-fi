import { useState } from "react"

interface UseAgentProps {
  onError?: (error: Error) => void
}

export function useAgent({ onError }: UseAgentProps = {}) {
  const [isLoading, setIsLoading] = useState(false)

  async function sendMessage(message: string) {
    try {
      setIsLoading(true)
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })

      const data = await response.json()
      return data
    } catch (error) {
      onError?.(error as Error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    sendMessage,
    isLoading,
  }
}
