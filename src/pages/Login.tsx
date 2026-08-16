import { useState, type FormEvent } from 'react'
import { ArrowUpRight, LockKeyhole } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { hasSupabaseCredentials, supabase } from '../lib/supabase'

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    if (!hasSupabaseCredentials) {
      setError('Добавь VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY в .env.local.')
      return
    }

    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (authError) {
      setError(authError.message.toLowerCase().includes('rate') ? 'Слишком много попыток. Попробуй позже.' : 'Неверный email или пароль.')
      return
    }
    navigate('/admin', { replace: true })
  }

  return (
    <main className="page-root grid min-h-screen place-items-center p-4">
      <section className="w-full max-w-md rounded-xl border border-current/20 p-5 sm:p-7">
        <div className="flex items-start justify-between"><div><p className="page-muted font-mono text-[10px] uppercase">Magomed / Admin</p><h1 className="mt-3 text-3xl font-semibold tracking-[-.07em]">Welcome back.</h1></div><span className="page-fg-bg grid size-9 place-items-center rounded-full"><LockKeyhole size={15} /></span></div>
        <form className="mt-9 space-y-4" onSubmit={signIn}>
          <label className="block text-xs font-semibold">Email<input className="mt-2 w-full rounded-lg border border-current/20 bg-transparent px-3 py-3 outline-none transition focus:border-current" type="email" value={email} onChange={event => setEmail(event.target.value)} required autoComplete="email" /></label>
          <label className="block text-xs font-semibold">Password<input className="mt-2 w-full rounded-lg border border-current/20 bg-transparent px-3 py-3 outline-none transition focus:border-current" type="password" value={password} onChange={event => setPassword(event.target.value)} required autoComplete="current-password" /></label>
          {error && <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-500">{error}</p>}
          <button className="page-fg-bg flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold transition hover:opacity-80 disabled:opacity-50" type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'} <ArrowUpRight size={16} /></button>
          <button className="w-full cursor-not-allowed rounded-lg border border-current/15 px-3 py-3 text-xs font-semibold opacity-45" type="button" disabled>Registration disabled</button>
        </form>
      </section>
    </main>
  )
}
