"use client";

import { useState } from 'react';
import { apiFetch, setToken } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    organization: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await apiFetch<{ user: any; token: string }>(`/api/auth/register`, {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setToken(res.token);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-gray-50 flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-lg gradient-primary flex items-center justify-center shadow-lg">
            <span className="text-white font-display font-bold text-2xl">स</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-primary-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Join our community of scholars</p>
        </div>
        <div className="card p-8">
          <form onSubmit={onSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First name</label>
                <input 
                  className="input w-full text-base" 
                  value={form.firstName} 
                  onChange={(e) => update('firstName', e.target.value)} 
                  placeholder="First name"
                  required 
                />
          </div>
          <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last name</label>
                <input 
                  className="input w-full text-base" 
                  value={form.lastName} 
                  onChange={(e) => update('lastName', e.target.value)} 
                  placeholder="Last name"
                  required 
                />
          </div>
        </div>
        <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input 
                className="input w-full text-base" 
                type="email" 
                value={form.email} 
                onChange={(e) => update('email', e.target.value)} 
                placeholder="your.email@example.com"
                required 
              />
        </div>
        <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input 
                className="input w-full text-base" 
                type="password" 
                value={form.password} 
                onChange={(e) => update('password', e.target.value)} 
                placeholder="Create a strong password"
                required 
              />
        </div>
            <div className="grid grid-cols-2 gap-4">
          <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone (optional)</label>
                <input 
                  className="input w-full text-base" 
                  value={form.phone} 
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="Phone number"
                />
          </div>
          <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Organization (optional)</label>
                <input 
                  className="input w-full text-base" 
                  value={form.organization} 
                  onChange={(e) => update('organization', e.target.value)}
                  placeholder="Institution"
                />
          </div>
        </div>
            <button disabled={loading} className="btn btn-primary w-full py-3 text-base font-semibold" type="submit">
              {loading ? 'Creating account...' : 'Create account'}
        </button>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{' '}
              <a href="/auth/login" className="text-primary-700 hover:text-primary-800 font-semibold">
                Sign in
              </a>
            </p>
      </form>
        </div>
      </div>
    </div>
  );
}


