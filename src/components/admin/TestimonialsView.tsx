import React, { useState, useEffect } from 'react';
import { Star, Plus, CheckCircle2, Trash2, Edit3, Search, Filter, AlertCircle, Eye, EyeOff, FileSpreadsheet, Download } from 'lucide-react';
import { Testimonial } from '../../types/cms';
import { supabaseTestimonialRepository } from '../../repositories/supabaseTestimonialRepository';
import TestimonialModal from './TestimonialModal';
import TestimonialBulkImport from './TestimonialBulkImport';
import { generateTestimonialTemplate } from '../../utils/testimonialExcel';

export default function TestimonialsView() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  // Delete Confirmation State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleteConfirmName, setDeleteConfirmName] = useState<string>('');

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await supabaseTestimonialRepository.getAll();
      setTestimonials(data || []);
    } catch (err: any) {
      console.error('Failed to load testimonials:', err);
      setError(err?.message || 'Failed to load testimonials from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleOpenAdd = () => {
    setSelectedTestimonial(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setSelectedTestimonial(t);
    setIsModalOpen(true);
  };

  const handleSave = async (data: Partial<Testimonial>) => {
    if (selectedTestimonial && selectedTestimonial.id) {
      // Update
      const updated = await supabaseTestimonialRepository.update(selectedTestimonial.id, data);
      if (updated) {
        setSuccessMessage('Testimonial updated successfully.');
        setTimeout(() => setSuccessMessage(null), 4000);
        await loadTestimonials();
      }
    } else {
      // Create
      const created = await supabaseTestimonialRepository.create(data);
      if (created) {
        setSuccessMessage('Testimonial created successfully.');
        setTimeout(() => setSuccessMessage(null), 4000);
        await loadTestimonials();
      }
    }
  };

  const handleTogglePublish = async (t: Testimonial) => {
    if (!t.id) return;
    try {
      const newPublished = !t.published;
      const updated = await supabaseTestimonialRepository.update(t.id, { published: newPublished });
      if (updated) {
        setSuccessMessage(newPublished ? 'Testimonial published successfully.' : 'Testimonial set to draft.');
        setTimeout(() => setSuccessMessage(null), 3000);
        await loadTestimonials();
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to update publication status.');
    }
  };

  const handleDeletePrompt = (t: Testimonial) => {
    if (!t.id) return;
    setDeleteConfirmId(t.id);
    setDeleteConfirmName(t.name);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await supabaseTestimonialRepository.delete(deleteConfirmId);
      setSuccessMessage('Testimonial deleted successfully.');
      setTimeout(() => setSuccessMessage(null), 4000);
      setDeleteConfirmId(null);
      setDeleteConfirmName('');
      await loadTestimonials();
    } catch (err: any) {
      setError(err?.message || 'Failed to delete testimonial.');
      setDeleteConfirmId(null);
    }
  };

  // Filter & Sort
  const filteredTestimonials = testimonials.filter((t) => {
    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'published'
        ? t.published === true
        : t.published === false;

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      t.name.toLowerCase().includes(query) ||
      (t.role && t.role.toLowerCase().includes(query)) ||
      (t.course && t.course.toLowerCase().includes(query)) ||
      t.feedback.toLowerCase().includes(query) ||
      (t.testimonialCode && t.testimonialCode.toLowerCase().includes(query));

    return matchesStatus && matchesSearch;
  });

  // Sorting: displayOrder ascending, then testimonialDate descending, then createdAt descending
  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => {
    const orderA = a.displayOrder ?? 0;
    const orderB = b.displayOrder ?? 0;
    if (orderA !== orderB) return orderA - orderB;

    const dateA = a.testimonialDate ? new Date(a.testimonialDate).getTime() : 0;
    const dateB = b.testimonialDate ? new Date(b.testimonialDate).getTime() : 0;
    if (dateA !== dateB) return dateB - dateA;

    const createdA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const createdB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return createdB - createdA;
  });

  const existingCodes = testimonials.map(t => t.testimonialCode).filter(Boolean) as string[];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-cinzel text-stone-900">Student Testimonials</h1>
          <p className="text-xs text-stone-500">Manage student reviews, video success stories, and trust ratings</p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => generateTestimonialTemplate()}
            className="px-4 py-2.5 bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 rounded-xl text-xs font-medium shadow-sm transition-all inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-amber-600" />
            Download Template
          </button>
          <button
            onClick={() => setIsBulkImportOpen(true)}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-medium shadow-sm transition-all inline-flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Bulk Import
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-medium shadow-sm transition-all inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Testimonial
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-700">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search testimonials..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-stone-400" />
          <span className="text-xs font-medium text-stone-600">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white"
          >
            <option value="all">All Testimonials</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-700">
            Reviews & Success Stories ({sortedTestimonials.length})
          </h2>
          <span className="text-xs text-amber-700 font-medium bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            ★ Live Database Sync
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-stone-500">Loading testimonials from Supabase...</div>
        ) : sortedTestimonials.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-xs text-stone-500">No testimonials found matching your criteria.</p>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-medium inline-flex items-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" /> Add First Testimonial
            </button>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {sortedTestimonials.map((item) => (
              <div key={item.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex text-amber-500">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-stone-900">{item.name}</span>
                    {item.role && <span className="text-xs text-stone-500">({item.role})</span>}
                    {item.course && <span className="text-xs text-stone-400">• {item.course}</span>}
                    {item.testimonialCode && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-stone-100 font-mono text-stone-600">
                        {item.testimonialCode}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 italic">"{item.feedback}"</p>
                  <div className="flex items-center gap-3 text-[11px] text-stone-400">
                    {item.testimonialDate && <span>Date: {item.testimonialDate.substring(0, 10)}</span>}
                    <span>Order: {item.displayOrder ?? 0}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <button
                    onClick={() => handleTogglePublish(item)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 transition-colors ${
                      item.published
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                        : 'bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200'
                    }`}
                    title="Click to toggle publish status"
                  >
                    {item.published ? <CheckCircle2 className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    {item.published ? 'Published' : 'Draft'}
                  </button>

                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors"
                    title="Edit Testimonial"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeletePrompt(item)}
                    className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Testimonial"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        testimonial={selectedTestimonial}
        existingCodes={existingCodes}
      />

      {/* Bulk Import Modal */}
      <TestimonialBulkImport
        isOpen={isBulkImportOpen}
        onClose={() => setIsBulkImportOpen(false)}
        onSuccess={() => {
          setSuccessMessage('Bulk import completed successfully.');
          setTimeout(() => setSuccessMessage(null), 4000);
          loadTestimonials();
        }}
        existingCodes={existingCodes}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 border border-stone-200">
            <h3 className="text-base font-bold text-stone-900 font-cinzel">Confirm Deletion</h3>
            <p className="text-xs text-stone-600">
              Are you sure you want to delete the testimonial from <span className="font-semibold text-stone-900">{deleteConfirmName}</span>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 text-xs font-medium hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-medium shadow-sm"
              >
                Delete Testimonial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
