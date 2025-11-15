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
                Sahitya Sanskriti Patrika
              </span>
              <span className="text-xs text-gray-600 font-medium">Literary & Cultural Journal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/articles" className="text-gray-700 hover:text-primary-700 transition-colors">
              Articles
            </Link>
            <Link href="/editorial-board" className="text-gray-700 hover:text-primary-700 transition-colors">
              Editorial Board
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-700 transition-colors">
              Contact
            </Link>
            <Link href="/submit" className="text-gray-700 hover:text-primary-700 transition-colors">
              Submit Article
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {hasToken ? (
              me ? (
                <>
                  {['ADMIN', 'EDITOR'].includes(me.role) && (
                    <Link href="/admin" className="hidden sm:inline-block text-sm text-gray-700 hover:text-primary-700 transition-colors">
                      Admin
                    </Link>
                  )}
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-full">
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-semibold">
                      {me.firstName[0]}{me.lastName[0]}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{me.firstName}</span>
                  </div>
                  <button onClick={logout} className="btn btn-outline text-sm">
                    Logout
                  </button>
                </>
              ) : (
                // Token exists but user data is still loading
                <button onClick={logout} className="btn btn-outline text-sm">
                  Logout
                </button>
              )
            ) : (
              <>
                <Link href="/auth/login" className="btn btn-outline text-sm hidden sm:inline-flex">
                  Login
                </Link>
                <Link href="/auth/register" className="btn btn-primary text-sm">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}



