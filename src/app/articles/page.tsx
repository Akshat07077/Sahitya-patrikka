"use client";

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';

type Article = { 
  id: string; 
  title: string; 
  abstract: string | null; 
  keywords: string[]; 
  authorName: string; 
  authorEmail: string;
  authorAffiliation: string | null;
  publishedDate: string | null;
};

export default function ArticlesPage() {
  const [items, setItems] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const url = `/api/articles?limit=20${search ? `&search=${encodeURIComponent(search)}` : ''}`;
        const res = await apiFetch<{ articles: Article[] }>(url);
        setItems(res.articles || []);
      } catch (e: any) {
        setError(e.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">Published Articles</h1>
            <p className="text-xl text-white/90">
              Explore our collection of scholarly research and literary works
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles by title or keywords..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input w-full pl-12 pr-4 py-3 text-base"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
              <p className="mt-4 text-gray-600">Loading articles...</p>
            </div>
          )}

          {error && (
            <div className="max-w-2xl mx-auto card p-6 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <div className="max-w-2xl mx-auto card p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">Be the first to publish an article!</p>
              <Link href="/submit" className="btn btn-primary">
                Submit Article
              </Link>
            </div>
          )}

          {!loading && !error && items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((article) => (
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
                      <div>
                        <span className="text-sm font-medium text-primary-700">{article.authorName}</span>
                        {article.authorAffiliation && (
                          <p className="text-xs text-gray-500 mt-1">{article.authorAffiliation}</p>
                        )}
                      </div>
                      {article.publishedDate && (
                        <span className="text-xs text-gray-500">
                          {new Date(article.publishedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                    {article.keywords && article.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {article.keywords.slice(0, 4).map((keyword, idx) => (
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
          )}
        </div>
      </section>
    </div>
  );
}



