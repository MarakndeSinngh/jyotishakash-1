import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import SmartImage from '../sections/SmartImage';
import { resolveImagePath } from '../../utils/imageHelper';
import { gemstoneProductService } from '../../services/gemstoneProductService';

interface CartDrawerProps {
  onNavigate?: (path: string) => void;
}

export default function CartDrawer({ onNavigate }: CartDrawerProps) {
  const { items, isCartOpen, closeCart, updateQuantity, removeFromCart, clearCart, totalItems } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  const handleWhatsAppCheckout = async () => {
    if (items.length === 0 || isSubmittingOrder) return;
    setIsSubmittingOrder(true);

    try {
      // Cart items are localStorage snapshots. Revalidate each public product and variant
      // before quoting current prices or creating a WhatsApp order enquiry.
      const currentProducts = await Promise.all(
        items.map(item => gemstoneProductService.getProductById(item.productId, false))
      );
      const verifiedLines: Array<{
        item: typeof items[number];
        price: number;
        sku: string;
        variantName?: string;
      }> = [];

      for (let index = 0; index < items.length; index++) {
        const item = items[index];
        const product = currentProducts[index];
        if (!product || !product.isPublished) {
          throw new Error(`${item.name} is no longer publicly available. Remove it from your cart and refresh the catalogue.`);
        }
        if (product.specifications?.pricingVerificationStatus !== 'VERIFIED') {
          throw new Error(`The price for ${item.name} is awaiting administrator confirmation. Please contact LEO Family.`);
        }

        const variant = item.variantId
          ? product.variants.find(candidate => candidate.id === item.variantId)
          : null;
        if (item.variantId && !variant) {
          throw new Error(`The selected variant for ${item.name} is no longer available. Please revisit the product page.`);
        }
        if (variant && variant.priceVerificationStatus !== 'VERIFIED') {
          throw new Error(`The selected variant price for ${item.name} is awaiting administrator approval.`);
        }

        const stock = variant ? variant.stockQuantity : product.stockQuantity;
        const inStock = variant ? variant.inStock : product.inStock;
        const price = variant ? variant.price : product.price;
        const sku = variant ? variant.sku : product.sku;
        if (!inStock || stock <= 0 || item.quantity > stock) {
          throw new Error(`Current inventory for ${item.name} has changed. Please update the quantity or contact LEO Family.`);
        }
        if (!Number.isFinite(price) || price <= 0) {
          throw new Error(`A valid current price is not available for ${item.name}.`);
        }

        verifiedLines.push({ item, price, sku, variantName: variant?.name });
      }

      const verifiedSubtotal = verifiedLines.reduce(
        (sum, line) => sum + line.price * line.item.quantity,
        0
      );
      let message = `🙏 *Namaste LEO Family Occult School,*\n\nI would like to place an order enquiry for the following gemstones:\n\n`;

      verifiedLines.forEach((line, index) => {
        message += `*${index + 1}. ${line.item.name} (${line.item.hindiName})*\n`;
        if (line.variantName) message += `   • Variant: ${line.variantName}\n`;
        message += `   • SKU: ${line.sku}\n   • Quantity: ${line.item.quantity}\n   • Current unit price: ₹${line.price.toLocaleString('en-IN')}\n   • Line total: ₹${(line.price * line.item.quantity).toLocaleString('en-IN')}\n\n`;
      });

      message += `💰 *Indicative subtotal:* ₹${verifiedSubtotal.toLocaleString('en-IN')}\n\n`;
      if (customerName) message += `👤 *Customer Name:* ${customerName}\n`;
      if (customerPhone) message += `📱 *Contact Number:* ${customerPhone}\n`;
      if (customerCity) message += `📍 *Delivery Location:* ${customerCity}\n`;
      message += `\nPlease confirm final availability, taxes, shipping terms, and any optional energisation service before payment. This message is an enquiry, not a confirmed or paid order.`;

      const whatsappUrl = `https://wa.me/919953713176?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (err: any) {
      window.alert(err?.message || 'Could not verify current product and inventory details. Please retry or contact LEO Family.');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[10000] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-md bg-stone-900 text-stone-100 h-full shadow-2xl flex flex-col z-10 border-l border-amber-500/20"
          >
            {/* Header */}
            <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-lg text-amber-200 tracking-wide">
                    Sacred Gemstone Cart
                  </h3>
                  <p className="text-xs text-stone-400">
                    {totalItems} {totalItems === 1 ? 'gemstone selected' : 'gemstones selected'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-stone-400 hover:text-red-400 px-2 py-1 rounded transition"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-400/50">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-cinzel text-lg font-bold text-stone-300">
                      Your Sacred Cart is Empty
                    </h4>
                    <p className="text-xs text-stone-500 max-w-xs">
                      Explore our Vedic gemstone collection to select stones aligned with your planetary frequencies.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      closeCart();
                      if (onNavigate) onNavigate('/gemstones');
                    }}
                    className="mt-4 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg shadow-amber-900/30"
                  >
                    Explore Gemstones
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart items list */}
                  <div className="space-y-3">
                    {items.map(item => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-stone-950/70 border border-stone-800/80 hover:border-amber-500/30 transition flex gap-3"
                      >
                        {/* Thumbnail */}
                        <div className="w-20 h-20 rounded-lg bg-stone-900 border border-stone-800 shrink-0 overflow-hidden flex items-center justify-center p-1">
                          {item.image ? (
                            <SmartImage
                              src={resolveImagePath(item.image)}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="text-[9px] text-stone-500 font-cinzel text-center">
                              Pending Photo
                            </span>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="text-sm font-semibold text-stone-200 truncate">
                                {item.name}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-stone-500 hover:text-red-400 p-1 transition"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-[11px] text-amber-400/90 font-cinzel">
                              {item.hindiName}
                            </p>
                            {item.variantName && (
                              <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] bg-stone-800 text-stone-300 border border-stone-700/60">
                                {item.variantName}
                              </span>
                            )}
                          </div>

                          {/* Price & Quantity */}
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-800/60">
                            <span className="text-xs font-bold text-amber-300">
                              Price rechecked before enquiry
                            </span>
                            <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded-lg p-0.5">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-stone-200 transition"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-semibold px-2 min-w-[20px] text-center text-stone-200">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.maxStock}
                                className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-stone-200 disabled:opacity-30 transition"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Optional service disclosure */}
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-300/90">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Vedic energisation, consultation, shipping, and insurance terms are confirmed individually with the LEO Family team before payment. They are not assumed to be included in the displayed product price.
                    </p>
                  </div>

                  {/* Optional customer contact details form */}
                  <div className="p-3 rounded-xl bg-stone-950/50 border border-stone-800/80 space-y-2">
                    <button
                      onClick={() => setIsCheckingOut(!isCheckingOut)}
                      className="w-full text-left text-xs font-semibold text-stone-300 flex items-center justify-between"
                    >
                      <span>Delivery & Kundali Details (Optional)</span>
                      <span className="text-[10px] text-amber-400 font-normal">
                        {isCheckingOut ? 'Hide' : 'Add Details'}
                      </span>
                    </button>
                    {isCheckingOut && (
                      <div className="space-y-2 pt-2">
                        <input
                          type="text"
                          value={customerName}
                          onChange={e => setCustomerName(e.target.value)}
                          placeholder="Your Full Name"
                          className="w-full px-3 py-1.5 text-xs rounded-lg bg-stone-900 border border-stone-700 text-stone-200 focus:outline-none focus:border-amber-500"
                        />
                        <input
                          type="tel"
                          value={customerPhone}
                          onChange={e => setCustomerPhone(e.target.value)}
                          placeholder="WhatsApp Phone Number"
                          className="w-full px-3 py-1.5 text-xs rounded-lg bg-stone-900 border border-stone-700 text-stone-200 focus:outline-none focus:border-amber-500"
                        />
                        <input
                          type="text"
                          value={customerCity}
                          onChange={e => setCustomerCity(e.target.value)}
                          placeholder="City / Pincode (e.g., Delhi 110001)"
                          className="w-full px-3 py-1.5 text-xs rounded-lg bg-stone-900 border border-stone-700 text-stone-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Footer Summary & WhatsApp Order CTA */}
            {items.length > 0 && (
              <div className="p-5 border-t border-stone-800 bg-stone-950/90 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <p className="text-stone-300 leading-relaxed">
                    Current product prices and inventory are rechecked from the catalogue when you continue. LEO Family will confirm the final payable amount, taxes, shipping, insurance, and any optional services before payment.
                  </p>
                </div>

                <button
                  onClick={() => void handleWhatsAppCheckout()}
                  disabled={isSubmittingOrder}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 hover:brightness-110 transition active:scale-[0.99]"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>{isSubmittingOrder ? 'Checking prices & stock...' : 'Continue to WhatsApp Enquiry'}</span>
                </button>

                <p className="text-[10px] text-center text-stone-500">
                  This is an order enquiry. Final charges and delivery terms are confirmed by the LEO Family team before payment.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
