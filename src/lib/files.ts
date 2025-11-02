import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function saveUpload(file: File, subdir: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadsDir = path.join(process.cwd(), 'uploads', subdir);
  await mkdir(uploadsDir, { recursive: true });
  const ext = file.name.split('.').pop() || 'bin';
  const base = path.basename(file.name, `.${ext}`);
  const filename = `${base}-${Date.now()}.${ext}`.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filePath = path.join(uploadsDir, filename);
  await writeFile(filePath, buffer);
  // Return a relative URL that can be served by a static handler later; for dev, use /uploads
  return `/uploads/${subdir}/${filename}`;
}



