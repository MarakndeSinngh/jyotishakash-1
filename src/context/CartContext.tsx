import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, GemstoneProduct, GemstoneVariant } from '../models/gemstoneProduct';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: GemstoneProduct, variant?: GemstoneVariant | null, quantity?: number) => boolean;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'leo_sacred_cart_v1';
const WISHLIST_STORAGE_KEY = 'leo_sacred_wishlist_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const addToCart = (product: GemstoneProduct, variant?: GemstoneVariant | null, quantity = 1): boolean => {
    const isOut = variant ? !variant.inStock || variant.stockQuantity <= 0 : !product.inStock || product.stockQuantity <= 0;
    if (isOut) {
      return false;
    }

    const itemId = variant ? `${product.id}_${variant.id}` : `${product.id}_base`;
    const price = variant ? variant.price : product.price;
    const compareAtPrice = variant?.compareAtPrice || product.compareAtPrice || undefined;
    const maxStock = variant ? variant.stockQuantity : product.stockQuantity;
    const sku = variant ? variant.sku : product.sku;
    const variantName = variant ? variant.name : undefined;

    setItems(prevItems => {
      const existing = prevItems.find(i => i.id === itemId);
      if (existing) {
        const nextQty = Math.min(existing.quantity + quantity, maxStock);
        return prevItems.map(i => i.id === itemId ? { ...i, quantity: nextQty } : i);
      }
      return [
        ...prevItems,
        {
          id: itemId,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          hindiName: product.hindiName,
          image: product.images[0] || '/gemstone-assets/ruby.jpg',
          price,
          compareAtPrice,
          quantity: Math.min(quantity, maxStock),
          variantId: variant?.id,
          variantName,
          maxStock,
          sku
        }
      ];
    });

    setIsCartOpen(true);
    return true;
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const validQty = Math.min(quantity, item.maxStock || 99);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        wishlist,
        toggleWishlist,
        isWishlisted
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
