import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/roles';
import { saveUpload } from '@/lib/files';

export async function POST(req: NextRequest) {
  const guard = requireRole(req, ['ADMIN', 'EDITOR']);
  if ('error' in guard) return guard.error;

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      );
    }

    // Validate file type (images only)
    const allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only PNG, JPG, JPEG, or WEBP images are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    const photoUrl = await saveUpload(file, 'editorial-photos');

    return NextResponse.json({
      success: true,
      photo_url: photoUrl,
    });
  } catch (err: any) {
    console.error('Photo upload error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to upload photo' },
      { status: 500 }
    );
  }
}
