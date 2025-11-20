"use client";

import Link from 'next/link';

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">मीडिया</h1>
            <p className="text-xl text-white/90">
              साहित्य संस्कृति : त्रैमासिक हिंदी पत्रिका
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Media Gallery Item */}
              <div className="card p-6 hover:scale-105 transition-transform group">
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-900 group-hover:text-primary-700 transition-colors mb-2">
                  वीडियो गैलरी
                </h3>
                <p className="text-gray-600 text-sm">
                  पत्रिका से संबंधित वीडियो और साक्षात्कार
                </p>
              </div>

              <div className="card p-6 hover:scale-105 transition-transform group">
                <div className="aspect-video bg-gradient-to-br from-accent-100 to-accent-200 rounded-lg mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-900 group-hover:text-primary-700 transition-colors mb-2">
                  फोटो गैलरी
                </h3>
                <p className="text-gray-600 text-sm">
                  पत्रिका की महत्वपूर्ण घटनाओं की तस्वीरें
                </p>
              </div>

              <div className="card p-6 hover:scale-105 transition-transform group">
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-900 group-hover:text-primary-700 transition-colors mb-2">
                  ऑडियो संग्रह
                </h3>
                <p className="text-gray-600 text-sm">
                  पॉडकास्ट और ऑडियो सामग्री
                </p>
              </div>
            </div>

            <div className="card p-8 md:p-10">
              <h2 className="text-3xl font-display font-bold text-primary-800 mb-6 text-center">
                मीडिया कवरेज
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-primary-600 pl-6 py-4">
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                    प्रेस रिलीज़
                  </h3>
                  <p className="text-gray-600 mb-3">
                    पत्रिका की नवीनतम घोषणाएँ और समाचार
                  </p>
                  <p className="text-sm text-gray-500">
                    जल्द ही उपलब्ध होगा
                  </p>
                </div>

                <div className="border-l-4 border-accent-600 pl-6 py-4">
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                    मीडिया साझेदारी
                  </h3>
                  <p className="text-gray-600 mb-3">
                    हमारे मीडिया साझेदारों के साथ सहयोग
                  </p>
                  <p className="text-sm text-gray-500">
                    जल्द ही उपलब्ध होगा
                  </p>
                </div>

                <div className="border-l-4 border-primary-600 pl-6 py-4">
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                    संपर्क
                  </h3>
                  <p className="text-gray-600 mb-3">
                    मीडिया संबंधी प्रश्नों के लिए, कृपया हमसे संपर्क करें
                  </p>
                  <Link href="/contact" className="btn btn-primary inline-block mt-2">
                    संपर्क करें
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

