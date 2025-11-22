"use client";

import ParivarLayout from '@/components/ParivarLayout';

type Member = {
  name: string;
  designation: string;
  location: string;
  email: string;
  photoUrl?: string;
};

export default function PatronPage() {
  // Data from the DOCX file
  const members: Member[] = [
    {
      name: 'के. एन. तिवारी (सेम)',
      designation: 'संरक्षक',
      location: 'दिल्ली',
      email: 'sahityasanskritipatrika@gmail.com',
    },
  ];

  return (
    <ParivarLayout title="संरक्षक" category="patron">
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
              <p className="text-primary-700 font-semibold mb-1">{member.designation}</p>
              <p className="text-gray-600 mb-3">{member.location}</p>
              <a
                href={`mailto:${member.email}`}
                className="text-primary-700 hover:text-primary-800 text-sm font-medium transition-colors"
              >
                ई-मेल: {member.email}
              </a>
            </div>
          </div>
        ))}
      </div>
    </ParivarLayout>
  );
}

