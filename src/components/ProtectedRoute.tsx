import { useEffect, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setAuthenticated(Boolean(data.session))
      setLoading(false)
    }).catch(() => {
      if (mounted) setLoading(false)
    })

    return () => { mounted = false }
  }, [])

  if (loading) return <main className="page-root grid min-h-screen place-items-center font-mono text-xs">Checking session…</main>
  if (!authenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}
