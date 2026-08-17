import React, { useState, useEffect, useRef } from 'react';
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
  ExternalLink,
  Upload,
  FileUp,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { storageService } from '../../services/storageService';
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

  // Local file upload state with progress tracking & status messages
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatusText, setUploadStatusText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadForm, setUploadForm] = useState({
    category: 'General' as MediaAsset['category'],
    altText: '',
    caption: '',
    tags: 'occult, sacred geometry, spirituality',
    visibility: 'Public' as MediaAsset['visibility'],
    usedBy: 'Homepage'
  });

  useEffect(() => {
    loadAssets();
  }, [selectedCategory]);

  async function loadAssets() {
    try {
      setLoading(true);
      setError(null);
      const data = await storageService.listAssets(selectedCategory);
      setAssets(data);
    } catch (err: any) {
      console.error('Failed to load media assets:', err);
      setError('Failed to load media assets from Supabase storage');
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
    if (!window.confirm('Are you sure you want to delete this asset from the library and storage?')) return;
    try {
      setError(null);
      await storageService.deleteImage(id);
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

  const handleFileSelect = (file: File) => {
    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(`File size error: ${(file.size / (1024 * 1024)).toFixed(1)}MB exceeds the 50MB maximum limit.`);
      return;
    }

    // Validate file type
    const validTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml',
      'video/mp4', 'video/webm', 'video/quicktime',
      'audio/mpeg', 'audio/wav', 'audio/m4a', 'application/pdf'
    ];
    
    const isValid = validTypes.includes(file.type) || file.type.startsWith('image/') || file.type.startsWith('video/') || file.type.startsWith('audio/') || file.type === 'application/pdf';
    
    if (!isValid) {
      setError(`Unsupported file type ("${file.type || 'unknown'}"). Please select a valid Image, Video, Audio, or PDF document.`);
      return;
    }

    setError(null);
    setSelectedFile(file);

    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setFilePreviewUrl(url);
    } else {
      setFilePreviewUrl(null);
    }

    if (!uploadForm.altText) {
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      setUploadForm(prev => ({ ...prev, altText: baseName }));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a local file to upload.');
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(15);
      setUploadStatusText('Validating file and security permissions...');
      setError(null);

      await new Promise(resolve => setTimeout(resolve, 250));
      setUploadProgress(40);
      setUploadStatusText('Uploading to Supabase Storage bucket (leo-media)...');

      await storageService.uploadImage({
        file: selectedFile,
        fileName: selectedFile.name,
        category: uploadForm.category,
        altText: uploadForm.altText || selectedFile.name,
        caption: uploadForm.caption || selectedFile.name,
        tags: uploadForm.tags.split(',').map(t => t.trim()).filter(Boolean),
        visibility: uploadForm.visibility,
        usedBy: [uploadForm.usedBy]
      });

      setUploadProgress(85);
      setUploadStatusText('Registering asset record in database...');
      await new Promise(resolve => setTimeout(resolve, 200));

      setUploadProgress(100);
      setUploadStatusText('Upload complete!');
      setSuccessMessage('File successfully uploaded to Supabase Storage and registered in Media Library.');
      
      setIsUploadOpen(false);
      setSelectedFile(null);
      setFilePreviewUrl(null);
      setUploadForm({
        category: 'General',
        altText: '',
        caption: '',
        tags: 'occult, sacred geometry, spirituality',
        visibility: 'Public',
        usedBy: 'Homepage'
      });
      await loadAssets();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      console.error('Failed to upload local file:', err);
      const msg = err?.message || '';
      if (msg.includes('row-level security') || msg.includes('policy') || msg.includes('permission') || msg.includes('unauthorized')) {
        setError('Permission denied or RLS policy violation. Please ensure you are logged in as a verified Leo Family admin.');
      } else if (msg.includes('storage')) {
        setError(`Supabase Storage error: ${msg}`);
      } else {
        setError(msg || 'Failed to upload asset to Supabase Storage. Please check network connection and try again.');
      }
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setUploadStatusText('');
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = 
      (asset.fileName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (asset.altText || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (asset.tags || []).some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading && assets.length === 0) {
    return (
      <div className="flex items-center justify-center p-16 text-stone-500 text-xs">
        <RefreshCw className="w-5 h-5 animate-spin text-amber-600 mr-2" />
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
          <p className="text-xs text-stone-500">Upload and manage repository assets, images, videos, badges, and certificates in Supabase Storage</p>
        </div>
        <button
          onClick={() => {
            setSelectedFile(null);
            setFilePreviewUrl(null);
            setError(null);
            setIsUploadOpen(true);
          }}
          className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Upload New Asset
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && !isUploadOpen && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
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

      {/* UPLOAD MODAL */}
      {isUploadOpen && (
        <div className="fixed inset-0 bg-stone-950/60 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[95vh] overflow-y-auto border border-stone-200 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h2 className="text-base font-bold font-cinzel text-stone-900 flex items-center gap-2">
                  <FileUp className="w-5 h-5 text-amber-600" /> Upload Asset from Local Device
                </h2>
                <p className="text-xs text-stone-500">Select an image, video, audio, or document to upload directly to Supabase Storage</p>
              </div>
              <button 
                onClick={() => { if (!uploading) setIsUploadOpen(false); }} 
                className="p-2 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* Drag & Drop / File Picker Area */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">Select File (*.JPG, PNG, WEBP, MP4, PDF)</label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => { if (!uploading) fileInputRef.current?.click(); }}
                  className="border-2 border-dashed border-stone-300 hover:border-amber-600 bg-stone-50 hover:bg-amber-50/20 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*,audio/*,application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileSelect(e.target.files[0]);
                      }
                    }}
                  />

                  {selectedFile ? (
                    <div className="w-full space-y-3">
                      {filePreviewUrl && selectedFile.type.startsWith('image/') ? (
                        <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden border border-stone-200 bg-stone-900 shadow-sm">
                          <img src={filePreviewUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 mx-auto rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                          <Upload className="w-6 h-6" />
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-bold text-stone-900 truncate max-w-xs mx-auto">{selectedFile.name}</p>
                        <p className="text-[11px] text-stone-500 font-mono">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type || 'Unknown Type'}
                        </p>
                      </div>
                      <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Click or drag to change file
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-800">Drag & drop your file here, or <span className="text-amber-600 underline">browse files</span></p>
                        <p className="text-[11px] text-stone-400 mt-1">Supports Images, Videos, Audio, and PDFs up to 50MB</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">Category</label>
                  <select
                    disabled={uploading}
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600 disabled:opacity-60"
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
                    disabled={uploading}
                    value={uploadForm.visibility}
                    onChange={(e) => setUploadForm({ ...uploadForm, visibility: e.target.value as any })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600 disabled:opacity-60"
                  >
                    <option value="Public">Public</option>
                    <option value="Protected">Protected</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">Alt Text / Title</label>
                <input
                  type="text"
                  required
                  disabled={uploading}
                  value={uploadForm.altText}
                  onChange={(e) => setUploadForm({ ...uploadForm, altText: e.target.value })}
                  placeholder="e.g., LEO Family Academy Banner"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">Caption / Description</label>
                <input
                  type="text"
                  disabled={uploading}
                  value={uploadForm.caption}
                  onChange={(e) => setUploadForm({ ...uploadForm, caption: e.target.value })}
                  placeholder="e.g., Promotional banner for upcoming Vedic Astrology Masterclass"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  disabled={uploading}
                  value={uploadForm.tags}
                  onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600 disabled:opacity-60"
                />
              </div>

              {/* ADVANCED PROGRESS BAR COMPONENT */}
              {uploading && (
                <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-900 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                      <span>{uploadStatusText || 'Processing Upload...'}</span>
                    </span>
                    <span className="font-mono font-bold text-amber-800">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden p-0.5 bg-stone-100 border border-amber-200/50">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-300 shadow-sm" 
                      style={{ width: `${uploadProgress}%` }} 
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-stone-500 font-medium">
                    <span>Bucket: <strong className="text-stone-700">leo-media</strong></span>
                    <span>Secure Admin Upload</span>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  disabled={uploading}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !selectedFile}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Upload & Register</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              <button onClick={() => setIsPreviewOpen(false)} className="p-2 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-stone-950 rounded-2xl overflow-hidden flex items-center justify-center max-h-[450px]">
                {selectedAsset.fileType?.startsWith('video') ? (
                  <video src={selectedAsset.url} controls className="max-h-[450px] w-full object-contain" />
                ) : (
                  <img src={selectedAsset.url} alt={selectedAsset.altText} className="max-h-[450px] w-full object-contain" />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs">
                <div>
                  <span className="text-stone-400 block mb-0.5 font-semibold uppercase">File Name</span>
                  <span className="text-stone-800 font-mono font-medium">{selectedAsset.fileName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5 font-semibold uppercase">File Size & Type</span>
                  <span className="text-stone-800 font-mono font-medium">{selectedAsset.fileSize} ({selectedAsset.fileType})</span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5 font-semibold uppercase">Dimensions</span>
                  <span className="text-stone-800 font-mono font-medium">{selectedAsset.width} × {selectedAsset.height} px</span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5 font-semibold uppercase">Visibility</span>
                  <span className="text-stone-800 font-medium">{selectedAsset.visibility}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-stone-400 block mb-0.5 font-semibold uppercase">Alt Text / Description</span>
                  <span className="text-stone-800">{selectedAsset.altText || selectedAsset.caption || 'None'}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-stone-400 block mb-0.5 font-semibold uppercase">Storage Public URL</span>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      readOnly
                      value={selectedAsset.url}
                      className="w-full bg-white border border-stone-200 px-3 py-1.5 rounded-lg font-mono text-[11px] text-stone-600 select-all"
                    />
                    <button
                      onClick={() => handleCopyUrl(selectedAsset.url, selectedAsset.id)}
                      className="px-3 py-1.5 bg-amber-600 text-white rounded-lg font-semibold shrink-0 hover:bg-amber-700 transition-colors inline-flex items-center gap-1 cursor-pointer text-xs"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedId === selectedAsset.id ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <button
                onClick={() => handleDelete(selectedAsset.id)}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Delete Asset
              </button>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-5 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold cursor-pointer hover:bg-stone-800"
              >
                Close Preview
              </button>
            </div>
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
                {asset.fileType?.startsWith('video') ? (
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
                      className="p-1.5 text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                      title="Copy URL"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { setSelectedAsset(asset); setIsPreviewOpen(true); }}
                      className="p-1.5 text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                      title="Preview"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(asset.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
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
            <div className="col-span-full py-16 text-center text-stone-400 text-xs bg-white rounded-2xl border border-stone-200">
              No media assets found matching your criteria. Click "Upload New Asset" to add files.
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
                        {asset.usedBy?.map((u, i) => (
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
                          className="p-1.5 text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                          title="Copy URL"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setSelectedAsset(asset); setIsPreviewOpen(true); }}
                          className="p-1.5 text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(asset.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
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

      {/* Supabase Storage Ready Notice */}
      <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-stone-900">Supabase Storage Integration Active (`leo-media` bucket)</h4>
            <p className="text-[11px] text-stone-500">Local device files upload directly to Supabase storage with automatic public URL generation and database registration.</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold shrink-0">
          Connected to Supabase
        </span>
      </div>
    </div>
  );
}
