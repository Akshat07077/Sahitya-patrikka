'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [logoError, setLogoError] = useState(false);
  
  return (
    <footer className="w-full border-t bg-gradient-to-b from-gray-50 to-white mt-auto">
      <div className="container-custom px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-16 h-16 flex-shrink-0">
                {!logoError ? (
                  <img
                    src="/6077998625519766431.jpg"
                    alt="Sahitya Sanskriti Patrika Logo"
                    width={64}
                    height={64}
                    className="object-contain w-16 h-16 rounded-full"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg gradient-primary flex items-center justify-center">
                    <span className="text-white font-display font-bold text-xl">स</span>
                  </div>
                )}
              </div>
              <span className="font-display font-bold text-primary-800">Sahitya Sanskriti Patrika</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              A premier platform for literary and cultural research, promoting scholarly discourse in Hindi and Sanskrit literature.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-primary-800 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/articles" className="text-gray-600 hover:text-primary-700 transition-colors">
                  Browse Articles
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-gray-600 hover:text-primary-700 transition-colors">
                  Submit Article
                </Link>
              </li>
              <li>
                <Link href="/editorial-board" className="text-gray-600 hover:text-primary-700 transition-colors">
                  Editorial Board
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary-700 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-primary-800 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/auth/login" className="text-gray-600 hover:text-primary-700 transition-colors">
                  Author Login
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-gray-600 hover:text-primary-700 transition-colors">
                  Become an Author
                </Link>
              </li>
              <li>
                <a href="/guidelines" className="text-gray-600 hover:text-primary-700 transition-colors">
                  Submission Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-primary-800 mb-4">Get in Touch</h3>
            <address className="not-italic space-y-2 text-sm text-gray-600">
              <div className="leading-relaxed">
                <p>65, मोहम्मदपुर,</p>
                <p>पोस्ट ऑफिस हिरणकी,</p>
                <p>दिल्ली- 110036</p>
              </div>
              <div className="pt-2">
                <Link href="/contact" className="hover:text-primary-700 transition-colors inline-block">
                  Contact Form →
                </Link>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>© {currentYear} Sahitya Sanskriti Patrika. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-primary-700 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-primary-700 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}



