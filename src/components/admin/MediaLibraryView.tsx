import React, { useState, useEffect } from 'react';
import { 
  Film, 
  Plus, 
  Edit3, 
  Trash2, 
  Star, 
  X, 
  Save, 
  CheckCircle2, 
  Youtube,
  Eye,
  EyeOff,
  Search,
  ExternalLink
} from 'lucide-react';
import { Media } from '../../models/media';
import { mediaService } from '../../services/mediaService';

const MENTOR_NAMES: Record<string, string> = {
  raajeev: 'Raajeev Singh Chauhann',
  shaunak: 'Shaunak S. Patthak',
  sannjoy: 'Sannjoy Biswass'
};

export default function MediaLibraryView() {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState<Media | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Form state
  const [formData, setFormData] = useState<Partial<Media>>({
    mentorId: 'raajeev',
    youtubeUrl: '',
    youtubeVideoId: '',
    thumbnail: '',
    category: 'Masterclass',
    featured: false,
    visible: true,
    order: 1
  });

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      setLoading(true);
      const data = await mediaService.getAllMedia();
      setMediaList(data);
    } catch (err) {
      console.error('Failed to load media:', err);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Helper to extract YouTube ID and auto-generate thumbnail if empty
  const handleYoutubeUrlChange = (url: string) => {
    let videoId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    }

    setFormData(prev => ({
      ...prev,
      youtubeUrl: url,
      youtubeVideoId: videoId || prev.youtubeVideoId || '',
      thumbnail: videoId && !prev.thumbnail ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : prev.thumbnail
    }));
  };

  const handleOpenCreate = () => {
    setEditingMedia(null);
    setFormData({
      mentorId: 'raajeev',
      youtubeUrl: '',
      youtubeVideoId: '',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
      category: 'Masterclass',
      featured: false,
      visible: true,
      order: mediaList.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Media) => {
    setEditingMedia(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this media item?')) {
      try {
        await mediaService.deleteMedia(id);
        await loadMedia();
        showNotification('Media deleted successfully.');
      } catch (err) {
        console.error('Failed to delete media:', err);
        alert('Failed to delete media.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.youtubeUrl || !formData.category) {
      alert('Please provide a YouTube URL and Category.');
      return;
    }

    try {
      if (editingMedia) {
        await mediaService.updateMedia(editingMedia.id, formData);
        showNotification('Media updated successfully.');
      } else {
        const newItem: Media = {
          id: `media-${Date.now()}`,
          mentorId: formData.mentorId || 'raajeev',
          youtubeUrl: formData.youtubeUrl || '',
          youtubeVideoId: formData.youtubeVideoId || 'dQw4w9WgXcQ',
          thumbnail: formData.thumbnail || 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
          category: formData.category || 'Masterclass',
          featured: Boolean(formData.featured),
          visible: formData.visible !== false,
          order: Number(formData.order) || 1
        };
        await mediaService.saveMedia(newItem);
        showNotification('New media added successfully.');
      }

      setIsModalOpen(false);
      await loadMedia();
    } catch (err) {
      console.error('Failed to save media:', err);
      alert('Failed to save media.');
    }
  };

  const filteredMedia = mediaList.filter(item => {
    const matchesSearch = item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.youtubeUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (MENTOR_NAMES[item.mentorId] || item.mentorId).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const categories = ['All', ...Array.from(new Set(mediaList.map(m => m.category)))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200">
              MediaService Active
            </span>
          </div>
          <h1 className="text-2xl font-bold font-cinzel text-stone-900">Media Library & Video Vault</h1>
          <p className="text-xs text-stone-500">Manage YouTube videos, masterclass recordings, thumbnails, categories, and mentor broadcasts</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-medium shadow-sm transition-all inline-flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Add New Media Asset
        </button>
      </div>

      {notification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by mentor, category, or URL..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500">Category:</span>
            <select 
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-700 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMedia.map((item) => (
            <div key={item.id} className="bg-stone-50/60 rounded-2xl border border-stone-200/80 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div>
                <div className="relative aspect-video bg-stone-900 overflow-hidden">
                  <img 
                    src={item.thumbnail || 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'} 
                    alt={item.category}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <a 
                      href={item.youtubeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
                      title="Open on YouTube"
                    >
                      <Youtube className="w-5 h-5" />
                    </a>
                  </div>
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-semibold">
                      {item.category}
                    </span>
                    {item.featured && (
                      <span className="px-2 py-0.5 rounded bg-amber-500 text-stone-950 text-[10px] font-bold inline-flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-stone-950" /> Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-stone-800">
                      {MENTOR_NAMES[item.mentorId] || item.mentorId}
                    </span>
                    <span className="text-[10px] text-stone-400">Order: #{item.order}</span>
                  </div>
                  <a 
                    href={item.youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-stone-700 hover:text-amber-700 truncate block flex items-center gap-1"
                  >
                    <Youtube className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span className="truncate">{item.youtubeUrl}</span>
                  </a>
                </div>
              </div>

              <div className="px-4 py-3 bg-white border-t border-stone-200/60 flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1 ${item.visible ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-500'}`}>
                  {item.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  {item.visible ? 'Visible' : 'Hidden'}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg border border-stone-200 text-stone-700 hover:border-amber-600 transition-colors"
                    title="Edit Media"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Media"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-xl w-full overflow-hidden animate-scaleUp">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center">
                  <Film className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold font-cinzel text-stone-900">
                  {editingMedia ? 'Edit Media Asset' : 'Add New Media Asset'}
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
                  YouTube Video URL
                </label>
                <div className="relative">
                  <Youtube className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-600" />
                  <input
                    type="url"
                    required
                    value={formData.youtubeUrl || ''}
                    onChange={e => handleYoutubeUrlChange(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    YouTube Video ID (Auto)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.youtubeVideoId || ''}
                    onChange={e => setFormData({ ...formData, youtubeVideoId: e.target.value })}
                    placeholder="e.g. dQw4w9WgXcQ"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 font-mono focus:outline-none focus:border-amber-600"
                  />
                </div>

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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category || ''}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Masterclass, Chaldean, Lo Shu"
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
                  Thumbnail Image URL (Auto or Custom)
                </label>
                <input
                  type="url"
                  value={formData.thumbnail || ''}
                  onChange={e => setFormData({ ...formData, thumbnail: e.target.value })}
                  placeholder="https://img.youtube.com/vi/.../hqdefault.jpg"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featuredMedia"
                    checked={Boolean(formData.featured)}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <label htmlFor="featuredMedia" className="text-xs font-medium text-stone-800 cursor-pointer">
                    Feature Asset
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="visibleMedia"
                    checked={formData.visible !== false}
                    onChange={e => setFormData({ ...formData, visible: e.target.checked })}
                    className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <label htmlFor="visibleMedia" className="text-xs font-medium text-stone-800 cursor-pointer">
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
                  Save Media Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
