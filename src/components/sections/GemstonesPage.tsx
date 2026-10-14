import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  ArrowUpDown, 
  Grid3X3, 
  List, 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  ShoppingBag, 
  Heart, 
  Eye, 
  Award, 
  ChevronRight, 
  HelpCircle,
  MessageCircle,
  RefreshCw,
  Filter,
  ShieldAlert
} from 'lucide-react';
import { GemstoneProduct, GemstoneFilterState, GemstoneSortOption } from '../../models/gemstoneProduct';
import { gemstoneProductService } from '../../services/gemstoneProductService';
import { useCart } from '../../context/CartContext';
import SmartImage from './SmartImage';
import { resolveImagePath } from '../../utils/imageHelper';
import GemstoneDetailPage from './GemstoneDetailPage';
import CartDrawer from '../cart/CartDrawer';

interface GemstonesPageProps {
  navigate?: (path: string) => void;
  currentPath?: string;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All Sacred Stones', hindi: 'सभी रत्न' },
  { id: 'Ruby', label: 'Ruby', hindi: 'Manik (माणिक)' },
  { id: 'Natural Pearl', label: 'Pearl', hindi: 'Moti (मोती)' },
  { id: 'Red Coral', label: 'Red Coral', hindi: 'Moonga (मूँगा)' },
  { id: 'Emerald', label: 'Emerald', hindi: 'Panna (पन्ना)' },
  { id: 'Yellow Sapphire', label: 'Yellow Sapphire', hindi: 'Pukhraj (पुखराज)' },
  { id: 'Diamond', label: 'Diamond', hindi: 'Heera (हीरा)' },
  { id: 'Blue Sapphire', label: 'Blue Sapphire', hindi: 'Neelam (नीलम)' },
  { id: 'Hessonite', label: 'Hessonite', hindi: 'Gomed (गोमेद)' },
  { id: 'Cat’s Eye', label: 'Cat’s Eye', hindi: 'Lehsunia (लहसुनिया)' },
  { id: 'Opal', label: 'Opal', hindi: 'Opal (ओपल)' }
];

export default function GemstonesPage({ navigate: externalNavigate, currentPath = '/gemstones' }: GemstonesPageProps) {
  const navigate = externalNavigate || ((path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  });

  // Check if we are on a product detail sub-route like /gemstones/:slug
  const routeParts = currentPath.split('/').filter(Boolean);
  const isDetailPage = routeParts.length >= 2 && routeParts[0] === 'gemstones';
  const detailSlug = isDetailPage ? routeParts[1] : null;

  // Catalogue state
  const [products, setProducts] = useState<GemstoneProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // View mode
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters state
  const [filters, setFilters] = useState<GemstoneFilterState>({
    search: '',
    category: 'all',
    planetaryRuler: 'all',
    availability: 'all',
    minPrice: 0,
    maxPrice: 50000,
    certifiedOnly: false,
    origin: 'all'
  });

  const [sortOption, setSortOption] = useState<GemstoneSortOption>('featured');
  const [loadError, setLoadError] = useState<string | null>(null);

  const { addToCart, isWishlisted, toggleWishlist, openCart, totalItems } = useCart();

  // Load products and listen for real-time admin updates
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const data = await gemstoneProductService.getAllProducts(false);
        if (isMounted) {
          setProducts(data);
          setLoadError(null);
        }
      } catch (err: any) {
        console.error('Failed to load gemstone catalogue:', err);
        if (isMounted) {
          setProducts([]);
          setLoadError(err?.message || 'Gemstone catalogue currently unavailable');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    // Subscribe to live updates from Admin Panel
    const unsubscribe = gemstoneProductService.subscribe(() => {
      loadData();
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // Filtered & Sorted products computation
  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      // Search
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesHindi = item.hindiName.toLowerCase().includes(q);
        const matchesPlanet = item.planetaryRuler.toLowerCase().includes(q);
        const matchesBenefit = (item.benefit || '').toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        if (!matchesName && !matchesHindi && !matchesPlanet && !matchesBenefit && !matchesCategory) {
          return false;
        }
      }

      // Category
      if (filters.category !== 'all') {
        if (item.category.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }
      }

      // Planetary Ruler
      if (filters.planetaryRuler !== 'all') {
        if (!item.planetaryRuler.toLowerCase().includes(filters.planetaryRuler.toLowerCase())) {
          return false;
        }
      }

      // Availability
      if (filters.availability === 'in_stock' && (!item.inStock || item.stockQuantity <= 0)) {
        return false;
      }
      if (filters.availability === 'out_of_stock' && (item.inStock && item.stockQuantity > 0)) {
        return false;
      }

      // Price Range
      if (item.price < filters.minPrice || item.price > filters.maxPrice) {
        return false;
      }

      // Certification
      if (filters.certifiedOnly && !item.certification?.certified) {
        return false;
      }

      // Origin
      if (filters.origin !== 'all') {
        const itemOrigin = (item.specifications?.origin || '').toLowerCase();
        if (!itemOrigin.includes(filters.origin.toLowerCase())) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price_asc') return a.price - b.price;
      if (sortOption === 'price_desc') return b.price - a.price;
      if (sortOption === 'name_asc') return a.name.localeCompare(b.name);
      if (sortOption === 'name_desc') return b.name.localeCompare(a.name);
      if (sortOption === 'newest') return (b.createdAt || '').localeCompare(a.createdAt || '');
      if (sortOption === 'oldest') return (a.createdAt || '').localeCompare(b.createdAt || '');
      // featured default
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return a.displayOrder - b.displayOrder;
    });
  }, [products, filters, sortOption]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category !== 'all') count++;
    if (filters.planetaryRuler !== 'all') count++;
    if (filters.availability !== 'all') count++;
    if (filters.minPrice > 0 || filters.maxPrice < 50000) count++;
    if (filters.certifiedOnly) count++;
    if (filters.origin !== 'all') count++;
    return count;
  }, [filters]);

  const resetAllFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      planetaryRuler: 'all',
      availability: 'all',
      minPrice: 0,
      maxPrice: 50000,
      certifiedOnly: false,
      origin: 'all'
    });
  };

  // If sub-route is active, render Product Detail Page
  if (isDetailPage && detailSlug) {
    return (
      <div className="relative z-10">
        <GemstoneDetailPage slug={detailSlug} navigate={navigate} />
        <CartDrawer onNavigate={navigate} />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
      {/* ------------------------------------------------------------- */}
      {/* SECTION A: HERO SECTION                                      */}
      {/* ------------------------------------------------------------- */}
      <section className="text-center pt-8 pb-14 relative overflow-hidden">
        {/* Subtle decorative celestial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Vedic Planetary Gemology</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cinzel font-bold text-amber-200 tracking-wider mb-4 drop-shadow-md">
          Discover Your Sacred Gemstone
        </h1>

        <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
          Explore our gemstone collection and find the right stone for your spiritual journey. Every stone is certified natural, ethically sourced, and energized with authentic Vedic Pran Pratishtha.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('collection-grid');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-cinzel font-bold text-xs uppercase tracking-widest shadow-xl shadow-amber-950/40 hover:brightness-110 transition active:scale-95"
          >
            Explore Collection
          </button>
          
          <button
            onClick={() => {
              const text = encodeURIComponent("Namaste Raajeev Ji, I need personalized gemstone guidance based on my date of birth and birth chart.");
              window.open(`https://wa.me/919953713176?text=${text}`, '_blank');
            }}
            className="px-7 py-3 rounded-full bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-amber-500/30 font-cinzel font-bold text-xs uppercase tracking-widest hover:border-amber-400 transition flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Get Gemstone Guidance</span>
          </button>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION B: GEMSTONE CATEGORY NAVIGATION PILLS                 */}
      {/* ------------------------------------------------------------- */}
      <section className="mb-10">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-amber-500/20">
          {CATEGORY_TABS.map(tab => {
            const isSelected = filters.category === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilters(prev => ({ ...prev, category: tab.id }))}
                className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold shadow-lg shadow-amber-950/40 scale-[1.02]'
                    : 'bg-stone-900/80 text-stone-300 border border-stone-800/80 hover:border-amber-500/40 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                {tab.hindi && (
                  <span className={`text-[10px] opacity-80 font-cinzel ${isSelected ? 'text-stone-950 font-bold' : 'text-amber-400/80'}`}>
                    ({tab.hindi})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION C: COLLECTION TOOLBAR & ACTIVE FILTERS               */}
      {/* ------------------------------------------------------------- */}
      <div id="collection-grid" className="scroll-mt-28 space-y-4 mb-8">
        <div className="bg-stone-950/70 p-4 rounded-2xl border border-stone-800 flex flex-wrap items-center justify-between gap-4">
          {/* Left: Product count & Search input */}
          <div className="flex items-center gap-3 flex-1 min-w-[240px]">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filters.search}
                onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
                placeholder="Search gemstones, planets, benefits..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-stone-900 border border-stone-800 text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition"
              />
              {filters.search && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <span className="text-xs font-semibold text-stone-400 shrink-0">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'gemstone' : 'gemstones'}
            </span>
          </div>

          {/* Right: Mobile filter trigger, Sort selector, Grid/List toggle */}
          <div className="flex items-center gap-2.5">
            {/* Mobile Filter Drawer Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-xs hover:border-amber-500/40"
            >
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-stone-950 font-bold text-[9px] flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort selector */}
            <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded-xl px-2.5 py-1.5 text-xs text-stone-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={sortOption}
                onChange={e => setSortOption(e.target.value as GemstoneSortOption)}
                aria-label="Sort gemstone products"
                className="bg-transparent text-stone-300 focus:outline-none text-xs cursor-pointer"
              >
                <option value="featured" className="bg-stone-900 text-stone-200">Featured</option>
                <option value="price_asc" className="bg-stone-900 text-stone-200">Price: Low to High</option>
                <option value="price_desc" className="bg-stone-900 text-stone-200">Price: High to Low</option>
                <option value="name_asc" className="bg-stone-900 text-stone-200">Name: A to Z</option>
                <option value="name_desc" className="bg-stone-900 text-stone-200">Name: Z to A</option>
                <option value="newest" className="bg-stone-900 text-stone-200">Newest</option>
                <option value="oldest" className="bg-stone-900 text-stone-200">Oldest</option>
              </select>
            </div>

            {/* Grid vs List toggle */}
            <div className="hidden sm:flex items-center bg-stone-900 border border-stone-800 rounded-xl p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'grid'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'text-stone-500 hover:text-stone-300'
                }`}
                title="Grid View"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'list'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'text-stone-500 hover:text-stone-300'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Badges Bar */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-stone-400 text-[11px]">Active Filters:</span>

            {filters.search && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300">
                <span>"{filters.search}"</span>
                <X className="w-3 h-3 cursor-pointer hover:text-amber-400" onClick={() => setFilters(p => ({ ...p, search: '' }))} />
              </span>
            )}

            {filters.category !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300">
                <span>Category: {filters.category}</span>
                <X className="w-3 h-3 cursor-pointer hover:text-amber-400" onClick={() => setFilters(p => ({ ...p, category: 'all' }))} />
              </span>
            )}

            {filters.planetaryRuler !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300">
                <span>Planet: {filters.planetaryRuler}</span>
                <X className="w-3 h-3 cursor-pointer hover:text-amber-400" onClick={() => setFilters(p => ({ ...p, planetaryRuler: 'all' }))} />
              </span>
            )}

            {filters.availability !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300">
                <span>{filters.availability === 'in_stock' ? 'In Stock' : 'Out of Stock'}</span>
                <X className="w-3 h-3 cursor-pointer hover:text-amber-400" onClick={() => setFilters(p => ({ ...p, availability: 'all' }))} />
              </span>
            )}

            {(filters.minPrice > 0 || filters.maxPrice < 50000) && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300">
                <span>₹{filters.minPrice.toLocaleString()} - ₹{filters.maxPrice.toLocaleString()}</span>
                <X className="w-3 h-3 cursor-pointer hover:text-amber-400" onClick={() => setFilters(p => ({ ...p, minPrice: 0, maxPrice: 50000 }))} />
              </span>
            )}

            {filters.certifiedOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300">
                <span>Lab Certified</span>
                <X className="w-3 h-3 cursor-pointer hover:text-amber-400" onClick={() => setFilters(p => ({ ...p, certifiedOnly: false }))} />
              </span>
            )}

            <button
              onClick={resetAllFilters}
              className="text-amber-400 hover:underline text-[11px] font-semibold ml-2"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION D: TWO-COLUMN LAYOUT (SIDEBAR FILTER + PRODUCT GRID)   */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-stone-950/50 p-5 rounded-2xl border border-stone-800/80 h-fit sticky top-28">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <h3 className="font-cinzel font-bold text-sm text-stone-200">Filters</h3>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="text-[11px] text-amber-400 hover:underline"
              >
                Reset
              </button>
            )}
          </div>

          {/* Filter 1: Availability */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
              Availability
            </label>
            <div className="space-y-1.5 text-xs text-stone-400">
              <label className="flex items-center gap-2 cursor-pointer hover:text-stone-200">
                <input
                  type="radio"
                  name="availability"
                  checked={filters.availability === 'all'}
                  onChange={() => setFilters(p => ({ ...p, availability: 'all' }))}
                  className="accent-amber-500"
                />
                <span>All Gemstones</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-stone-200">
                <input
                  type="radio"
                  name="availability"
                  checked={filters.availability === 'in_stock'}
                  onChange={() => setFilters(p => ({ ...p, availability: 'in_stock' }))}
                  className="accent-amber-500"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>

          {/* Filter 2: Price Range */}
          <div className="space-y-2.5 pt-3 border-t border-stone-800/80">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-stone-300 uppercase tracking-wider">
                Price (INR)
              </label>
              <span className="text-amber-400 font-semibold">
                Up to ₹{filters.maxPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="50000"
              step="1000"
              value={filters.maxPrice}
              onChange={e => setFilters(p => ({ ...p, maxPrice: Number(e.target.value) }))}
              aria-label="Filter products by maximum price"
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-500">
              <span>₹5,000</span>
              <span>₹25,000</span>
              <span>₹50,000+</span>
            </div>
          </div>

          {/* Filter 3: Planetary Ruler */}
          <div className="space-y-2 pt-3 border-t border-stone-800/80">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
              Planetary Ruler
            </label>
            <select
              value={filters.planetaryRuler}
              onChange={e => setFilters(p => ({ ...p, planetaryRuler: e.target.value }))}
              aria-label="Filter products by planetary ruler"
              className="w-full px-3 py-2 text-xs rounded-xl bg-stone-900 border border-stone-800 text-stone-300 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Planetary Energies</option>
              <option value="Sun">The Sun (Surya)</option>
              <option value="Moon">The Moon (Chandra)</option>
              <option value="Mars">Mars (Mangal)</option>
              <option value="Mercury">Mercury (Budh)</option>
              <option value="Jupiter">Jupiter (Guru)</option>
              <option value="Venus">Venus (Shukra)</option>
              <option value="Saturn">Saturn (Shani)</option>
              <option value="Rahu">Rahu (North Node)</option>
              <option value="Ketu">Ketu (South Node)</option>
            </select>
          </div>

          {/* Filter 4: Certification */}
          <div className="space-y-2 pt-3 border-t border-stone-800/80">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-300 hover:text-white">
              <input
                type="checkbox"
                checked={filters.certifiedOnly}
                onChange={e => setFilters(p => ({ ...p, certifiedOnly: e.target.checked }))}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
              <span className="font-semibold">Lab Certified Only</span>
            </label>
          </div>
        </aside>

        {/* ----------------------------------------------------------- */}
        {/* SECTION F: PREMIUM RESPONSIVE PRODUCT CARDS                 */}
        {/* ----------------------------------------------------------- */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
              <p className="text-xs uppercase tracking-widest text-amber-400 font-cinzel">
                Loading Vedic Gemstone Catalogue...
              </p>
            </div>
          ) : loadError ? (
            <div className="p-12 text-center rounded-2xl bg-stone-950/40 border border-stone-800 space-y-3">
              <ShieldAlert className="w-10 h-10 text-rose-500/80 mx-auto" />
              <h4 className="font-cinzel text-lg font-bold text-stone-300">
                Catalogue Currently Unavailable
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Our sacred gemstone registry is undergoing scheduled verification. Please check back shortly or consult with our Vedic advisors.
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-stone-950/40 border border-stone-800 space-y-3">
              <Sparkles className="w-10 h-10 text-amber-500/70 mx-auto" />
              <h4 className="font-cinzel text-lg font-bold text-stone-300">
                Sacred Gemstone Collection In Curation
              </h4>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                All gemstone products are currently undergoing rigorous Vedic lab verification and authenticity appraisal before public release.
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-stone-950/40 border border-stone-800 space-y-3">
              <HelpCircle className="w-10 h-10 text-stone-600 mx-auto" />
              <h4 className="font-cinzel text-lg font-bold text-stone-300">
                No Gemstones Match Your Criteria
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try loosening your filters or search terms to browse the rest of our sacred collection.
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-3 px-5 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition"
              >
                Clear Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(stone => {
                const isOutOfStock = !stone.inStock || stone.stockQuantity <= 0;
                return (
                  <div
                    key={stone.id}
                    className="bg-card border border-border/30 rounded-2xl shadow-xl overflow-hidden relative group hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Visualizer Frame */}
                    <div className="h-[250px] flex items-center justify-center bg-gradient-to-br from-background via-surface to-background relative p-6 overflow-hidden">
                      {/* Aura Glow */}
                      <div className="absolute w-36 h-36 bg-amber-500/10 blur-3xl rounded-full z-0 group-hover:scale-125 transition-transform duration-700" />

                      {/* Floating Badges */}
                      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                          {stone.planetaryRuler}
                        </span>
                        {stone.certification?.certified && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1">
                            <Award className="w-2.5 h-2.5" />
                            <span>Certified</span>
                          </span>
                        )}
                      </div>

                      {/* Wishlist Heart */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(stone.id);
                        }}
                        className="absolute top-3 right-3 z-20 p-2 rounded-full bg-stone-950/70 border border-stone-800 text-stone-400 hover:text-rose-400 transition"
                        title="Add to Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isWishlisted(stone.id) ? 'fill-rose-400 text-rose-400' : ''}`} />
                      </button>

                      {/* Gemstone Image (Clean, unclipped, object-contain) */}
                      {stone.images && stone.images.length > 0 && stone.images[0] ? (
                        <SmartImage
                          src={resolveImagePath(stone.images[0])}
                          alt={stone.name}
                          className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center p-4 z-10 text-stone-500">
                          <Sparkles className="w-8 h-8 text-stone-600 mb-1" />
                          <span className="text-[10px] font-cinzel text-stone-400">Photo Pending</span>
                          <span className="text-[8px] text-stone-600">Verification</span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-cinzel text-amber-400 font-bold">
                            {stone.hindiName}
                          </span>
                          <span className="text-[11px] text-stone-500">
                            {stone.category}
                          </span>
                        </div>

                        <h3 
                          onClick={() => navigate(`/gemstones/${stone.slug}`)}
                          className="text-base font-bold text-stone-100 font-cinzel hover:text-amber-300 cursor-pointer transition truncate"
                        >
                          {stone.name}
                        </h3>

                        <p className="text-xs text-stone-400 line-clamp-2 mt-1.5 leading-relaxed">
                          {stone.shortDescription || stone.benefit}
                        </p>
                      </div>

                      {/* Pricing and Action row */}
                      <div className="pt-3 border-t border-stone-800/80 space-y-3">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-lg font-bold text-amber-300 font-cinzel">
                              ₹{stone.price.toLocaleString('en-IN')}
                            </span>
                            {stone.compareAtPrice && stone.compareAtPrice > stone.price && (
                              <span className="text-xs text-stone-500 line-through ml-2">
                                ₹{stone.compareAtPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                          
                          {isOutOfStock ? (
                            <span className="text-[10px] text-rose-400 font-semibold">Rare / Made to Order</span>
                          ) : (
                            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              <span>In Stock</span>
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => navigate(`/gemstones/${stone.slug}`)}
                            className="py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-xs font-semibold flex items-center justify-center gap-1 transition"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </button>

                          <button
                            onClick={() => addToCart(stone, null, 1)}
                            disabled={isOutOfStock}
                            className="py-2 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 transition shadow-md shadow-amber-950/40"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredProducts.map(stone => {
                const isOutOfStock = !stone.inStock || stone.stockQuantity <= 0;
                return (
                  <div
                    key={stone.id}
                    className="p-4 rounded-2xl bg-card border border-border/30 hover:border-amber-500/40 transition flex flex-col sm:flex-row gap-5 items-center justify-between"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-24 h-24 rounded-xl bg-stone-900 shrink-0 p-2 overflow-hidden flex items-center justify-center">
                        {stone.images && stone.images.length > 0 && stone.images[0] ? (
                          <SmartImage
                            src={resolveImagePath(stone.images[0])}
                            alt={stone.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-center text-stone-500">
                            <Sparkles className="w-5 h-5 text-stone-600 mb-0.5" />
                            <span className="text-[8px] text-stone-500">Pending</span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-amber-400 font-cinzel font-bold">{stone.hindiName}</span>
                          <span className="text-[10px] text-stone-500">• {stone.planetaryRuler}</span>
                        </div>
                        <h4 
                          onClick={() => navigate(`/gemstones/${stone.slug}`)}
                          className="text-base font-bold text-stone-100 font-cinzel hover:text-amber-300 cursor-pointer"
                        >
                          {stone.name}
                        </h4>
                        <p className="text-xs text-stone-400 line-clamp-1 max-w-md mt-0.5">
                          {stone.shortDescription || stone.benefit}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-800">
                      <div className="text-right">
                        <div className="text-base font-bold text-amber-300 font-cinzel">
                          ₹{stone.price.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-stone-400">
                          {isOutOfStock ? 'Made to order' : 'In Stock'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/gemstones/${stone.slug}`)}
                          className="px-3.5 py-2 rounded-xl bg-stone-900 text-stone-300 text-xs font-semibold hover:bg-stone-800"
                        >
                          View
                        </button>
                        <button
                          onClick={() => addToCart(stone, null, 1)}
                          disabled={isOutOfStock}
                          className="px-3.5 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 disabled:opacity-40"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION I: GENUINE PRODUCT TRUST INFORMATION                  */}
      {/* ------------------------------------------------------------- */}
      <section className="mt-20 pt-14 border-t border-stone-800/80">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-cinzel font-semibold">
            Vedic Authenticity & Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-100 mt-1">
            The LEO Family Sacred Gemstone Guarantee
          </h2>
          <p className="text-xs text-stone-400 mt-2">
            Why seekers and celebrities across the globe trust LEO Family Occult School for life-altering gemstones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-stone-950/60 border border-stone-800/80 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel font-bold text-sm text-stone-200">
              100% Natural & Untreated
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Every stone is earth-mined with zero toxic glass-filling, artificial dyes, or harmful radioactive irradiations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-950/60 border border-stone-800/80 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel font-bold text-sm text-stone-200">
              Government Lab Tested
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Accompanied by an authentic Gemological Laboratory Certificate confirming chemical composition, refractive index, and origin.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-950/60 border border-stone-800/80 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel font-bold text-sm text-stone-200">
              Pran Pratishtha Ritual
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Consecrated through ancient Vedic rituals and planetary Beej Mantras prior to dispatch to activate latent divine energies.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-950/60 border border-stone-800/80 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel font-bold text-sm text-stone-200">
              Master Consultation
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Personally curated under the supervision of Founder Raajeev Singh Chauhann to match your personal Kundali frequencies.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* MOBILE FILTER SLIDE-OVER DRAWER                               */}
      {/* ------------------------------------------------------------- */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[10000] lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-stone-950 text-stone-100 h-full shadow-2xl p-6 overflow-y-auto space-y-6 border-l border-stone-800 z-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-amber-400" />
                  <h3 className="font-cinzel font-bold text-base text-stone-200">Filters</h3>
                </div>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-stone-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-300 uppercase">
                  Max Price: ₹{filters.maxPrice.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="5000"
                  max="50000"
                  step="1000"
                  value={filters.maxPrice}
                  onChange={e => setFilters(p => ({ ...p, maxPrice: Number(e.target.value) }))}
                  aria-label="Filter products by maximum price"
                  className="w-full accent-amber-500"
                />
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-300 uppercase">Availability</label>
                <div className="space-y-1 text-xs text-stone-400">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="m_avail"
                      checked={filters.availability === 'all'}
                      onChange={() => setFilters(p => ({ ...p, availability: 'all' }))}
                      className="accent-amber-500"
                    />
                    <span>All</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="m_avail"
                      checked={filters.availability === 'in_stock'}
                      onChange={() => setFilters(p => ({ ...p, availability: 'in_stock' }))}
                      className="accent-amber-500"
                    />
                    <span>In Stock Only</span>
                  </label>
                </div>
              </div>

              {/* Lab Certified */}
              <div>
                <label className="flex items-center gap-2 text-xs text-stone-300">
                  <input
                    type="checkbox"
                    checked={filters.certifiedOnly}
                    onChange={e => setFilters(p => ({ ...p, certifiedOnly: e.target.checked }))}
                    className="w-4 h-4 accent-amber-500"
                  />
                  <span>Lab Certified Only</span>
                </label>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-stone-800">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider"
              >
                Apply Filters
              </button>
              <button
                onClick={() => {
                  resetAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-2 rounded-xl text-stone-400 text-xs hover:text-white"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* FLOATING CART BUTTON                                          */}
      {/* ------------------------------------------------------------- */}
      <div className="fixed bottom-6 right-6 z-[9990]">
        <button
          onClick={openCart}
          className="relative p-3.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 shadow-2xl shadow-amber-950/70 hover:scale-105 transition active:scale-95 border border-amber-300/40"
          title="Open Sacred Cart"
        >
          <ShoppingBag className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-stone-950 text-amber-400 font-bold text-[10px] border border-amber-500 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Cart Slide-out Drawer Component */}
      <CartDrawer onNavigate={navigate} />
    </div>
  );
}
