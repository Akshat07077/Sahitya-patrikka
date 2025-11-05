import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/roles';
import { withRetry } from '@/lib/prisma-retry';

export async function GET(req: NextRequest) {
  const guard = requireRole(req, ['ADMIN', 'EDITOR']);
  if ('error' in guard) return guard.error;

  try {
    // Get all stats with retry logic
    const [totalArticles, pendingArticles, approvedArticles, rejectedArticles, publishedArticles, totalUsers, totalContacts] = await Promise.all([
      withRetry(() => prisma.article.count(), 5, 150),
      withRetry(() => prisma.article.count({ where: { status: 'PENDING' } }), 5, 150),
      withRetry(() => prisma.article.count({ where: { status: 'APPROVED' } }), 5, 150),
      withRetry(() => prisma.article.count({ where: { status: 'REJECTED' } }), 5, 150),
      withRetry(() => prisma.article.count({ where: { status: 'PUBLISHED' } }), 5, 150),
      withRetry(() => prisma.user.count(), 5, 150),
      withRetry(() => prisma.contactSubmission.count(), 5, 150),
    ]);

    return NextResponse.json({
      totalArticles,
      pendingArticles,
      approvedArticles,
      rejectedArticles,
      publishedArticles,
      totalUsers,
      totalContacts,
    });
  } catch (err: any) {
    console.error('Stats error:', err);
    
    // Check if it's a prepared statement error
    if (err?.message?.includes('prepared statement')) {
      return NextResponse.json({ 
        error: 'Database connection error. Please verify you are using SESSION mode pooler in Supabase.',
        details: 'Get Session mode URL from: Supabase Dashboard > Settings > Database > Connection Pooling > Session mode'
      }, { status: 500 });
    }
    
    return NextResponse.json({ error: 'Failed to load stats' }, { status: 500 });
  }
}

