// src/routes/detect-breed.ts — Breed detection via Claude Vision
import { Router, Request, Response } from 'express';
import Anthropic from '@anthropic-ai/sdk';

const router = Router();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// POST /detect-breed
// Body: { image: "<base64>", mediaType: "image/jpeg"|"image/png"|"image/webp", petType?: string }
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { image, mediaType, petType } = req.body as {
    image: string;
    mediaType: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';
    petType?: string;
  };

  if (!image || !mediaType) {
    res.status(400).json({ error: 'image and mediaType required' });
    return;
  }

  const petContext = petType ? `זוהי תמונה של ${petType}.` : '';

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 256,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: image,
              },
            },
            {
              type: 'text',
              text: `${petContext}
זהה את גזע חיית המחמד בתמונה.
ענה בפורמט JSON בלבד, ללא טקסט נוסף:
{"breed": "שם הגזע בעברית", "confidence": "high|medium|low", "en": "breed name in English"}
אם לא ניתן לזהות גזע ספציפי, החזר: {"breed": "מעורב", "confidence": "low", "en": "mixed"}`,
            },
          ],
        },
      ],
    });

    const raw = response.content[0].type === 'text' ? response.content[0].text.trim() : '';

    // נסיון לפרסר JSON מהתשובה
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      res.status(500).json({ error: 'תשובה לא תקינה מהמודל' });
      return;
    }

    const result = JSON.parse(jsonMatch[0]);
    res.json(result);
  } catch (err: any) {
    console.error('Breed detection error:', err.message);
    res.status(500).json({ error: 'שגיאה בזיהוי הגזע — נסה שוב' });
  }
});

export default router;
