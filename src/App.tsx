import './index.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { RootRedirect } from './components/RootRedirect'
import { AuthPage } from './pages/AuthPage'
import { AuthCallbackPage } from './pages/AuthCallbackPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { DashboardPage } from './pages/DashboardPage'
import { ChatPage } from './pages/ChatPage'
import { PetProfilePage } from './pages/PetProfilePage'
import { FeedPage } from './pages/FeedPage'
import { ShopPage } from './pages/ShopPage'
import AdminEvalsDashboard from './pages/AdminEvalsDashboard'
import { PricingPage } from './pages/PricingPage'
import { TermsPage } from './pages/TermsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { RefundPage } from './pages/RefundPage'

const COMING_SOON = false

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* ── Public ─────────────────────────────────────── */}
        <Route path="/auth"          element={<AuthPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/pricing"       element={<PricingPage />} />
        <Route path="/terms"         element={<TermsPage />} />
        <Route path="/privacy"       element={<PrivacyPage />} />
        <Route path="/refund"        element={<RefundPage />} />
        <Route path="/admin"         element={<AdminEvalsDashboard />} />

        {/* ── Protected ──────────────────────────────────── */}
        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding"      element={<OnboardingPage />} />
          <Route path="/dashboard"       element={<DashboardPage />} />
          <Route path="/chat/:petId"     element={<ChatPage />} />
          <Route path="/profile/:petId"  element={<PetProfilePage />} />
          <Route path="/feed"            element={<FeedPage />} />
          <Route path="/shop"            element={<ShopPage />} />
        </Route>

        {/* ── Root redirect ──────────────────────────────── */}
        <Route path="/" element={COMING_SOON ? <Navigate to="/coming-soon" replace /> : <RootRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
