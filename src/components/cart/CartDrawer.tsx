import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import SmartImage from '../sections/SmartImage';
import { resolveImagePath } from '../../utils/imageHelper';

interface CartDrawerProps {
  onNavigate?: (path: string) => void;
}

export default function CartDrawer({ onNavigate }: CartDrawerProps) {
  const { items, isCartOpen, closeCart, updateQuantity, removeFromCart, clearCart, totalItems, subtotal } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let message = `🙏 *Namaste LEO Family Occult School,*\n\nI would like to place an order for the following Sacred Vedic Gemstones from your collection:\n\n`;

    items.forEach((item, index) => {
      message += `*${index + 1}. ${item.name} (${item.hindiName})*\n`;
      if (item.variantName) {
        message += `   • Variant: ${item.variantName}\n`;
      }
      message += `   • SKU: ${item.sku}\n`;
      message += `   • Quantity: ${item.quantity}\n`;
      message += `   • Price: ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n\n`;
    });

    message += `💰 *Total Amount:* ₹${subtotal.toLocaleString('en-IN')}\n`;
    message += `✨ *Pran Pratishtha:* Included\n`;
    message += `📦 *Delivery:* Insured Shipping Across India\n\n`;

    if (customerName) {
      message += `👤 *Customer Name:* ${customerName}\n`;
    }
    if (customerPhone) {
      message += `📱 *Contact Number:* ${customerPhone}\n`;
    }
    if (customerCity) {
      message += `📍 *Delivery Location:* ${customerCity}\n`;
    }

    message += `\nPlease verify my birth chart compatibility and share official payment (UPI / Bank Transfer) details. Thank you!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919953713176?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
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
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
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

                  {/* Spiritual Assurance Banner */}
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-300/90">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Every gemstone includes personalized <strong className="text-amber-200">Pran Pratishtha & Mantra Energization</strong> sanctified by LEO Family masters.
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
                  <div className="flex justify-between text-stone-400">
                    <span>Subtotal</span>
                    <span className="text-stone-200 font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Vedic Pran Pratishtha</span>
                    <span className="text-amber-400 font-medium">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Insured Shipping (India)</span>
                    <span className="text-emerald-400 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold pt-2 border-t border-stone-800 text-stone-100">
                    <span>Total Amount</span>
                    <span className="text-amber-300 font-cinzel text-base">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 hover:brightness-110 transition active:scale-[0.99]"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Order via Official WhatsApp</span>
                </button>

                <p className="text-[10px] text-center text-stone-500">
                  Direct connection with LEO Family Astrological Dispatch team. No hidden fees.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
