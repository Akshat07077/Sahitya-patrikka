import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/roles';
import { withRetry } from '@/lib/prisma-retry';

export async function PATCH(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const guard = requireRole(_req, ['ADMIN', 'EDITOR']);
  if ('error' in guard) return guard.error;

  try {
    const { id } = await ctx.params;
    const article = await withRetry(() =>
      prisma.article.update({
      where: { id },
      data: { status: 'APPROVED', reviewDate: new Date() },
      select: { id: true, status: true },
      })
    );
    return NextResponse.json({ article });
  } catch (err: any) {
    if (err?.code === 'P2025') return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    
    // Log technical details but return user-friendly message
    if (err?.message?.includes('prepared statement')) {
      console.error('Prepared statement error detected. Check Supabase connection pooler mode.');
    }
    
    return NextResponse.json({ error: 'Failed to approve article. Please try again.' }, { status: 500 });
  }
}


