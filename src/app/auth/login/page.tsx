"use client";

import { useState, useEffect } from 'react';
import { apiFetch, setToken, getToken } from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const token = getToken();
    if (token) {
      const redirect = searchParams.get('redirect') || '/';
      router.push(redirect);
    }
  }, [router, searchParams]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await apiFetch<{ user: any; token: string }>(`/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setToken(res.token);
      
      // Dispatch event to update navbar immediately
      window.dispatchEvent(new Event('auth:login'));
      
      // Small delay to ensure token is saved
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Redirect to return URL or home
      const redirect = searchParams.get('redirect') || '/';
      window.location.href = redirect; // Use window.location for full page reload
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-lg gradient-primary flex items-center justify-center shadow-lg">
            <span className="text-white font-display font-bold text-2xl">स</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-primary-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>
        <div className="card p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input 
                className="input w-full text-base" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="your.email@example.com"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input 
                className="input w-full text-base" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password"
                required 
              />
            </div>
            <button disabled={loading} className="btn btn-primary w-full py-3 text-base font-semibold" type="submit">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            <p className="text-sm text-center text-gray-600">
              No account?{' '}
              <a href="/auth/register" className="text-primary-700 hover:text-primary-800 font-semibold">
                Create one
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}


