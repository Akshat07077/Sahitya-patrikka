"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';

type Article = { 
  id: string; 
  title: string; 
  abstract: string | null; 
  keywords: string[]; 
  authorName: string; 
  publishedDate: string | null;
};

export default function ViewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch<{ articles: Article[] }>(`/api/articles?limit=12`);
        setArticles(res.articles || []);
      } catch {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">विचार</h1>
            <p className="text-xl text-white/90">
              साहित्य संस्कृति : त्रैमासिक हिंदी पत्रिका
            </p>
            <p className="text-lg text-white/80 mt-4">
              विभिन्न विषयों पर विद्वानों के विचार और मत
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-8">
            <p className="text-center text-gray-600 text-lg max-w-3xl mx-auto">
              यहाँ आप विभिन्न विषयों पर विद्वानों, शोधकर्ताओं और साहित्यकारों के विचार और मत पढ़ सकते हैं। 
              ये लेख साहित्य, संस्कृति, समाज और अन्य महत्वपूर्ण विषयों पर गहन विश्लेषण प्रस्तुत करते हैं।
            </p>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
              <p className="mt-4 text-gray-600">लेख लोड हो रहे हैं...</p>
            </div>
          )}

          {!loading && articles.length === 0 && (
            <div className="max-w-2xl mx-auto card p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">कोई लेख नहीं मिला</h3>
              <p className="text-gray-600 mb-6">अभी तक कोई विचार लेख प्रकाशित नहीं किए गए हैं</p>
              <Link href="/submit" className="btn btn-primary">
                लेख जमा करें
              </Link>
            </div>
          )}

          {!loading && articles.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.id}`}
                    className="card p-6 hover:scale-105 transition-transform group"
                  >
                    <div className="space-y-3">
                      <h3 className="font-display text-xl font-semibold text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      {article.abstract && (
                        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                          {article.abstract}
                        </p>
                      )}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-sm font-medium text-primary-700">{article.authorName}</span>
                        {article.publishedDate && (
                          <span className="text-xs text-gray-500">
                            {new Date(article.publishedDate).toLocaleDateString('hi-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        )}
                      </div>
                      {article.keywords && article.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {article.keywords.slice(0, 3).map((keyword: string, idx: number) => (
                            <span key={idx} className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link href="/articles" className="btn btn-primary px-8">
                  सभी लेख देखें
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

