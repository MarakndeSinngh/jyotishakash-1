import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Upload, 
  RefreshCw, 
  Layers, 
  Save, 
  X, 
  Copy, 
  Image as ImageIcon,
  DollarSign,
  Package,
  Award
} from 'lucide-react';
import { GemstoneProduct, GemstoneVariant } from '../../models/gemstoneProduct';
import { gemstoneProductService } from '../../services/gemstoneProductService';
import { storageRepository } from '../../repositories/storageRepository';
import SmartImage from '../sections/SmartImage';
import { resolveImagePath } from '../../utils/imageHelper';

const AVAILABLE_CATEGORIES = [
  'Ruby', 'Natural Pearl', 'Red Coral', 'Emerald', 'Yellow Sapphire',
  'Diamond', 'Blue Sapphire', 'Hessonite', 'Cat’s Eye', 'Opal'
];

const AVAILABLE_PRESET_IMAGES = [
  '/gemstone-assets/ruby.jpg',
  '/gemstone-assets/pearl.jpg',
  '/gemstone-assets/red-coral.jpg',
  '/gemstone-assets/emerald.jpg',
  '/gemstone-assets/yellow-sapphire.jpg',
  '/gemstone-assets/diamond.jpg',
  '/gemstone-assets/blue-sapphire.jpg',
  '/gemstone-assets/gomed.jpg',
  '/gemstone-assets/cats-eye.jpg'
];

export default function GemstoneAdminView() {
  const [products, setProducts] = useState<GemstoneProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'out_of_stock'>('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<GemstoneProduct | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Form Fields
  const [formData, setFormData] = useState<Partial<GemstoneProduct>>({
    name: '',
    hindiName: '',
    slug: '',
    category: 'Ruby',
    planetaryRuler: 'The Sun (Surya Dev)',
    primaryDeity: '',
    benefit: '',
    shortDescription: '',
    description: '',
    images: ['/gemstone-assets/ruby.jpg'],
    price: 10000,
    compareAtPrice: 12000,
    sku: '',
    stockQuantity: 5,
    inStock: true,
    isPublished: true,
    isFeatured: false,
    specifications: {},
    certification: {
      certified: true,
      labName: 'Govt. Approved Gemological Testing Lab',
      natural: true,
      treatment: '100% Natural, Unheated & Untreated'
    },
    variants: []
  });

  const [activeTab, setActiveTab] = useState<'basic' | 'pricing' | 'images' | 'variants' | 'specs'>('basic');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await gemstoneProductService.getAllProducts(true);
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products for admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const unsub = gemstoneProductService.subscribe(() => {
      loadData();
    });
    return () => unsub();
  }, []);

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedbackMessage({ text, type });
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      hindiName: '',
      slug: '',
      category: 'Ruby',
      planetaryRuler: 'The Sun',
      primaryDeity: '',
      benefit: '',
      shortDescription: '',
      description: '',
      images: ['/gemstone-assets/ruby.jpg'],
      price: 15000,
      compareAtPrice: 18000,
      sku: `LEO-${Date.now().toString().slice(-4)}`,
      stockQuantity: 5,
      inStock: true,
      isPublished: true,
      isFeatured: false,
      specifications: {
        origin: 'Natural Earth Mined',
        shape: 'Oval Mixed Cut',
        color: 'Natural',
        metalRecommendation: 'Gold / Silver',
        wearingFinger: 'Ring Finger'
      },
      certification: {
        certified: true,
        labName: 'Govt. Approved Gemological Testing Lab',
        natural: true,
        treatment: '100% Natural & Untreated'
      },
      variants: []
    });
    setActiveTab('basic');
    setModalOpen(true);
  };

  const openEditModal = (product: GemstoneProduct) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setActiveTab('basic');
    setModalOpen(true);
  };

  const handleDuplicate = async (product: GemstoneProduct) => {
    try {
      const copy: Partial<GemstoneProduct> = {
        ...product,
        id: `gem-${Date.now()}`,
        slug: `${product.slug}-copy-${Date.now().toString().slice(-4)}`,
        name: `${product.name} (Copy)`,
        sku: `${product.sku}-CPY`,
        isPublished: false
      };
      await gemstoneProductService.saveProduct(copy);
      showNotification(`Duplicated "${product.name}" successfully as draft.`);
      loadData();
    } catch (err: any) {
      showNotification(err.message || 'Duplicate failed', 'error');
    }
  };

  const handleTogglePublish = async (product: GemstoneProduct) => {
    try {
      await gemstoneProductService.updateProduct(product.id, {
        isPublished: !product.isPublished
      });
      showNotification(`${product.name} is now ${!product.isPublished ? 'Published' : 'Draft'}`);
      loadData();
    } catch (err: any) {
      showNotification('Failed to update status', 'error');
    }
  };

  const handleToggleStock = async (product: GemstoneProduct) => {
    try {
      await gemstoneProductService.updateProduct(product.id, {
        inStock: !product.inStock
      });
      showNotification(`${product.name} stock status updated.`);
      loadData();
    } catch (err: any) {
      showNotification('Failed to update stock', 'error');
    }
  };

  const handleToggleFeatured = async (product: GemstoneProduct) => {
    try {
      await gemstoneProductService.updateProduct(product.id, {
        isFeatured: !product.isFeatured
      });
      showNotification(`${product.name} featured status updated.`);
      loadData();
    } catch (err: any) {
      showNotification('Failed to update featured status', 'error');
    }
  };

  const handleDelete = async (product: GemstoneProduct) => {
    if (!window.confirm(`Are you sure you want to remove "${product.name}"?`)) return;
    try {
      await gemstoneProductService.deleteProduct(product.id);
      showNotification(`Product "${product.name}" deleted successfully.`);
      loadData();
    } catch (err: any) {
      showNotification('Failed to delete product', 'error');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const asset = await storageRepository.uploadImage(file);
      const newImages = [...(formData.images || []), asset.url];
      setFormData(prev => ({ ...prev, images: newImages }));
      showNotification('Image uploaded to Supabase Storage successfully!');
    } catch (err: any) {
      console.warn('Storage upload error, using local object URL fallback:', err);
      const localUrl = URL.createObjectURL(file);
      const newImages = [...(formData.images || []), localUrl];
      setFormData(prev => ({ ...prev, images: newImages }));
      showNotification('Image added to product gallery.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      showNotification('Product English name is required', 'error');
      return;
    }

    setSaving(true);
    try {
      const slug = formData.slug?.trim() || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const toSave = {
        ...formData,
        slug,
        price: Number(formData.price) || 0,
        compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : null,
        stockQuantity: Number(formData.stockQuantity) || 0
      };

      if (editingProduct) {
        await gemstoneProductService.updateProduct(editingProduct.id, toSave);
        showNotification(`Updated "${formData.name}" successfully!`);
      } else {
        await gemstoneProductService.saveProduct(toSave);
        showNotification(`Created "${formData.name}" successfully!`);
      }

      setModalOpen(false);
      loadData();
    } catch (err: any) {
      showNotification(err.message || 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleAddVariant = () => {
    const newVariant: GemstoneVariant = {
      id: `var-${Date.now()}`,
      name: '4.25 Ratti',
      carat: 3.89,
      ratti: 4.25,
      origin: formData.specifications?.origin || 'Natural Mined',
      shape: 'Oval',
      price: formData.price || 15000,
      compareAtPrice: formData.compareAtPrice || undefined,
      sku: `${formData.sku || 'LEO'}-${Date.now().toString().slice(-3)}`,
      inStock: true,
      stockQuantity: 3
    };

    setFormData(prev => ({
      ...prev,
      variants: [...(prev.variants || []), newVariant]
    }));
  };

  const handleUpdateVariant = (index: number, updates: Partial<GemstoneVariant>) => {
    const updated = [...(formData.variants || [])];
    updated[index] = { ...updated[index], ...updates };
    setFormData(prev => ({ ...prev, variants: updated }));
  };

  const handleRemoveVariant = (index: number) => {
    const updated = [...(formData.variants || [])];
    updated.splice(index, 1);
    setFormData(prev => ({ ...prev, variants: updated }));
  };

  // Filtered Products for admin table
  const displayedProducts = products.filter(p => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q) || p.hindiName.toLowerCase().includes(q);
      const matchSku = (p.sku || '').toLowerCase().includes(q);
      if (!matchName && !matchSku) return false;
    }
    if (categoryFilter !== 'all' && p.category.toLowerCase() !== categoryFilter.toLowerCase()) {
      return false;
    }
    if (statusFilter === 'published' && !p.isPublished) return false;
    if (statusFilter === 'draft' && p.isPublished) return false;
    if (stockFilter === 'in_stock' && (!p.inStock || p.stockQuantity <= 0)) return false;
    if (stockFilter === 'out_of_stock' && (p.inStock && p.stockQuantity > 0)) return false;
    return true;
  });

  // Top stats
  const totalCount = products.length;
  const publishedCount = products.filter(p => p.isPublished).length;
  const inStockCount = products.filter(p => p.inStock && p.stockQuantity > 0).length;
  const featuredCount = products.filter(p => p.isFeatured).length;

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedbackMessage && (
        <div className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between shadow-lg ${
          feedbackMessage.type === 'success' 
            ? 'bg-emerald-900/90 text-emerald-100 border border-emerald-500/40' 
            : 'bg-rose-900/90 text-rose-100 border border-rose-500/40'
        }`}>
          <span>{feedbackMessage.text}</span>
          <X className="w-4 h-4 cursor-pointer" onClick={() => setFeedbackMessage(null)} />
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>LEO Family E-Commerce Management</span>
          </div>
          <h2 className="text-2xl font-cinzel font-bold text-stone-900">
            Gemstone Products & Inventory
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Manage catalogue, prices, stock availability, photos, and variants synced live with the public website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition shadow-md shadow-amber-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Gemstone Product</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 block">Total Gemstones</span>
          <span className="text-2xl font-bold font-cinzel text-stone-900 mt-1 block">{totalCount}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 block">Published Publicly</span>
          <span className="text-2xl font-bold font-cinzel text-emerald-600 mt-1 block">{publishedCount}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 block">In Stock</span>
          <span className="text-2xl font-bold font-cinzel text-stone-900 mt-1 block">{inStockCount}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 block">Featured Selection</span>
          <span className="text-2xl font-bold font-cinzel text-amber-600 mt-1 block">{featuredCount}</span>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[260px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by gemstone name, Hindi name, or SKU..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-800 focus:outline-none focus:border-amber-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-700"
          >
            <option value="all">All Categories</option>
            {AVAILABLE_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-700"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={e => setStockFilter(e.target.value as any)}
            className="px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-700"
          >
            <option value="all">All Stock</option>
            <option value="in_stock">In Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>

          <button
            onClick={loadData}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-xl hover:bg-stone-100 transition"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Gemstone</th>
                <th className="py-3 px-4">Planetary Ruler</th>
                <th className="py-3 px-4">Price (INR)</th>
                <th className="py-3 px-4">SKU & Stock</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-800">
              {displayedProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-400">
                    No gemstone products found matching criteria.
                  </td>
                </tr>
              ) : (
                displayedProducts.map(product => (
                  <tr key={product.id} className="hover:bg-stone-50/60 transition">
                    {/* Gemstone Image & Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 shrink-0 overflow-hidden p-1 flex items-center justify-center">
                          <SmartImage
                            src={resolveImagePath(product.images[0] || '/gemstone-assets/ruby.jpg')}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-stone-900 font-cinzel">
                            {product.name}
                          </div>
                          <div className="text-[11px] text-amber-700 font-medium">
                            {product.hindiName} ({product.category})
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Planetary Ruler */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                        {product.planetaryRuler}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-900 font-cinzel">
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <div className="text-[10px] text-stone-400 line-through">
                          ₹{product.compareAtPrice.toLocaleString('en-IN')}
                        </div>
                      )}
                    </td>

                    {/* Stock & SKU */}
                    <td className="py-3 px-4">
                      <div className="font-mono text-[11px] text-stone-600">
                        {product.sku || 'N/A'}
                      </div>
                      <button
                        onClick={() => handleToggleStock(product)}
                        className={`inline-flex items-center gap-1 text-[10px] font-semibold mt-0.5 ${
                          product.inStock && product.stockQuantity > 0
                            ? 'text-emerald-700 hover:text-emerald-800'
                            : 'text-rose-700 hover:text-rose-800'
                        }`}
                      >
                        {product.inStock && product.stockQuantity > 0 ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>In Stock ({product.stockQuantity})</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-rose-600" />
                            <span>Out of Stock</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Publish Status Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleTogglePublish(product)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition ${
                          product.isPublished
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200'
                        }`}
                      >
                        {product.isPublished ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    {/* Featured Status Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(product)}
                        className={`p-1.5 rounded-lg transition ${
                          product.isFeatured
                            ? 'text-amber-500 hover:text-amber-600'
                            : 'text-stone-300 hover:text-stone-400'
                        }`}
                        title="Toggle Featured Status"
                      >
                        <Star className={`w-4 h-4 ${product.isFeatured ? 'fill-amber-500' : ''}`} />
                      </button>
                    </td>

                    {/* Action buttons */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-1.5 text-stone-600 hover:text-amber-600 hover:bg-stone-100 rounded-lg transition"
                          title="Edit Gemstone"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicate(product)}
                          className="p-1.5 text-stone-600 hover:text-blue-600 hover:bg-stone-100 rounded-lg transition"
                          title="Duplicate Product"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product)}
                          className="p-1.5 text-stone-600 hover:text-rose-600 hover:bg-stone-100 rounded-lg transition"
                          title="Delete Gemstone"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ADD / EDIT MODAL                                              */}
      {/* ------------------------------------------------------------- */}
      {modalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col z-10">
            {/* Modal Header */}
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div>
                <h3 className="font-cinzel font-bold text-lg text-stone-900">
                  {editingProduct ? 'Edit Gemstone Product' : 'Add New Vedic Gemstone'}
                </h3>
                <p className="text-xs text-stone-500">
                  {editingProduct ? `Editing SKU: ${editingProduct.sku}` : 'Add a new certified stone to the e-commerce catalogue'}
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-stone-200 bg-stone-100/50 px-5 gap-2 overflow-x-auto text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('basic')}
                className={`py-3 px-3 border-b-2 transition ${
                  activeTab === 'basic' ? 'border-amber-600 text-amber-700' : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                Basic Info
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pricing')}
                className={`py-3 px-3 border-b-2 transition ${
                  activeTab === 'pricing' ? 'border-amber-600 text-amber-700' : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                Price & Stock
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('images')}
                className={`py-3 px-3 border-b-2 transition ${
                  activeTab === 'images' ? 'border-amber-600 text-amber-700' : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                Images & Media
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('variants')}
                className={`py-3 px-3 border-b-2 transition ${
                  activeTab === 'variants' ? 'border-amber-600 text-amber-700' : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                Variants ({formData.variants?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`py-3 px-3 border-b-2 transition ${
                  activeTab === 'specs' ? 'border-amber-600 text-amber-700' : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                Specs & Certification
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* TAB 1: BASIC INFO */}
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        English Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name || ''}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g. Natural Burmese Ruby"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:border-amber-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Hindi Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.hindiName || ''}
                        onChange={e => setFormData(prev => ({ ...prev, hindiName: e.target.value }))}
                        placeholder="e.g. Manik (माणिक)"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:border-amber-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Category *
                      </label>
                      <select
                        value={formData.category || 'Ruby'}
                        onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                      >
                        {AVAILABLE_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Planetary Ruler *
                      </label>
                      <input
                        type="text"
                        value={formData.planetaryRuler || ''}
                        onChange={e => setFormData(prev => ({ ...prev, planetaryRuler: e.target.value }))}
                        placeholder="e.g. The Sun (Surya Dev)"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Slug (URL identifier)
                      </label>
                      <input
                        type="text"
                        value={formData.slug || ''}
                        onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="e.g. ruby-manik"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900 font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Short Card Summary
                    </label>
                    <input
                      type="text"
                      value={formData.shortDescription || ''}
                      onChange={e => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                      placeholder="Concise 1-sentence description displayed on cards..."
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Full Vedic Description & Benefits
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description || ''}
                      onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Detailed Astrological significance and authentic Jyotish benefits..."
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: PRICING & STOCK */}
              {activeTab === 'pricing' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Selling Price (₹ INR) *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.price ?? 0}
                        onChange={e => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Compare-at / Original Price (₹ INR)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.compareAtPrice ?? ''}
                        onChange={e => setFormData(prev => ({ ...prev, compareAtPrice: e.target.value ? Number(e.target.value) : null }))}
                        placeholder="Optional strikethrough price"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        SKU Reference
                      </label>
                      <input
                        type="text"
                        value={formData.sku || ''}
                        onChange={e => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                        placeholder="e.g. LEO-RUB-01"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Stock Quantity (Units)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.stockQuantity ?? 1}
                        onChange={e => setFormData(prev => ({ ...prev, stockQuantity: Number(e.target.value) }))}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.inStock ?? true}
                        onChange={e => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                        className="w-4 h-4 accent-amber-600 rounded"
                      />
                      <span className="text-xs font-bold text-stone-800">
                        In Stock (Available for customer ordering)
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPublished ?? true}
                        onChange={e => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                        className="w-4 h-4 accent-amber-600 rounded"
                      />
                      <span className="text-xs font-bold text-stone-800">
                        Published Publicly (Visible on /gemstones)
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured ?? false}
                        onChange={e => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                        className="w-4 h-4 accent-amber-600 rounded"
                      />
                      <span className="text-xs font-bold text-stone-800">
                        Featured Gemstone (Prioritized in listings)
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 3: IMAGES & MEDIA */}
              {activeTab === 'images' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Upload New Image to Supabase Storage
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="text-xs text-stone-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700"
                      />
                      {uploadingImage && (
                        <span className="text-xs text-amber-600 animate-pulse font-semibold">
                          Uploading to leo-media...
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Preset Gemstone Assets Picker */}
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Or Pick From High-Quality Project Assets:
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {AVAILABLE_PRESET_IMAGES.map(asset => (
                        <button
                          key={asset}
                          type="button"
                          onClick={() => {
                            const cur = formData.images || [];
                            if (!cur.includes(asset)) {
                              setFormData(prev => ({ ...prev, images: [asset, ...cur] }));
                            }
                          }}
                          className="p-1 rounded-xl border border-stone-200 hover:border-amber-600 bg-stone-50 overflow-hidden text-center group"
                        >
                          <img src={asset} alt="asset" className="w-full h-14 object-contain group-hover:scale-105 transition" />
                          <span className="text-[9px] text-stone-500 truncate block mt-1">
                            {asset.split('/').pop()}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Current Active Product Images List */}
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Current Product Gallery ({formData.images?.length || 0})
                    </label>
                    <div className="space-y-2">
                      {formData.images?.map((img, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 rounded-xl bg-stone-50 border border-stone-200">
                          <img src={img} alt={`img-${idx}`} className="w-10 h-10 object-contain rounded-lg border bg-white" />
                          <input
                            type="text"
                            value={img}
                            onChange={e => {
                              const updated = [...(formData.images || [])];
                              updated[idx] = e.target.value;
                              setFormData(prev => ({ ...prev, images: updated }));
                            }}
                            className="flex-1 px-3 py-1 text-xs rounded-lg bg-white border border-stone-200 font-mono text-[11px]"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...(formData.images || [])];
                              updated.splice(idx, 1);
                              setFormData(prev => ({ ...prev, images: updated }));
                            }}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: VARIANTS */}
              {activeTab === 'variants' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-stone-800">
                        Product Variants (Carat, Weight, Origin)
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Allow customers to choose specific carats and origins with tailored pricing.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddVariant}
                      className="px-3 py-1.5 rounded-xl bg-amber-600 text-white font-semibold text-xs flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Variant</span>
                    </button>
                  </div>

                  {(!formData.variants || formData.variants.length === 0) ? (
                    <div className="p-8 text-center rounded-2xl bg-stone-50 border border-stone-200 text-stone-400 text-xs">
                      No variants configured. Product will sell at base price and weight.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formData.variants.map((v, i) => (
                        <div key={v.id || i} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-xs text-stone-800 font-cinzel">Variant #{i + 1}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveVariant(i)}
                              className="text-rose-600 text-xs hover:underline"
                            >
                              Remove
                            </button>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <div>
                              <label className="text-[10px] text-stone-500 block">Name</label>
                              <input
                                type="text"
                                value={v.name}
                                onChange={e => handleUpdateVariant(i, { name: e.target.value })}
                                className="w-full px-2 py-1 text-xs bg-white rounded border border-stone-200"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-stone-500 block">Ratti</label>
                              <input
                                type="number"
                                step="0.05"
                                value={v.ratti}
                                onChange={e => handleUpdateVariant(i, { ratti: Number(e.target.value) })}
                                className="w-full px-2 py-1 text-xs bg-white rounded border border-stone-200"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-stone-500 block">Origin</label>
                              <input
                                type="text"
                                value={v.origin}
                                onChange={e => handleUpdateVariant(i, { origin: e.target.value })}
                                className="w-full px-2 py-1 text-xs bg-white rounded border border-stone-200"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-stone-500 block">Price (₹)</label>
                              <input
                                type="number"
                                value={v.price}
                                onChange={e => handleUpdateVariant(i, { price: Number(e.target.value) })}
                                className="w-full px-2 py-1 text-xs bg-white rounded border border-stone-200 font-bold"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: SPECS & CERTIFICATION */}
              {activeTab === 'specs' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Origin Mine
                      </label>
                      <input
                        type="text"
                        value={formData.specifications?.origin || ''}
                        onChange={e => setFormData(prev => ({
                          ...prev,
                          specifications: { ...(prev.specifications || {}), origin: e.target.value }
                        }))}
                        placeholder="e.g. Ceylon (Sri Lanka) / Old Burma"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Shape & Cut
                      </label>
                      <input
                        type="text"
                        value={formData.specifications?.shape || ''}
                        onChange={e => setFormData(prev => ({
                          ...prev,
                          specifications: { ...(prev.specifications || {}), shape: e.target.value }
                        }))}
                        placeholder="e.g. Oval Mixed Cut / Cushion"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Recommended Metal
                      </label>
                      <input
                        type="text"
                        value={formData.specifications?.metalRecommendation || ''}
                        onChange={e => setFormData(prev => ({
                          ...prev,
                          specifications: { ...(prev.specifications || {}), metalRecommendation: e.target.value }
                        }))}
                        placeholder="e.g. Gold, Silver or Panchdhatu"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Wearing Finger & Muhurat
                      </label>
                      <input
                        type="text"
                        value={formData.specifications?.wearingFinger || ''}
                        onChange={e => setFormData(prev => ({
                          ...prev,
                          specifications: { ...(prev.specifications || {}), wearingFinger: e.target.value }
                        }))}
                        placeholder="e.g. Ring Finger on Sunday Sunrise"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                    <h5 className="font-bold text-xs text-stone-800">
                      Gemological Laboratory Certification
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-stone-500 block">Testing Lab</label>
                        <input
                          type="text"
                          value={formData.certification?.labName || ''}
                          onChange={e => setFormData(prev => ({
                            ...prev,
                            certification: { ...(prev.certification || { certified: true, natural: true }), labName: e.target.value }
                          }))}
                          className="w-full px-2 py-1 text-xs bg-white rounded border border-stone-200"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-stone-500 block">Treatment / Natural Note</label>
                        <input
                          type="text"
                          value={formData.certification?.treatment || ''}
                          onChange={e => setFormData(prev => ({
                            ...prev,
                            certification: { ...(prev.certification || { certified: true, natural: true, labName: '' }), treatment: e.target.value }
                          }))}
                          className="w-full px-2 py-1 text-xs bg-white rounded border border-stone-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : 'Save & Publish Live'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
