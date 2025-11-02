import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const article = await prisma.article.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        abstract: true,
        keywords: true,
        authorName: true,
        authorEmail: true,
        authorAffiliation: true,
        docxUrl: true,
        pdfUrl: true,
        status: true,
        submissionDate: true,
        publishedDate: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ article });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}



