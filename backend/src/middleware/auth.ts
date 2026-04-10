// src/middleware/auth.ts — Supabase JWT verification
import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = process.env.SUPABASE_URL!;
const supabaseKey  = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase     = createClient(supabaseUrl, supabaseKey);

export interface AuthedRequest extends Request {
  userId?: string;
}

export async function requireAuth(
  req: AuthedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing authorization header' });
    return;
  }

  const token = authHeader.slice(7);
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }

  req.userId = data.user.id;
  next();
}
