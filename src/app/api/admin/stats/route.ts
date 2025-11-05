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
    
    // Log technical details but return user-friendly message
    if (err?.message?.includes('prepared statement')) {
      console.error('Prepared statement error detected. Check Supabase connection pooler mode.');
    }
    
    return NextResponse.json({ error: 'Failed to load statistics. Please try again.' }, { status: 500 });
  }
}

