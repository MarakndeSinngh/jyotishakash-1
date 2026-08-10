import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Award, 
  Shield, 
  Edit3, 
  Trash2, 
  Plus, 
  X, 
  Save, 
  CheckCircle2, 
  Globe, 
  Youtube, 
  Facebook,
  Eye,
  EyeOff
} from 'lucide-react';
import { Faculty } from '../../models/faculty';
import { supabaseFacultyRepository } from '../../repositories/supabaseFacultyRepository';

export default function FacultyView() {
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Faculty>>({
    name: '',
    title: '',
    image: '',
    bio: '',
    languages: ['English', 'Hindi'],
    consultationLink: '',
    registrationLink: '',
    facebookUrl: '',
    youtubeUrl: '',
    displayOrder: 1,
    active: true
  });
  const [languagesInput, setLanguagesInput] = useState('English, Hindi');

  useEffect(() => {
    loadFaculty();
  }, []);

  const loadFaculty = async () => {
    try {
      setLoading(true);
      const data = await supabaseFacultyRepository.getAll();
      setFacultyList(data);
    } catch (err) {
      console.error('Failed to load faculty from Supabase:', err);
      showNotification('Failed to load faculty from Supabase.');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleOpenCreate = () => {
    setEditingFaculty(null);
    setLanguagesInput('English, Hindi');
    setFormData({
      name: '',
      title: 'Master Numerologist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      bio: '',
      languages: ['English', 'Hindi'],
      consultationLink: 'https://leofamily.com/consult',
      registrationLink: 'https://leofamily.com/webinar',
      facebookUrl: '',
      youtubeUrl: '',
      displayOrder: facultyList.length + 1,
      active: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faculty: Faculty) => {
    setEditingFaculty(faculty);
    setLanguagesInput(faculty.languages ? faculty.languages.join(', ') : 'English');
    setFormData({ ...faculty });
    setIsModalOpen(true);
  };

  const handleDelete = async (_id: string) => {
    alert('Faculty mutations are currently in Read-Only mode during Supabase migration phase.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaculty) {
      alert('Adding new faculty is not enabled in Phase 3A.');
      setIsModalOpen(false);
      return;
    }

    try {
      setLoading(true);
      const parsedLanguages = languagesInput.split(',').map(l => l.trim()).filter(Boolean);
      await supabaseFacultyRepository.update(editingFaculty.id, {
        name: formData.name,
        title: formData.title,
        image: formData.image,
        bio: formData.bio,
        languages: parsedLanguages,
        displayOrder: Number(formData.displayOrder) || 1,
        active: formData.active !== false
      });
      showNotification(`Faculty member "${formData.name}" updated successfully.`);
      setIsModalOpen(false);
      await loadFaculty();
    } catch (err: any) {
      console.error('Failed to update faculty in Supabase:', err);
      alert('Failed to update faculty member. Note: Supabase RLS policy requires an authenticated session for updates.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200">
              FacultyService Active
            </span>
          </div>
          <h1 className="text-2xl font-bold font-cinzel text-stone-900">Faculty & Mentors</h1>
          <p className="text-xs text-stone-500">Manage master mentors, credentials, biographies, social links, and academy pairings</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-medium shadow-sm transition-all inline-flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Add Faculty Member
        </button>
      </div>

      {notification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </div>
      )}

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facultyList.map((faculty) => (
          <div key={faculty.id} className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-stone-100 border border-amber-200 shadow-inner shrink-0">
                  <img src={faculty.image} alt={faculty.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${faculty.active !== false ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-stone-100 text-stone-500 border border-stone-200'}`}>
                    {faculty.active !== false ? <CheckCircle2 className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    {faculty.active !== false ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-bold text-stone-900 font-cinzel mb-0.5">{faculty.name}</h3>
              <p className="text-xs font-semibold text-amber-700 mb-2">{faculty.title}</p>
              
              <p className="text-xs text-stone-600 line-clamp-3 mb-4 bg-stone-50 p-3 rounded-xl border border-stone-100">
                {faculty.bio}
              </p>

              <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Languages:</span>
                  <span className="font-medium text-stone-800">{faculty.languages?.join(', ') || 'English'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Display Order:</span>
                  <span className="font-medium text-stone-800">#{faculty.displayOrder || 1}</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  {faculty.facebookUrl && (
                    <a href={faculty.facebookUrl} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-blue-600 transition-colors">
                      <Facebook className="w-4 h-4" />
                    </a>
                  )}
                  {faculty.youtubeUrl && (
                    <a href={faculty.youtubeUrl} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-red-600 transition-colors">
                      <Youtube className="w-4 h-4" />
                    </a>
                  )}
                  {faculty.consultationLink && (
                    <a href={faculty.consultationLink} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-amber-600 transition-colors ml-auto">
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Verified Faculty
              </span>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => handleOpenEdit(faculty)} 
                  className="p-1.5 rounded-lg border border-stone-200 hover:border-amber-600 text-stone-700 text-xs font-medium transition-colors"
                  title="Edit Profile"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(faculty.id)} 
                  className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete Faculty"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-xl w-full overflow-hidden animate-scaleUp">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold font-cinzel text-stone-900">
                  {editingFaculty ? 'Edit Faculty Profile' : 'Add New Faculty Member'}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Faculty Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Raajeev Singh"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Title / Role
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Founder & Chief Mentor"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.image || ''}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Biography
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.bio || ''}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Professional background, expertise, and credentials..."
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Languages (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={languagesInput}
                    onChange={e => setLanguagesInput(e.target.value)}
                    placeholder="English, Hindi, Bengali"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder || 1}
                    onChange={e => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Consultation Link
                  </label>
                  <input
                    type="url"
                    value={formData.consultationLink || ''}
                    onChange={e => setFormData({ ...formData, consultationLink: e.target.value })}
                    placeholder="https://leofamily.com/consult/..."
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Registration Link
                  </label>
                  <input
                    type="url"
                    value={formData.registrationLink || ''}
                    onChange={e => setFormData({ ...formData, registrationLink: e.target.value })}
                    placeholder="https://leofamily.com/webinar/..."
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    value={formData.facebookUrl || ''}
                    onChange={e => setFormData({ ...formData, facebookUrl: e.target.value })}
                    placeholder="https://facebook.com/..."
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    value={formData.youtubeUrl || ''}
                    onChange={e => setFormData({ ...formData, youtubeUrl: e.target.value })}
                    placeholder="https://youtube.com/@..."
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="activeFaculty"
                  checked={formData.active !== false}
                  onChange={e => setFormData({ ...formData, active: e.target.checked })}
                  className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <label htmlFor="activeFaculty" className="text-xs font-medium text-stone-800 cursor-pointer">
                  Active Faculty Member
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
                  Save Faculty Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
