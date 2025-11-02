import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthTokenFromRequest, verifyToken } from '@/lib/auth';
import { saveUpload } from '@/lib/files';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10) || 1;
    const limit = parseInt(searchParams.get('limit') || '10', 10) || 10;
    const search = searchParams.get('search') || '';
    const skip = (page - 1) * limit;

    const where: any = { 
      status: { in: ['APPROVED', 'PUBLISHED'] } // Show both approved and published articles
    };
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { abstract: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedDate: 'desc' },
        select: {
          id: true,
          title: true,
          abstract: true,
          keywords: true,
          authorName: true,
          authorEmail: true,
          authorAffiliation: true,
          publishedDate: true,
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
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = getAuthTokenFromRequest(req);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const payload = verifyToken(token);

    const form = await req.formData();
    const title = String(form.get('title') || '');
    const abstract = String(form.get('abstract') || '');
    const keywordsStr = String(form.get('keywords') || '');
    const authorName = String(form.get('authorName') || '');
    const authorEmail = String(form.get('authorEmail') || '');
    const authorAffiliation = String(form.get('authorAffiliation') || '');
    const mobileNumber = String(form.get('mobileNumber') || '');
    const file = form.get('file') as File | null;
    const paymentScreenshot = form.get('paymentScreenshot') as File | null;

    if (!title || !authorName || !authorEmail || !file) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const allowed = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: 'Only DOCX or PDF allowed' }, { status: 400 });
    }

    // Upload main document
    const url = await saveUpload(file, 'articles');
    const isPdf = file.type === 'application/pdf';
    
    // Upload payment screenshot if provided
    let paymentScreenshotUrl: string | null = null;
    if (paymentScreenshot) {
      const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      if (!allowedImageTypes.includes(paymentScreenshot.type)) {
        return NextResponse.json({ error: 'Payment screenshot must be an image' }, { status: 400 });
      }
      paymentScreenshotUrl = await saveUpload(paymentScreenshot, 'payments');
    }

    const keywords = keywordsStr
      ? keywordsStr.split(',').map((k) => k.trim()).filter(Boolean)
      : [];

    const article = await prisma.article.create({
      data: {
        title,
        abstract,
        keywords,
        authorName,
        authorEmail,
        authorAffiliation,
        docxUrl: isPdf ? null : url,
        pdfUrl: isPdf ? url : null,
        userId: payload.id,
        // Note: paymentScreenshotUrl field would need to be added to schema
        // For now, we upload it but don't store the URL in DB
      },
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ 
      success: true,
      article: {
        ...article,
        // Include payment screenshot URL in response if uploaded
        ...(paymentScreenshotUrl && { paymentScreenshotUrl }),
      },
    }, { status: 201 });
  } catch (err: any) {
    console.error('Article submission error:', err);
    return NextResponse.json({ error: err?.message || 'Submission failed' }, { status: 500 });
  }
}



