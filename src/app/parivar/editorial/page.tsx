"use client";

import ParivarLayout from '@/components/ParivarLayout';
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

export default function EditorialPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch<{ members: Member[] }>(`/api/editorial-board`);
        setMembers(res.members || []);
      } catch {
        setMembers([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Also add data from DOCX
  const docxMembers = [
    { name: 'डॉ. अनिल', designation: 'प्रधान सम्पादक' },
    { name: 'डॉ. तरुण', designation: 'सम्पादक मण्डल' },
    { name: 'रमन कुमार', designation: 'सम्पादक मण्डल' },
  ];

  const allMembers = [...members, ...docxMembers.map((m, i) => ({
    id: `docx-${i}`,
    name: m.name,
    title: m.designation,
    affiliation: '',
    email: null,
    bio: null,
    photoUrl: null,
  }))];

  return (
    <ParivarLayout title="संपादक मण्डल" category="editorial">
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
          <p className="mt-4 text-gray-600">लोड हो रहा है...</p>
        </div>
      )}

      {!loading && allMembers.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-gray-600">कोई सदस्य नहीं मिला</p>
        </div>
      )}

      {!loading && allMembers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allMembers.map((member) => (
            <div key={member.id} className="card p-6">
              <div className="text-center">
                {member.photoUrl ? (
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-primary-100 mb-4"
                  />
                ) : (
                  <div className="w-32 h-32 mx-auto rounded-full gradient-primary flex items-center justify-center text-white text-4xl font-display font-bold mb-4">
                    {member.name.charAt(0)}
                  </div>
                )}
                <h3 className="text-xl font-display font-bold text-primary-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-700 font-semibold mb-1">{member.title}</p>
                {member.affiliation && (
                  <p className="text-gray-600 mb-3">{member.affiliation}</p>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="text-primary-700 hover:text-primary-800 text-sm font-medium transition-colors"
                  >
                    ई-मेल: {member.email}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </ParivarLayout>
  );
}

