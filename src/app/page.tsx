"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

type Article = { 
  id: string; 
  title: string; 
  abstract: string | null; 
  keywords: string[]; 
  authorName: string; 
  publishedDate: string | null;
};

export default function HomePage() {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch<{ articles: Article[] }>(`/api/articles?limit=3`);
        setFeaturedArticles(res.articles || []);
      } catch {
        setFeaturedArticles([]);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-primary text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container-custom section-padding">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              Welcome to
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              Sahitya Sanskriti Patrika
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
              A premier platform for literary and cultural research, scholarly articles, and academic discourse in Hindi and Sanskrit literature.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/articles" className="btn bg-white text-primary-800 hover:bg-gray-100 px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                Explore Articles
              </Link>
              <Link href="/submit" className="btn border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-base font-semibold backdrop-blur-sm">
                Submit Your Work
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white">
            <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,69.3C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z"></path>
          </svg>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-display font-bold text-primary-800 mb-3">Featured Articles</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the latest research and scholarly works from our collection
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
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
                          {new Date(article.publishedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
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
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/submit" className="card p-8 text-center hover:shadow-xl transition-all group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-primary-800 mb-2">Submit Article</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Share your research and contribute to the literary and cultural discourse. Our peer-review process ensures quality.
              </p>
            </Link>

            <Link href="/editorial-board" className="card p-8 text-center hover:shadow-xl transition-all group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-primary-800 mb-2">Editorial Board</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Meet our distinguished editorial team of scholars, researchers, and experts in literature and cultural studies.
              </p>
            </Link>

            <Link href="/contact" className="card p-8 text-center hover:shadow-xl transition-all group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-primary-800 mb-2">Contact Us</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Have questions? Need assistance? Reach out to our team. We're here to help you.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding gradient-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Become part of a thriving community of scholars, researchers, and literature enthusiasts. 
            Share your work and discover groundbreaking research.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register" className="btn bg-white text-primary-800 hover:bg-gray-100 px-8 py-3 text-base font-semibold shadow-lg">
              Get Started
            </Link>
            <Link href="/articles" className="btn border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-base font-semibold">
              Browse Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
