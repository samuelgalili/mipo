import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { LanguageSwitcher } from '../components/ui/LanguageSwitcher'

type Mode = 'login' | 'register'

export const AuthPage: React.FC = () => {
  const { t } = useTranslation()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
  const [loading, setLoading] = useState(false)
  const [registered, setRegistered] = useState(false)

  const validate = () => {
    const e: typeof errors = {}
    if (!email.trim()) e.email = t('auth.errors.emailRequired')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = t('auth.errors.emailInvalid')
    if (!password) e.password = t('auth.errors.passwordRequired')
    else if (password.length < 6) e.password = t('auth.errors.passwordMin')
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setLoading(true)

    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setRegistered(true)
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
    } catch (err: any) {
      const msg = err?.message ?? ''
      if (msg.includes('Invalid login')) setErrors({ general: t('auth.errors.invalidCredentials') })
      else if (msg.includes('already registered')) setErrors({ general: t('auth.errors.alreadyRegistered') })
      else setErrors({ general: msg })
    } finally {
      setLoading(false)
    }
  }

  if (registered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-purple-100/60 border border-purple-100 p-8 text-center space-y-4">
          <div className="text-5xl">📬</div>
          <h2 className="text-xl font-bold text-gray-800">{t('auth.checkEmail')}</h2>
          <p className="text-gray-500 text-sm">{t('auth.sentLink')}<strong>{email}</strong></p>
          <button
            onClick={() => { setRegistered(false); setMode('login') }}
            className="text-sm text-purple-500 hover:underline"
          >
            {t('auth.backToLogin')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* לוגו */}
        <div className="text-center mb-8 relative">
          <span className="text-4xl font-black bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            🐾 MIPO
          </span>
          <p className="text-gray-400 text-sm mt-1">{t('common.appTagline')}</p>
          <div className="absolute top-0 end-0">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-purple-100/60 border border-purple-100 p-8">

          {/* טאבים */}
          <div className="flex rounded-2xl bg-purple-50 p-1 mb-6">
            {(['login', 'register'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setErrors({}) }}
                className={[
                  'flex-1 py-2 text-sm font-semibold rounded-xl transition-all duration-200',
                  mode === m
                    ? 'bg-white text-purple-700 shadow-sm shadow-purple-100'
                    : 'text-gray-400 hover:text-purple-500',
                ].join(' ')}
              >
                {m === 'login' ? t('auth.login') : t('auth.register')}
              </button>
            ))}
          </div>

          {/* טופס */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input
              label={t('auth.email')}
              type="email"
              placeholder="israel@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              iconStart="✉️"
              required
              autoComplete="email"
            />
            <Input
              label={t('auth.password')}
              type="password"
              placeholder={mode === 'register' ? t('auth.passwordPlaceholder') : '••••••••'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              iconStart="🔒"
              required
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
            />

            {errors.general && (
              <p role="alert" className="text-xs text-red-500 text-center bg-red-50 border border-red-200 rounded-xl py-2 px-3">
                ⚠ {errors.general}
              </p>
            )}

            <Button
              label={mode === 'login' ? t('auth.loginBtn') : t('auth.registerBtn')}
              type="submit"
              loading={loading}
              fullWidth
              size="lg"
            />
          </form>

          {/* החלפת מצב */}
          <p className="text-center text-sm text-gray-400 mt-4">
            {mode === 'login' ? t('auth.noAccount') : t('auth.alreadyRegistered')}{' '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setErrors({}) }}
              className="text-purple-500 font-semibold hover:underline"
            >
              {mode === 'login' ? t('auth.registerLink') : t('auth.loginLink')}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
