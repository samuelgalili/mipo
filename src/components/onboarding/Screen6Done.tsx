import React, { useEffect, useState } from 'react'
import type { OnboardingData } from '../../types/onboarding'
import { PET_OPTIONS } from '../../types/onboarding'

interface Props {
  data: OnboardingData
  onFinish: () => void
}

export const Screen6Done: React.FC<Props> = ({ data, onFinish }) => {
  const [visible, setVisible] = useState(false)
  const pet = PET_OPTIONS.find((p) => p.type === data.petType)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className={[
        'flex flex-col items-center justify-between h-full px-8 py-12 text-center',
        'transition-all duration-700 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
      ].join(' ')}
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {/* תמונת החיה */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-[#7C3AED]/20 ring-offset-4 shadow-xl">
            <img
              src={pet?.photo}
              alt={pet?.label}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -left-1 w-9 h-9 bg-emerald-400 rounded-full flex items-center justify-center text-white text-base shadow-md border-2 border-white">
            ✓
          </div>
        </div>

        {/* טקסט */}
        <div className="space-y-3">
          <h2
            className="text-3xl text-gray-900 leading-snug"
            style={{ fontFamily: '"DM Serif Display", serif' }}
          >
            {data.petName} ו{data.ownerName}
            <br />
            <span className="text-[#7C3AED]">מוכנים!</span>
          </h2>
          <p className="text-gray-400 text-sm">ברוכים הבאים למשפחת MIPO 🐾</p>
        </div>

        {/* סיכום */}
        <div className="w-full bg-gray-50 rounded-2xl p-4 text-sm text-right space-y-2 border border-gray-100">
          <div className="flex justify-between text-gray-500">
            <span className="font-semibold text-gray-800">{data.petName}</span>
            <span>{pet?.emoji} {pet?.label}</span>
          </div>
          {data.petBreed && (
            <div className="flex justify-between text-gray-400">
              <span>{data.petBreed}</span>
              <span>גזע</span>
            </div>
          )}
          {data.petAge && (
            <div className="flex justify-between text-gray-400">
              <span>{data.petAge} שנים</span>
              <span>גיל</span>
            </div>
          )}
        </div>
      </div>

      {/* כפתור סיום */}
      <button
        onClick={onFinish}
        className="w-full py-4 rounded-2xl bg-[#7C3AED] text-white text-base font-semibold
          shadow-lg shadow-purple-500/30 hover:bg-[#6D28D9] active:scale-[0.98]
          transition-all duration-200 mt-8"
      >
        אל הדשבורד 🐾
      </button>
    </div>
  )
}
