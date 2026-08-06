import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Calendar, 
  Clock, 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Star, 
  X, 
  Save, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { LiveEvent } from '../../models/liveEvent';
import { liveEventService } from '../../services/liveEventService';

const MENTOR_NAMES: Record<string, string> = {
  raajeev: 'Raajeev Singh Chauhann',
  shaunak: 'Shaunak S. Patthak',
  sannjoy: 'Sannjoy Biswass'
};

export default function LiveWebinarView() {
  const [webinars, setWebinars] = useState<LiveEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWebinar, setEditingWebinar] = useState<LiveEvent | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<LiveEvent>>({
    mentorId: 'raajeev',
    title: '',
    date: '',
    time: '',
    language: 'English / Hindi',
    seats: 500,
    registrationLink: '',
    banner: '',
    status: 'upcoming',
    featured: false
  });

  useEffect(() => {
    loadWebinars();
  }, []);

  const loadWebinars = async () => {
    try {
      setLoading(true);
      const data = await liveEventService.getAllLiveEvents();
      setWebinars(data);
    } catch (err) {
      console.error('Failed to load webinars:', err);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleOpenCreate = () => {
    setEditingWebinar(null);
    setFormData({
      mentorId: 'raajeev',
      title: '',
      date: '2026-09-15',
      time: '11:00 AM - 01:00 PM IST',
      language: 'English / Hindi',
      seats: 500,
      registrationLink: 'https://leofamily.com/webinar/',
      banner: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
      status: 'upcoming',
      featured: false
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (webinar: LiveEvent) => {
    setEditingWebinar(webinar);
    setFormData({ ...webinar });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this live webinar?')) {
      try {
        await liveEventService.deleteLiveEvent(id);
        await loadWebinars();
        showNotification('Webinar deleted successfully.');
      } catch (err) {
        console.error('Failed to delete webinar:', err);
        alert('Failed to delete webinar.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      if (editingWebinar) {
        // Update via service
        await liveEventService.updateLiveEvent(editingWebinar.id, formData);
        showNotification(`Webinar "${formData.title}" updated successfully.`);
      } else {
        // Create via service
        const newEventData: LiveEvent = {
          id: `web-${Date.now()}`,
          mentorId: formData.mentorId || 'raajeev',
          title: formData.title || 'Untitled Webinar',
          date: formData.date || '2026-09-20',
          time: formData.time || '11:00 AM IST',
          language: formData.language || 'English',
          seats: Number(formData.seats) || 500,
          registrationLink: formData.registrationLink || 'https://leofamily.com',
          banner: formData.banner || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
          status: (formData.status as any) || 'upcoming',
          featured: Boolean(formData.featured)
        };
        await liveEventService.saveLiveEvent(newEventData);
        showNotification('New webinar scheduled successfully.');
      }

      setIsModalOpen(false);
      await loadWebinars();
    } catch (err) {
      console.error('Failed to save webinar:', err);
      alert('Failed to save webinar.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200">
              LiveEvent Model Active
            </span>
          </div>
          <h1 className="text-2xl font-bold font-cinzel text-stone-900">Live Webinar Manager</h1>
          <p className="text-xs text-stone-500">Manage masterclass schedules, attendee quotas, mentors, and webinar broadcast statuses</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-medium shadow-sm transition-all inline-flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Schedule New Webinar
        </button>
      </div>

      {notification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </div>
      )}

      {/* Responsive Table Card */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-700">Scheduled Masterclasses ({webinars.length})</h2>
            <p className="text-[11px] text-stone-400">Manage all academy webinar events and seat allocations</p>
          </div>
          <span className="text-xs text-amber-700 font-medium bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Active Sync
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/80 border-b border-stone-200 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">Mentor</th>
                <th className="py-3.5 px-6">Batch Title</th>
                <th className="py-3.5 px-6">Date & Time</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Seats</th>
                <th className="py-3.5 px-6">Featured</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
              {webinars.map((webinar) => (
                <tr key={webinar.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-4 px-6 font-semibold text-stone-900 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs border border-amber-200 shrink-0">
                        {MENTOR_NAMES[webinar.mentorId]?.[0] || 'M'}
                      </div>
                      <div>
                        <div>{MENTOR_NAMES[webinar.mentorId] || webinar.mentorId}</div>
                        <div className="text-[10px] text-stone-400 font-normal">{webinar.language}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 font-medium text-stone-900 max-w-xs truncate" title={webinar.title}>
                    {webinar.title}
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-stone-800 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" /> {webinar.date}
                    </div>
                    <div className="flex items-center gap-1 text-stone-500 text-[11px] mt-0.5">
                      <Clock className="w-3 h-3 text-stone-400" /> {webinar.time}
                    </div>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold inline-flex items-center gap-1 ${
                      webinar.status === 'upcoming' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                      webinar.status === 'live' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 animate-pulse' :
                      'bg-stone-100 text-stone-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${webinar.status === 'live' ? 'bg-emerald-500' : webinar.status === 'upcoming' ? 'bg-amber-500' : 'bg-stone-400'}`} />
                      {webinar.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap font-medium text-stone-900">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      {webinar.seats} Registered
                    </div>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    {webinar.featured ? (
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold inline-flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-700 text-amber-700" /> Featured
                      </span>
                    ) : (
                      <span className="text-stone-400 text-[11px]">Standard</span>
                    )}
                  </td>

                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(webinar)}
                        className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors"
                        title="Edit Webinar"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(webinar.id)}
                        className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Webinar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT / CREATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-xl w-full overflow-hidden animate-scaleUp">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center">
                  <Video className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold font-cinzel text-stone-900">
                  {editingWebinar ? 'Edit Webinar Details' : 'Schedule New Webinar'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Webinar Title / Batch Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Vedic Alignment Masterclass"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Lead Mentor
                  </label>
                  <select
                    value={formData.mentorId || 'raajeev'}
                    onChange={e => setFormData({ ...formData, mentorId: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-800 focus:outline-none focus:border-amber-600"
                  >
                    <option value="raajeev">Raajeev Singh Chauhann</option>
                    <option value="shaunak">Shaunak S. Patthak</option>
                    <option value="sannjoy">Sannjoy Biswass</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Language
                  </label>
                  <input
                    type="text"
                    value={formData.language || ''}
                    onChange={e => setFormData({ ...formData, language: e.target.value })}
                    placeholder="e.g. English / Hindi / Bengali"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date || ''}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Time / Timing String
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.time || ''}
                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g. 11:00 AM - 01:00 PM IST"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Registered Seats Count
                  </label>
                  <input
                    type="number"
                    value={formData.seats || 0}
                    onChange={e => setFormData({ ...formData, seats: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Broadcast Status
                  </label>
                  <select
                    value={formData.status || 'upcoming'}
                    onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-800 focus:outline-none focus:border-amber-600"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="live">Live Now</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Registration Link URL
                </label>
                <input
                  type="url"
                  value={formData.registrationLink || ''}
                  onChange={e => setFormData({ ...formData, registrationLink: e.target.value })}
                  placeholder="https://leofamily.com/webinar/..."
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  value={formData.banner || ''}
                  onChange={e => setFormData({ ...formData, banner: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheckbox"
                  checked={Boolean(formData.featured)}
                  onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <label htmlFor="featuredCheckbox" className="text-xs font-medium text-stone-800 cursor-pointer">
                  Feature this webinar on academy homepage & top header cards
                </label>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-medium hover:bg-stone-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-medium shadow-md transition-all inline-flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Webinar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
