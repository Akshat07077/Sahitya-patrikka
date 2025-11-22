"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ParivarLayoutProps = {
  children: React.ReactNode;
  title: string;
  category: string;
};

const categories = [
//   { key: 'founder', label: 'संस्थापक', path: '/parivar/founder' },
  { key: 'patron', label: 'संरक्षक', path: '/parivar/patron' },
  { key: 'advisory', label: 'परामर्श मंडल', path: '/parivar/advisory' },
  { key: 'editorial', label: 'संपादक मण्डल', path: '/parivar/editorial' },
  { key: 'expert', label: 'विशेषज्ञ समिति', path: '/parivar/expert' },
//   { key: 'members', label: 'सक्रिय सहयोगी सदस्य', path: '/parivar/members' },
  { key: 'technical', label: 'तकनीकी टीम', path: '/parivar/technical' },
];

export default function ParivarLayout({ children, title, category }: ParivarLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">{title}</h1>
            <p className="text-xl text-white/90">
              साहित्य संस्कृति : त्रैमासिक हिंदी पत्रिका
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Area */}
            <div className="flex-1">
              <div className="mb-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  वापस
                </Link>
              </div>
              <div className="border-b-2 border-primary-600 pb-3 mb-6">
                <h2 className="text-3xl font-display font-bold text-primary-800">{title}</h2>
              </div>
              {children}
            </div>

            {/* Right Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="card p-6 sticky top-24">
                <h3 className="text-xl font-display font-bold text-primary-800 mb-4">
                  इनके के बारे में
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => {
                    const isActive = pathname === cat.path;
                    return (
                      <Link
                        key={cat.key}
                        href={cat.path}
                        className={`block w-full px-4 py-3 rounded-lg text-center font-medium transition-all ${
                          isActive
                            ? 'bg-primary-600 text-white'
                            : 'bg-primary-50 text-primary-800 hover:bg-primary-100'
                        }`}
                      >
                        {cat.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

