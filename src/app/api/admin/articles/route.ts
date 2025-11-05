import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/roles';
import { withRetry } from '@/lib/prisma-retry';

export async function GET(req: NextRequest) {
  const guard = requireRole(req, ['ADMIN', 'EDITOR']);
  if ('error' in guard) return guard.error;

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10) || 1;
    const limit = parseInt(searchParams.get('limit') || '10', 10) || 10;
    const status = searchParams.get('status') || undefined;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;

    // Use withRetry helper for better prepared statement error handling
    const [items, total] = await Promise.all([
      withRetry(() =>
        prisma.article.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            status: true,
            authorName: true,
            authorEmail: true,
            createdAt: true,
          },
        }),
        5, // More retries
        200 // Longer delay
      ),
      withRetry(() => prisma.article.count({ where }), 5, 200),
    ]);

    return NextResponse.json({
      articles: items || [],
      pagination: { page, limit, total: total || 0, pages: Math.ceil((total || 0) / limit) },
    });
  } catch (err: any) {
    console.error('Admin articles error:', err);
    // Log technical details but return user-friendly message
    if (err?.message?.includes('prepared statement')) {
      console.error('Prepared statement error detected. Check Supabase connection pooler mode.');
    }
    return NextResponse.json({ error: 'Failed to load articles. Please try again.' }, { status: 500 });
  }
}



