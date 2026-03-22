import './index.css'
import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AuthPage } from './pages/AuthPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { DashboardPage } from './pages/DashboardPage'
import { ComingSoonPage } from './pages/ComingSoonPage'
import AdminEvalsDashboard from './pages/AdminEvalsDashboard'
import { PricingPage } from './pages/PricingPage'
import { TermsPage } from './pages/TermsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { RefundPage } from './pages/RefundPage'
import { supabase } from './lib/supabase'

const COMING_SOON = false
const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
// דפים שנגישים תמיד — גם במצב coming soon
const isAdminRoute  = pathname === '/admin'
const isLegalRoute  = pathname === '/pricing' || pathname === '/terms'
                   || pathname === '/privacy'  || pathname === '/refund'

type AppScreen = 'loading' | 'auth' | 'onboarding' | 'dashboard'

const AppRouter = () => {
  const { user, loading } = useAuth()
  const [screen, setScreen] = useState<AppScreen>('loading')

  useEffect(() => {
    if (loading) return

    if (!user) {
      setScreen('auth')
      return
    }

    // בודק אם המשתמש כבר עבר onboarding
    supabase
      .from('onboarding')
      .select('id')
      .eq('user_id', user.id)
      .limit(1)
      .then(({ data }) => {
        setScreen(data && data.length > 0 ? 'dashboard' : 'onboarding')
      })
  }, [user, loading])

  if (screen === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-purple-200 border-t-purple-500 animate-spin" />
          <span className="text-sm text-purple-400 font-medium">🐾 MIPO</span>
        </div>
      </div>
    )
  }

  if (screen === 'auth') return <AuthPage />
  if (screen === 'onboarding') return <OnboardingPage onComplete={() => setScreen('dashboard')} />
  return <DashboardPage />
}

function App() {
  if (isAdminRoute)          return <AdminEvalsDashboard />
  if (pathname === '/pricing') return <PricingPage />
  if (pathname === '/terms')   return <TermsPage />
  if (pathname === '/privacy') return <PrivacyPage />
  if (pathname === '/refund')  return <RefundPage />
  if (COMING_SOON && !isLegalRoute) return <ComingSoonPage />
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
