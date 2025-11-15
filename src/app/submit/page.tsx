"use client";

import { useEffect, useState } from 'react';
import { apiFetch, getToken } from '@/lib/api';
import { useRouter } from 'next/navigation';
import mammoth from 'mammoth';

export default function SubmitPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [keywords, setKeywords] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorAffiliation, setAuthorAffiliation] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [guidelinesContent, setGuidelinesContent] = useState<string>('');
  const [loadingGuidelines, setLoadingGuidelines] = useState(false);

  useEffect(() => {
    if (!getToken()) router.push('/auth/login');
  }, [router]);

  const loadGuidelines = async () => {
    setLoadingGuidelines(true);
    setGuidelinesContent(''); // Clear previous content
    try {
      // The document is in Hindi, but we'll support both languages
      // For now, we load the same document for both languages
      // In the future, you can have separate files for English and Hindi
      const filename = 'साहित्य_संस्कृति_त्रैमासिक_हिंदी_पत्रिका.docx';
      const response = await fetch(`/${encodeURIComponent(filename)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch guidelines document');
      }
      const arrayBuffer = await response.arrayBuffer();
      
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setGuidelinesContent(result.value);
    } catch (err) {
      console.error('Error loading guidelines:', err);
      setGuidelinesContent('<p class="text-red-600">Error loading guidelines. Please try again later.</p>');
    } finally {
      setLoadingGuidelines(false);
    }
  };

  useEffect(() => {
    if (showGuidelines) {
      loadGuidelines();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showGuidelines]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOk(null);
    if (!file) {
      setError('Please select a DOCX or PDF file');
      return;
    }
    const form = new FormData();
    form.set('title', title);
    form.set('abstract', abstract);
    form.set('keywords', keywords);
    form.set('authorName', authorName);
    form.set('authorEmail', authorEmail);
    form.set('authorAffiliation', authorAffiliation);
    form.set('file', file);
    setLoading(true);
    try {
      await apiFetch(`/api/articles`, { method: 'POST', body: form });
      setOk('Article submitted successfully');
      setTitle(''); setAbstract(''); setKeywords('');
      setAuthorName(''); setAuthorEmail(''); setAuthorAffiliation(''); setFile(null);
    } catch (err: any) {
      setError(err.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">Submit Your Article</h1>
            <p className="text-xl text-white/90">
              Share your research and contribute to the literary discourse
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Guidelines Section */}
            <div className="mb-6 card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display font-bold text-primary-800 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Submission Guidelines
                </h2>
                <button
                  type="button"
                  onClick={() => setShowGuidelines(!showGuidelines)}
                  className="btn btn-outline text-sm flex items-center gap-2"
                >
                  {showGuidelines ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      Hide Guidelines
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      View Guidelines
                    </>
                  )}
                </button>
              </div>

              {showGuidelines && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  {loadingGuidelines ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-700 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading guidelines...</p>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="guidelines-content max-h-[600px] overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-200"
                      dangerouslySetInnerHTML={{ __html: guidelinesContent }}
                    />
                  )}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <a
                      href={`/${encodeURIComponent('साहित्य_संस्कृति_त्रैमासिक_हिंदी_पत्रिका.docx')}`}
                      download
                      className="inline-flex items-center gap-2 text-sm text-primary-700 hover:text-primary-800 font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Guidelines Document
                    </a>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            {ok && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700">{ok}</p>
              </div>
            )}
            <div className="card p-8 md:p-10">
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Article Title <span className="text-red-500">*</span>
                  </label>
                  <input 
                    className="input w-full text-base" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Enter the title of your article"
                    required 
                  />
                </div>
                
        <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Abstract <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    className="input w-full text-base" 
                    rows={6} 
                    value={abstract} 
                    onChange={(e) => setAbstract(e.target.value)} 
                    placeholder="Provide a brief summary of your research"
                    required 
                  />
        </div>
                
        <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Keywords (comma separated)
                  </label>
                  <input 
                    className="input w-full text-base" 
                    value={keywords} 
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g., literature, culture, Sanskrit, Hindi"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple keywords with commas</p>
        </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Author Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      className="input w-full text-base" 
                      value={authorName} 
                      onChange={(e) => setAuthorName(e.target.value)} 
                      required 
                    />
          </div>
          <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Author Email <span className="text-red-500">*</span>
                    </label>
                    <input 
                      className="input w-full text-base" 
                      type="email" 
                      value={authorEmail} 
                      onChange={(e) => setAuthorEmail(e.target.value)} 
                      required 
                    />
          </div>
        </div>
                
        <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Author Affiliation
                  </label>
                  <input 
                    className="input w-full text-base" 
                    value={authorAffiliation} 
                    onChange={(e) => setAuthorAffiliation(e.target.value)}
                    placeholder="University, Institution, etc."
                  />
        </div>
                
        <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Article File (DOCX/PDF, max 10MB) <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-500 transition-colors">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer rounded-md font-medium text-primary-700 hover:text-primary-600">
                          <span>Upload a file</span>
                          <input 
                            type="file" 
                            accept=".docx,.pdf" 
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            className="sr-only"
                            required
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">DOCX or PDF up to 10MB</p>
                      {file && (
                        <p className="text-sm text-primary-700 font-medium mt-2">{file.name}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button 
                    disabled={loading} 
                    className="btn btn-primary w-full py-3 text-base font-semibold" 
                    type="submit"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Article'
                    )}
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Your submission will be reviewed by our editorial board
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


