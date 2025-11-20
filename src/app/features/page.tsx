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

export default function FeaturesPage() {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Fetch featured articles - you may want to add a featured flag to your API
        const res = await apiFetch<{ articles: Article[] }>(`/api/articles?limit=12`);
        // For now, we'll show the first few as featured
        setFeaturedArticles(res.articles?.slice(0, 6) || []);
      } catch {
        setFeaturedArticles([]);
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
            <h1 className="text-4xl md:text-5xl font-display font-bold">विशेष अंक</h1>
            <p className="text-xl text-white/90">
              साहित्य संस्कृति : त्रैमासिक हिंदी पत्रिका
            </p>
            <p className="text-lg text-white/80 mt-4">
              चयनित विशेष लेख और महत्वपूर्ण शोध
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12">
            <div className="card p-8 md:p-10 mb-8">
              <h2 className="text-3xl font-display font-bold text-primary-800 mb-4 text-center">
                विशेष अंक के बारे में
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-center max-w-3xl mx-auto">
                विशेष अंक में हम चयनित महत्वपूर्ण लेख, शोध और विश्लेषण प्रकाशित करते हैं। 
                ये लेख विशेष रूप से महत्वपूर्ण विषयों पर गहन शोध और विचार प्रस्तुत करते हैं।
              </p>
            </div>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
              <p className="mt-4 text-gray-600">विशेष लेख लोड हो रहे हैं...</p>
            </div>
          )}

          {!loading && featuredArticles.length === 0 && (
            <div className="max-w-2xl mx-auto card p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">कोई विशेष लेख नहीं मिला</h3>
              <p className="text-gray-600 mb-6">जल्द ही विशेष लेख उपलब्ध होंगे</p>
              <Link href="/articles" className="btn btn-primary">
                सभी लेख देखें
              </Link>
            </div>
          )}

          {!loading && featuredArticles.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.id}`}
                    className="card p-6 hover:scale-105 transition-transform group relative"
                  >
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-accent-600 text-white rounded-full text-xs font-semibold">
                        विशेष
                      </span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-display text-xl font-semibold text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-2 pr-16">
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

