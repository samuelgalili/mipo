import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { PET_OPTIONS } from '../types/onboarding'

interface Pet {
  id: string
  pet_name: string
  pet_type: string
  pet_age: number | null
  pet_breed: string | null
}

export const DashboardPage: React.FC = () => {
  const { user, signOut } = useAuth()
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    supabase
      .from('onboarding')
      .select('id, pet_name, pet_type, pet_age, pet_breed')
      .eq('user_id', user.id)
      .then(({ data }) => {
        setPets(data ?? [])
        setLoading(false)
      })
  }, [user])

  const getPetEmoji = (type: string) =>
    PET_OPTIONS.find((p) => p.type === type)?.emoji ?? '🐾'

  const getPetLabel = (type: string) =>
    PET_OPTIONS.find((p) => p.type === type)?.label ?? type

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">

      {/* Header */}
      <header className="bg-white border-b border-purple-100 shadow-sm shadow-purple-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-2xl font-black bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            🐾 MIPO
          </span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 hidden sm:block">{user?.email}</span>
            <Button label="יציאה" variant="ghost" size="sm" onClick={signOut} />
          </div>
        </div>
      </header>

      {/* תוכן */}
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">שלום! 👋</h1>
          <p className="text-gray-400 text-sm mt-1">הנה חיות המחמד שלך</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 rounded-full border-4 border-purple-200 border-t-purple-500 animate-spin" />
          </div>
        ) : pets.length === 0 ? (
          <Card variant="flat" className="text-center py-12 space-y-3">
            <div className="text-5xl">🐾</div>
            <p className="text-gray-500">עדיין אין חיות מחמד</p>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {pets.map((pet) => (
              <Card key={pet.id} hover variant="gradient">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-fuchsia-100 flex items-center justify-center text-3xl shrink-0">
                    {getPetEmoji(pet.pet_type)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-800 text-lg leading-tight">{pet.pet_name}</h3>
                    <p className="text-sm text-gray-400">
                      {getPetLabel(pet.pet_type)}
                      {pet.pet_breed ? ` · ${pet.pet_breed}` : ''}
                      {pet.pet_age != null ? ` · גיל ${pet.pet_age}` : ''}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
