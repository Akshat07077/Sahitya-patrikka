"use client";

import Link from 'next/link';

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">नियमावली</h1>
            <p className="text-xl text-white/90">
              साहित्य संस्कृति : त्रैमासिक हिंदी पत्रिका
            </p>
            <p className="text-lg text-white/80 mt-4">
              लेख जमा करने और प्रकाशन के लिए दिशा-निर्देश
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-10 space-y-8">
              <div>
                <h2 className="text-3xl font-display font-bold text-primary-800 mb-6">
                  लेख जमा करने के दिशा-निर्देश
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                      1. लेख का प्रारूप
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>लेख हिंदी में होना चाहिए</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>फॉन्ट: Unicode Devanagari, आकार: 12pt</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>पृष्ठ: A4 आकार, मार्जिन: 1 इंच सभी तरफ</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>पंक्ति रिक्ति: 1.5</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                      2. लेख की संरचना
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>शीर्षक (Title)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>लेखक का नाम और संबद्धता (Author Name and Affiliation)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>सारांश (Abstract) - 150-200 शब्द</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>मुख्य शब्द (Keywords) - 5-7 शब्द</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>मुख्य लेख (Main Article)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>संदर्भ (References)</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                      3. लेख की लंबाई
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>शोध लेख: 3000-5000 शब्द</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>समीक्षा लेख: 2000-4000 शब्द</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>लघु लेख: 1500-2500 शब्द</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                      4. संदर्भ शैली
                    </h3>
                    <p className="text-gray-700 mb-3">
                      संदर्भ APA या MLA शैली में होने चाहिए। सभी संदर्भ लेख के अंत में सूचीबद्ध होने चाहिए।
                    </p>
                    <p className="text-gray-700">
                      उदाहरण: लेखक का नाम (वर्ष). शीर्षक. पत्रिका का नाम, खंड(संख्या), पृष्ठ संख्या.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                      5. जमा करने की प्रक्रिया
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>लेख PDF या DOCX प्रारूप में होना चाहिए</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>ऑनलाइन फॉर्म के माध्यम से जमा करें</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>लेखक की जानकारी सही और पूर्ण होनी चाहिए</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>एक साथ कई लेख जमा न करें</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                      6. पीयर-रिव्यू प्रक्रिया
                    </h3>
                    <p className="text-gray-700 mb-3">
                      सभी लेख दोहरे-अंधे पीयर-रिव्यू प्रक्रिया से गुजरते हैं। इस प्रक्रिया में 4-6 सप्ताह लग सकते हैं।
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>प्रारंभिक समीक्षा: 1-2 सप्ताह</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>विशेषज्ञ समीक्षा: 2-4 सप्ताह</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>संशोधन और अंतिम निर्णय</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                      7. महत्वपूर्ण नोट
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>लेख मौलिक होना चाहिए और पहले कहीं प्रकाशित नहीं होना चाहिए</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>कॉपीराइट सामग्री का उपयोग करते समय उचित अनुमति लें</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>लेख में किसी भी प्रकार की साहित्यिक चोरी नहीं होनी चाहिए</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary-700 font-bold mt-1">•</span>
                        <span>लेखक अपने लेख की जिम्मेदारी के लिए पूर्ण रूप से जिम्मेदार हैं</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-3xl font-display font-bold text-primary-800 mb-6">
                  संपर्क
                </h2>
                <p className="text-gray-700 mb-6">
                  लेख जमा करने या दिशा-निर्देशों के बारे में प्रश्नों के लिए, कृपया हमसे संपर्क करें।
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/submit" className="btn btn-primary px-8 text-center">
                    लेख जमा करें
                  </Link>
                  <Link href="/contact" className="btn btn-outline px-8 text-center">
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

