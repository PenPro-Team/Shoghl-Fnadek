import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getFromLocalStorage } from '../Network/local/localstorage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const currentUser = getFromLocalStorage('auth');
  const isAuthenticated = !!currentUser?.access;

  const [cartItems, setCartItems] = useState(() => {
    try {
      if (isAuthenticated) {
        const savedCart = localStorage.getItem('cart');
        // If user is logged in and has no cart but has guest cart, use guest cart
        if (!savedCart && localStorage.getItem('cart_guest')) {
          const guestCart = localStorage.getItem('cart_guest');
          localStorage.setItem('cart', guestCart);
          localStorage.removeItem('cart_guest');
          return JSON.parse(guestCart);
        }
        return savedCart ? JSON.parse(savedCart) : [];
      } else {
        const guestCart = localStorage.getItem('cart_guest');
        return guestCart ? JSON.parse(guestCart) : [];
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      const cartKey = isAuthenticated ? 'cart' : 'cart_guest';
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cartItems, isAuthenticated]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id ? {...i, quantity: i.quantity + 1} : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = useCallback(() => {
    setCartItems([]);
    const cartKey = isAuthenticated ? 'cart' : 'cart_guest';
    localStorage.removeItem(cartKey);
  }, [isAuthenticated]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
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

export default CartContext;
