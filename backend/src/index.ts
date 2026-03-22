// src/index.ts — MIPO Backend
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import healthRouter       from './routes/health';
import chatRouter         from './routes/chat';
import detectBreedRouter  from './routes/detect-breed';

const app  = express();
const PORT = Number(process.env.PORT ?? 3001);

// ─── Middleware ───────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────
app.use('/health',        healthRouter);
app.use('/chat',          chatRouter);
app.use('/detect-breed',  detectBreedRouter);

// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ─── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🐾 MIPO backend running on port ${PORT}`);
});
