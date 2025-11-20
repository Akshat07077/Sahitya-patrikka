"use client";

export default function IntroductionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">परिचय</h1>
            <p className="text-xl text-white/90">
              साहित्य संस्कृति : त्रैमासिक हिंदी पत्रिका
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-10 space-y-6">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-display font-bold text-primary-800 mb-4">
                  हमारे बारे में
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  <strong>साहित्य संस्कृति : त्रैमासिक हिंदी पत्रिका</strong> एक प्रतिष्ठित शैक्षणिक पत्रिका है जो हिंदी साहित्य, संस्कृति, और शैक्षणिक अनुसंधान को समर्पित है। हमारा उद्देश्य विद्वानों, शोधकर्ताओं और साहित्य प्रेमियों के लिए एक मंच प्रदान करना है जहाँ वे अपने शोध और विचारों को साझा कर सकें।
                </p>

                <h3 className="text-2xl font-display font-semibold text-primary-800 mt-8 mb-4">
                  हमारा मिशन
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  हमारा मिशन हिंदी साहित्य और संस्कृति के क्षेत्र में गुणवत्तापूर्ण शोध और शैक्षणिक लेखन को बढ़ावा देना है। हम विभिन्न विषयों पर शोधपूर्ण लेख, समीक्षाएँ, और साहित्यिक विश्लेषण प्रकाशित करते हैं।
                </p>

                <h3 className="text-2xl font-display font-semibold text-primary-800 mt-8 mb-4">
                  हमारी विशेषताएँ
                </h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-primary-700 font-bold mt-1">•</span>
                    <span>त्रैमासिक प्रकाशन - प्रत्येक तीन महीने में नया अंक</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-700 font-bold mt-1">•</span>
                    <span>पीयर-रिव्यू प्रक्रिया द्वारा गुणवत्ता सुनिश्चित करना</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-700 font-bold mt-1">•</span>
                    <span>विभिन्न विषयों पर शोधपूर्ण लेख</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-700 font-bold mt-1">•</span>
                    <span>प्रतिष्ठित संपादक मंडल</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-700 font-bold mt-1">•</span>
                    <span>मुफ्त ऑनलाइन पहुँच</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-display font-semibold text-primary-800 mt-8 mb-4">
                  हमारा दृष्टिकोण
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  हम हिंदी साहित्य और संस्कृति के संरक्षण और प्रचार में विश्वास करते हैं। हमारा लक्ष्य एक ऐसा समुदाय बनाना है जहाँ विद्वान और शोधकर्ता अपने ज्ञान को साझा कर सकें और साहित्यिक चर्चा में योगदान दे सकें।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

