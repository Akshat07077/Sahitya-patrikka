"use client";

import { useEffect, useState } from 'react';
import { apiFetch, getToken, setToken } from '@/lib/api';
import Link from 'next/link';

type Me = { user: { id: string; firstName: string; lastName: string; email: string; role: string } };

export default function Navbar() {
  const [me, setMe] = useState<Me['user'] | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [elibraryDropdownOpen, setElibraryDropdownOpen] = useState(false);
  const [mobileElibraryOpen, setMobileElibraryOpen] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const token = getToken();
      if (!token) {
        setMe(null);
        setHasToken(false);
        return;
      }
      // Immediately update token state to hide login/register buttons
      setHasToken(true);
      try {
        const r = await apiFetch<Me>(`/api/auth/me`);
        setMe(r.user);
      } catch {
        setMe(null);
        setHasToken(false);
      }
    };
    
    // Initial load
    const token = getToken();
    setHasToken(!!token);
    loadUser();
    
    // Listen for auth events - handle immediately
    const handleAuthLogin = () => {
      const token = getToken();
      setHasToken(!!token);
      loadUser();
    };
    
    const handleAuthLogout = () => {
      setHasToken(false);
      setMe(null);
    };
    
    window.addEventListener('auth:login', handleAuthLogin);
    window.addEventListener('auth:logout', handleAuthLogout);
    
    return () => {
      window.removeEventListener('auth:login', handleAuthLogin);
      window.removeEventListener('auth:logout', handleAuthLogout);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function logout() {
    setToken('');
    localStorage.removeItem('aa_token');
    setMe(null);
    setHasToken(false);
    window.dispatchEvent(new Event('auth:logout'));
    window.location.href = '/';
  }

  return (
    <nav className={`w-full sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm border-b border-gray-200'
    }`}>
      <div className="container-custom px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 flex-shrink-0">
              {!logoError ? (
                <img
                  src="/6077998625519766431.jpg"
                  alt="Sahitya Sanskriti Patrika Logo"
                  width={48}
                  height={48}
                  className="object-contain w-12 h-12 rounded-full"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <span className="text-white font-display font-bold text-xl">स</span>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-primary-800 leading-tight">
                साहित्य संस्कृति पत्रिका
              </span>
              <span className="text-xs text-gray-600 font-medium">साहित्यिक एवं सांस्कृतिक पत्रिका</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <Link href="/" className="text-gray-700 hover:text-primary-700 transition-colors">
              होम
            </Link>
            <Link href="/introduction" className="text-gray-700 hover:text-primary-700 transition-colors">
              परिचय
            </Link>
            
            {/* E-Library Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setElibraryDropdownOpen(true)}
              onMouseLeave={() => setElibraryDropdownOpen(false)}
            >
              <button className="text-gray-700 hover:text-primary-700 transition-colors flex items-center gap-1">
                ई-लाइब्रेरी
                <svg 
                  className={`w-4 h-4 transition-transform ${elibraryDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {elibraryDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link 
                    href="/articles" 
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                  >
                    सभी अंक
                  </Link>
                  <Link 
                    href="/features" 
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                  >
                    विशेष अंक
                  </Link>
                </div>
              )}
            </div>
            
            <Link href="/media" className="text-gray-700 hover:text-primary-700 transition-colors">
              मीडिया
            </Link>
            <Link href="/news" className="text-gray-700 hover:text-primary-700 transition-colors">
              समाचार
            </Link>
            <Link href="/views" className="text-gray-700 hover:text-primary-700 transition-colors">
              विचार
            </Link>
            <Link href="/articles" className="text-gray-700 hover:text-primary-700 transition-colors">
              सभी अंक
            </Link>
            <Link href="/features" className="text-gray-700 hover:text-primary-700 transition-colors">
              विशेष अंक
            </Link>
            <Link href="/museum" className="text-gray-700 hover:text-primary-700 transition-colors">
              संग्रहालय
            </Link>
            <Link href="/guidelines" className="text-gray-700 hover:text-primary-700 transition-colors">
              नियमावली
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-700 transition-colors">
              संपर्क करें
            </Link>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {hasToken ? (
              me ? (
                <>
                  {['ADMIN', 'EDITOR'].includes(me.role) && (
                    <Link href="/admin" className="text-sm text-gray-700 hover:text-primary-700 transition-colors">
                      प्रशासन
                    </Link>
                  )}
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-full">
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-semibold">
                      {me.firstName[0]}{me.lastName[0]}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{me.firstName}</span>
                  </div>
                  <button onClick={logout} className="btn btn-outline text-sm">
                    लॉगआउट
                  </button>
                </>
              ) : (
                <button onClick={logout} className="btn btn-outline text-sm">
                  लॉगआउट
                </button>
              )
            ) : (
              <>
                <Link href="/auth/login" className="btn btn-outline text-sm">
                  लॉगिन
                </Link>
                <Link href="/auth/register" className="btn btn-primary text-sm">
                  पंजीकरण
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              होम
            </Link>
            <Link
              href="/introduction"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              परिचय
            </Link>
            
            {/* E-Library Mobile Dropdown */}
            <div>
              <button
                onClick={() => setMobileElibraryOpen(!mobileElibraryOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span>ई-लाइब्रेरी</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${mobileElibraryOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileElibraryOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    href="/articles"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileElibraryOpen(false);
                    }}
                    className="block px-4 py-2 text-gray-600 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    सभी अंक
                  </Link>
                  <Link
                    href="/features"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileElibraryOpen(false);
                    }}
                    className="block px-4 py-2 text-gray-600 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    विशेष अंक
                  </Link>
                </div>
              )}
            </div>
            
            <Link
              href="/media"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              मीडिया
            </Link>
            <Link
              href="/news"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              समाचार
            </Link>
            <Link
              href="/views"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              विचार
            </Link>
            <Link
              href="/articles"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              सभी अंक
            </Link>
            <Link
              href="/features"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              विशेष अंक
            </Link>
            <Link
              href="/museum"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              संग्रहालय
            </Link>
            <Link
              href="/guidelines"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              नियमावली
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              संपर्क करें
            </Link>
            
            <div className="border-t border-gray-200 pt-3 mt-3 space-y-2">
              {hasToken ? (
                me ? (
                  <>
                    {['ADMIN', 'EDITOR'].includes(me.role) && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        प्रशासन
                      </Link>
                    )}
                    <div className="flex items-center gap-2 px-4 py-2">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-semibold">
                        {me.firstName[0]}{me.lastName[0]}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{me.firstName} {me.lastName}</span>
                    </div>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      लॉगआउट
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    लॉगआउट
                  </button>
                )
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-center bg-white border border-primary-600 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    लॉगिन
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-center bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    पंजीकरण
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}



