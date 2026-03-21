export type PetType = 'dog' | 'cat' | 'rabbit' | 'parrot' | 'hamster' | 'fish' | 'other'

export interface OnboardingData {
  // שלב 1 — פרטי בעלים
  ownerName: string
  ownerEmail: string

  // שלב 2 — סוג חיה
  petType: PetType | ''

  // שלב 3 — פרטי חיה
  petName: string
  petAge: string
  petBreed: string
}

export const PET_OPTIONS: { type: PetType; emoji: string; label: string }[] = [
  { type: 'dog',     emoji: '🐶', label: 'כלב'       },
  { type: 'cat',     emoji: '🐱', label: 'חתול'      },
  { type: 'rabbit',  emoji: '🐰', label: 'ארנב'      },
  { type: 'parrot',  emoji: '🦜', label: 'תוכי'      },
  { type: 'hamster', emoji: '🐹', label: 'אוגר'      },
  { type: 'fish',    emoji: '🐠', label: 'דג'        },
  { type: 'other',   emoji: '🐾', label: 'אחר'       },
]
