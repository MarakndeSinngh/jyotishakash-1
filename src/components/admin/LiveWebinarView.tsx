import React from 'react';
import { Video, Calendar, Clock, Users, Plus, Edit3, Trash2 } from 'lucide-react';

export default function LiveWebinarView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-cinzel text-stone-900">Live Webinar Management</h1>
          <p className="text-xs text-stone-500">Manage masterclass schedules, timings, and attendee countdowns</p>
        </div>
        <button
          onClick={() => alert('New webinar schedule modal opened.')}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-medium shadow-sm transition-all inline-flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Schedule New Webinar
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-700">Scheduled Masterclasses</h2>
          <span className="text-xs text-amber-700 font-medium bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Next: Sept 05, 2026
          </span>
        </div>

        <div className="divide-y divide-stone-100">
          {[
            {
              title: 'Vedic Alignment for Business & Brand Success',
              instructor: 'Raajeev Singh Chauhann',
              date: 'Sept 05, 2026',
              time: '11:00 AM - 01:00 PM IST',
              registered: 1245,
              status: 'Confirmed'
            },
            {
              title: 'লাইভ মাস্টারক্লাস: মোবাইল নাম্বার কীভাবে ভাগ্য নিয়ন্ত্রণ করে?',
              instructor: 'Sannjoy Biswass',
              date: 'Sept 05, 2026',
              time: '11:00 AM - 01:00 PM IST',
              registered: 850,
              status: 'Confirmed'
            },
            {
              title: 'Chaldean Compound Frequencies & Signature Masterclass',
              instructor: 'Shaunak S. Patthak',
              date: 'Sept 12, 2026',
              time: '08:00 PM IST',
              registered: 620,
              status: 'Upcoming'
            }
          ].map((webinar, idx) => (
            p_renderWebinarRow(webinar, idx)
          ))}
        </div>
      </div>
    </div>
  );
}

function p_renderWebinarRow(webinar: any, idx: number) {
  return (
    <div key={idx} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200 shrink-0 mt-0.5">
          <Video className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-stone-900">{webinar.title}</h3>
          <p className="text-xs text-stone-500 mt-0.5">Instructor: <span className="font-medium text-stone-700">{webinar.instructor}</span></p>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-stone-600">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-stone-400"/> {webinar.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-stone-400"/> {webinar.time}</span>
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-stone-400"/> {webinar.registered} Registered</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end md:self-center">
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          {webinar.status}
        </span>
        <button onClick={() => alert('Edit webinar settings')} className="p-2 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors">
          <Edit3 className="w-4 h-4" />
        </button>
        <button onClick={() => alert('Delete webinar')} className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
