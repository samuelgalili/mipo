// src/services/chat.ts — Mipo AI Chat API client

const API_URL = import.meta.env.VITE_API_URL ?? '';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendMessage(
  messages: ChatMessage[],
  opts?: { petName?: string; petType?: string }
): Promise<string> {
  const res = await fetch(`${API_URL}/chat`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ messages, ...opts }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? `שגיאת שרת ${res.status}`);
  }

  const data = await res.json();
  return data.reply as string;
}

export async function* streamMessage(
  messages: ChatMessage[],
  opts?: { petName?: string; petType?: string }
): AsyncGenerator<string> {
  const res = await fetch(`${API_URL}/chat/stream`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ messages, ...opts }),
  });

  if (!res.ok || !res.body) throw new Error(`שגיאת שרת ${res.status}`);

  const reader  = res.body.getReader();
  const decoder = new TextDecoder();
  let   buffer  = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const raw = line.slice(6).trim();
      if (raw === '[DONE]') return;
      try {
        const obj = JSON.parse(raw);
        if (obj.delta) yield obj.delta;
        if (obj.error) throw new Error(obj.error);
      } catch {}
    }
  }
}
