import React, { useEffect, useState } from 'react'
import type { OnboardingData } from '../../types/onboarding'
import { PET_OPTIONS } from '../../types/onboarding'
import { Button } from '../ui/Button'

interface Props {
  data: OnboardingData
  onFinish: () => void
}

export const StepDone: React.FC<Props> = ({ data, onFinish }) => {
  const [visible, setVisible] = useState(false)
  const petOption = PET_OPTIONS.find((p) => p.type === data.petType)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      dir="rtl"
      className={[
        'flex flex-col items-center gap-6 text-center transition-all duration-700',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
      ].join(' ')}
    >
      {/* אנימציית הצלחה */}
      <div className="relative">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-xl shadow-purple-400/40 animate-bounce-slow">
          <span className="text-5xl">{petOption?.emoji ?? '🐾'}</span>
        </div>
        <div className="absolute -bottom-1 -end-1 w-9 h-9 bg-emerald-400 rounded-full flex items-center justify-center text-white text-lg shadow-md border-2 border-white">
          ✓
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">
          !{data.petName} וה{petOption?.label} שלך מוכנים 🎉
        </h2>
        <p className="text-gray-500">
          היי {data.ownerName}, ברוכים הבאים ל-MIPO!
        </p>
      </div>

      {/* סיכום */}
      <div className="w-full bg-purple-50/80 border border-purple-100 rounded-2xl p-5 text-sm text-gray-700 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">שם הבעלים</span>
          <span className="font-semibold">{data.ownerName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">אימייל</span>
          <span className="font-semibold">{data.ownerEmail}</span>
        </div>
        <div className="h-px bg-purple-100" />
        <div className="flex justify-between">
          <span className="text-gray-400">שם החיה</span>
          <span className="font-semibold">{data.petName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">סוג</span>
          <span className="font-semibold">{petOption?.emoji} {petOption?.label}</span>
        </div>
        {data.petAge && (
          <div className="flex justify-between">
            <span className="text-gray-400">גיל</span>
            <span className="font-semibold">{data.petAge} שנים</span>
          </div>
        )}
        {data.petBreed && (
          <div className="flex justify-between">
            <span className="text-gray-400">גזע</span>
            <span className="font-semibold">{data.petBreed}</span>
          </div>
        )}
      </div>

      <Button
        label="בואו נתחיל! 🐾"
        onClick={onFinish}
        size="lg"
        fullWidth
      />
    </div>
  )
}
