import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export const PetProfilePage: React.FC = () => {
  const { petId } = useParams<{ petId: string }>()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-8" dir="rtl">
      <div className="text-6xl">🐾</div>
      <h1 className="text-2xl font-bold text-foreground">פרופיל חיה</h1>
      <p className="text-muted-foreground text-sm">בקרוב — pet ID: {petId}</p>
      <button
        onClick={() => navigate('/dashboard')}
        className="text-sm text-primary hover:underline"
      >
        ← חזרה ל-Dashboard
      </button>
    </div>
  )
}
