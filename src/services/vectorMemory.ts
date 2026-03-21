// src/services/vectorMemory.ts
// Vector DB — זיכרון סמנטי לכל חיה באמצעות pgvector

import { supabase } from '../lib/supabase';
import type { PetMemory, PetMemoryInsert, MemorySearchResult } from '../types/memory';

/**
 * פונקציית embedding — מקבלת טקסט ומחזירה וקטור float[].
 * ברירת מחדל: no-op (החלף עם OpenAI / Anthropic embeddings).
 *
 * דוגמה עם OpenAI:
 *   import OpenAI from 'openai';
 *   const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_KEY });
 *   const embedder: EmbedFn = async (text) => {
 *     const res = await openai.embeddings.create({ model: 'text-embedding-3-small', input: text });
 *     return res.data[0].embedding;
 *   };
 */
export type EmbedFn = (text: string) => Promise<number[]>;

const noopEmbed: EmbedFn = async () => [];

// ─── שמירת זיכרון ─────────────────────────────────────────────

/**
 * שומר זיכרון חדש לחיה — כולל embedding לחיפוש עתידי.
 *
 * @example
 * await storeMemory({ pet_id, user_id, content: 'מקס קיבל חיסון נגד כלבת', memory_type: 'health' }, embedder);
 */
export async function storeMemory(
  memory: PetMemoryInsert,
  embed: EmbedFn = noopEmbed,
): Promise<PetMemory> {
  const embedding = await embed(memory.content);

  const { data, error } = await supabase
    .from('pet_memories')
    .insert({
      pet_id:      memory.pet_id,
      user_id:     memory.user_id,
      content:     memory.content,
      memory_type: memory.memory_type ?? 'event',
      metadata:    memory.metadata ?? {},
      // pgvector מקבל מערך של מספרים
      ...(embedding.length > 0 ? { embedding } : {}),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ─── חיפוש סמנטי ──────────────────────────────────────────────

/**
 * מחפש זיכרונות דומים לחיה לפי שאילתת טקסט.
 * מחייב pgvector + פונקציית match_pet_memories ב-Supabase.
 *
 * @example
 * const results = await searchMemories(petId, 'מה קרה למקס בחודש האחרון', embedder);
 */
export async function searchMemories(
  petId: string,
  query: string,
  embed: EmbedFn,
  limit = 5,
): Promise<MemorySearchResult[]> {
  const embedding = await embed(query);

  if (embedding.length === 0) {
    console.warn('[vectorMemory] No embedding returned — falling back to text search');
    return fallbackTextSearch(petId, query, limit);
  }

  const { data, error } = await supabase.rpc('match_pet_memories', {
    p_pet_id:        petId,
    query_embedding: embedding,
    match_count:     limit,
  });

  if (error) throw error;
  return data ?? [];
}

/** גיבוי בטקסט רגיל אם אין embedder */
async function fallbackTextSearch(
  petId: string,
  query: string,
  limit: number,
): Promise<MemorySearchResult[]> {
  const { data, error } = await supabase
    .from('pet_memories')
    .select('id, created_at, content, memory_type, metadata')
    .eq('pet_id', petId)
    .ilike('content', `%${query}%`)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []).map((r) => ({ ...r, similarity: 0 }));
}

// ─── זיכרונות אחרונים ─────────────────────────────────────────

/**
 * מחזיר את הזיכרונות האחרונים של חיה (ללא חיפוש וקטורי).
 *
 * @example
 * const memories = await getRecentMemories(petId, 30); // 30 ימים אחרונים
 */
export async function getRecentMemories(
  petId: string,
  days = 30,
  limit = 20,
): Promise<Omit<PetMemory, 'embedding'>[]> {
  const since = new Date(Date.now() - days * 86_400_000).toISOString();

  const { data, error } = await supabase
    .from('pet_memories')
    .select('id, created_at, pet_id, user_id, content, memory_type, metadata')
    .eq('pet_id', petId)
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

// ─── מחיקה ────────────────────────────────────────────────────

export async function deleteMemory(memoryId: string): Promise<void> {
  const { error } = await supabase.from('pet_memories').delete().eq('id', memoryId);
  if (error) throw error;
}
