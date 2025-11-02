import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/roles';

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const guard = requireRole(req, ['ADMIN', 'EDITOR']);
  if ('error' in guard) return guard.error;

  try {
    const { id } = await ctx.params;
    const body = await req.json();
    const reason = String(body?.rejectionReason || '').trim();
    if (!reason) return NextResponse.json({ error: 'rejectionReason required' }, { status: 400 });

    const article = await prisma.article.update({
      where: { id },
      data: { status: 'REJECTED', rejectionReason: reason, reviewDate: new Date() },
      select: { id: true, status: true, rejectionReason: true },
    });
    return NextResponse.json({ article });
  } catch (err: any) {
    if (err?.code === 'P2025') return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to reject' }, { status: 500 });
  }
}


