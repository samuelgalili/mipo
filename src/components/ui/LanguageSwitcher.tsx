import { useTranslation } from 'react-i18next'

const LANGS = [
  { code: 'he', label: 'עב' },
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中' },
]

interface Props {
  className?: string
}

export const LanguageSwitcher: React.FC<Props> = ({ className = '' }) => {
  const { i18n } = useTranslation()
  const current = i18n.resolvedLanguage ?? i18n.language

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => i18n.changeLanguage(code)}
          className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all duration-150 ${
            current === code
              ? 'bg-purple-100 text-purple-700'
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
