import React, { useRef, useState } from 'react'
import type { OnboardingData } from '../../types/onboarding'
import { PET_OPTIONS } from '../../types/onboarding'
import { detectBreed } from '../../services/breedDetection'

interface Props {
  data: OnboardingData
  onChange: (field: keyof OnboardingData, value: string) => void
  errors: Partial<Record<keyof OnboardingData, string>>
}

const MinimalInput: React.FC<{
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  type?: string
  error?: string
  required?: boolean
}> = ({ label, value, onChange, placeholder, type = 'text', error, required }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
      {label}{required && <span className="text-[#7C3AED] mr-0.5">*</span>}
    </label>
    <input
      dir="rtl"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={[
        'w-full bg-transparent text-gray-900 text-lg placeholder:text-gray-300',
        'border-b-2 py-2 outline-none transition-colors duration-200',
        error ? 'border-red-400' : 'border-gray-200 focus:border-[#7C3AED]',
      ].join(' ')}
    />
    {error && <p className="text-xs text-red-500">⚠ {error}</p>}
  </div>
)

// ─── Confidence badge ─────────────────────────────────────────────────────────
const confidenceLabel: Record<string, string> = {
  high: 'זיהוי בטוח',
  medium: 'זיהוי סביר',
  low: 'לא בטוח',
}
const confidenceColor: Record<string, string> = {
  high: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-gray-100 text-gray-500',
}

export const Screen3PetDetails: React.FC<Props> = ({ data, onChange, errors }) => {
  const pet = PET_OPTIONS.find((p) => p.type === data.petType)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [detecting, setDetecting] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [confidence, setConfidence] = useState<string | null>(null)
  const [detectError, setDetectError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // preview
    setPreview(URL.createObjectURL(file))
    setDetecting(true)
    setDetectError(null)
    setConfidence(null)

    try {
      const result = await detectBreed(file, pet?.label)
      onChange('petBreed', result.breed)
      setConfidence(result.confidence)
    } catch (err: any) {
      setDetectError(err.message ?? 'שגיאה בזיהוי')
    } finally {
      setDetecting(false)
      // reset so same file can be re-selected
      e.target.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-7 px-6 py-8">
      <div>
        <p className="text-3xl mb-1">{pet?.emoji}</p>
        <h2
          className="text-3xl text-gray-900 leading-snug"
          style={{ fontFamily: '"DM Serif Display", serif' }}
        >
          פרטי ה{pet?.label ?? 'חיה'}
          <br />
          שלך
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        <MinimalInput
          label="שם"
          value={data.petName}
          onChange={(v) => onChange('petName', v)}
          placeholder="בובו, לונה, ריו..."
          error={errors.petName}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <MinimalInput
            label="גיל"
            value={data.petAge}
            onChange={(v) => onChange('petAge', v)}
            placeholder="2"
            type="number"
            error={errors.petAge}
          />

          {/* ─── שדה גזע + זיהוי תמונה ─── */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              גזע
            </label>
            <div className="flex items-end gap-2">
              <input
                dir="rtl"
                type="text"
                value={data.petBreed}
                onChange={(e) => { onChange('petBreed', e.target.value); setConfidence(null) }}
                placeholder="מעורב..."
                className="flex-1 bg-transparent text-gray-900 text-lg placeholder:text-gray-300 border-b-2 border-gray-200 focus:border-[#7C3AED] py-2 outline-none transition-colors duration-200"
              />

              {/* כפתור מצלמה */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={detecting}
                title="זהה גזע מתמונה"
                className={`mb-1 flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all
                  ${detecting
                    ? 'bg-purple-100 cursor-not-allowed'
                    : 'bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white shadow-md shadow-purple-200 hover:opacity-90 active:scale-95'
                  }`}
              >
                {detecting ? (
                  <div className="w-4 h-4 border-2 border-purple-400 border-t-white rounded-full animate-spin" />
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                )}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* תצוגה מקדימה + תוצאה */}
            {preview && (
              <div className="mt-2 flex items-center gap-2">
                <img
                  src={preview}
                  alt="תצוגה מקדימה"
                  className="w-10 h-10 rounded-lg object-cover border border-purple-100"
                />
                {detecting && (
                  <span className="text-xs text-purple-500 animate-pulse">מזהה גזע...</span>
                )}
                {!detecting && confidence && (
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${confidenceColor[confidence]}`}>
                    {confidenceLabel[confidence]}
                  </span>
                )}
                {!detecting && detectError && (
                  <span className="text-xs text-red-400">{detectError}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* תמונת רקע קטנה */}
      {pet?.photo && (
        <div className="mt-auto rounded-2xl overflow-hidden h-32">
          <img src={pet.photo} alt={pet.label} className="w-full h-full object-cover opacity-60" />
        </div>
      )}
    </div>
  )
}
