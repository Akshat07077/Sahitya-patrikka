"use client";

import { useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', phone: '', organization: '' });
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update<K extends keyof typeof form>(k: K, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(null); setOk(null); setLoading(true);
    try {
      await apiFetch(`/api/contact`, { method: 'POST', body: JSON.stringify(form) });
      setOk('Message sent');
      setForm({ name: '', email: '', subject: '', message: '', phone: '', organization: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to send');
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">Contact Us</h1>
            <p className="text-xl text-white/90">
              We'd love to hear from you. Get in touch with our team.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            {ok && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700">{ok}</p>
              </div>
            )}
            <div className="card p-8 md:p-10">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      className="input w-full text-base" 
                      value={form.name} 
                      onChange={(e) => update('name', e.target.value)} 
                      placeholder="Your full name"
                      required 
                    />
        </div>
        <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input 
                      className="input w-full text-base" 
                      type="email" 
                      value={form.email} 
                      onChange={(e) => update('email', e.target.value)} 
                      placeholder="your.email@example.com"
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input 
                    className="input w-full text-base" 
                    value={form.subject} 
                    onChange={(e) => update('subject', e.target.value)} 
                    placeholder="What is your inquiry about?"
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    className="input w-full text-base" 
                    rows={6} 
                    value={form.message} 
                    onChange={(e) => update('message', e.target.value)} 
                    placeholder="Please share your message or inquiry..."
                    required 
                  />
        </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone (Optional)
                    </label>
                    <input 
                      className="input w-full text-base" 
                      value={form.phone} 
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder="Your phone number"
                    />
          </div>
          <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Organization (Optional)
                    </label>
                    <input 
                      className="input w-full text-base" 
                      value={form.organization} 
                      onChange={(e) => update('organization', e.target.value)}
                      placeholder="Your institution or organization"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <button 
                    disabled={loading} 
                    className="btn btn-primary w-full py-3 text-base font-semibold" 
                    type="submit"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


