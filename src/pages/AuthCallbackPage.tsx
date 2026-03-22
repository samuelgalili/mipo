import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export const AuthCallbackPage: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) throw error
        }

        setStatus('success')
        // redirect to home after short delay
        setTimeout(() => {
          window.location.href = '/'
        }, 1500)
      } catch (err: any) {
        setError(err.message ?? 'שגיאה באימות')
        setStatus('error')
      }
    }

    handleCallback()
  }, [])

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="text-center space-y-4 px-6">
        {status === 'loading' && (
          <>
            <div className="w-12 h-12 rounded-full border-4 border-sky-200 border-t-sky-500 animate-spin mx-auto" />
            <p className="text-sky-600 font-medium">מאמת את החשבון שלך...</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="text-5xl">✅</div>
            <h2 className="text-xl font-bold text-gray-800">החשבון אומת בהצלחה!</h2>
            <p className="text-gray-500 text-sm">מעביר אותך לאפליקציה...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="text-5xl">❌</div>
            <h2 className="text-xl font-bold text-gray-800">שגיאה באימות</h2>
            <p className="text-red-500 text-sm">{error}</p>
            <a href="/" className="inline-block mt-2 text-sky-600 underline text-sm">
              חזרה לדף הבית
            </a>
          </>
        )}
      </div>
    </div>
  )
}
