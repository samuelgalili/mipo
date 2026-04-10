import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
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
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-2xl font-black text-primary">
            🐾 MIPO
          </span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
            <Button label="יציאה" variant="ghost" size="sm" onClick={signOut} />
          </div>
        </div>
      </header>

      {/* תוכן */}
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        <div>
          <h1 className="text-2xl font-bold text-foreground">שלום! 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">הנה חיות המחמד שלך</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          </div>
        ) : pets.length === 0 ? (
          <Card variant="flat" className="text-center py-12 space-y-3">
            <div className="text-5xl">🐾</div>
            <p className="text-muted-foreground">עדיין אין חיות מחמד</p>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {pets.map((pet) => (
              <Card key={pet.id} hover variant="gradient">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl shrink-0">
                    {getPetEmoji(pet.pet_type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-foreground text-lg leading-tight">{pet.pet_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {getPetLabel(pet.pet_type)}
                      {pet.pet_breed ? ` · ${pet.pet_breed}` : ''}
                      {pet.pet_age != null ? ` · גיל ${pet.pet_age}` : ''}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/chat/${pet.id}`, { state: { pet } })}
                    className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white shadow-button hover:shadow-button-hover hover:opacity-90 active:scale-95 transition-all"
                    title={`שוחח עם Mipo על ${pet.pet_name}`}
                  >
                    🐾
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
