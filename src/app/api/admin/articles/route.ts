import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/roles';

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

    const [items, total] = await Promise.all([
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
      prisma.article.count({ where }),
    ]);

    return NextResponse.json({
      articles: items,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to load articles' }, { status: 500 });
  }
}



