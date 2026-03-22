// src/index.ts — MIPO Backend
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import healthRouter from './routes/health';
import chatRouter   from './routes/chat';

const app  = express();
const PORT = Number(process.env.PORT ?? 3001);

// ─── Middleware ───────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────
app.use('/health', healthRouter);
app.use('/chat',   chatRouter);

// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ─── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🐾 MIPO backend running on port ${PORT}`);
});
