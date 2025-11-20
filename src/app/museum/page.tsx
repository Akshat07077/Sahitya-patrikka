"use client";

import Link from 'next/link';

export default function MuseumPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">संग्रहालय</h1>
            <p className="text-xl text-white/90">
              साहित्य संस्कृति : त्रैमासिक हिंदी पत्रिका
            </p>
            <p className="text-lg text-white/80 mt-4">
              पत्रिका के ऐतिहासिक अंकों और महत्वपूर्ण संग्रह का डिजिटल संग्रहालय
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-10 mb-8">
              <h2 className="text-3xl font-display font-bold text-primary-800 mb-6 text-center">
                डिजिटल संग्रहालय
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6 text-center">
                यहाँ आप पत्रिका के ऐतिहासिक अंकों, महत्वपूर्ण लेखों और संग्रह को देख सकते हैं। 
                हमारा डिजिटल संग्रहालय साहित्य और संस्कृति के इतिहास को संरक्षित करने के लिए समर्पित है।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="card p-6 hover:scale-105 transition-transform group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-semibold text-gray-900 group-hover:text-primary-700 transition-colors mb-2 text-center">
                  ऐतिहासिक अंक
                </h3>
                <p className="text-gray-600 text-center">
                  पत्रिका के पुराने और महत्वपूर्ण अंकों का संग्रह
                </p>
              </div>

              <div className="card p-6 hover:scale-105 transition-transform group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-accent flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-semibold text-gray-900 group-hover:text-primary-700 transition-colors mb-2 text-center">
                  महत्वपूर्ण लेख
                </h3>
                <p className="text-gray-600 text-center">
                  ऐतिहासिक और महत्वपूर्ण लेखों का संग्रह
                </p>
              </div>

              <div className="card p-6 hover:scale-105 transition-transform group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-semibold text-gray-900 group-hover:text-primary-700 transition-colors mb-2 text-center">
                  विद्वानों का संग्रह
                </h3>
                <p className="text-gray-600 text-center">
                  प्रतिष्ठित लेखकों और विद्वानों के योगदान
                </p>
              </div>

              <div className="card p-6 hover:scale-105 transition-transform group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-semibold text-gray-900 group-hover:text-primary-700 transition-colors mb-2 text-center">
                  दुर्लभ संग्रह
                </h3>
                <p className="text-gray-600 text-center">
                  दुर्लभ और विशेष संग्रह सामग्री
                </p>
              </div>
            </div>

            <div className="card p-8 text-center">
              <h3 className="text-2xl font-display font-semibold text-primary-800 mb-4">
                संग्रहालय ब्राउज़ करें
              </h3>
              <p className="text-gray-600 mb-6">
                पत्रिका के सभी अंकों और लेखों को देखने के लिए
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/articles" className="btn btn-primary px-8">
                  सभी अंक देखें
                </Link>
                <Link href="/features" className="btn btn-outline px-8">
                  विशेष अंक
                </Link>
              </div>
            </div>

            <div className="mt-8 card p-8">
              <h3 className="text-2xl font-display font-semibold text-primary-800 mb-4 text-center">
                संग्रहालय के बारे में
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  हमारा डिजिटल संग्रहालय हिंदी साहित्य और संस्कृति के संरक्षण के लिए समर्पित है। 
                  यहाँ आप पत्रिका के सभी ऐतिहासिक अंकों, महत्वपूर्ण लेखों और विद्वानों के योगदान को देख सकते हैं।
                </p>
                <p>
                  हम निरंतर अपने संग्रह को बढ़ा रहे हैं और नए अंकों को जोड़ रहे हैं ताकि 
                  शोधकर्ताओं और साहित्य प्रेमियों को एक व्यापक संसाधन उपलब्ध हो सके।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

