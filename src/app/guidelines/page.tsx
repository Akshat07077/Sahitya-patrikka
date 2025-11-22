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
              संस्कृति और संस्कार का संगम
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-10 space-y-8">
              {/* Title Section */}
              <div className="text-center border-b border-gray-200 pb-6">
                <h2 className="text-3xl font-display font-bold text-primary-800 mb-2">
                  शोध आलेख हेतु आवश्यक नियमावली
                </h2>
              </div>

              {/* Article Format Section */}
              <div>
                <h3 className="text-2xl font-display font-semibold text-primary-800 mb-4">
                  शोध आलेख का प्रारूप:
                </h3>
                <ol className="space-y-2 text-gray-700 text-lg list-decimal list-inside ml-4">
                  <li>शोध आलेख का शीर्षक</li>
                  <li>दायीं ओर लेखक का छायाचित्र एवं बायीं ओर लेखक का पूर्ण नाम</li>
                  <li>बीज शब्द</li>
                  <li>शोध-सार</li>
                  <li>शोध आलेख का मुख्य भाग</li>
                  <li>संदर्भ सूची</li>
                  <li>लेखक का परिचय (संपर्क सूत्र सहित)</li>
                </ol>
              </div>

              {/* Important Points Section */}
              <div>
                <h3 className="text-2xl font-display font-semibold text-primary-800 mb-6">
                  ध्यान रहे कि-
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">1.</span> साहित्य संस्कृति: त्रैमासिक पत्रिका हेतु प्रेषित सभी शोध आलेखों के शीर्षक एवं विषयवस्तु पूर्णतः मौलिक और नवीन होने चाहिए। किसी भी प्रकार की समानता या पुनरावृत्ति पत्रिका की गरिमा को आघात पहुँचा सकती है। अतः आलेख भेजने से पूर्व यह सुनिश्चित करें कि आपका शीर्षक और आलेख दोनों पूर्णतः मौलिक हों।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">2.</span> शोध आलेख की भाषा हिंदी/इंग्लिश एवं लिपि देवनागरी होनी आवश्यक है।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">3.</span> शोध आलेख केवल यूनिकोड फॉण्ट (Mangal या Kokila) में स्वीकार किए जाएँगे। Kruti Dev या अन्य फॉण्ट में लिखित शोध आलेख अस्वीकार्य होंगे।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">4.</span> फॉण्ट आकार:
                    </p>
                    <ul className="mt-2 ml-6 space-y-1 text-gray-600">
                      <li>• Mangal – मुख्य पाठ 12, संदर्भ 8</li>
                      <li>• Kokila – मुख्य पाठ 16, संदर्भ 12</li>
                      <li>• शीर्षक: Mangal – 14, Kokila – 18</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">5.</span> संदर्भ (References): सभी संदर्भ EndNote में दिए जाएँ। Footnote स्वीकार नहीं किए जाएँगे।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">6.</span> पृष्ठ आकार: A4, पंक्ति-अंतराल 1.15 रखा जाए। शीर्षक, शोध-सार, बीज शब्द और आमुख को छोड़कर अन्य किसी भी उपशीर्षक को बोल्ड न किया जाए।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">7.</span> आलेख की प्रति Word एवं PDF दोनों रूपों में भेजी जाए।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">8.</span> आलेख केवल ई-मेल माध्यम से ही स्वीकार किए जाएँगे।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">9.</span> शब्द सीमा: न्यूनतम 2500 एवं अधिकतम 3000 शब्द।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">10.</span> संदर्भों की संख्या: न्यूनतम 7 और अधिकतम 20 के मध्य होनी चाहिए।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">11.</span> आलेख में किसी भी प्रकार के बुलेट, प्रतीक या चिन्ह का प्रयोग नहीं किया जाए।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">12.</span> मार्जिन: Top – 1 cm, Bottom – 1 cm, Left – 1 cm, Right – 1 cm।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">13.</span> शोध-सार: 150–200 शब्दों में संक्षेप रूप में प्रस्तुत हो।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">14.</span> बीज शब्द (Key Words): लगभग दस।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">15.</span> निष्कर्ष: कम से कम 150 शब्दों का होना आवश्यक है।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">16.</span> शोध-सार एवं निष्कर्ष में किसी भी प्रकार के संदर्भों का उल्लेख न किया जाए।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">17.</span> संदर्भ ग्रंथ सूची को बोल्ड अक्षरों में निम्न क्रम में लिखा जाए-
                    </p>
                    <p className="mt-2 ml-6 text-gray-600 italic">
                      सर नेम, नाम का प्रथम अक्षर. (प्रकाशन वर्ष). पुस्तक का नाम. प्रकाशित पुस्तक का स्थान: प्रकाशक का नाम. पृष्ठ संख्या
                    </p>
                    <p className="mt-2 ml-6 text-gray-600">
                      <span className="font-semibold">उदाहरण-</span> वाल्मीकि, ओ. (2012). शब्द झूठ नहीं बोलते. नई दिल्ली: अनामिका पब्लिशर्स एंड डिस्ट्रीब्यूटर्स (प्रा.) लिमिटेड. पृष्ठ संख्या-
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">18.</span> लेखक का नाम, पद, पासपोर्ट आकार का फोटो, पता, ई-मेल और मोबाइल नंबर अनिवार्य रूप से संलग्न किए जाएँ, जिससे सम्पादन प्रक्रिया में संवाद संभव हो सके।
                    </p>
                  </div>

                  <div className="border-l-4 border-accent-600 pl-4 py-2 bg-accent-50">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-accent-800">19.</span> आलेख भेजने का ई-मेल पता- <a href="mailto:sahityasanskritipatrika@gmail.com" className="text-accent-700 hover:text-accent-800 underline font-semibold">sahityasanskritipatrika@gmail.com</a>
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">20.</span> आलेख में किसी भी प्रकार की भाषिक त्रुटि, वाक्य-विन्यास दोष या वर्तनी अशुद्धि पाए जाने पर आलेख अस्वीकृत कर दिया जाएगा।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">21.</span> सभी आलेख, शोध आलेख या रचनाएँ विशेषज्ञ समिति एवं संपादक मंडल द्वारा परीक्षण और अनुमोदन के उपरांत ही प्रकाशित की जाएँगी। यदि सुधार की आवश्यकता प्रतीत हुई तो रचनाकार से संशोधन हेतु पुनः मेल किया जाएगा।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">22.</span> प्रत्येक रचनाकार अपनी रचना के साथ पासपोर्ट साइज फोटो, परिचय, पता, ई-मेल और मोबाइल नंबर अवश्य संलग्न करें।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">23.</span> पत्रिका से संबंधित सभी अधिकार प्रधान संपादक एवं संपादक के पास सुरक्षित रहेंगे।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">24.</span> साहित्य संस्कृति त्रैमासिक पत्रिका का मूल उद्देश्य साहित्य, समाज और सृजनशीलता में नवीनता तथा वैचारिकता को प्रोत्साहित करना है।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">25.</span> साहित्य संस्कृति पत्रिका के चार आधार स्तंभ हैं- साहित्य, समाज, कला और संस्कृति। इन्हीं स्तंभों पर इसकी वैचारिक एवं सृजनात्मक नींव रखी गई है।
                    </p>
                  </div>

                  <div className="border-l-4 border-primary-600 pl-4 py-2">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <span className="font-semibold text-primary-800">26.</span> सभी रचनाकारों, शोधार्थियों और साहित्यप्रेमियों से अपेक्षा की जाती है कि वे साहित्य संस्कृति की मर्यादा, उद्देश्य और सृजनशील दृष्टि को सफल बनाने में सहभागी बनें।
                    </p>
                  </div>
                </div>
              </div>

              {/* Thank You Section */}
              <div className="border-t border-gray-200 pt-8 mt-8">
                <p className="text-center text-xl text-gray-700 font-medium">
                अधिक जानकारी हेतु हमें ईमेल पर संपर्क करें- sahityasanskritipatrika@gmail.com
                </p>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-gray-200 pt-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

