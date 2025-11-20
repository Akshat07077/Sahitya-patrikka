"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

type NewsItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
};

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated news data - replace with actual API call
    setTimeout(() => {
      setNewsItems([
        {
          id: '1',
          title: 'नया अंक प्रकाशित: त्रैमासिक हिंदी पत्रिका का नवीनतम संस्करण',
          description: 'साहित्य संस्कृति पत्रिका का नवीनतम अंक अब उपलब्ध है। इस अंक में विभिन्न विषयों पर शोधपूर्ण लेख शामिल हैं।',
          date: new Date().toISOString(),
          category: 'प्रकाशन'
        },
        {
          id: '2',
          title: 'संपादक मंडल में नए सदस्यों का स्वागत',
          description: 'हम अपने संपादक मंडल में नए विद्वानों का स्वागत करते हैं जो पत्रिका की गुणवत्ता में योगदान देंगे।',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'समाचार'
        },
        {
          id: '3',
          title: 'लेख जमा करने की अंतिम तिथि',
          description: 'अगले अंक के लिए लेख जमा करने की अंतिम तिथि नजदीक आ रही है। कृपया समय पर अपने लेख जमा करें।',
          date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'सूचना'
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">समाचार</h1>
            <p className="text-xl text-white/90">
              साहित्य संस्कृति : त्रैमासिक हिंदी पत्रिका
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
                <p className="mt-4 text-gray-600">समाचार लोड हो रहे हैं...</p>
              </div>
            )}

            {!loading && newsItems.length === 0 && (
              <div className="card p-12 text-center">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">कोई समाचार नहीं मिला</h3>
                <p className="text-gray-600">जल्द ही नए समाचार उपलब्ध होंगे</p>
              </div>
            )}

            {!loading && newsItems.length > 0 && (
              <div className="space-y-6">
                {newsItems.map((item) => (
                  <div key={item.id} className="card p-6 md:p-8 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                            {item.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(item.date).toLocaleDateString('hi-IN', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">
                          {item.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-12 card p-8 text-center">
              <h3 className="text-2xl font-display font-semibold text-primary-800 mb-4">
                नवीनतम अपडेट प्राप्त करें
              </h3>
              <p className="text-gray-600 mb-6">
                पत्रिका की नवीनतम समाचार और अपडेट के लिए हमसे जुड़ें
              </p>
              <Link href="/contact" className="btn btn-primary">
                संपर्क करें
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

