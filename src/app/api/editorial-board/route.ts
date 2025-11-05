import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/roles';
import { withRetry } from '@/lib/prisma-retry';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeInactive = searchParams.get('includeInactive') === 'true';

    const where: any = {};
    if (!includeInactive) {
      where.isActive = true;
    }

    const members = await withRetry(() =>
      prisma.editorialBoard.findMany({
        where,
        orderBy: [
          { orderIndex: 'asc' },
          { createdAt: 'asc' },
        ],
        select: {
          id: true,
          name: true,
          title: true,
          affiliation: true,
          email: true,
          photoUrl: true,
          bio: true,
          isActive: true,
          orderIndex: true,
          createdAt: true,
          updatedAt: true,
        },
      })
    );

    return NextResponse.json({ members });
  } catch (err: any) {
    console.error('Editorial board fetch error:', err);
    
    // Check if it's a prepared statement error
    if (err?.message?.includes('prepared statement')) {
      return NextResponse.json({ 
        error: 'Database connection error. Please verify you are using SESSION mode pooler in Supabase.',
        details: 'Get Session mode URL from: Supabase Dashboard > Settings > Database > Connection Pooling > Session mode'
      }, { status: 500 });
    }
    
    return NextResponse.json(
      { error: err?.message || 'Failed to fetch editorial board' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const guard = requireRole(req, ['ADMIN', 'EDITOR']);
  if ('error' in guard) return guard.error;

  try {
    const body = await req.json();
    const {
      name,
      title,
      affiliation,
      email,
      photoUrl,
      bio,
      orderIndex,
    } = body || {};

    if (!name || !title || !affiliation) {
      return NextResponse.json(
        { error: 'Name, title, and affiliation are required' },
        { status: 400 }
      );
    }

    const member = await prisma.editorialBoard.create({
      data: {
        name: name.trim(),
        title: title.trim(),
        affiliation: affiliation.trim(),
        email: email?.trim().toLowerCase(),
        photoUrl: photoUrl?.trim(),
        bio: bio?.trim(),
        orderIndex: orderIndex || 0,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        title: true,
        affiliation: true,
        email: true,
        photoUrl: true,
        bio: true,
        isActive: true,
        orderIndex: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Editorial board member added successfully',
      member,
    });
  } catch (err: any) {
    console.error('Editorial board create error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to add editorial board member' },
      { status: 500 }
    );
  }
}
