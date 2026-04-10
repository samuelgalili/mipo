// src/services/chatStorage.ts — persist chat messages to Supabase
import { supabase } from '../lib/supabase'
import type { ChatMessage } from './chat'

export async function saveMessage(
  message: ChatMessage,
  opts: { userId: string; petId?: string; conversationId: string }
): Promise<void> {
  const { error } = await supabase.from('chat_messages').insert({
    user_id:         opts.userId,
    pet_id:          opts.petId ?? null,
    conversation_id: opts.conversationId,
    role:            message.role,
    content:         message.content,
  })
  if (error) console.error('[chatStorage] save error:', error.message)
}

export async function loadConversation(
  conversationId: string
): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('role, content')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('[chatStorage] load error:', error.message)
    return []
  }
  return (data ?? []) as ChatMessage[]
}
