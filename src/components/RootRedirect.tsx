import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

type Status = 'loading' | 'auth' | 'onboarding' | 'dashboard'

export const RootRedirect: React.FC = () => {
  const { user, loading } = useAuth()
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    if (loading) return
    if (!user) { setStatus('auth'); return }

    supabase
      .from('onboarding')
      .select('id')
      .eq('user_id', user.id)
      .limit(1)
      .then(({ data }) => {
        setStatus(data && data.length > 0 ? 'dashboard' : 'onboarding')
      })
  }, [user, loading])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-purple-200 border-t-purple-500 animate-spin" />
          <span className="text-sm text-purple-400 font-medium">🐾 MIPO</span>
        </div>
      </div>
    )
  }

  if (status === 'auth')       return <Navigate to="/auth"       replace />
  if (status === 'onboarding') return <Navigate to="/onboarding" replace />
  return <Navigate to="/dashboard" replace />
}
