export type PetType = 'dog' | 'cat' | 'rabbit' | 'parrot'

export interface OnboardingData {
  petType: PetType | ''
  petName: string
  petAge: string
  petBreed: string
  ownerName: string
  ownerEmail: string
}

export const PET_OPTIONS: {
  type: PetType
  label: string
  emoji: string
  photo: string
  hint: string
}[] = [
  {
    type: 'dog',
    label: 'כלב',
    emoji: '🐶',
    photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80',
    hint: 'גולדן, לברדור, מעורב...',
  },
  {
    type: 'cat',
    label: 'חתול',
    emoji: '🐱',
    photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    hint: 'פרסי, מיין קון, מעורב...',
  },
  {
    type: 'rabbit',
    label: 'ארנב',
    emoji: '🐰',
    photo: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80',
    hint: 'ארנב ננסי, לופ, מעורב...',
  },
  {
    type: 'parrot',
    label: 'תוכי',
    emoji: '🦜',
    photo: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=600&q=80',
    hint: 'קוקטייל, אמזון, מקאו...',
  },
]
