import { NextResponse } from 'next/server';
import { getAuthTokenFromRequest, verifyToken } from '@/lib/auth';

export function requireRole(req: Request, roles: Array<'ADMIN' | 'EDITOR'>) {
  try {
    // @ts-ignore NextRequest also has headers.get
    const token = getAuthTokenFromRequest(req as any);
    if (!token) return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
    const payload = verifyToken(token);
    if (!roles.includes(payload.role)) {
      return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
    }
    return { payload };
  } catch {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }
}



