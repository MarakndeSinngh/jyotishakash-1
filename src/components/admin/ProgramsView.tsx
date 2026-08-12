import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Award, 
  Users, 
  DollarSign, 
  Edit3, 
  Trash2, 
  Star, 
  X, 
  Save, 
  CheckCircle2, 
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';
import { Program } from '../../models/program';
import { programService } from '../../services/programService';

const MENTOR_NAMES: Record<string, string> = {
  raajeev: 'Raajeev Singh Chauhann',
  shaunak: 'Shaunak S. Patthak',
  sannjoy: 'Sannjoy Biswass'
};

export default function ProgramsView() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Program>>({
    mentorId: 'raajeev',
    title: '',
    subtitle: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    duration: '8 Weeks',
    price: 15000,
    discountPrice: 12000,
    featured: false,
    visible: true,
    order: 1
  });

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      setLoading(true);
      const data = await programService.getAllPrograms();
      setPrograms(data);
    } catch (err) {
      console.error('Failed to load programs:', err);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleOpenCreate = () => {
    setEditingProgram(null);
    setFormData({
      mentorId: 'raajeev',
      title: '',
      subtitle: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
      duration: '8 Weeks',
      price: 15000,
      discountPrice: 12000,
      featured: false,
      visible: true,
      order: programs.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (program: Program) => {
    setEditingProgram(program);
    setFormData({ ...program });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this program?')) {
      try {
        await programService.deleteProgram(id);
        await loadPrograms();
        showNotification('Program deleted successfully.');
      } catch (err) {
        console.error('Failed to delete program:', err);
        alert('Failed to delete program.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      alert('Please fill in the program title and price.');
      return;
    }

    try {
      if (editingProgram) {
        console.log('PROGRAM_UPDATE_DEBUG_BEFORE', {
          id: editingProgram.id,
          formData
        });
        const updatedResult = await programService.updateProgram(editingProgram.id, formData);
        console.log('PROGRAM_UPDATE_DEBUG_AFTER', updatedResult);
        showNotification(`Program "${formData.title}" updated successfully.`);
      } else {
        const newProg: Program = {
          id: `prog-${Date.now()}`,
          mentorId: formData.mentorId || 'raajeev',
          title: formData.title || 'Untitled Program',
          subtitle: formData.subtitle || '',
          description: formData.description || '',
          image: formData.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
          duration: formData.duration || '8 Weeks',
          price: Number(formData.price) || 10000,
          discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
          featured: Boolean(formData.featured),
          visible: formData.visible !== false,
          order: Number(formData.order) || 1
        };
        await programService.saveProgram(newProg);
        showNotification('New program created successfully.');
      }

      setIsModalOpen(false);
      await loadPrograms();
    } catch (err) {
      console.error('Failed to save program:', err);
      alert('Failed to save program.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200">
              ProgramService Active
            </span>
          </div>
          <h1 className="text-2xl font-bold font-cinzel text-stone-900">Programs & Curriculums</h1>
          <p className="text-xs text-stone-500">Manage masterclass courses, certifications, pricing modules, and mentor curricula</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-medium shadow-sm transition-all inline-flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Create New Program
        </button>
      </div>

      {notification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </div>
      )}

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <div key={program.id} className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  {program.featured ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 inline-flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-700 text-amber-700" /> Featured
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-600">
                      Standard
                    </span>
                  )}
                  {!program.visible && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-200 text-stone-600 inline-flex items-center gap-1">
                      <EyeOff className="w-3 h-3" /> Hidden
                    </span>
                  )}
                </div>
                <span className="text-sm font-bold text-stone-900 flex items-center gap-0.5">
                  <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                  {program.discountPrice ? (
                    <span>
                      <span className="line-through text-stone-400 text-xs mr-1">₹{program.price.toLocaleString()}</span>
                      ₹{program.discountPrice.toLocaleString()}
                    </span>
                  ) : (
                    <span>₹{program.price.toLocaleString()}</span>
                  )}
                </span>
              </div>

              <h3 className="text-base font-bold text-stone-900 font-cinzel mb-1 line-clamp-1">{program.title}</h3>
              <p className="text-xs text-stone-500 mb-3">Lead Mentor: <span className="font-medium text-stone-700">{MENTOR_NAMES[program.mentorId] || program.mentorId}</span></p>
              
              <p className="text-xs text-stone-600 line-clamp-2 mb-4 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                {program.description || program.subtitle}
              </p>

              <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Duration:</span>
                  <span className="font-medium text-stone-800">{program.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Display Order:</span>
                  <span className="font-medium text-stone-800">#{program.order}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Certificate Included
              </span>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => handleOpenEdit(program)} 
                  className="p-1.5 rounded-lg border border-stone-200 hover:border-amber-600 text-stone-700 text-xs font-medium transition-colors"
                  title="Edit Program"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(program.id)} 
                  className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete Program"
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
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold font-cinzel text-stone-900">
                  {editingProgram ? 'Edit Program Details' : 'Create New Program'}
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
                  Program Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Certified Professional Numerology"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Master ancient Chaldean and Pythagorean systems"
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
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration || ''}
                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 12 Weeks"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price || 0}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Discount Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.discountPrice || ''}
                    onChange={e => setFormData({ ...formData, discountPrice: e.target.value ? Number(e.target.value) : undefined })}
                    placeholder="Optional"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order || 1}
                    onChange={e => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed course overview..."
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featuredProg"
                    checked={Boolean(formData.featured)}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <label htmlFor="featuredProg" className="text-xs font-medium text-stone-800 cursor-pointer">
                    Feature Program
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="visibleProg"
                    checked={formData.visible !== false}
                    onChange={e => setFormData({ ...formData, visible: e.target.checked })}
                    className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <label htmlFor="visibleProg" className="text-xs font-medium text-stone-800 cursor-pointer">
                    Visible on Public Site
                  </label>
                </div>
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
                  Save Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
