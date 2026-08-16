import { useEffect, useState, type FormEvent } from 'react'
import { ArrowLeft, Pencil, Plus, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { hasSupabaseCredentials, supabase } from '../lib/supabase'

type Project = {
  id: string
  title: string
  slug: string
  description: string | null
  category: string | null
  live_url: string | null
  github_url: string | null
  cover_url: string | null
  is_published: boolean
  is_featured: boolean
}

type Draft = Omit<Project, 'id'>

const emptyDraft: Draft = { title: '', slug: '', description: '', category: 'Website', live_url: '', github_url: '', cover_url: '', is_published: false, is_featured: false }

export function Admin() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState<Project[]>([])
  const [draft, setDraft] = useState<Draft>(emptyDraft)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [pendingDelete, setPendingDelete] = useState<Project | null>(null)

  const loadProjects = async () => {
    if (!hasSupabaseCredentials) { setError('Добавь Supabase credentials в .env.local.'); setLoading(false); return }
    setLoading(true)
    const { data, error: queryError } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    if (queryError) setError(queryError.message)
    else setProjects((data ?? []) as Project[])
    setLoading(false)
  }

  useEffect(() => { void loadProjects() }, [])

  const updateDraft = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft(current => ({ ...current, [key]: value }))

  const saveProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSaving(true)
    const payload = { ...draft, description: draft.description || null, category: draft.category || null, live_url: draft.live_url || null, github_url: draft.github_url || null, cover_url: draft.cover_url || null }
    const { error: mutationError } = editingId
      ? await supabase.from('projects').update(payload).eq('id', editingId)
      : await supabase.from('projects').insert(payload)
    setSaving(false)
    if (mutationError) { setError(mutationError.message); return }
    setDraft(emptyDraft)
    setEditingId(null)
    void loadProjects()
  }

  const editProject = (project: Project) => {
    const { id, ...nextDraft } = project
    setEditingId(id)
    setDraft({ ...emptyDraft, ...nextDraft })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteProject = async () => {
    if (!pendingDelete) return
    const { error: deleteError } = await supabase.from('projects').delete().eq('id', pendingDelete.id)
    if (deleteError) setError(deleteError.message)
    else void loadProjects()
    setPendingDelete(null)
  }

  const signOut = async () => { await supabase.auth.signOut(); navigate('/login', { replace: true }) }

  return (
    <main className="page-root min-h-screen p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-center justify-between border-b border-current/20 pb-4"><div><p className="page-muted font-mono text-[10px] uppercase">Portfolio CMS</p><h1 className="mt-2 text-4xl font-semibold tracking-[-.08em]">Admin panel.</h1></div><div className="flex gap-2"><button onClick={() => navigate('/')} className="rounded-lg border border-current/20 p-2.5" title="Back to portfolio"><ArrowLeft size={16} /></button><button onClick={signOut} className="rounded-lg border border-current/20 px-3 text-xs font-semibold">Sign out</button></div></header>
        {error && <p role="alert" className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-500">{error}</p>}
        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <section className="rounded-xl border border-current/20 p-5"><div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-semibold tracking-[-.05em]">{editingId ? 'Edit project' : 'New project'}</h2>{editingId && <button onClick={() => { setEditingId(null); setDraft(emptyDraft) }} className="text-xs underline">Cancel</button>}</div><form onSubmit={saveProject} className="space-y-3"><Field label="Title" value={draft.title} onChange={value => updateDraft('title', value)} required /><Field label="Slug" value={draft.slug} onChange={value => updateDraft('slug', value)} required /><label className="block text-xs font-semibold">Description<textarea className="admin-input mt-1 min-h-24 resize-y" value={draft.description ?? ''} onChange={event => updateDraft('description', event.target.value)} /></label><label className="block text-xs font-semibold">Category<select className="admin-input mt-1" value={draft.category ?? ''} onChange={event => updateDraft('category', event.target.value)}><option>Website</option><option>App</option><option>Landing</option><option>Experimental</option></select></label><Field label="Live demo URL" type="url" value={draft.live_url ?? ''} onChange={value => updateDraft('live_url', value)} /><Field label="GitHub URL" type="url" value={draft.github_url ?? ''} onChange={value => updateDraft('github_url', value)} /><Field label="Cover URL" type="url" value={draft.cover_url ?? ''} onChange={value => updateDraft('cover_url', value)} /><div className="flex gap-4 pt-1"><Toggle label="Published" checked={draft.is_published} onChange={checked => updateDraft('is_published', checked)} /><Toggle label="Featured" checked={draft.is_featured} onChange={checked => updateDraft('is_featured', checked)} /></div><button className="page-fg-bg mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold disabled:opacity-50" disabled={saving} type="submit"><Plus size={15} />{saving ? 'Saving…' : editingId ? 'Save changes' : 'Add project'}</button></form></section>
          <section><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-semibold tracking-[-.05em]">Projects</h2><span className="page-muted font-mono text-[10px]">{projects.length} total</span></div>{loading ? <p className="page-muted font-mono text-xs">Loading projects…</p> : <div className="space-y-2">{projects.map(project => <article key={project.id} className="flex items-center justify-between gap-4 rounded-xl border border-current/20 p-4"><div className="min-w-0"><p className="truncate text-sm font-semibold">{project.title}</p><p className="page-muted mt-1 truncate font-mono text-[10px]">/{project.slug} · {project.category || 'Uncategorized'}</p></div><div className="flex shrink-0 gap-2"><button onClick={() => editProject(project)} className="grid size-8 place-items-center rounded-lg border border-current/20" aria-label={`Edit ${project.title}`}><Pencil size={14} /></button><button onClick={() => setPendingDelete(project)} className="grid size-8 place-items-center rounded-lg border border-red-500/30 text-red-500" aria-label={`Delete ${project.title}`}><Trash2 size={14} /></button></div></article>)}{!projects.length && <p className="page-muted rounded-xl border border-current/20 p-5 text-sm">No projects yet.</p>}</div>}</section>
        </div>
      </div>
      {pendingDelete && <div className="fixed inset-0 z-[100] grid place-items-center bg-black/50 p-4"><div className="w-full max-w-sm rounded-xl bg-[#f0f0ec] p-5 text-[#111111] shadow-2xl"><h2 className="text-xl font-semibold tracking-[-.05em]">Точно удалить?</h2><p className="mt-2 text-sm text-black/60">Проект «{pendingDelete.title}» будет удалён без возможности восстановления.</p><div className="mt-6 flex justify-end gap-2"><button onClick={() => setPendingDelete(null)} className="rounded-lg border border-black/20 px-3 py-2 text-xs font-semibold">Cancel</button><button onClick={deleteProject} className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white">Delete</button></div></div></div>}
    </main>
  )
}

function Field({ label, value, onChange, type = 'text', required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return <label className="block text-xs font-semibold">{label}<input className="admin-input mt-1" type={type} value={value} onChange={event => onChange(event.target.value)} required={required} /></label>
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className="flex items-center gap-2 text-xs font-semibold"><input type="checkbox" checked={checked} onChange={event => onChange(event.target.checked)} />{label}</label>
}
