import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ShoppingBag, 
  MessageCircle, 
  Heart, 
  Truck, 
  Award, 
  Layers, 
  Calendar, 
  Clock, 
  Share2, 
  Info,
  ChevronRight
} from 'lucide-react';
import { GemstoneProduct, GemstoneVariant, getProductReviewIssues } from '../../models/gemstoneProduct';
import { gemstoneProductService } from '../../services/gemstoneProductService';
import { useCart } from '../../context/CartContext';
import SmartImage from './SmartImage';
import GemstoneIllustration from './GemstoneIllustration';
import { resolveImagePath } from '../../utils/imageHelper';

interface GemstoneDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
}

export default function GemstoneDetailPage({ slug, navigate }: GemstoneDetailPageProps) {
  const [product, setProduct] = useState<GemstoneProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<GemstoneVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<GemstoneProduct[]>([]);
  const [activeTab, setActiveTab] = useState<'benefits' | 'specs' | 'energization' | 'wearing'>('benefits');
  const [copiedLink, setCopiedLink] = useState(false);

  const { addToCart, isWishlisted, toggleWishlist } = useCart();

  useEffect(() => {
    let isMounted = true;
    async function fetchProduct() {
      setLoading(true);
      try {
        const item = await gemstoneProductService.getProductBySlug(slug);
        if (isMounted) {
          if (item) {
            setProduct(item);
            setSelectedImage(
              ['VERIFIED', 'AI_ILLUSTRATION'].includes(item.specifications?.imageVerificationStatus || '')
                && item.images && item.images.length > 0 && item.images[0]
                ? item.images[0]
                : ''
            );
            if (getProductReviewIssues(item).length === 0 && item.variants && item.variants.length > 0) {
              // Only expose selectable weights/prices after the complete product review gate passes.
              const inStockVar = item.variants.find(v => v.inStock && v.stockQuantity > 0) || item.variants[0];
              setSelectedVariant(inStockVar);
            } else {
              setSelectedVariant(null);
            }
          } else {
            setProduct(null);
          }
        }

        // Fetch related products
        const all = await gemstoneProductService.getAllProducts(false);
        if (isMounted) {
          setRelatedProducts(all.filter(p => p.slug !== slug).slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching gemstone details:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProduct();
    return () => { isMounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen py-32 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest text-amber-300/80 font-cinzel">
            Revealing Sacred Gemstone Details...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-36 px-6 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-400 mx-auto mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-cinzel font-bold text-stone-200 mb-2">
          Gemstone Not Found
        </h2>
        <p className="text-sm text-stone-400 mb-6">
          The requested Vedic gemstone could not be located in our collection or has been archived.
        </p>
        <button
          onClick={() => navigate('/gemstones')}
          className="px-6 py-2.5 bg-amber-500 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider hover:brightness-110 transition"
        >
          Return to Gemstone Collection
        </button>
      </div>
    );
  }

  const reviewReady = getProductReviewIssues(product).length === 0;
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentCompareAt = selectedVariant ? selectedVariant.compareAtPrice : product.compareAtPrice;
  const basePriceVerified = product.specifications?.pricingVerificationStatus === 'VERIFIED';
  const isPriceVerified = basePriceVerified
    && (!selectedVariant || selectedVariant.priceVerificationStatus === 'VERIFIED');
  const identityVerified = product.specifications?.materialIdentityStatus === 'VERIFIED'
    && product.certification?.naturalStatus === 'NATURAL_CONFIRMED'
    && product.certification?.natural === true;
  const verifiedOrigin = identityVerified && product.specifications?.origin && product.specifications.origin !== 'Pending Verification'
    ? product.specifications.origin
    : 'Pending verification';
  const currentInStock = reviewReady && isPriceVerified && (selectedVariant ? selectedVariant.inStock && selectedVariant.stockQuantity > 0 : product.inStock && product.stockQuantity > 0);
  const currentStockQty = selectedVariant ? selectedVariant.stockQuantity : product.stockQuantity;
  const currentSku = selectedVariant ? selectedVariant.sku : product.sku;

  const handleAddToCart = () => {
    if (!currentInStock) return;
    addToCart(product, selectedVariant, quantity);
  };

  const handleWhatsAppInquiry = () => {
    const variantText = selectedVariant ? `Variant: ${selectedVariant.name}` : `Product details to be confirmed`;
    const priceText = isPriceVerified ? `₹${currentPrice.toLocaleString('en-IN')}` : 'To be confirmed by LEO Family';
    const message = `🙏 *Namaste LEO Family Occult School,*\n\nI am interested in this gemstone enquiry:\n\n💎 *${product.name} (${product.hindiName})*\n• ${variantText}\n• Price: ${priceText}\n• SKU: ${reviewReady ? currentSku : 'To be confirmed'}\n• Link: https://www.leofamily.online/gemstones/${product.slug}\n\nPlease confirm current availability, product identity, certification, and final quotation. Thank you!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919953713176?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="gemstone-page min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4 mb-8 pt-6 border-b border-stone-800/80 pb-4">
        <button
          onClick={() => navigate('/gemstones')}
          className="flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-amber-800 dark:hover:text-amber-300 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-text-secondary">
          <span className="hover:text-stone-900 dark:hover:text-amber-300 cursor-pointer" onClick={() => navigate('/')}>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-stone-900 dark:hover:text-amber-300 cursor-pointer" onClick={() => navigate('/gemstones')}>Gemstones</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-amber-800 dark:text-amber-300 font-medium truncate max-w-xs">{product.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-2 rounded-xl border transition ${
              isWishlisted(product.id)
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-rose-400'
            }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted(product.id) ? 'fill-rose-400' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-amber-400 transition relative"
            title="Share Gemstone"
          >
            <Share2 className="w-4 h-4" />
            {copiedLink && (
              <span className="absolute -bottom-8 right-0 bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                Link Copied!
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Gallery & Image Showcase */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Visualizer Container */}
          <div className="relative aspect-square max-h-[520px] rounded-3xl bg-gradient-to-b from-stone-900/90 via-stone-950 to-stone-900/90 border border-amber-500/20 shadow-2xl overflow-hidden flex items-center justify-center p-8 group">
            {/* Subtle Divine Glow */}
            <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-stone-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                {product.specifications?.traditionalPlanetLabel || 'No standard Vedic planetary mapping'}
              </span>
              {product.certification?.certified && (
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  <span>Lab Certified</span>
                </span>
              )}
            </div>

            {/* Main Product Image */}
            {selectedImage ? (
              product.specifications?.imageVerificationStatus === 'AI_ILLUSTRATION' ? (
                <GemstoneIllustration
                  src={resolveImagePath(selectedImage)}
                  panel={Number(product.specifications?.imagePanel ?? 0)}
                  alt={product.name}
                  className="w-full h-full relative z-[5]"
                />
              ) : (
                <SmartImage
                  src={resolveImagePath(selectedImage)}
                  alt={product.name}
                  className="w-full h-full object-contain relative z-[5] transition-transform duration-500 group-hover:scale-105"
                />
              )
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 relative z-[5] text-stone-500">
                <Sparkles className="w-16 h-16 text-stone-600 mb-3 animate-pulse" />
                <span className="text-sm font-cinzel text-stone-300 font-semibold">Image Pending Verification</span>
                <span className="text-xs text-stone-500 mt-1">Actual product photograph pending review</span>
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.specifications?.imageVerificationStatus === 'VERIFIED' && product.images && product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl bg-stone-900 border overflow-hidden p-1 shrink-0 transition ${
                    selectedImage === img
                      ? 'border-amber-400 shadow-md shadow-amber-500/20 ring-1 ring-amber-400'
                      : 'border-stone-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <SmartImage
                    src={resolveImagePath(img)}
                    alt={`${product.name} angle ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Product-specific verification status */}
          <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800/80 grid grid-cols-3 gap-3 text-center">
            <div className="flex flex-col items-center gap-1.5 p-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-[11px] font-semibold text-stone-200">{product.certification?.naturalStatus === 'NATURAL_CONFIRMED' ? 'Natural origin confirmed' : product.certification?.naturalStatus === 'SYNTHETIC_CONFIRMED' ? 'Synthetic / lab-grown' : 'Origin pending'}</span>
              <span className="text-[10px] text-stone-400">{product.certification?.naturalStatus === 'NATURAL_CONFIRMED' ? 'Verified record' : product.certification?.naturalStatus === 'SYNTHETIC_CONFIRMED' ? 'Status recorded' : 'Not yet confirmed'}</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2 border-x border-stone-800">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span className="text-[11px] font-semibold text-stone-200">{product.certification?.certified ? 'Certificate recorded' : 'Certificate pending'}</span>
              <span className="text-[10px] text-stone-400">{product.certification?.labName || 'No lab details supplied'}</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2">
              <Truck className="w-5 h-5 text-amber-400" />
              <span className="text-[11px] font-semibold text-stone-200">Delivery details</span>
              <span className="text-[10px] text-stone-400">Confirmed before payment</span>
            </div>
          </div>
        </div>

        {/* Right: Product Details, Variant Selection & Actions */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header titles */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest text-amber-800 dark:text-amber-300 font-cinzel font-semibold">
                Gemstone Catalogue
              </span>
              <span className="text-stone-600">•</span>
              <span className="text-xs text-text-secondary">SKU: {currentSku}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-text-primary tracking-wide mb-1">
              {product.name}
            </h1>
            <p className="text-lg font-cinzel text-amber-800 dark:text-amber-300">
              {product.hindiName}
            </p>
          </div>

          {/* Pricing & Stock status */}
          <div className="p-4 rounded-2xl bg-stone-950/70 border border-amber-500/20 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-cinzel font-bold text-amber-300">
                  {isPriceVerified ? `₹${currentPrice.toLocaleString('en-IN')}` : 'Price on request'}
                </span>
                {isPriceVerified && currentCompareAt && currentCompareAt > currentPrice && (
                  <span className="text-base text-stone-500 line-through">
                    ₹{currentCompareAt.toLocaleString('en-IN')}
                  </span>
                )}
                {isPriceVerified && currentCompareAt && currentCompareAt > currentPrice && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Save {Math.round(((currentCompareAt - currentPrice) / currentCompareAt) * 100)}%
                  </span>
                )}
              </div>
              <p className="text-[10px] text-stone-400 mt-1">
                {isPriceVerified ? 'Price reviewed by LEO Family. Confirm taxes and any optional service before payment.' : 'Selling price is under administrator review. Request a confirmed quotation.'}
              </p>
            </div>

            <div>
              {currentInStock ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>In Stock ({currentStockQty} units)</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-950/80 text-rose-300 border border-rose-500/30">
                  <span>{!isPriceVerified ? 'Price pending review' : 'Currently unavailable'}</span>
                </span>
              )}
            </div>
          </div>

          {/* Short Benefit Quote */}
          <p className="text-sm text-text-secondary leading-relaxed italic border-l-2 border-amber-500 pl-4 py-1">
            "{identityVerified
              ? (product.benefit || product.shortDescription)
              : 'Product material identity, origin and natural status are awaiting review. Contact LEO Family for confirmed specifications.'}"
          </p>

          {/* Variant Selection (Carat / Origin / Weight) */}
          {reviewReady && product.variants && product.variants.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-text-primary uppercase tracking-wider">
                  Select Weight / Carat Variant:
                </label>
                {selectedVariant && (
                  <span className="text-xs text-amber-400">
                    {selectedVariant.ratti} Ratti ({selectedVariant.carat} Carat) - {selectedVariant.origin}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {product.variants.map(variant => {
                  const isSelected = selectedVariant?.id === variant.id;
                  const variantPriceVerified = basePriceVerified && variant.priceVerificationStatus === 'VERIFIED';
                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 rounded-xl border text-left transition relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-100 border-amber-500 ring-1 ring-amber-500 shadow-md shadow-amber-950/10 dark:bg-amber-950/50 dark:border-amber-400 dark:ring-amber-400 dark:shadow-amber-950/50'
                          : 'bg-surface border-border hover:border-amber-500/50'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-text-primary">
                          {variant.name}
                        </div>
                        <div className="text-[10px] text-text-secondary mt-0.5">
                          {variant.origin} • {variant.shape || 'Mixed Cut'}
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-stone-800/80 flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-800 dark:text-amber-300 font-cinzel">
                          {variantPriceVerified ? `₹${variant.price.toLocaleString('en-IN')}` : 'Price on request'}
                        </span>
                        {!variantPriceVerified ? (
                          <span className="text-[9px] text-rose-700 dark:text-rose-400">Price review pending</span>
                        ) : variant.inStock && variant.stockQuantity > 0 ? (
                          <span className="text-[9px] text-emerald-700 dark:text-emerald-400">In Stock</span>
                        ) : (
                          <span className="text-[9px] text-rose-700 dark:text-rose-400">Unavailable</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector & Primary Call to Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-text-primary uppercase tracking-wider">
                Quantity:
              </span>
              <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg hover:bg-stone-800 flex items-center justify-center text-stone-300 disabled:opacity-30"
                  disabled={!currentInStock || quantity <= 1}
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold text-stone-100">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(currentStockQty, quantity + 1))}
                  className="w-8 h-8 rounded-lg hover:bg-stone-800 flex items-center justify-center text-stone-300 disabled:opacity-30"
                  disabled={!currentInStock || quantity >= currentStockQty}
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={!currentInStock}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-cinzel font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-xl shadow-amber-950/40 hover:brightness-110 active:scale-[0.99] transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4 h-4 text-stone-950" />
                <span>Add to Sacred Cart</span>
              </button>

              <button
                onClick={handleWhatsAppInquiry}
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-cinzel font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-950/40 hover:brightness-110 active:scale-[0.99] transition"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Enquire via WhatsApp</span>
              </button>
            </div>

            {/* Astrological Consultation Hook */}
            <div className="p-3.5 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs text-stone-800">
                  Unsure if this stone suits your Kundali?
                </span>
              </div>
              <button
                onClick={() => {
                  const query = encodeURIComponent(`Namaste, I want to verify if ${product.name} (${product.hindiName}) is astrologically suitable for my date of birth and birth chart.`);
                  window.open(`https://wa.me/919953713176?text=${query}`, '_blank');
                }}
                className="text-xs font-bold text-amber-900 hover:underline shrink-0"
              >
                Get Kundali Verification →
              </button>
            </div>
          </div>

          {/* Deep Information Accordion/Tabs */}
          <div className="pt-4 border-t border-border">
            {/* Tab buttons */}
            <div className="flex items-center gap-2 overflow-x-auto border-b border-border pb-2">
              <button
                onClick={() => setActiveTab('benefits')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                  activeTab === 'benefits'
                    ? 'bg-amber-100 text-amber-900 border border-amber-400 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-500/60'
                    : 'text-text-secondary hover:text-text-primary dark:text-stone-300 dark:hover:text-white'
                }`}
              >
                Astrology & Numerology
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                  activeTab === 'specs'
                    ? 'bg-amber-100 text-amber-900 border border-amber-400 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-500/60'
                    : 'text-text-secondary hover:text-text-primary dark:text-stone-300 dark:hover:text-white'
                }`}
              >
                Specifications & Origin
              </button>
              <button
                onClick={() => setActiveTab('energization')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                  activeTab === 'energization'
                    ? 'bg-amber-100 text-amber-900 border border-amber-400 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-500/60'
                    : 'text-text-secondary hover:text-text-primary dark:text-stone-300 dark:hover:text-white'
                }`}
              >
                Pran Pratishtha Ritual
              </button>
              <button
                onClick={() => setActiveTab('wearing')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                  activeTab === 'wearing'
                    ? 'bg-amber-100 text-amber-900 border border-amber-400 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-500/60'
                    : 'text-text-secondary hover:text-text-primary dark:text-stone-300 dark:hover:text-white'
                }`}
              >
                How to Wear
              </button>
            </div>

            {/* Tab content */}
            <div className="pt-4 text-xs text-text-secondary leading-relaxed">
              {activeTab === 'benefits' && (
                <div className="space-y-3">
                  <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
                    <h5 className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">Traditional Jyotish association</h5>
                    <p className="text-stone-300">{product.specifications?.traditionalAstrology || 'No standard classical Jyotish association is assigned to this variety. Practices differ; consult a qualified astrologer.'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
                    <h5 className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">Traditional remedial theme</h5>
                    <p className="text-stone-300">{product.specifications?.traditionalRemedyTheme || 'No standard gemstone-remedy assignment is recorded for this variety.'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
                    <h5 className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">Numerology connection</h5>
                    <p className="text-stone-300">{product.specifications?.numerologyGuidance || 'No consistent Chaldean number-to-gemstone mapping is assigned in this catalogue.'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
                    <h5 className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">Who should consider it?</h5>
                    <p className="text-stone-200">{product.specifications?.suitabilityNote || 'Do not select a gemstone from a birth number alone. Suitability requires a complete birth-chart assessment and personal consultation.'}</p>
                  </div>
                  <p className="text-[10px] text-text-secondary">Astrological and numerological associations are traditional beliefs, not scientifically established remedies or guaranteed outcomes. They are not medical advice and do not replace professional care.</p>
                </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <span className="text-[10px] text-stone-400 block uppercase">Primary Origin</span>
                      <span className="font-semibold text-stone-200">{verifiedOrigin}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <span className="text-[10px] text-stone-400 block uppercase">Shape & Cut</span>
                      <span className="font-semibold text-stone-200">{identityVerified ? (product.specifications?.shape || 'Pending verification') : 'Pending verification'}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <span className="text-[10px] text-stone-400 block uppercase">Color Grade</span>
                      <span className="font-semibold text-stone-200">{identityVerified ? (product.specifications?.color || 'Pending verification') : 'Pending verification'}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <span className="text-[10px] text-stone-400 block uppercase">Certification</span>
                      <span className="font-semibold text-stone-200">{product.certification?.certified ? (product.certification.labName || 'Certificate details pending') : 'Not certified / pending'}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
                    <h5 className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">Quality checklist — not a grade of this item</h5>
                    <p className="text-stone-300">{product.specifications?.qualityGuide || 'Ask for material identification, treatment disclosure, weight, dimensions, and an independent report where appropriate.'}</p>
                  </div>
                  <p className="text-[10px] text-text-secondary pt-1">
                    This page's AI image is an illustration only. It is not a photograph of the available item and does not verify quality, treatment, origin, or authenticity.
                  </p>
                </div>
              )}

              {activeTab === 'energization' && (
                <div className="space-y-2.5">
                  <p>
                    Vedic energisation is a separate service and is not assumed to be included with every gemstone.
                  </p>
                  <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1 text-stone-200">
                    <span className="font-bold text-amber-300 block text-[11px]">
                      Confirm the service first:
                    </span>
                    <p className="text-stone-300">
                      Contact LEO Family to confirm whether this specific stone is eligible, the process offered, schedule, and any additional charge. The service is confirmed only after the team agrees the details with you.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'wearing' && (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <span className="text-[10px] text-stone-400 block uppercase">Recommended Metal</span>
                      <span className="font-semibold text-stone-200">{identityVerified ? (product.specifications?.metalRecommendation || 'Confirm during consultation') : 'Pending Vedic assessment'}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                      <span className="text-[10px] text-stone-400 block uppercase">Wearing Finger</span>
                      <span className="font-semibold text-stone-200">{identityVerified ? (product.specifications?.wearingFinger || 'Confirm during consultation') : 'Pending Vedic assessment'}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 sm:col-span-2">
                      <span className="text-[10px] text-stone-400 block uppercase">Auspicious Day & Muhurat</span>
                      <span className="font-semibold text-stone-200">{identityVerified ? (product.specifications?.wearingDayMuhurat || 'Confirm during consultation') : 'Pending Vedic assessment'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Gemstones Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-12 border-t border-border">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-cinzel font-bold text-text-primary">
              Related Sacred Vedic Gemstones
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              Explore complementary gemstones aligned with classical Jyotish planetary pairs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <div
                key={rel.id}
                onClick={() => navigate(`/gemstones/${rel.slug}`)}
                className="p-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition cursor-pointer group flex flex-col justify-between"
              >
                <div className="aspect-video w-full rounded-xl bg-stone-950 overflow-hidden mb-3 p-2 flex items-center justify-center">
                  {rel.specifications?.imageVerificationStatus === 'AI_ILLUSTRATION' && rel.images?.[0] ? (
                    <GemstoneIllustration
                      src={resolveImagePath(rel.images[0])}
                      panel={Number(rel.specifications?.imagePanel ?? 0)}
                      alt={rel.name}
                      className="w-full h-full"
                    />
                  ) : rel.specifications?.imageVerificationStatus === 'VERIFIED' && rel.images && rel.images.length > 0 && rel.images[0] ? (
                    <SmartImage
                      src={resolveImagePath(rel.images[0])}
                      alt={rel.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-stone-500">
                      <Sparkles className="w-6 h-6 text-stone-600 mb-1" />
                      <span className="text-[10px] text-stone-400">Photo Pending</span>
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-[11px] text-amber-400 uppercase font-semibold">
                    {rel.specifications?.traditionalPlanetLabel || 'No standard Vedic planetary mapping'}
                  </div>
                  <h4 className="text-sm font-bold text-stone-200 font-cinzel mt-0.5">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-stone-300 line-clamp-1 mt-1">
                    {rel.specifications?.traditionalSummary || 'Traditional associations and physical specifications are being reviewed.'}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 font-cinzel">
                    {rel.specifications?.pricingVerificationStatus === 'VERIFIED' ? `₹${rel.price.toLocaleString('en-IN')}` : 'Price on request'}
                  </span>
                  <span className="text-[10px] text-amber-400 group-hover:underline">
                    View Details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
