import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthTokenFromRequest, verifyToken } from '@/lib/auth';

// Bootstraps admin access:
// - If there is no ADMIN user yet, the caller becomes ADMIN
// - Otherwise 403
export async function POST(req: NextRequest) {
  try {
    const token = getAuthTokenFromRequest(req);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const payload = verifyToken(token);

    const existingAdmin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    if (existingAdmin) {
      return NextResponse.json({ error: 'Admin already exists' }, { status: 403 });
    }

    const updated = await prisma.user.update({
      where: { id: payload.id },
      data: { role: 'ADMIN' },
      select: { id: true, email: true, role: true },
    });

    return NextResponse.json({ user: updated });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to promote' }, { status: 500 });
  }
}



