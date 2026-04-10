import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { streamMessage, type ChatMessage } from '../services/chat'
import { saveMessage } from '../services/chatStorage'
import { useAuth } from '../context/AuthContext'

// ─── Types ─────────────────────────────────────────────────────────────────
interface Conversation {
  id: string
  title: string
  messages: ChatMessage[]
  updatedAt: Date
}

interface PetState {
  id: string
  pet_name: string
  pet_type: string
  pet_age?: number | null
  pet_breed?: string | null
}

function newConversation(): Conversation {
  return { id: crypto.randomUUID(), title: 'שיחה חדשה', messages: [], updatedAt: new Date() }
}

// ─── Icons ─────────────────────────────────────────────────────────────────
const IconEdit  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
const IconChat  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
const IconSend  = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
const IconMenu  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
const IconTrash = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>

// ─── Sidebar ────────────────────────────────────────────────────────────────
interface SidebarProps {
  open: boolean
  onClose: () => void
  conversations: Conversation[]
  activeId: string
  onSelect: (id: string) => void
  onNew: () => void
  onDelete: (id: string) => void
  petName?: string
}

const Sidebar: React.FC<SidebarProps> = ({
  open, onClose, conversations, activeId, onSelect, onNew, onDelete, petName
}) => (
  <>
    {open && (
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden" onClick={onClose} />
    )}
    <aside
      className={`
        fixed top-0 bottom-0 left-0 z-50 w-[260px] flex flex-col
        bg-[var(--sidebar-bg)] border-r border-[var(--border)]
        transition-transform duration-250 ease-out
        lg:relative lg:translate-x-0 lg:z-auto lg:flex-shrink-0
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="flex items-center justify-between px-4 h-14 border-b border-[var(--border)] flex-shrink-0">
        <span className="text-sm font-semibold text-[var(--text-primary)]">🐾 Mipo</span>
        <button
          onClick={onNew}
          className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)] px-2 py-1.5 rounded-lg transition-colors"
        >
          <IconEdit /> חדש
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2 px-2">
        {petName && (
          <div className="px-3 py-1.5 mb-1">
            <span className="text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              שיחות על {petName}
            </span>
          </div>
        )}
        {conversations.length === 0 ? (
          <p className="text-center text-xs text-[var(--text-tertiary)] py-8">אין שיחות עדיין</p>
        ) : (
          conversations.map(conv => (
            <div
              key={conv.id}
              className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                activeId === conv.id
                  ? 'bg-[var(--active-bg)] text-[var(--text-primary)]'
                  : 'hover:bg-[var(--hover-bg)] text-[var(--text-secondary)]'
              }`}
              onClick={() => { onSelect(conv.id); onClose() }}
            >
              <IconChat />
              <span className="flex-1 text-sm truncate">{conv.title}</span>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(conv.id) }}
                className="opacity-0 group-hover:opacity-100 text-[var(--text-tertiary)] hover:text-red-500 transition-all p-0.5 rounded"
              >
                <IconTrash />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="px-4 py-3 border-t border-[var(--border)] flex-shrink-0">
        <p className="text-[11px] text-[var(--text-tertiary)]">Mipo לא מחליף ייעוץ וטרינרי</p>
      </div>
    </aside>
  </>
)

// ─── Message bubble ─────────────────────────────────────────────────────────
const Message: React.FC<{ msg: ChatMessage; isLatest?: boolean }> = ({ msg, isLatest }) => {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex gap-3 w-full ${isUser ? 'justify-end' : 'justify-start'} ${isLatest ? 'animate-[fadeSlideUp_0.2s_ease-out]' : ''}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center text-xs flex-shrink-0 mt-0.5 text-white font-bold">
          M
        </div>
      )}
      <div
        className={`max-w-[80%] sm:max-w-[72%] text-sm leading-[1.65] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-[var(--user-bubble)] text-white rounded-br-sm'
            : 'bg-[var(--assistant-bubble)] text-[var(--text-primary)] rounded-bl-sm border border-[var(--border)]'
        }`}
        dir="auto"
      >
        {msg.content || (
          <span className="inline-flex gap-1 items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:0.15s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:0.3s]" />
          </span>
        )}
      </div>
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-[var(--muted-bg)] flex items-center justify-center text-xs flex-shrink-0 mt-0.5 border border-[var(--border)]">
          👤
        </div>
      )}
    </div>
  )
}

// ─── Empty / welcome ────────────────────────────────────────────────────────
const WelcomeView: React.FC<{ petName?: string }> = ({ petName }) => (
  <div className="flex flex-col items-center justify-center h-full gap-8 px-6 text-center">
    <div className="w-14 h-14 rounded-2xl bg-[var(--accent)] flex items-center justify-center text-2xl shadow-sm">
      🐾
    </div>
    <div className="space-y-2">
      <h2 className="text-xl font-semibold text-[var(--text-primary)]">היי, אני Mipo!</h2>
      <p className="text-sm text-[var(--text-secondary)] max-w-sm leading-relaxed">
        {petName
          ? `אני כאן לעזור לך עם כל שאלה על ${petName}.`
          : 'שאל אותי כל שאלה על חיית המחמד שלך.'}
      </p>
    </div>
    <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
      {[
        'איך לדעת אם הכלב שלי שמח?',
        'כמה פעמים ליום להאכיל?',
        'מה לעשות אם הוא לא ישן?',
        'איזה צעצוע מתאים?',
      ].map(q => (
        <button
          key={q}
          data-suggestion={q}
          className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--muted-bg)] hover:bg-[var(--hover-bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-right transition-colors leading-relaxed"
        >
          {q}
        </button>
      ))}
    </div>
  </div>
)

// ─── Main ───────────────────────────────────────────────────────────────────
export const ChatPage: React.FC = () => {
  const { petId } = useParams<{ petId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  const pet = (location.state as { pet?: PetState } | null)?.pet
  const petName = pet?.pet_name
  const petType = pet?.pet_type

  const [conversations, setConversations] = useState<Conversation[]>([newConversation()])
  const [activeId,      setActiveId]      = useState(conversations[0].id)
  const [input,         setInput]         = useState('')
  const [streaming,     setStreaming]     = useState(false)
  const [sidebarOpen,   setSidebarOpen]   = useState(false)
  const [error,         setError]         = useState<string | null>(null)
  const [darkMode,      setDarkMode]      = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  const bottomRef  = useRef<HTMLDivElement>(null)
  const inputRef   = useRef<HTMLTextAreaElement>(null)
  const abortRef   = useRef(false)

  const activeConv = conversations.find(c => c.id === activeId) ?? conversations[0]

  const tokens = darkMode ? {
    '--bg':               '#0f0f0f',
    '--sidebar-bg':       '#161616',
    '--border':           'rgba(255,255,255,0.07)',
    '--hover-bg':         'rgba(255,255,255,0.06)',
    '--active-bg':        'rgba(255,255,255,0.10)',
    '--muted-bg':         '#1e1e1e',
    '--text-primary':     '#f2f2f2',
    '--text-secondary':   '#9a9a9a',
    '--text-tertiary':    '#5a5a5a',
    '--accent':           '#0099E6',
    '--user-bubble':      '#0077BB',
    '--assistant-bubble': '#1e1e1e',
    '--input-bg':         '#1a1a1a',
    '--input-border':     'rgba(255,255,255,0.10)',
    '--input-ring':       'rgba(0,153,230,0.4)',
  } : {
    '--bg':               '#ffffff',
    '--sidebar-bg':       '#f9f9f9',
    '--border':           'rgba(0,0,0,0.07)',
    '--hover-bg':         'rgba(0,0,0,0.04)',
    '--active-bg':        'rgba(0,0,0,0.07)',
    '--muted-bg':         '#f3f4f6',
    '--text-primary':     '#111111',
    '--text-secondary':   '#6b7280',
    '--text-tertiary':    '#9ca3af',
    '--accent':           '#0099E6',
    '--user-bubble':      '#0099E6',
    '--assistant-bubble': '#f9fafb',
    '--input-bg':         '#ffffff',
    '--input-border':     'rgba(0,0,0,0.10)',
    '--input-ring':       'rgba(0,153,230,0.35)',
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConv.messages])

  useEffect(() => {
    const h = (e: MouseEvent) => {
      const q = (e.target as HTMLElement).dataset.suggestion
      if (q) { setInput(q); inputRef.current?.focus() }
    }
    document.addEventListener('click', h)
    return () => document.removeEventListener('click', h)
  }, [])

  const updateConversation = useCallback((id: string, updater: (c: Conversation) => Conversation) => {
    setConversations(prev => prev.map(c => c.id === id ? updater(c) : c))
  }, [])

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || streaming) return

    setError(null)
    setInput('')
    setStreaming(true)
    abortRef.current = false

    const userMsg: ChatMessage = { role: 'user', content: trimmed }
    const prevMessages = activeConv.messages
    const next = [...prevMessages, userMsg]

    const isFirst = prevMessages.length === 0
    updateConversation(activeId, c => ({
      ...c,
      title: isFirst ? trimmed.slice(0, 40) : c.title,
      messages: [...next, { role: 'assistant', content: '' }],
      updatedAt: new Date(),
    }))

    // שמור הודעת משתמש ל-DB
    if (user) {
      saveMessage(userMsg, { userId: user.id, petId, conversationId: activeId })
    }

    try {
      let full = ''
      for await (const delta of streamMessage(next, { petName, petType })) {
        if (abortRef.current) break
        full += delta
        updateConversation(activeId, c => ({
          ...c,
          messages: [...next, { role: 'assistant', content: full }],
        }))
      }
      // שמור תשובת assistant ל-DB
      if (user && full) {
        saveMessage({ role: 'assistant', content: full }, { userId: user.id, petId, conversationId: activeId })
      }
    } catch (err: any) {
      setError(err.message)
      updateConversation(activeId, c => ({ ...c, messages: next }))
    } finally {
      setStreaming(false)
    }
  }, [activeConv.messages, activeId, streaming, petName, petType, updateConversation])

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) }
  }

  const createNew = () => {
    const c = newConversation()
    setConversations(prev => [c, ...prev])
    setActiveId(c.id)
  }

  const deleteConv = (id: string) => {
    setConversations(prev => {
      const next = prev.filter(c => c.id !== id)
      if (id === activeId && next.length > 0) setActiveId(next[0].id)
      if (next.length === 0) { const c = newConversation(); setActiveId(c.id); return [c] }
      return next
    })
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ ...(tokens as React.CSSProperties), background: 'var(--bg)', fontFamily: 'system-ui, -apple-system, sans-serif' } as React.CSSProperties}
      dir="rtl"
    >
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
        onNew={createNew}
        onDelete={deleteConv}
        petName={petName}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        <header className="flex items-center gap-3 px-4 h-14 border-b flex-shrink-0" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg transition-colors lg:hidden"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--hover-bg)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <IconMenu />
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            ← חזרה
          </button>
          <div className="flex-1 text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
            {petName ? `Mipo — ${petName}` : 'Mipo AI'}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs mr-1" style={{ color: 'var(--text-tertiary)' }}>
              {streaming ? '⏳' : ''}
            </span>
            <button
              onClick={() => setDarkMode(d => !d)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              title="החלף מצב תצוגה"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto" style={{ background: 'var(--bg)' }}>
          <div className="max-w-[768px] mx-auto px-4 py-6">
            {activeConv.messages.length === 0 ? (
              <WelcomeView petName={petName} />
            ) : (
              <div className="flex flex-col gap-4">
                {activeConv.messages.map((m, i) => (
                  <Message key={i} msg={m} isLatest={i === activeConv.messages.length - 1} />
                ))}
              </div>
            )}
            {error && (
              <p className="text-center text-xs mt-4" style={{ color: '#ef4444' }}>{error}</p>
            )}
            <div ref={bottomRef} className="h-4" />
          </div>
        </div>

        <div className="flex-shrink-0 border-t px-4 py-4" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
          <div className="max-w-[768px] mx-auto">
            <div
              className="flex items-end gap-2 rounded-xl border px-4 py-3 transition-all duration-200"
              style={{ background: 'var(--input-bg)', borderColor: 'var(--input-border)' }}
              onFocusCapture={e => (e.currentTarget.style.boxShadow = '0 0 0 3px var(--input-ring)')}
              onBlurCapture={e  => (e.currentTarget.style.boxShadow = 'none')}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={`שאל על ${petName ?? 'חיית המחמד שלך'}...`}
                rows={1}
                disabled={streaming}
                className="flex-1 resize-none bg-transparent text-sm outline-none py-0.5 max-h-32 leading-relaxed"
                style={{
                  color:       'var(--text-primary)',
                  caretColor:  'var(--accent)',
                  fieldSizing: 'content',
                } as React.CSSProperties}
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || streaming}
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all text-white"
                style={{
                  background: input.trim() && !streaming ? 'var(--accent)' : 'var(--muted-bg)',
                  color: input.trim() && !streaming ? 'white' : 'var(--text-tertiary)',
                  cursor: input.trim() && !streaming ? 'pointer' : 'not-allowed',
                }}
              >
                {streaming ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <IconSend />
                )}
              </button>
            </div>
            <p className="text-center text-[10px] mt-2" style={{ color: 'var(--text-tertiary)' }}>
              Mipo לא מחליף ייעוץ וטרינרי מקצועי · Enter לשליחה
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
