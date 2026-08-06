import { useEffect, useState } from 'react'
import './App.css'

type HealthState =
  | { status: 'loading' }
  | { status: 'ok'; timestamp: string }
  | { status: 'error'; message: string }

type HealthResponse = {
  status: string
  timestamp: string
}

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3003'

function App() {
  const [health, setHealth] = useState<HealthState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    async function ping() {
      try {
        const response = await fetch(`${apiUrl}/health`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = (await response.json()) as HealthResponse

        if (data.status !== 'ok' || typeof data.timestamp !== 'string') {
          throw new Error('Unexpected health response')
        }

        setHealth({ status: 'ok', timestamp: data.timestamp })
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }

        const message =
          error instanceof Error ? error.message : 'Failed to reach API'

        setHealth({ status: 'error', message })
      }
    }

    void ping()

    return () => controller.abort()
  }, [])

  return (
    <main className="page">
      <h1 className="brand">PulseDesk</h1>
      <p className="subtitle">Team task tracker — web skeleton</p>

      <section className="status" aria-live="polite">
        <h2>API status</h2>

        {health.status === 'loading' && <p className="muted">Checking…</p>}

        {health.status === 'ok' && (
          <p className="ok">
            ok
            <span className="muted"> · {health.timestamp}</span>
          </p>
        )}

        {health.status === 'error' && (
          <p className="error">
            unreachable
            <span className="muted"> · {health.message}</span>
          </p>
        )}

        <p className="endpoint muted">{apiUrl}/health</p>
      </section>
    </main>
  )
}

export default App
