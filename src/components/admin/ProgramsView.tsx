import React from 'react';
import { BookOpen, Plus, Award, Users, DollarSign, Edit3 } from 'lucide-react';

export default function ProgramsView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-cinzel text-stone-900">Programs & Curriculums</h1>
          <p className="text-xs text-stone-500">Manage masterclass courses, certifications, and pricing modules</p>
        </div>
        <button
          onClick={() => alert('Add new program modal opened.')}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-medium shadow-sm transition-all inline-flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Create New Program
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'LEO Family Certified Professional Numerologist',
            mentor: 'Raajeev Singh Chauhann',
            duration: '12 Weeks',
            students: '3,420 Enrolled',
            price: '₹21,000',
            badge: 'Flagship Program'
          },
          {
            title: 'Chaldean & Pythagorean Masterclass',
            mentor: 'Shaunak S. Patthak',
            duration: '8 Weeks',
            students: '1,890 Enrolled',
            price: '₹15,000',
            badge: 'Advanced'
          },
          {
            title: 'Lo Shu Grid & Mobile Number Numerology',
            mentor: 'Sannjoy Biswass',
            duration: '6 Weeks',
            students: '2,150 Enrolled',
            price: '₹11,000',
            badge: 'Popular'
          },
          {
            title: 'Business Numerology & Brand Name Correction',
            mentor: 'Raajeev Singh Chauhann',
            duration: '4 Weeks',
            students: '980 Enrolled',
            price: '₹18,000',
            badge: 'Corporate'
          },
          {
            title: 'Astro-Vastu Audit & Planetary Remedies',
            mentor: 'Shaunak S. Patthak',
            duration: '6 Weeks',
            students: '1,120 Enrolled',
            price: '₹14,500',
            badge: 'Specialized'
          },
          {
            title: 'Bengali Numerology & Vastu Course',
            mentor: 'Sannjoy Biswass',
            duration: '6 Weeks',
            students: '1,450 Enrolled',
            price: '₹9,900',
            badge: 'Regional'
          }
        ].map((prog, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  {prog.badge}
                </span>
                <span className="text-sm font-bold text-stone-900 flex items-center gap-0.5">
                  <DollarSign className="w-3.5 h-3.5 text-amber-600" />{prog.price}
                </span>
              </div>
              <h3 className="text-base font-bold text-stone-900 font-cinzel mb-1">{prog.title}</h3>
              <p className="text-xs text-stone-500 mb-4">Lead Mentor: <span className="font-medium text-stone-700">{prog.mentor}</span></p>

              <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Duration:</span>
                  <span className="font-medium text-stone-800">{prog.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Enrollment:</span>
                  <span className="font-medium text-stone-800">{prog.students}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Certificate Included
              </span>
              <button onClick={() => alert(`Editing program: ${prog.title}`)} className="px-3 py-1.5 rounded-lg border border-stone-200 hover:border-amber-600 text-stone-700 text-xs font-medium transition-colors flex items-center gap-1">
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
