import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartAPI } from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  const updateCartCount = () => {
    const items = cartAPI.getCartItems();
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  return (
    <CartContext.Provider value={{ cartCount }}>
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