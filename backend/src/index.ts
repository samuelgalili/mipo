// src/index.ts — MIPO Backend
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { requireAuth } from './middleware/auth';

import healthRouter       from './routes/health';
import chatRouter         from './routes/chat';
import detectBreedRouter  from './routes/detect-breed';
import identifyPetRouter  from './routes/identify-pet';

const app  = express();
const PORT = Number(process.env.PORT ?? 3001);

// ─── CORS — restrict to mipo.pet + localhost ──────────────
const allowedOrigins = [
  'https://mipo.pet',
  'https://www.mipo.pet',
  'http://localhost:5173',
  'http://localhost:4173',
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (e.g. mobile, curl, Postman in dev)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

app.use(express.json({ limit: '15mb' }));

// ─── Routes ──────────────────────────────────────────────
app.use('/health', healthRouter);                          // public — health check

app.use('/chat',          requireAuth, chatRouter);
app.use('/detect-breed',  requireAuth, detectBreedRouter);
app.use('/identify-pet',  requireAuth, identifyPetRouter);

// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ─── Start ───────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🐾 MIPO backend running on port ${PORT}`);
});
