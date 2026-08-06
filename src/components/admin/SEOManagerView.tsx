import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  Tag, 
  ShieldCheck, 
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { seoService } from '../../services/seoService';
import { SEOPage } from '../../models/seo';

export default function SEOManagerView() {
  const [pages, setPages] = useState<SEOPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedPage, setSelectedPage] = useState<SEOPage | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form state for editing or creating
  const [formData, setFormData] = useState<Partial<SEOPage>>({
    pageName: '',
    urlSlug: '',
    browserTitle: '',
    metaDescription: '',
    metaKeywords: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterCardImage: '',
    robots: 'index, follow',
    structuredDataType: 'WebSite',
    sitemapPriority: '0.8'
  });

  useEffect(() => {
    loadSeoPages();
  }, []);

  async function loadSeoPages() {
    try {
      setLoading(true);
      const data = await seoService.getSeoPages();
      setPages(data);
    } catch (err: any) {
      console.error('Failed to load SEO pages:', err);
      setError('Failed to load SEO data');
    } finally {
      setLoading(false);
    }
  }

  const handleEditClick = (page: SEOPage) => {
    setSelectedPage(page);
    setFormData({ ...page });
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleCreateClick = () => {
    setSelectedPage(null);
    setFormData({
      pageName: '',
      urlSlug: '/',
      browserTitle: '',
      metaDescription: '',
      metaKeywords: '',
      canonicalUrl: 'https://leofamily.com/',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      twitterCardImage: '',
      robots: 'index, follow',
      structuredDataType: 'WebSite',
      sitemapPriority: '0.8'
    });
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isCreating) {
        await seoService.createSeoPage(formData as any);
        setSuccessMessage('New SEO page successfully created.');
      } else if (isEditing && selectedPage) {
        await seoService.updateSeoPage(selectedPage.id, formData);
        setSuccessMessage('SEO configuration successfully updated.');
      }
      await loadSeoPages();
      setIsEditing(false);
      setIsCreating(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error('Failed to save SEO page:', err);
      setError('Failed to save SEO page');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this SEO page configuration?')) return;
    try {
      await seoService.deleteSeoPage(id);
      setSuccessMessage('SEO page deleted successfully.');
      await loadSeoPages();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error('Failed to delete SEO page:', err);
      setError('Failed to delete SEO page');
    }
  };

  const filteredPages = pages.filter(page => {
    const matchesSearch = 
      page.pageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.urlSlug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.browserTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || page.structuredDataType === filterType;

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-stone-500 text-xs">
        Loading SEO Manager...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-cinzel text-stone-900 flex items-center gap-2">
            <Globe className="w-6 h-6 text-amber-600" /> Technical SEO Manager
          </h1>
          <p className="text-xs text-stone-500">Manage metadata, Open Graph tags, canonical URLs, robots, and structured data across LEO Family</p>
        </div>
        <button
          onClick={handleCreateClick}
          className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add New Page SEO
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {successMessage}
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search by page name, slug, or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-stone-500" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
          >
            <option value="all">All Schema Types</option>
            <option value="WebSite">WebSite</option>
            <option value="ProfilePage">ProfilePage</option>
            <option value="Event">Event</option>
            <option value="CollectionPage">CollectionPage</option>
            <option value="Course">Course</option>
            <option value="Article">Article</option>
          </select>
        </div>
      </div>

      {/* EDIT / CREATE MODAL */}
      {(isEditing || isCreating) && (
        <div className="fixed inset-0 bg-stone-950/60 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <h2 className="text-base font-bold font-cinzel text-stone-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-600" />
                {isCreating ? 'Create New Page SEO Configuration' : `Edit SEO: ${selectedPage?.pageName}`}
              </h2>
              <button
                onClick={() => { setIsEditing(false); setIsCreating(false); }}
                className="p-2 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Page Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pageName || ''}
                    onChange={(e) => setFormData({ ...formData, pageName: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.urlSlug || ''}
                    onChange={(e) => setFormData({ ...formData, urlSlug: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Browser Title (&lt;title&gt;)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.browserTitle || ''}
                    onChange={(e) => setFormData({ ...formData, browserTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={formData.metaDescription || ''}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Meta Keywords (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.metaKeywords || ''}
                    onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Canonical URL
                  </label>
                  <input
                    type="text"
                    value={formData.canonicalUrl || ''}
                    onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Structured Data Type (Schema.org)
                  </label>
                  <select
                    value={formData.structuredDataType || 'WebSite'}
                    onChange={(e) => setFormData({ ...formData, structuredDataType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  >
                    <option value="WebSite">WebSite</option>
                    <option value="Organization">Organization</option>
                    <option value="Course">Course</option>
                    <option value="Article">Article</option>
                    <option value="FAQPage">FAQPage</option>
                    <option value="ProfilePage">ProfilePage</option>
                    <option value="Event">Event</option>
                    <option value="CollectionPage">CollectionPage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Open Graph Title
                  </label>
                  <input
                    type="text"
                    value={formData.ogTitle || ''}
                    onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Robots Directive
                  </label>
                  <select
                    value={formData.robots || 'index, follow'}
                    onChange={(e) => setFormData({ ...formData, robots: e.target.value as any })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  >
                    <option value="index, follow">index, follow</option>
                    <option value="noindex, nofollow">noindex, nofollow</option>
                    <option value="index, nofollow">index, nofollow</option>
                    <option value="noindex, follow">noindex, follow</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Open Graph Description
                  </label>
                  <textarea
                    rows={2}
                    value={formData.ogDescription || ''}
                    onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Open Graph Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.ogImage || ''}
                    onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Twitter Card Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.twitterCardImage || ''}
                    onChange={(e) => setFormData({ ...formData, twitterCardImage: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Sitemap Priority (0.0 - 1.0)
                  </label>
                  <input
                    type="text"
                    value={formData.sitemapPriority || '0.8'}
                    onChange={(e) => setFormData({ ...formData, sitemapPriority: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => { setIsEditing(false); setIsCreating(false); }}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md inline-flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save SEO Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pages Table */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
                <th className="p-4">Page & Slug</th>
                <th className="p-4">Browser Title & Description</th>
                <th className="p-4">Schema & Robots</th>
                <th className="p-4">Priority / Updated</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
              {filteredPages.map((page) => (
                <tr key={page.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="p-4 align-top">
                    <div className="font-bold text-stone-900">{page.pageName}</div>
                    <div className="text-[11px] font-mono text-amber-700 mt-0.5">{page.urlSlug}</div>
                  </td>
                  <td className="p-4 align-top max-w-xs">
                    <div className="font-medium text-stone-800 line-clamp-1">{page.browserTitle}</div>
                    <div className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">{page.metaDescription}</div>
                  </td>
                  <td className="p-4 align-top">
                    <div className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-1">
                      {page.structuredDataType}
                    </div>
                    <div className="text-[11px] font-mono text-stone-600">{page.robots}</div>
                  </td>
                  <td className="p-4 align-top">
                    <div className="font-semibold text-stone-900">Priority: {page.sitemapPriority}</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">{page.lastUpdated}</div>
                  </td>
                  <td className="p-4 align-top text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditClick(page)}
                        className="p-1.5 text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit SEO"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(page.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete SEO Page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPages.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-stone-400">
                    No SEO page configurations found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
