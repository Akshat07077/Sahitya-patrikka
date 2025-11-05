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

    // Retry logic for prepared statement errors (Supabase pooler issue)
    let items, total;
    let retries = 3;
    
    while (retries > 0) {
      try {
        [items, total] = await Promise.all([
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
        break; // Success, exit retry loop
      } catch (err: any) {
        retries--;
        // Check if it's a prepared statement error
        if (err?.message?.includes('prepared statement') && retries > 0) {
          // Wait a bit before retrying (allows connection pool to reset)
          await new Promise(resolve => setTimeout(resolve, 100));
          continue;
        }
        throw err; // Re-throw if not a prepared statement error or out of retries
      }
    }

    return NextResponse.json({
      articles: items || [],
      pagination: { page, limit, total: total || 0, pages: Math.ceil((total || 0) / limit) },
    });
  } catch (err: any) {
    console.error('Admin articles error:', err);
    // Check if it's a prepared statement error
    if (err?.message?.includes('prepared statement')) {
      return NextResponse.json({ 
        error: 'Database connection error. Please verify you are using SESSION mode pooler (not Transaction mode) in Supabase.',
        details: 'Get Session mode URL from: Supabase Dashboard > Settings > Database > Connection Pooling > Session mode'
      }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to load articles' }, { status: 500 });
  }
}



