// src/routes/health.ts
import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();

// GET /health
router.get('/', async (_req: Request, res: Response) => {
  const start = Date.now();

  // בדיקת חיבור ל-Supabase
  const { error } = await supabase.from('onboarding').select('id').limit(1);
  const dbOk = !error;

  const payload = {
    status:    dbOk ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime:    Math.floor(process.uptime()),
    latency_ms: Date.now() - start,
    services: {
      database: dbOk ? 'ok' : `error: ${error?.message}`,
    },
    version: process.env.npm_package_version ?? '1.0.0',
  };

  res.status(dbOk ? 200 : 503).json(payload);
});

export default router;
