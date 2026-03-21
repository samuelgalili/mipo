// src/types/memory.ts — Vector DB + Episodic Memory types

// ─── Vector Memory ───────────────────────────────────────────

export type MemoryType = 'event' | 'health' | 'behavior' | 'note';

export interface PetMemory {
  id: string;
  created_at: string;
  pet_id: string;
  user_id: string;
  content: string;
  embedding?: number[];
  memory_type: MemoryType;
  metadata: Record<string, unknown>;
}

export interface PetMemoryInsert {
  pet_id: string;
  user_id: string;
  content: string;
  embedding?: number[];
  memory_type?: MemoryType;
  metadata?: Record<string, unknown>;
}

export interface MemorySearchResult {
  id: string;
  created_at: string;
  content: string;
  memory_type: MemoryType;
  metadata: Record<string, unknown>;
  similarity: number; // 0–1 (cosine similarity)
}

// ─── Episodic Memory ─────────────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface ConversationContext {
  messages: ChatMessage[];
  pet_context?: {
    name: string;
    type: string;
    age?: number;
    breed?: string;
  };
}

export interface AgentMemory {
  id: string;
  created_at: string;
  expires_at: string;
  last_activity: string;
  user_id: string;
  pet_id?: string | null;
  session_id: string;
  agent_id: string;
  context: ConversationContext;
  summary?: string | null;
  turn_count: number;
}

export type AgentMemorySession = Pick<
  AgentMemory,
  'id' | 'session_id' | 'summary' | 'turn_count' | 'last_activity' | 'pet_id'
>;
