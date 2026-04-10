// src/routes/identify-pet.ts — Identify pet type + breed from image
import { Router, Request, Response } from 'express';
import Anthropic from '@anthropic-ai/sdk';

const router = Router();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// POST /identify-pet
// Body: { image: "<base64>", mediaType: "image/jpeg"|... }
// Returns: { petType: "dog"|"cat"|"rabbit"|"parrot"|"other", breed: string, confidence: "high"|"medium"|"low" }
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { image, mediaType } = req.body as {
    image: string;
    mediaType: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';
  };

  if (!image || !mediaType) {
    res.status(400).json({ error: 'image and mediaType required' });
    return;
  }

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: image },
            },
            {
              type: 'text',
              text: `Look at this image and identify the pet.
Return ONLY valid JSON, no extra text:
{
  "petType": "dog" | "cat" | "rabbit" | "parrot" | "other",
  "breed": "breed name in Hebrew (e.g. גולדן רטריבר, מעורב)",
  "confidence": "high" | "medium" | "low"
}
If no pet is visible, return: {"petType":"other","breed":"לא זוהה","confidence":"low"}`,
            },
          ],
        },
      ],
    });

    const raw = response.content[0].type === 'text' ? response.content[0].text.trim() : '';
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      res.status(500).json({ error: 'תשובה לא תקינה מהמודל' });
      return;
    }

    res.json(JSON.parse(jsonMatch[0]));
  } catch (err: any) {
    console.error('Identify pet error:', err.message);
    res.status(500).json({ error: 'שגיאה בזיהוי — נסה שוב' });
  }
});

export default router;
