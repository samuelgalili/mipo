// src/routes/chat.ts — Mipo AI Chat
import { Router, Request, Response } from 'express';
import Anthropic from '@anthropic-ai/sdk';

const router  = Router();
const client  = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `אתה Mipo — חבר AI חם ואוהב לבעלי חיות מחמד.
אתה מלווה את המשתמש בחיי היומיום עם חיית המחמד שלו.
תן עצות מעשיות, תמיכה רגשית ומידע שימושי.
ענה תמיד בשפה שבה פנו אליך (עברית או אנגלית).
היה קצר, חם ואישי. השתמש באמוג'י בצורה מתונה. 🐾
אל תאבחן מחלות — לכל בעיה רפואית המלץ לפנות לוטרינר.`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// POST /chat
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { messages, petName, petType } = req.body as {
    messages: ChatMessage[];
    petName?: string;
    petType?: string;
  };

  if (!messages?.length) {
    res.status(400).json({ error: 'messages required' });
    return;
  }

  const systemWithPet = petName
    ? `${SYSTEM_PROMPT}\nחיית המחמד של המשתמש: ${petName} (${petType ?? 'חיית מחמד'}).`
    : SYSTEM_PROMPT;

  try {
    const response = await client.messages.create({
      model:      'claude-sonnet-4-6',
      max_tokens: 1024,
      system:     systemWithPet,
      messages:   messages.map(m => ({ role: m.role, content: m.content })),
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    res.json({ reply: text });
  } catch (err: any) {
    console.error('Chat error:', err.message);
    res.status(500).json({ error: 'שגיאה בשרת — נסה שוב' });
  }
});

// POST /chat/stream — Server-Sent Events
router.post('/stream', async (req: Request, res: Response): Promise<void> => {
  const { messages, petName, petType } = req.body as {
    messages: ChatMessage[];
    petName?: string;
    petType?: string;
  };

  if (!messages?.length) {
    res.status(400).json({ error: 'messages required' });
    return;
  }

  const systemWithPet = petName
    ? `${SYSTEM_PROMPT}\nחיית המחמד של המשתמש: ${petName} (${petType ?? 'חיית מחמד'}).`
    : SYSTEM_PROMPT;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    const stream = client.messages.stream({
      model:      'claude-sonnet-4-6',
      max_tokens: 1024,
      system:     systemWithPet,
      messages:   messages.map(m => ({ role: m.role, content: m.content })),
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        res.write(`data: ${JSON.stringify({ delta: chunk.delta.text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err: any) {
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  }
});

export default router;
