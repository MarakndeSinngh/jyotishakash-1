import React, { useState, useEffect } from 'react';
import { 
  FolderKanban, 
  Search, 
  Filter, 
  LayoutGrid, 
  List as ListIcon, 
  Plus, 
  Eye, 
  Trash2, 
  RefreshCw, 
  Copy, 
  CheckCircle2, 
  X, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Tag, 
  Globe, 
  Lock, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { mediaAssetService } from '../../services/mediaAssetService';
import { MediaAsset } from '../../models/mediaAsset';

export default function MediaAssetLibraryView() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // New asset form state
  const [newAssetData, setNewAssetData] = useState({
    fileName: 'new-occult-asset.jpg',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
    category: 'General' as MediaAsset['category'],
    altText: 'Occult spiritual symbol and sacred geometry',
    caption: 'Newly uploaded asset for LEO Family academy programs.',
    tags: 'occult, sacred geometry, spirituality',
    width: 1920,
    height: 1080,
    fileSize: '1.2 MB',
    fileType: 'image/jpeg',
    visibility: 'Public' as MediaAsset['visibility'],
    usedBy: 'Homepage'
  });

  useEffect(() => {
    loadAssets();
  }, []);

  async function loadAssets() {
    try {
      setLoading(true);
      const data = await mediaAssetService.getAssets();
      setAssets(data);
    } catch (err: any) {
      console.error('Failed to load media assets:', err);
      setError('Failed to load media assets');
    } finally {
      setLoading(false);
    }
  }

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this asset from the library?')) return;
    try {
      await mediaAssetService.deleteAsset(id);
      setSuccessMessage('Media asset deleted successfully.');
      await loadAssets();
      if (selectedAsset?.id === id) {
        setIsPreviewOpen(false);
        setSelectedAsset(null);
      }
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error('Failed to delete asset:', err);
      setError('Failed to delete asset');
    }
  };

  const handleReplace = async (asset: MediaAsset) => {
    const newUrl = prompt('Enter new replacement image/video URL:', asset.url);
    if (!newUrl) return;
    try {
      await mediaAssetService.updateAsset(asset.id, { url: newUrl });
      setSuccessMessage('Asset successfully replaced.');
      await loadAssets();
      if (selectedAsset && selectedAsset.id === asset.id) {
        setSelectedAsset({ ...selectedAsset, url: newUrl });
      }
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error('Failed to replace asset:', err);
      setError('Failed to replace asset');
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mediaAssetService.createAsset({
        fileName: newAssetData.fileName,
        url: newAssetData.url,
        category: newAssetData.category,
        altText: newAssetData.altText,
        caption: newAssetData.caption,
        tags: newAssetData.tags.split(',').map(t => t.trim()).filter(Boolean),
        width: Number(newAssetData.width),
        height: Number(newAssetData.height),
        fileSize: newAssetData.fileSize,
        fileType: newAssetData.fileType,
        visibility: newAssetData.visibility,
        usedBy: [newAssetData.usedBy]
      });
      setSuccessMessage('New asset successfully uploaded to library.');
      setIsUploadOpen(false);
      await loadAssets();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error('Failed to upload asset:', err);
      setError('Failed to upload asset');
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = 
      asset.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.altText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-stone-500 text-xs">
        Loading Centralized Media Asset Library...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-cinzel text-stone-900 flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-amber-600" /> Centralized Media Asset Manager
          </h1>
          <p className="text-xs text-stone-500">Manage repository assets, images, videos, badges, and documentation ready for Firebase Storage</p>
        </div>
        <button
          onClick={() => setIsUploadOpen(true)}
          className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Upload New Asset
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

      {/* Controls & Filters */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search assets by filename, alt text, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-stone-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
            >
              <option value="all">All Categories</option>
              <option value="Banners">Banners</option>
              <option value="Faculty">Faculty</option>
              <option value="Programs">Programs</option>
              <option value="Icons">Icons</option>
              <option value="Certificates">Certificates</option>
              <option value="Podcasts">Podcasts</option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'list' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'}`}
              title="List View"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ASSET PREVIEW MODAL */}
      {isPreviewOpen && selectedAsset && (
        <div className="fixed inset-0 bg-stone-950/60 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h2 className="text-base font-bold font-cinzel text-stone-900">{selectedAsset.fileName}</h2>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  {selectedAsset.category}
                </span>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Preview Box */}
              <div className="bg-stone-900 rounded-xl overflow-hidden flex items-center justify-center min-h-[240px] relative">
                {selectedAsset.fileType.startsWith('video') ? (
                  <video src={selectedAsset.url} controls className="max-h-72 w-full object-cover" />
                ) : (
                  <img src={selectedAsset.url} alt={selectedAsset.altText} className="max-h-72 w-full object-contain" />
                )}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/75 rounded text-[10px] text-white font-mono">
                  {selectedAsset.width} × {selectedAsset.height} px
                </div>
              </div>

              {/* Asset Metadata Details */}
              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-semibold uppercase tracking-wider text-stone-500 block">Alt Text</span>
                  <p className="text-stone-900 mt-0.5">{selectedAsset.altText || 'None'}</p>
                </div>
                <div>
                  <span className="font-semibold uppercase tracking-wider text-stone-500 block">Caption</span>
                  <p className="text-stone-900 mt-0.5">{selectedAsset.caption || 'None'}</p>
                </div>
                <div>
                  <span className="font-semibold uppercase tracking-wider text-stone-500 block">File Details</span>
                  <div className="grid grid-cols-2 gap-2 mt-1 text-stone-700">
                    <div>Type: <span className="font-mono text-stone-900">{selectedAsset.fileType}</span></div>
                    <div>Size: <span className="font-mono text-stone-900">{selectedAsset.fileSize}</span></div>
                    <div>Created: <span className="font-mono text-stone-900">{selectedAsset.createdDate}</span></div>
                    <div>Visibility: <span className="font-mono text-stone-900">{selectedAsset.visibility}</span></div>
                  </div>
                </div>
                <div>
                  <span className="font-semibold uppercase tracking-wider text-stone-500 block mb-1">Used By</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedAsset.usedBy.map((usage, i) => (
                      <span key={i} className="px-2 py-0.5 bg-stone-100 rounded text-[11px] text-stone-700 font-medium">
                        {usage}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-semibold uppercase tracking-wider text-stone-500 block mb-1">Tags</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedAsset.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-amber-50 text-amber-800 rounded text-[11px] font-medium border border-amber-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200">
              <button
                onClick={() => handleCopyUrl(selectedAsset.url, selectedAsset.id)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
              >
                <Copy className="w-4 h-4 text-stone-600" />
                {copiedId === selectedAsset.id ? 'URL Copied!' : 'Copy Asset URL'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleReplace(selectedAsset)}
                  className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" /> Replace Asset
                </button>
                <button
                  onClick={() => handleDelete(selectedAsset.id)}
                  className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" /> Delete Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD / CREATE NEW ASSET MODAL */}
      {isUploadOpen && (
        <div className="fixed inset-0 bg-stone-950/60 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-stone-200 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <h2 className="text-base font-bold font-cinzel text-stone-900">Upload New Media Asset</h2>
              <button onClick={() => setIsUploadOpen(false)} className="p-2 text-stone-400 hover:text-stone-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">File Name</label>
                <input
                  type="text"
                  required
                  value={newAssetData.fileName}
                  onChange={(e) => setNewAssetData({ ...newAssetData, fileName: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">Asset URL (Mock / CDN)</label>
                <input
                  type="text"
                  required
                  value={newAssetData.url}
                  onChange={(e) => setNewAssetData({ ...newAssetData, url: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">Category</label>
                  <select
                    value={newAssetData.category}
                    onChange={(e) => setNewAssetData({ ...newAssetData, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  >
                    <option value="Banners">Banners</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Programs">Programs</option>
                    <option value="Icons">Icons</option>
                    <option value="Certificates">Certificates</option>
                    <option value="Podcasts">Podcasts</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">Visibility</label>
                  <select
                    value={newAssetData.visibility}
                    onChange={(e) => setNewAssetData({ ...newAssetData, visibility: e.target.value as any })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  >
                    <option value="Public">Public</option>
                    <option value="Protected">Protected</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">Alt Text</label>
                <input
                  type="text"
                  value={newAssetData.altText}
                  onChange={(e) => setNewAssetData({ ...newAssetData, altText: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={newAssetData.tags}
                  onChange={(e) => setNewAssetData({ ...newAssetData, tags: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all">
              <div 
                className="relative h-44 bg-stone-900 overflow-hidden cursor-pointer"
                onClick={() => { setSelectedAsset(asset); setIsPreviewOpen(true); }}
              >
                {asset.fileType.startsWith('video') ? (
                  <video src={asset.url} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <img src={asset.url} alt={asset.altText} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300" />
                )}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/60 text-white backdrop-blur-xs">
                  {asset.category}
                </div>
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/75 text-white">
                  {asset.fileSize}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-xs font-bold text-stone-900 truncate" title={asset.fileName}>{asset.fileName}</h3>
                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{asset.altText || asset.caption}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  <span className="text-[10px] text-stone-500 font-mono">{asset.width}×{asset.height}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopyUrl(asset.url, asset.id)}
                      className="p-1.5 text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Copy URL"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { setSelectedAsset(asset); setIsPreviewOpen(true); }}
                      className="p-1.5 text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(asset.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredAssets.length === 0 && (
            <div className="col-span-full py-12 text-center text-stone-400 text-xs">
              No media assets found matching your criteria.
            </div>
          )}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-600">
                  <th className="p-4">Asset</th>
                  <th className="p-4">Category & Type</th>
                  <th className="p-4">Dimensions & Size</th>
                  <th className="p-4">Used By</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={asset.url} alt={asset.fileName} className="w-10 h-10 rounded-lg object-cover bg-stone-950 shrink-0" />
                      <div>
                        <div className="font-bold text-stone-900">{asset.fileName}</div>
                        <div className="text-[11px] text-stone-500 line-clamp-1">{asset.altText}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-1">
                        {asset.category}
                      </span>
                      <div className="text-[11px] font-mono text-stone-500">{asset.fileType}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-mono text-stone-900">{asset.width} × {asset.height}</div>
                      <div className="text-[11px] text-stone-500">{asset.fileSize}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {asset.usedBy.map((u, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-stone-100 rounded text-[10px] text-stone-700 font-medium">
                            {u}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleCopyUrl(asset.url, asset.id)}
                          className="p-1.5 text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Copy URL"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setSelectedAsset(asset); setIsPreviewOpen(true); }}
                          className="p-1.5 text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(asset.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredAssets.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-stone-400">
                      No media assets found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Firebase Ready Notice */}
      <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-stone-900">Firebase Storage Integration Ready</h4>
            <p className="text-[11px] text-stone-500">Repository and service architecture prepared to connect directly with Firebase Storage for cloud media persistence.</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold shrink-0">
          Ready for Firestore & Storage
        </span>
      </div>
    </div>
  );
}
