import React, { useState, useRef, useEffect, useCallback } from 'react'
import { streamMessage, type ChatMessage } from '../services/chat'

// ─── Walking pet animation (SVG dog) ──────────────────────────────────────────
const WalkingPet: React.FC<{ typing: boolean }> = ({ typing }) => (
  <div
    className={`flex items-end justify-center transition-all duration-500 ${
      typing ? 'opacity-100' : 'opacity-0 translate-y-1'
    }`}
    style={{ height: 44 }}
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 80 44"
      width="80"
      height="44"
      className={typing ? 'animate-[walk_0.5s_ease-in-out_infinite_alternate]' : ''}
    >
      <style>{`
        @keyframes walk {
          from { transform: translateX(-4px) rotate(-2deg); }
          to   { transform: translateX(4px)  rotate(2deg); }
        }
        @keyframes tail {
          from { transform-origin: 62px 22px; transform: rotate(-15deg); }
          to   { transform-origin: 62px 22px; transform: rotate(15deg); }
        }
        .tail { animation: tail 0.4s ease-in-out infinite alternate; }
      `}</style>
      <defs>
        <linearGradient id="dog-g" x1="0" y1="0" x2="80" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#C47B5A" />
          <stop offset="60%"  stopColor="#9B6BAE" />
          <stop offset="100%" stopColor="#4A90C4" />
        </linearGradient>
      </defs>
      {/* גוף */}
      <ellipse cx="38" cy="26" rx="20" ry="12" fill="url(#dog-g)" opacity="0.9"/>
      {/* ראש */}
      <circle cx="20" cy="20" r="10" fill="url(#dog-g)" opacity="0.95"/>
      {/* אוזן */}
      <ellipse cx="14" cy="13" rx="5" ry="7" fill="#9B6BAE" opacity="0.8" transform="rotate(-15 14 13)"/>
      {/* עיניים */}
      <circle cx="17" cy="19" r="1.8" fill="white"/>
      <circle cx="17.5" cy="19.3" r="0.9" fill="#3d2a1e"/>
      {/* אף */}
      <ellipse cx="11" cy="23" rx="2.5" ry="1.5" fill="#3d2a1e" opacity="0.7"/>
      {/* רגליים — מונפשות */}
      <rect x="24" y="35" width="5" height="8" rx="2.5" fill="url(#dog-g)" opacity="0.85"
        style={{ transformOrigin:'26px 35px', animation: typing ? 'walk 0.5s 0.1s ease-in-out infinite alternate' : 'none' }}/>
      <rect x="33" y="35" width="5" height="8" rx="2.5" fill="url(#dog-g)" opacity="0.85"
        style={{ transformOrigin:'35px 35px', animation: typing ? 'walk 0.5s 0.25s ease-in-out infinite alternate' : 'none' }}/>
      <rect x="43" y="35" width="5" height="8" rx="2.5" fill="url(#dog-g)" opacity="0.85"
        style={{ transformOrigin:'45px 35px', animation: typing ? 'walk 0.5s ease-in-out infinite alternate' : 'none' }}/>
      <rect x="52" y="35" width="5" height="8" rx="2.5" fill="url(#dog-g)" opacity="0.85"
        style={{ transformOrigin:'54px 35px', animation: typing ? 'walk 0.5s 0.15s ease-in-out infinite alternate' : 'none' }}/>
      {/* זנב */}
      <path className="tail" d="M58 22 Q70 10 72 18" stroke="url(#dog-g)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    </svg>
  </div>
)

// ─── Bubble ───────────────────────────────────────────────────────────────────
const Bubble: React.FC<{ msg: ChatMessage; isNew?: boolean }> = ({ msg, isNew }) => {
  const isUser = msg.role === 'user'
  return (
    <div
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} ${
        isNew ? 'animate-[fadeUp_0.25s_ease-out]' : ''
      }`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 mr-2 mt-0.5
          bg-gradient-to-br from-purple-400 to-fuchsia-400 shadow-md shadow-purple-200">
          🐾
        </div>
      )}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white rounded-br-md shadow-md shadow-purple-200/60'
            : 'bg-white border border-purple-100 text-gray-700 rounded-bl-md shadow-sm shadow-purple-50/80'
        }`}
        dir="auto"
      >
        {msg.content || <span className="inline-flex gap-1"><span className="animate-bounce">·</span><span className="animate-bounce [animation-delay:0.15s]">·</span><span className="animate-bounce [animation-delay:0.3s]">·</span></span>}
      </div>
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────
const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full gap-6 pb-8 text-center px-6">
    <div className="relative">
      <div className="absolute inset-0 rounded-full blur-2xl opacity-30 scale-150 bg-[radial-gradient(ellipse_at_center,_#9B6BAE,_#4A90C4)]" />
      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-400 flex items-center justify-center text-4xl shadow-xl shadow-purple-200">
        🐾
      </div>
    </div>
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">היי, אני Mipo!</h2>
      <p className="text-gray-500 text-sm max-w-xs">
        החבר הדיגיטלי של חיית המחמד שלך. שאל אותי כל שאלה — על אכילה, התנהגות, בריאות ועוד.
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
          className="text-xs text-purple-600 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl px-3 py-2 text-right transition-colors"
          data-suggestion={q}
        >
          {q}
        </button>
      ))}
    </div>
  </div>
)

// ─── Main ChatPage ─────────────────────────────────────────────────────────────
interface ChatPageProps {
  petName?: string;
  petType?: string;
  onBack?: () => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({ petName, petType, onBack }) => {
  const [messages,  setMessages]  = useState<ChatMessage[]>([])
  const [input,     setInput]     = useState('')
  const [streaming, setStreaming] = useState(false)
  const [focused,   setFocused]   = useState(false)
  const [error,     setError]     = useState<string | null>(null)

  const bottomRef   = useRef<HTMLDivElement>(null)
  const inputRef    = useRef<HTMLTextAreaElement>(null)
  const abortRef    = useRef<boolean>(false)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // suggestion chips
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const q = t.dataset.suggestion
      if (q) { setInput(q); inputRef.current?.focus() }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || streaming) return

    setError(null)
    const userMsg: ChatMessage = { role: 'user', content: trimmed }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setStreaming(true)
    abortRef.current = false

    // placeholder for streaming reply
    setMessages(m => [...m, { role: 'assistant', content: '' }])

    try {
      let full = ''
      for await (const delta of streamMessage(next, { petName, petType })) {
        if (abortRef.current) break
        full += delta
        setMessages(m => {
          const copy = [...m]
          copy[copy.length - 1] = { role: 'assistant', content: full }
          return copy
        })
      }
    } catch (err: any) {
      setError(err.message)
      setMessages(m => m.slice(0, -1)) // הסר placeholder
    } finally {
      setStreaming(false)
    }
  }, [messages, streaming, petName, petType])

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white relative overflow-hidden" dir="rtl">

      {/* Aurora bg */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-200/25 blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-fuchsia-200/20 blur-[90px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center gap-3 px-4 py-3 border-b border-purple-100/60 bg-white/80 backdrop-blur-sm">
        {onBack && (
          <button onClick={onBack} className="p-2 rounded-xl hover:bg-purple-50 transition-colors text-gray-500">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
          </button>
        )}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-400 flex items-center justify-center text-lg shadow-md shadow-purple-200">
          🐾
        </div>
        <div>
          <p className="text-sm font-bold text-gray-800 leading-tight">Mipo</p>
          <p className="text-xs text-purple-500">{streaming ? 'מקליד...' : 'מוכן לשיחה'}</p>
        </div>
      </header>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-3 max-w-xl mx-auto">
            {messages.map((m, i) => (
              <Bubble key={i} msg={m} isNew={i === messages.length - 1} />
            ))}
          </div>
        )}
        {error && (
          <p className="text-center text-xs text-red-400 mt-2">{error}</p>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Walking pet + Input bar */}
      <div className="relative z-10 px-4 pb-6 pt-0">
        <div className="max-w-xl mx-auto">

          {/* כלב מונפש מעל ה-input */}
          <WalkingPet typing={streaming} />

          {/* Input container */}
          <div
            className={`flex items-end gap-2 rounded-2xl border bg-white/90 backdrop-blur-sm px-3 py-2 transition-all duration-300 ${
              focused
                ? 'border-transparent ring-2 ring-purple-400 shadow-lg shadow-purple-200/60'
                : 'border-purple-200 shadow-md shadow-purple-100/40'
            }`}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={`שאל את Mipo על ${petName ?? 'חיית המחמד שלך'}...`}
              rows={1}
              disabled={streaming}
              className="flex-1 resize-none bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none py-1.5 max-h-32 leading-relaxed"
              style={{ fieldSizing: 'content' } as React.CSSProperties}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || streaming}
              className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                input.trim() && !streaming
                  ? 'bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white shadow-md shadow-purple-300/50 hover:opacity-90 active:scale-95'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {streaming ? (
                <div className="w-4 h-4 border-2 border-purple-300 border-t-white rounded-full animate-spin"/>
              ) : (
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 rotate-180">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                </svg>
              )}
            </button>
          </div>
          <p className="text-center text-[10px] text-gray-400 mt-2">
            Mipo לא מחליף ייעוץ וטרינרי מקצועי
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
