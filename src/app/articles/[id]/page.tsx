"use client";

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

type Article = {
  id: string;
  title: string;
  abstract: string | null;
  keywords: string[];
  authorName: string;
  authorEmail: string;
  authorAffiliation: string | null;
  docxUrl: string | null;
  pdfUrl: string | null;
  status: string;
  publishedDate: string | null;
  createdAt: string;
};

// Helper function to normalize file URLs
function normalizeFileUrl(url: string | null): string | null {
  if (!url) return null;
  
  // If it's already our API route, return as is
  if (url.startsWith('/api/files/')) return url;
  
  // If it's a local upload path, add /api prefix
  if (url.startsWith('/uploads/')) return `/api${url}`;
  
  // If it's an old Supabase URL, extract filename and convert to our API route
  // Pattern: https://[project].supabase.co/storage/v1/object/public/documents/[filename]
  const supabaseMatch = url.match(/\/storage\/v1\/object\/public\/(documents|payments|editorial-photos)\/(.+)$/);
  if (supabaseMatch) {
    const [, bucket, filename] = supabaseMatch;
    return `/api/files/${bucket}/${filename}`;
  }
  
  // Return as is for other URLs
  return url;
}

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch<{ article: Article }>(`/api/articles/${params.id}`);
        setArticle(res.article);
      } catch (e: any) {
        setError(e.message || 'Article not found');
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The article you are looking for does not exist.'}</p>
          <Link href="/articles" className="btn btn-primary">
            Browse Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-6">
            <Link href="/articles" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Articles
            </Link>
            <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium">{article.authorName}</span>
              </div>
              {article.authorAffiliation && (
                <span className="text-sm">{article.authorAffiliation}</span>
              )}
              {article.publishedDate && (
                <div className="flex items-center text-sm">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(article.publishedDate).toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-12">
              {/* Keywords */}
              {article.keywords && article.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.keywords.map((keyword, idx) => (
                    <span key={idx} className="text-sm px-3 py-1 rounded-full bg-primary-100 text-primary-700 font-medium">
                      {keyword}
                    </span>
                  ))}
                </div>
              )}

              {/* Abstract */}
              {article.abstract && (
                <div className="mb-8">
                  <h2 className="text-2xl font-display font-semibold text-primary-800 mb-4">Abstract</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">{article.abstract}</p>
                </div>
              )}

              {/* Document Viewer */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-display font-semibold text-primary-800 mb-4">Article Document</h3>
                
                {(() => {
                  const pdfUrl = normalizeFileUrl(article.pdfUrl);
                  const docxUrl = normalizeFileUrl(article.docxUrl);
                  
                  return (
                    <>
                      {pdfUrl && (
                        <div className="space-y-4">
                          <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                            <iframe
                              src={pdfUrl}
                              className="w-full h-[600px] md:h-[800px]"
                              title="PDF Viewer"
                            />
                          </div>
                          <div className="flex gap-3">
                            <a
                              href={pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline flex items-center justify-center gap-2"
                              download
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Download PDF
                            </a>
                          </div>
                        </div>
                      )}

                      {docxUrl && (
                        <div className="space-y-4">
                          <div className="border border-gray-200 rounded-lg p-8 bg-gray-50 text-center">
                            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <p className="text-gray-600 mb-4">
                              DOCX files cannot be displayed in the browser. Please download to view.
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <a
                              href={docxUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary flex items-center justify-center gap-2"
                              download
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Download DOCX
                            </a>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}

                {!article.pdfUrl && !article.docxUrl && (
                  <div className="border border-gray-200 rounded-lg p-8 bg-gray-50 text-center">
                    <p className="text-gray-600">No document available for this article.</p>
                  </div>
                )}
              </div>

              {/* Author Contact */}
              <div className="border-t border-gray-200 pt-8 mt-8">
                <h3 className="text-xl font-display font-semibold text-primary-800 mb-4">Author Information</h3>
                <div className="space-y-2 text-gray-700">
                  <p className="font-medium">{article.authorName}</p>
                  {article.authorAffiliation && <p>{article.authorAffiliation}</p>}
                  <a href={`mailto:${article.authorEmail}`} className="text-primary-700 hover:text-primary-800 transition-colors">
                    {article.authorEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

