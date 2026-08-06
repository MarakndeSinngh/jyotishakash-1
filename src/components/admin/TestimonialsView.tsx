import React from 'react';
import { Star, Plus, CheckCircle2, Trash2, Edit3, MessageSquare } from 'lucide-react';

export default function TestimonialsView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-cinzel text-stone-900">Student Testimonials</h1>
          <p className="text-xs text-stone-500">Manage student reviews, video success stories, and trust ratings</p>
        </div>
        <button
          onClick={() => alert('Add testimonial modal opened.')}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-medium shadow-sm transition-all inline-flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-700">Published Reviews & Success Stories</h2>
          <span className="text-xs text-amber-700 font-medium bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            ★ 4.9/5 Overall Rating
          </span>
        </div>

        <div className="divide-y divide-stone-100">
          {[
            {
              name: 'Dr. Rameshwar Varma',
              course: 'Vedic Business Numerology',
              comment: 'Raajeev Sir’s brand name correction technique brought an immediate 40% surge in our manufacturing enterprise turnover.',
              rating: 5,
              date: 'Aug 03, 2026',
              status: 'Published'
            },
            {
              name: 'Ananya Sengupta',
              course: 'Lo Shu Grid Masterclass',
              comment: 'Sannjoy Sir explains complex numbers in Bengali with such incredible clarity. My mobile numerology report changed my career!',
              rating: 5,
              date: 'July 29, 2026',
              status: 'Published'
            },
            {
              name: 'Vikramaditya Roy',
              course: 'Chaldean Pythagorean Certification',
              comment: 'Shaunak Sir’s mastery of compound numbers is unparalleled. The live chart readings gave me precise timelines for my property investments.',
              rating: 5,
              date: 'July 22, 2026',
              status: 'Published'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-stone-900">{item.name}</span>
                  <span className="text-xs text-stone-400">• {item.course}</span>
                </div>
                <p className="text-xs text-stone-600 italic">"{item.comment}"</p>
                <div className="text-[11px] text-stone-400">{item.date}</div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {item.status}
                </span>
                <button onClick={() => alert('Edit testimonial')} className="p-2 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => alert('Delete testimonial')} className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
