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

      {/* Social Media & Parivar Section */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto space-y-8 mb-12">
            {/* Social Media Block */}
            <div className="card p-6 md:p-8">
              <h3 className="text-2xl font-display font-bold text-primary-800 mb-6 text-center">
                सोशल मीडिया
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-all hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:opacity-90 flex items-center justify-center text-white transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-black hover:bg-gray-800 flex items-center justify-center text-white transition-all hover:scale-110"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white transition-all hover:scale-110"
                  aria-label="YouTube"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* Telegram */}
                <a
                  href="https://telegram.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white transition-all hover:scale-110"
                  aria-label="Telegram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.559z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-all hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>

                {/* Email */}
                <a
                  href="mailto:sahityasanskritipatrika@gmail.com"
                  className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-800 flex items-center justify-center text-white transition-all hover:scale-110"
                  aria-label="Email"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Parivar (Team) Block */}
            <div className="card p-6 md:p-8">
              <h3 className="text-2xl font-display font-bold text-primary-800 mb-6 text-center">
                साहित्य संस्कृति परिवार
              </h3>
              <div className="space-y-3">
                {/* <Link
                  href="/parivar/founder"
                  className="block w-full px-4 py-3 bg-primary-50 hover:bg-primary-100 rounded-lg text-center font-medium text-primary-800 transition-all hover:scale-105"
                >
                  संस्थापक
                </Link> */}
                <Link
                  href="/parivar/patron"
                  className="block w-full px-4 py-3 bg-primary-50 hover:bg-primary-100 rounded-lg text-center font-medium text-primary-800 transition-all hover:scale-105"
                >
                  संरक्षक
                </Link>
                <Link
                  href="/parivar/advisory"
                  className="block w-full px-4 py-3 bg-primary-50 hover:bg-primary-100 rounded-lg text-center font-medium text-primary-800 transition-all hover:scale-105"
                >
                  परामर्श मंडल
                </Link>
                <Link
                  href="/parivar/editorial"
                  className="block w-full px-4 py-3 bg-primary-50 hover:bg-primary-100 rounded-lg text-center font-medium text-primary-800 transition-all hover:scale-105"
                >
                  संपादक मण्डल
                </Link>
                <Link
                  href="/parivar/expert"
                  className="block w-full px-4 py-3 bg-primary-50 hover:bg-primary-100 rounded-lg text-center font-medium text-primary-800 transition-all hover:scale-105"
                >
                  विशेषज्ञ समिति
                </Link>
                {/* <Link
                  href="/parivar/members"
                  className="block w-full px-4 py-3 bg-primary-50 hover:bg-primary-100 rounded-lg text-center font-medium text-primary-800 transition-all hover:scale-105"
                >
                  सक्रिय सहयोगी सदस्य
                </Link> */}
                <Link
                  href="/parivar/technical"
                  className="block w-full px-4 py-3 bg-primary-50 hover:bg-primary-100 rounded-lg text-center font-medium text-primary-800 transition-all hover:scale-105"
                >
                  तकनीकी टीम
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
