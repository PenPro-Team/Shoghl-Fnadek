import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CheckoutForm from '../components/Checkout/CheckoutForm';
import OrderSummary from '../components/Checkout/OrderSummary';
import { useCart } from '../context/CartContext';
import { getFromLocalStorage } from '../Network/local/localstorage';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const currentUser = getFromLocalStorage('auth');
  const isAuthenticated = !!currentUser?.access;

  useEffect(() => {
    const hasItems = cartItems.length > 0;
    if (!hasItems && !shouldRedirect) {
      setShouldRedirect(true);
    }
  }, []); // Run only once on mount

  useEffect(() => {
    let timer;
    if (shouldRedirect) {
      timer = setTimeout(() => {
        navigate('/products');
      }, 3000);
    }
    return () => timer && clearTimeout(timer);
  }, [shouldRedirect, navigate]);

  const handleCheckout = (formData) => {
    // Add console.log to debug
    console.log('Submitting order details:', formData);
    
    // Use state object to pass data
    navigate('/payment-confirmation', {
      state: { 
        orderDetails: formData,
        timestamp: Date.now() // Add timestamp to ensure state freshness
      },
      replace: false // Don't replace history entry
    });
  };

  if (cartItems.length === 0) {
    // ...existing empty cart JSX...
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">تسجيل الدخول مطلوب</h2>
          <p className="text-gray-600 text-center mb-8">
            يرجى تسجيل الدخول أو إنشاء حساب جديد لإتمام عملية الشراء
          </p>
          <div className="space-y-4">
            <Link 
              to="/login" 
              state={{ from: '/checkout' }}
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              تسجيل الدخول
            </Link>
            <Link 
              to="/register" 
              state={{ from: '/checkout' }}
              className="block w-full bg-gray-100 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              إنشاء حساب جديد
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">إتمام الطلب</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="order-2 md:order-1">
          <CheckoutForm onSubmit={handleCheckout} />
        </div>
        
        <div className="order-1 md:order-2">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
