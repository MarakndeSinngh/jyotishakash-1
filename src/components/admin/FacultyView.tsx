import React from 'react';
import { Users, Award, Shield, Edit3, CheckCircle2 } from 'lucide-react';

export default function FacultyView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-cinzel text-stone-900">Faculty & Mentors</h1>
          <p className="text-xs text-stone-500">Manage master mentors, credentials, biographies, and academy pairings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: 'Raajeev Singh Chauhann',
            role: 'Founder & Chief Mentor',
            speciality: 'Vedic Numerology, Business Numerology & Vastu Expert',
            experience: '15+ Years Experience',
            students: '15,000+ Alumni',
            status: 'Active'
          },
          {
            name: 'Shaunak S. Patthak',
            role: 'Master Numerologist & Astrologer',
            speciality: 'Chaldean & Pythagorean Numerology, Horoscope Analysis',
            experience: '12+ Years Experience',
            students: '10,000+ Alumni',
            status: 'Active'
          },
          {
            name: 'Sannjoy Biswass',
            role: 'Master Numerologist & Astrologer',
            speciality: 'Lo Shu Grid, Mobile Number Numerology & Bengali Sessions',
            experience: '10+ Years Experience',
            students: '12,000+ Alumni',
            status: 'Active'
          }
        ].map((mentor, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 font-bold flex items-center justify-center text-lg border border-amber-200 shadow-inner font-cinzel">
                  {mentor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {mentor.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-stone-900 font-cinzel mb-0.5">{mentor.name}</h3>
              <p className="text-xs font-semibold text-amber-700 mb-2">{mentor.role}</p>
              <p className="text-xs text-stone-600 mb-4">{mentor.speciality}</p>

              <div className="space-y-1.5 text-xs text-stone-500 pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <span>Experience:</span>
                  <span className="font-medium text-stone-800">{mentor.experience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Alumni:</span>
                  <span className="font-medium text-stone-800">{mentor.students}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-400 font-medium">Verified Faculty</span>
              <button onClick={() => alert(`Editing profile for ${mentor.name}`)} className="px-3 py-1.5 rounded-lg border border-stone-200 hover:border-amber-600 text-stone-700 text-xs font-medium transition-colors flex items-center gap-1">
                <Edit3 className="w-3.5 h-3.5" /> Edit Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
