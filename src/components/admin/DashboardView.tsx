import React from 'react';
import { Video, BookOpen, Film, Activity, Users, Calendar, TrendingUp, CheckCircle2, Shield, ArrowUpRight } from 'lucide-react';

export default function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium mb-3 border border-amber-500/30">
            <Shield className="w-3.5 h-3.5" />
            Admin Control Center v2.4
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-cinzel mb-2">
            Welcome back, Master Admin
          </h1>
          <p className="text-stone-300 text-sm max-w-2xl">
            LEO Family Astrological & Numerology Academy operations are running smoothly. All systems connected with Supabase backend & high-speed ingress.
          </p>
        </div>
      </div>

      {/* 4 Required Placeholder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 1. Upcoming Webinar */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200/60">
              <Video className="w-6 h-6" />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Ready
            </span>
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 mb-1">
            Upcoming Webinar
          </h3>
          <p className="text-lg font-bold text-stone-900 mb-2 font-cinzel">
            Vedic Business Masterclass
          </p>
          <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <span className="text-stone-400 flex items-center gap-1"><Calendar className="w-3.5 h-3.5"/> Date:</span>
              <span className="font-medium text-stone-800">Sept 14, 2026</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Timing:</span>
              <span className="font-medium text-stone-800">11:00 AM - 01:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Registrations:</span>
              <span className="font-semibold text-amber-700">1,245 Students</span>
            </div>
          </div>
        </div>

        {/* 2. Featured Programs */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200/60">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200">
              6 Active
            </span>
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 mb-1">
            Featured Programs
          </h3>
          <p className="text-lg font-bold text-stone-900 mb-2 font-cinzel">
            Academy Curriculums
          </p>
          <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Raajeev Academy:</span>
              <span className="font-medium text-stone-800">Vedic & Business</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Shaunak Academy:</span>
              <span className="font-medium text-stone-800">Chaldean Numerology</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Sannjoy Academy:</span>
              <span className="font-medium text-stone-800">Lo Shu & Mobile</span>
            </div>
          </div>
        </div>

        {/* 3. Latest Videos */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200/60">
              <Film className="w-6 h-6" />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium">
              HD Library
            </span>
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 mb-1">
            Latest Videos
          </h3>
          <p className="text-lg font-bold text-stone-900 mb-2 font-cinzel">
            Media Library Sync
          </p>
          <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Total Uploads:</span>
              <span className="font-medium text-stone-800">48 Masterclasses</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Shorts / Reels:</span>
              <span className="font-medium text-stone-800">128 Clips</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Cloud Storage:</span>
              <span className="font-semibold text-emerald-700">Optimized (94%)</span>
            </div>
          </div>
        </div>

        {/* 4. Website Status */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200/60">
              <Activity className="w-6 h-6" />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              99.9%
            </span>
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 mb-1">
            Website Status
          </h3>
          <p className="text-lg font-bold text-stone-900 mb-2 font-cinzel">
            System Operational
          </p>
          <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Supabase Auth:</span>
              <span className="font-medium text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400">API Gateway:</span>
              <span className="font-medium text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400">SSL Certificate:</span>
              <span className="font-medium text-stone-800">Secure (Google Cloud)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Activity & System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-stone-900 font-cinzel">Recent Enrollment Activity</h2>
              <p className="text-xs text-stone-500">Real-time student signups across Raajeev, Shaunak & Sannjoy academies</p>
            </div>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Live Feed
            </span>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Rajesh Sharma', course: 'Vedic Business Numerology', time: '12 mins ago', amount: '₹11,000', mentor: 'Raajeev Singh' },
              { name: 'Priya Mukherjee', course: 'Lo Shu Grid Masterclass', time: '45 mins ago', amount: '₹5,500', mentor: 'Sannjoy Biswass' },
              { name: 'Amitabh Sen', course: 'Chaldean Pythagorean Course', time: '2 hours ago', amount: '₹8,900', mentor: 'Shaunak Patthak' },
              { name: 'Sneha Kapoor', course: 'Astro-Vastu Certification', time: '5 hours ago', amount: '₹15,000', mentor: 'Raajeev Singh' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50/70 border border-stone-100 hover:bg-stone-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-600/10 text-amber-800 font-bold flex items-center justify-center text-xs border border-amber-500/20">
                    {item.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900">{item.name}</h4>
                    <p className="text-xs text-stone-500">{item.course} • Mentor: {item.mentor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-stone-900">{item.amount}</div>
                  <div className="text-[11px] text-stone-400">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900 font-cinzel mb-2">System Quick Actions</h2>
            <p className="text-xs text-stone-500 mb-6">Common administrative tools for academy management</p>
            <div className="space-y-3">
              {[
                { title: 'Update Webinar Timing', desc: 'Sync Sept 14 11 AM - 1 PM across all platforms', icon: Calendar },
                { title: 'Broadcast SMS / WhatsApp', desc: 'Send reminders to enrolled students', icon: Users },
                { title: 'Export Student Records', desc: 'Download CSV of all academy registrations', icon: TrendingUp },
              ].map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => alert(`Action "${action.title}" triggered successfully.`)}
                  className="w-full text-left p-3.5 rounded-xl border border-stone-200 hover:border-amber-500/50 hover:bg-amber-50/30 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors">
                      <action.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-stone-900">{action.title}</h4>
                      <p className="text-[11px] text-stone-500">{action.desc}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-amber-700 transition-colors" />
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-100 text-center">
            <span className="text-[11px] text-stone-400 font-medium">LEO Family Academy Portal • Secure Session Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
