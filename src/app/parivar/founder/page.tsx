"use client";

import ParivarLayout from '@/components/ParivarLayout';

type Member = {
  name: string;
  designation?: string;
  location?: string;
  email?: string;
  photoUrl?: string;
};

export default function FounderPage() {
  // Placeholder - update with actual data when available
  const members: Member[] = [];

  return (
    <ParivarLayout title="संस्थापक" category="founder">
      {members.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-gray-600">जानकारी जल्द ही उपलब्ध होगी</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map((member, index) => (
            <div key={index} className="card p-6">
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
                {member.designation && (
                  <p className="text-primary-700 font-semibold mb-1">{member.designation}</p>
                )}
                {member.location && (
                  <p className="text-gray-600 mb-3">{member.location}</p>
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

