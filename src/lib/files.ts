import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { supabaseAdmin } from './supabase';

export async function saveUpload(file: File, subdir: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split('.').pop() || 'bin';
  const base = path.basename(file.name, `.${ext}`);
  const filename = `${base}-${Date.now()}.${ext}`.replace(/[^a-zA-Z0-9._-]/g, '_');

  // Use Supabase Storage in production/serverless
  if (supabaseAdmin && (process.env.NODE_ENV === 'production' || process.env.VERCEL)) {
    try {
      // Map subdir to Supabase bucket names
      const bucketMap: Record<string, string> = {
        'articles': 'documents',
        'payments': 'payments',
        'editorial-photos': 'editorial-photos',
      };
      const bucket = bucketMap[subdir] || subdir;

      // Upload to Supabase Storage
      const { data, error } = await supabaseAdmin.storage
        .from(bucket)
        .upload(filename, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        console.error('Supabase upload error:', error);
        throw error;
      }

      // Get public URL for the file
      const { data: urlData } = supabaseAdmin.storage
        .from(bucket)
        .getPublicUrl(filename);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Failed to upload to Supabase Storage, falling back to local:', error);
      // Fall through to local storage
    }
  }

  // Fallback to local filesystem (for development)
  const uploadsDir = path.join(process.cwd(), 'uploads', subdir);
  await mkdir(uploadsDir, { recursive: true });
  const filePath = path.join(uploadsDir, filename);
  await writeFile(filePath, buffer);
  // Return a relative URL that can be served by a static handler later
  return `/uploads/${subdir}/${filename}`;
}



