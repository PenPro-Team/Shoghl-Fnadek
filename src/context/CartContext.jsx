import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getFromLocalStorage } from '../Network/local/localstorage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const currentUser = getFromLocalStorage('auth');
  const userId = currentUser?.user?.id;

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(`cart_${userId || 'guest'}`);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(`cart_${userId || 'guest'}`, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cartItems, userId]);

  useEffect(() => {
    if (userId) {
      const guestCart = JSON.parse(localStorage.getItem('cart_guest') || '[]');
      if (guestCart.length > 0) {
        setCartItems(prevItems => {
          const mergedCart = [...prevItems];
          guestCart.forEach(guestItem => {
            const existingItem = mergedCart.find(item => item.id === guestItem.id);
            if (existingItem) {
              existingItem.quantity += guestItem.quantity;
            } else {
              mergedCart.push(guestItem);
            }
          });
          localStorage.removeItem('cart_guest');
          return mergedCart;
        });
      }
    }
  }, [userId]);

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
    localStorage.removeItem(`cart_${userId || 'guest'}`);
  }, [userId]);

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
