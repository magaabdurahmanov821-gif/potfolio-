"use client"

import { useRef, useState } from 'react'
import { playClick, playKeypress } from '../../lib/sound'

type CommandLine = { id: number; command: string; response: 'help' | 'skills' | 'contact' | 'about' | 'sudo' | 'unknown' }

const prompt = 'magomed@portfolio:~$'

export function TerminalWidget() {
  const [lines, setLines] = useState<CommandLine[]>([])
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const submit = () => {
    const command = value.trim().toLowerCase()
    if (!command) return
    playClick()
    setValue('')
    if (command === 'clear') {
      setLines([])
      return
    }
    const response = ['help', 'skills', 'contact', 'about', 'sudo'].includes(command) ? command as CommandLine['response'] : 'unknown'
    setLines(current => [...current, { id: Date.now(), command, response }])
  }

  return (
    <section className="terminal-widget" aria-label="Interactive terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-titlebar"><span className="terminal-dots"><i /><i /><i /></span><span>magomed@portfolio:~</span></div>
      <div className="terminal-screen">
        <p className="terminal-intro">Type <b>help</b> to explore.</p>
        {lines.map(line => <div className="terminal-line" key={line.id}><p><span className="terminal-prompt">{prompt}</span> {line.command}</p><TerminalResponse response={line.response} command={line.command} /></div>)}
        <label className="terminal-entry"><span className="terminal-prompt">{prompt}</span><input ref={inputRef} value={value} onChange={event => { setValue(event.target.value); playKeypress() }} onKeyDown={event => { if (event.key === 'Enter') submit() }} aria-label="Terminal command" autoComplete="off" spellCheck="false" /></label>
      </div>
    </section>
  )
}

function TerminalResponse({ response, command }: Pick<CommandLine, 'response' | 'command'>) {
  if (response === 'help') return <p className="terminal-response">Available: <b>skills</b>, <b>contact</b>, <b>about</b>, <b>clear</b>, <b>sudo</b></p>
  if (response === 'skills') return <p className="terminal-response">Next.js · React · Tailwind · Node.js · Supabase · PostgreSQL</p>
  if (response === 'contact') return <p className="terminal-response">Telegram: <a href="https://t.me/mbronsonx" target="_blank" rel="noreferrer">@mbronsonx</a><br />GitHub: <a href="https://github.com/mbronsonx" target="_blank" rel="noreferrer">github.com/mbronsonx</a><br />Email: <a href="mailto:hello@magomed.dev">hello@magomed.dev</a></p>
  if (response === 'about') return <p className="terminal-response">Fullstack &amp; Creative Developer. Создаю быстрые и нестандартные веб-продукты.</p>
  if (response === 'sudo') return <p className="terminal-response">Access denied: Nice try 😉</p>
  return <p className="terminal-response">command not found: {command}. Try <b>help</b>.</p>
}
