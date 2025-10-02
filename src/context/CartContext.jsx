'use client';
import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); 

  const addItem = (product, quantity = 1) => {
    setItems(prev => {
      const ex = prev.find(p => p.id === product.id);
      if (ex) {
        const q = Math.min(ex.quantity + quantity, 10);
        return prev.map(p => (p.id === product.id ? { ...p, quantity: q } : p));
      }
      return [...prev, { ...product, quantity: Math.max(1, Math.min(quantity, 10)) }];
    });
  };

  const updateQuantity = (id, quantity) => {
    const q = Math.max(1, Math.min(Number(quantity) || 1, 10));
    setItems(prev => prev.map(p => (p.id === id ? { ...p, quantity: q } : p)));
  };

  const removeItem = id => setItems(prev => prev.filter(p => p.id !== id));

  const total = items.reduce((s, p) => s + p.price * p.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
