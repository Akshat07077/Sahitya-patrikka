import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, subject, phone, organization } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const contact = await prisma.contactSubmission.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        subject: subject?.trim() || 'General Inquiry',
        phone: phone?.trim(),
        organization: organization?.trim(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message!',
      contact,
    });
  } catch (err: any) {
    console.error('Contact submission error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

