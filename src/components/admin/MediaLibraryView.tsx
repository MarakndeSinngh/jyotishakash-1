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
  ExternalLink,
  RefreshCw,
  Check,
  ShieldCheck,
  Filter
} from 'lucide-react';
import { Media } from '../../models/media';
import { mediaService } from '../../services/mediaService';
import { supabase } from '../../lib/supabaseClient';
import { extractYoutubeId } from '../../media/MediaHelpers';

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
  const [deletingMedia, setDeletingMedia] = useState<Media | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  
  // Filters and Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentor, setSelectedMentor] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVisibility, setSelectedVisibility] = useState('All');
  const [selectedFeatured, setSelectedFeatured] = useState('All');
  
  const [fetchingYt, setFetchingYt] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Media>>({
    mentorId: 'raajeev',
    youtubeUrl: '',
    youtubeVideoId: '',
    title: '',
    description: '',
    thumbnail: '',
    category: 'Masterclass',
    featured: false,
    visible: true,
    order: 1,
    speaker: ''
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

  const handleYoutubeUrlChange = (url: string) => {
    const { id: videoId, isShort } = extractYoutubeId(url);
    const validVideoId = videoId && videoId.length === 11 ? videoId : '';

    setFormData(prev => ({
      ...prev,
      youtubeUrl: url,
      youtubeVideoId: validVideoId || prev.youtubeVideoId || '',
      thumbnail: validVideoId && !prev.thumbnail ? `https://img.youtube.com/vi/${validVideoId}/hqdefault.jpg` : prev.thumbnail,
      category: isShort && (!prev.category || prev.category === 'Masterclass' || prev.category === 'General') ? 'Trending Spiritual Shorts' : prev.category
    }));
  };

  const getYouTubeErrorMessage = (err: any, data: any): string => {
    const status = err?.status || err?.context?.status;
    const msg = (data?.error || err?.message || '').toLowerCase();

    if (msg.includes('failed to send a request') || msg.includes('network error') || msg.includes('fetch failed') || (!status && (msg.includes('failed to fetch') || msg.includes('network')))) {
      return 'Unable to connect to the YouTube service. Please try again.';
    }

    if (status === 401 || msg.includes('401') || msg.includes('session') || (msg.includes('unauthorized') && !msg.includes('channel'))) {
      return 'Your admin session has expired. Please sign in again.';
    }

    if (status === 403 || msg.includes('403') || msg.includes('forbidden') || msg.includes('does not belong to') || msg.includes('unauthorized youtube channel')) {
      return 'External YouTube Channel — this video is not from the approved LEO Family channel.';
    }

    if (status === 404 || msg.includes('404') || msg.includes('not found')) {
      return 'YouTube video not found.';
    }

    if (status === 400 || msg.includes('400') || msg.includes('invalid')) {
      return 'Invalid YouTube video URL.';
    }

    if (status === 429 || msg.includes('429') || msg.includes('quota')) {
      return 'YouTube API quota exceeded. Please try again later.';
    }

    if (status >= 500 || msg.includes('500') || msg.includes('server configuration') || msg.includes('encountered an error')) {
      return 'YouTube metadata service encountered an error.';
    }

    return data?.error || err?.message || 'Unable to fetch YouTube information. Please verify the video URL and try again.';
  };

  const handleFetchYoutubeInfo = async () => {
    if (!formData.youtubeUrl) {
      alert('Please enter a valid YouTube URL first.');
      return;
    }
    let resDataCache: any = null;
    let responseDataCache: any = null;
    try {
      setFetchingYt(true);
      console.log('YOUTUBE_FETCH_UI_BEFORE', {
        youtubeUrl: formData.youtubeUrl,
        parsedVideoId: formData.youtubeVideoId
      });
      console.log('YOUTUBE_FETCH_UI_INVOKE_START');

      const { data, error } = await supabase.functions.invoke('fetch-youtube-metadata', {
        body: { youtubeUrl: formData.youtubeUrl }
      });
      responseDataCache = data;

      console.log('YOUTUBE_FETCH_UI_RESPONSE', {
        data,
        error
      });

      const serverError = data?.error || error;
      if (serverError || !data || !data.success) {
        console.log('YOUTUBE_FETCH_UI_INVOKE_ERROR', {
          error,
          message: error?.message || data?.error,
          context: error?.context,
          status: error?.status
        });
        throw error || new Error(data?.error || 'Failed to fetch YouTube info');
      }

      resDataCache = data.data;
      console.log('YOUTUBE_FETCH_UI_SUCCESS', {
        returnedMetadata: resDataCache
      });

      const resData = data.data;
      setFormData(prev => ({
        ...prev,
        youtubeVideoId: resData.youtubeVideoId || prev.youtubeVideoId,
        youtubeUrl: resData.youtubeUrl || prev.youtubeUrl,
        title: resData.title || prev.title,
        description: resData.description || prev.description,
        thumbnail: resData.thumbnail || prev.thumbnail,
        publishedDate: resData.publishedDate || prev.publishedDate,
        viewCount: resData.viewCount !== undefined ? resData.viewCount : prev.viewCount
      }));
      showNotification('YouTube metadata fetched successfully.');
    } catch (err: any) {
      console.error('Fetch YouTube info error:', err);
      const errMessage = getYouTubeErrorMessage(err, responseDataCache);
      alert(errMessage);
    } finally {
      setFetchingYt(false);
    }
  };

  const handleSyncNow = async (item: Media) => {
    try {
      setSyncingId(item.id);
      const { data, error } = await supabase.functions.invoke('fetch-youtube-metadata', {
        body: { youtubeUrl: item.youtubeUrl }
      });

      const serverError = data?.error || error;
      if (serverError || !data || !data.success) {
        throw error || new Error(data?.error || 'Failed to sync');
      }

      const resData = data.data;
      await mediaService.updateMedia(item.id, {
        title: resData.title || item.title,
        description: resData.description || item.description,
        thumbnail: resData.thumbnail || item.thumbnail,
        publishedDate: resData.publishedDate || item.publishedDate,
        viewCount: resData.viewCount !== undefined ? resData.viewCount : item.viewCount
      });

      await loadMedia();
      showNotification(`Successfully synced metadata for "${item.title || item.youtubeVideoId}"`);
    } catch (err: any) {
      console.error('Sync error:', err);
      const errMessage = getYouTubeErrorMessage(err, null);
      alert(`Failed to sync: ${errMessage}`);
    } finally {
      setSyncingId(null);
    }
  };

  const handleToggleVisible = async (item: Media) => {
    try {
      const newVisible = !item.visible;
      await mediaService.updateMedia(item.id, { visible: newVisible });
      await loadMedia();
      showNotification(`Media is now ${newVisible ? 'Visible' : 'Hidden'}.`);
    } catch (err) {
      console.error('Toggle visibility error:', err);
      alert('Failed to update visibility status.');
    }
  };

  const handleToggleFeatured = async (item: Media) => {
    try {
      const newFeatured = !item.featured;
      await mediaService.updateMedia(item.id, { featured: newFeatured });
      await loadMedia();
      showNotification(`Media is now ${newFeatured ? 'Featured' : 'Standard'}.`);
    } catch (err) {
      console.error('Toggle featured error:', err);
      alert('Failed to update featured status.');
    }
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
      order: mediaList.length + 1,
      speaker: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Media) => {
    setEditingMedia(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingMedia) return;
    try {
      await mediaService.deleteMedia(deletingMedia.id);
      setDeletingMedia(null);
      await loadMedia();
      showNotification('Media deleted from LEO Family successfully.');
    } catch (err) {
      console.error('Failed to delete media:', err);
      alert('Failed to delete media.');
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
          youtubeVideoId: formData.youtubeVideoId || '',
          title: formData.title || '',
          description: formData.description || '',
          thumbnail: formData.thumbnail || 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
          category: formData.category || 'Masterclass',
          featured: Boolean(formData.featured),
          visible: formData.visible !== false,
          order: Number(formData.order) || 1,
          speaker: formData.speaker || '',
          publishedDate: formData.publishedDate || new Date().toISOString().split('T')[0],
          viewCount: formData.viewCount || 0
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
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.youtubeVideoId && item.youtubeVideoId.toLowerCase().includes(q)) ||
      (item.youtubeUrl && item.youtubeUrl.toLowerCase().includes(q)) ||
      (item.speaker && item.speaker.toLowerCase().includes(q)) ||
      (MENTOR_NAMES[item.mentorId] || item.mentorId).toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);

    const matchesMentor = selectedMentor === 'All' || item.mentorId === selectedMentor;
    const matchesCat = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesVis = selectedVisibility === 'All' || (selectedVisibility === 'visible' ? item.visible : !item.visible);
    const matchesFeat = selectedFeatured === 'All' || (selectedFeatured === 'featured' ? item.featured : !item.featured);

    return matchesSearch && matchesMentor && matchesCat && matchesVis && matchesFeat;
  });

  const categories = ['All', ...Array.from(new Set(mediaList.map(m => m.category).filter(Boolean)))];

  const totalCount = mediaList.length;
  const visibleCount = mediaList.filter(m => m.visible).length;
  const hiddenCount = mediaList.filter(m => !m.visible).length;
  const featuredCount = mediaList.filter(m => m.featured).length;

  return (
    <div className="space-y-6">
      {/* Header & Counts */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200 inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Official LEO Family Channel Secured
            </span>
          </div>
          <h1 className="text-2xl font-bold font-cinzel text-stone-900">YouTube Media Vault</h1>
          <p className="text-xs text-stone-500">Manage masterclass recordings, broadcasts, visibility, and verified LEO Family channel assets</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-medium shadow-sm transition-all inline-flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Add YouTube Video
        </button>
      </div>

      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Total Records</p>
            <p className="text-xl font-bold font-cinzel text-stone-900 mt-0.5">{totalCount}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
            <Film className="w-4 h-4" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Visible</p>
            <p className="text-xl font-bold font-cinzel text-emerald-700 mt-0.5">{visibleCount}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Eye className="w-4 h-4" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Hidden</p>
            <p className="text-xl font-bold font-cinzel text-stone-600 mt-0.5">{hiddenCount}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-600 flex items-center justify-center">
            <EyeOff className="w-4 h-4" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Featured</p>
            <p className="text-xl font-bold font-cinzel text-amber-600 mt-0.5">{featuredCount}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          </div>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </div>
      )}

      {/* Advanced Search & Filters Toolbar */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by title, description, video ID, speaker, or mentor..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 px-3 py-2 rounded-xl">
              <Filter className="w-3.5 h-3.5 text-stone-500" />
              <span className="text-[11px] text-stone-500 font-medium">Filters:</span>
            </div>
            
            <select
              value={selectedMentor}
              onChange={e => setSelectedMentor(e.target.value)}
              className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-700 focus:outline-none"
            >
              <option value="All">All Mentors</option>
              <option value="raajeev">Raajeev Singh</option>
              <option value="shaunak">Shaunak Patthak</option>
              <option value="sannjoy">Sannjoy Biswass</option>
            </select>

            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-700 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
              ))}
            </select>

            <select
              value={selectedVisibility}
              onChange={e => setSelectedVisibility(e.target.value)}
              className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-700 focus:outline-none"
            >
              <option value="All">All Visibility</option>
              <option value="visible">Visible Only</option>
              <option value="hidden">Hidden Only</option>
            </select>

            <select
              value={selectedFeatured}
              onChange={e => setSelectedFeatured(e.target.value)}
              className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-700 focus:outline-none"
            >
              <option value="All">All Featured</option>
              <option value="featured">Featured Only</option>
              <option value="unfeatured">Not Featured</option>
            </select>
          </div>
        </div>

        {/* Media Grid / List */}
        {filteredMedia.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <Film className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-stone-800">
              {mediaList.length === 0 ? 'No YouTube media found.' : 'No media matches your search or filters.'}
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your search terms or clearing selected filter criteria to view available recordings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
            {filteredMedia.map((item) => (
              <div 
                key={item.id} 
                className={`bg-stone-50/60 rounded-2xl border transition-all overflow-hidden flex flex-col justify-between group ${
                  item.visible ? 'border-stone-200/80 hover:shadow-md' : 'border-dashed border-stone-300 opacity-80'
                }`}
              >
                <div>
                  <div className="relative aspect-video bg-stone-900 overflow-hidden">
                    <img 
                      src={item.thumbnail || 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'} 
                      alt={item.title || item.category}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-stone-950/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <a 
                        href={item.youtubeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
                        title="Open YouTube Video"
                      >
                        <Youtube className="w-5 h-5" />
                      </a>
                    </div>
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-semibold">
                        {item.category}
                      </span>
                      {item.featured && (
                        <span className="px-2 py-0.5 rounded bg-amber-500 text-stone-950 text-[10px] font-bold inline-flex items-center gap-0.5 shadow-xs">
                          <Star className="w-3 h-3 fill-stone-950" /> Featured
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-2.5 right-2.5">
                      <span className="px-2 py-0.5 rounded bg-stone-950/80 text-stone-300 text-[9px] font-mono">
                        ID: {item.youtubeVideoId}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-stone-800 truncate">
                        {MENTOR_NAMES[item.mentorId] || item.mentorId}
                      </span>
                      <span className="text-[10px] text-stone-400 font-medium">Order: #{item.order}</span>
                    </div>

                    <h4 className="text-xs font-bold text-stone-900 line-clamp-2 leading-relaxed" title={item.title}>
                      {item.title || 'Untitled Masterclass'}
                    </h4>

                    <div className="flex items-center justify-between pt-1">
                      <a 
                        href={item.youtubeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[11px] font-medium text-stone-600 hover:text-amber-700 truncate inline-flex items-center gap-1"
                        title={item.youtubeUrl}
                      >
                        <Youtube className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <span className="truncate max-w-[140px]">{item.youtubeUrl}</span>
                      </a>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium inline-flex items-center gap-0.5 shrink-0" title="Verified official LEO Family channel">
                        <Check className="w-3 h-3 text-emerald-600" /> Verified
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white border-t border-stone-200/60 space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] text-stone-500">
                    <span>Synced: {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'Auto-sync'}</span>
                    <button
                      onClick={() => handleSyncNow(item)}
                      disabled={syncingId === item.id}
                      className="text-stone-700 hover:text-amber-600 inline-flex items-center gap-1 font-medium disabled:opacity-50 transition-colors"
                      title="Refresh YouTube Metadata Now"
                    >
                      <RefreshCw className={`w-3 h-3 ${syncingId === item.id ? 'animate-spin text-amber-600' : ''}`} />
                      {syncingId === item.id ? 'Syncing...' : 'Sync Now'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleToggleVisible(item)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-medium inline-flex items-center gap-1 transition-colors ${
                          item.visible ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                        title={item.visible ? 'Click to hide from public' : 'Click to make visible'}
                      >
                        {item.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {item.visible ? 'Visible' : 'Hidden'}
                      </button>

                      <button
                        onClick={() => handleToggleFeatured(item)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          item.featured ? 'bg-amber-50 border-amber-300 text-amber-700' : 'border-stone-200 text-stone-400 hover:text-amber-600'
                        }`}
                        title={item.featured ? 'Featured on homepage' : 'Mark as featured'}
                      >
                        <Star className={`w-3.5 h-3.5 ${item.featured ? 'fill-amber-500 text-amber-500' : ''}`} />
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <a
                        href={item.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg border border-stone-200 text-stone-700 hover:border-amber-600 transition-colors"
                        title="Open YouTube in New Tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 rounded-lg border border-stone-200 text-stone-700 hover:border-amber-600 transition-colors"
                        title="Edit Media"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingMedia(item)}
                        className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Media"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
                  {editingMedia ? 'Edit YouTube Media Asset' : 'Add New YouTube Media Asset'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
                    YouTube Video URL
                  </label>
                  <button
                    type="button"
                    onClick={handleFetchYoutubeInfo}
                    disabled={fetchingYt}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[11px] font-medium shadow-xs transition-colors disabled:opacity-50 inline-flex items-center gap-1.5"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    {fetchingYt ? 'Verifying Channel...' : 'Fetch YouTube Info'}
                  </button>
                </div>
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
                <p className="text-[10px] text-stone-400 mt-1">
                  Videos are strictly validated against the official LEO Family YouTube channel (External channels will be rejected).
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Video Title
                </label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Masterclass on Numerology & Lo Shu Grid"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Video description..."
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    YouTube Video ID
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
                    placeholder="e.g. Masterclass, Chaldean Numerology"
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
                  Thumbnail Image URL
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
                    className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="featuredMedia" className="text-xs font-medium text-stone-800 cursor-pointer">
                    Feature Asset on Homepage
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="visibleMedia"
                    checked={formData.visible !== false}
                    onChange={e => setFormData({ ...formData, visible: e.target.checked })}
                    className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
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

      {/* SAFE DELETE CONFIRMATION DIALOG */}
      {deletingMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-md w-full overflow-hidden animate-scaleUp p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900">Delete this media from LEO Family?</h3>
                <p className="text-xs text-stone-500">This action cannot be undone.</p>
              </div>
            </div>

            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/80 flex items-center gap-3">
              <img 
                src={deletingMedia.thumbnail || 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=200'} 
                alt={deletingMedia.title || 'Thumbnail'} 
                className="w-16 h-10 object-cover rounded-lg shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-stone-900 truncate">{deletingMedia.title || 'Untitled Video'}</p>
                <p className="text-[10px] text-stone-400 truncate">{deletingMedia.youtubeUrl}</p>
              </div>
            </div>

            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-[11px] text-amber-900 leading-relaxed space-y-1">
              <p className="font-semibold">Important Note:</p>
              <p>This will remove the media record from the LEO Family website and Admin Library.</p>
              <p className="font-medium">It will NOT delete the original YouTube video.</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingMedia(null)}
                className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-medium hover:bg-stone-100 transition-colors"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-medium shadow-md transition-all"
              >
                DELETE FROM LEO FAMILY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
