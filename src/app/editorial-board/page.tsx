"use client";

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

type Member = { 
  id: string; 
  name: string; 
  title: string; 
  affiliation: string; 
  email?: string | null; 
  bio?: string | null; 
  photoUrl?: string | null;
};

export default function EditorialBoardPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch<{ members: Member[] }>(`/api/editorial-board`);
        setMembers(res.members || []);
      } catch (e: any) {
        setError(e.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">Editorial Board</h1>
            <p className="text-xl text-white/90">
              Meet our distinguished team of scholars and experts
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
              <p className="mt-4 text-gray-600">Loading editorial board...</p>
            </div>
          )}

          {error && (
            <div className="max-w-2xl mx-auto card p-6 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {!loading && !error && members.length === 0 && (
            <div className="max-w-2xl mx-auto card p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">No members yet</h3>
              <p className="text-gray-600">Our editorial board information will be available soon.</p>
            </div>
          )}

          {!loading && !error && members.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member) => (
                <div key={member.id} className="card p-6 text-center hover:shadow-xl transition-all">
                  <div className="mb-4">
                    {member.photoUrl ? (
                      <img 
                        src={member.photoUrl} 
                        alt={member.name}
                        className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-primary-100"
                      />
                    ) : (
                      <div className="w-24 h-24 mx-auto rounded-full gradient-primary flex items-center justify-center text-white text-3xl font-display font-bold">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-display font-bold text-primary-800 mb-2">{member.name}</h3>
                  <p className="text-primary-700 font-semibold mb-1">{member.title}</p>
                  <p className="text-sm text-gray-600 mb-3">{member.affiliation}</p>
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`} 
                      className="text-primary-700 hover:text-primary-800 text-sm font-medium transition-colors inline-flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {member.email}
                    </a>
                  )}
                  {member.bio && (
                    <p className="text-sm text-gray-600 mt-4 leading-relaxed line-clamp-4">{member.bio}</p>
                  )}
          </div>
        ))}
      </div>
          )}
        </div>
      </section>
    </div>
  );
}


