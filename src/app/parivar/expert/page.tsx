"use client";

import ParivarLayout from '@/components/ParivarLayout';

type Member = {
  name: string;
  department?: string;
  affiliation?: string;
  mobile?: string;
  email?: string;
  photoUrl?: string;
};

export default function ExpertPage() {
  // Data from the DOCX file
  const members: Member[] = [
    {
      name: 'अमिता',
      department: 'हिंदी',
    },
    {
      name: 'डॉ. कृष्ण कुमार साह',
      department: 'हिंदी',
      affiliation: 'हिंदी विभाग, पूर्वोत्तर पर्वतीय विश्वविद्यालय, शिलांग, मेघालय',
      mobile: '8967445302, 7908492732',
      email: 'sahkrishna075@gmail.com',
    },
    {
      name: 'डॉ. फिल्मेका मारबानियांग',
      department: 'हिंदी',
      affiliation: 'हिन्दी विभाग, पूर्वोत्तर पर्वतीय विश्वविद्यालय, शिलांग (मेघालय)',
    },
    {
      name: 'डॉ. चेतना शर्मा',
      department: 'अंग्रेजी',
    },
    {
      name: 'डॉ. विजय',
      department: 'अंग्रेजी',
    },
    {
      name: 'दीपक कुमार साही',
      department: 'अंग्रेजी',
      affiliation: 'इतिहास विभाग, पूर्वोत्तर पर्वतीय विश्वविद्यालय, शिलांग (मेघालय)',
      mobile: '6033301002',
      email: 'deepaksupertramp@gmail.com',
    },
  ];

  return (
    <ParivarLayout title="विशेषज्ञ समिति" category="expert">
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
              {member.department && (
                <p className="text-primary-700 font-semibold mb-1">
                  {member.department} विभाग
                </p>
              )}
              {member.affiliation && (
                <p className="text-gray-600 mb-2 text-sm">{member.affiliation}</p>
              )}
              {member.mobile && (
                <p className="text-gray-600 mb-2 text-sm">मोबाइल: {member.mobile}</p>
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
    </ParivarLayout>
  );
}

