import React, { useState, useEffect } from 'react';
import { X, Star, AlertCircle } from 'lucide-react';
import { Testimonial } from '../../types/cms';

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Testimonial>) => Promise<void>;
  testimonial?: Testimonial | null;
  existingCodes: string[];
}

export default function TestimonialModal({
  isOpen,
  onClose,
  onSave,
  testimonial,
  existingCodes
}: TestimonialModalProps) {
  const [testimonialCode, setTestimonialCode] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [course, setCourse] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState('');
  const [published, setPublished] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [testimonialDate, setTestimonialDate] = useState('');
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (testimonial) {
      setTestimonialCode(testimonial.testimonialCode || '');
      setName(testimonial.name || '');
      setRole(testimonial.role || '');
      setCourse(testimonial.course || '');
      setFeedback(testimonial.feedback || '');
      setRating(testimonial.rating || 5);
      setImage(testimonial.image || '');
      setPublished(testimonial.published ?? true);
      setDisplayOrder(testimonial.displayOrder ?? 0);
      setTestimonialDate(testimonial.testimonialDate ? testimonial.testimonialDate.substring(0, 10) : new Date().toISOString().substring(0, 10));
    } else {
      const randomCode = `TEST-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setTestimonialCode(randomCode);
      setName('');
      setRole('');
      setCourse('');
      setFeedback('');
      setRating(5);
      setImage('');
      setPublished(true);
      setDisplayOrder(0);
      setTestimonialDate(new Date().toISOString().substring(0, 10));
    }
    setError('');
  }, [testimonial, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!testimonialCode.trim()) {
      setError('Testimonial code is required.');
      return;
    }
    if (!name.trim()) {
      setError('Student name is required.');
      return;
    }
    if (!feedback.trim()) {
      setError('Feedback quote is required.');
      return;
    }
    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      setError('Rating must be an integer between 1 and 5.');
      return;
    }

    // Check duplicate code if creating or changing code
    if (!testimonial || testimonial.testimonialCode !== testimonialCode.trim()) {
      if (existingCodes.includes(testimonialCode.trim())) {
        setError('This testimonial code already exists. Please use a unique code.');
        return;
      }
    }

    try {
      setIsSubmitting(true);
      await onSave({
        testimonialCode: testimonialCode.trim(),
        name: name.trim(),
        role: role.trim() || undefined,
        course: course.trim() || undefined,
        feedback: feedback.trim(),
        rating: numRating,
        image: image.trim() || undefined,
        published,
        displayOrder: Number(displayOrder) || 0,
        testimonialDate: testimonialDate || undefined
      });
      setIsSubmitting(false);
      onClose();
    } catch (err: any) {
      setIsSubmitting(false);
      setError(err?.message || 'Failed to save testimonial.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full overflow-hidden border border-stone-200 my-8">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h3 className="text-lg font-bold font-cinzel text-stone-900">
            {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Testimonial Code *
              </label>
              <input
                type="text"
                value={testimonialCode}
                onChange={(e) => setTestimonialCode(e.target.value)}
                placeholder="e.g. TEST-RAMESH"
                required
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Student Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Rameshwar Varma"
                required
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Role / Title
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Enterprise CEO"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Course / Program
              </label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="e.g. Vedic Business Numerology"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Feedback Quote *
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter student review or success story..."
              required
              rows={3}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Rating (1-5) *
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white"
              >
                <option value={5}>★★★★★ (5)</option>
                <option value={4}>★★★★☆ (4)</option>
                <option value={3}>★★★☆☆ (3)</option>
                <option value={2}>★★☆☆☆ (2)</option>
                <option value={1}>★☆☆☆☆ (1)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Testimonial Date
              </label>
              <input
                type="date"
                value={testimonialDate}
                onChange={(e) => setTestimonialDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Avatar / Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="published-toggle"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded border-stone-300 focus:ring-amber-500"
            />
            <label htmlFor="published-toggle" className="text-xs font-medium text-stone-700 cursor-pointer">
              Published (Visible on public website)
            </label>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 text-xs font-medium hover:bg-stone-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium shadow-sm transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : testimonial ? 'Update Testimonial' : 'Create Testimonial'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
