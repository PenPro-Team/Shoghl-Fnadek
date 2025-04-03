import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/Checkout/CheckoutForm';
import OrderSummary from '../components/Checkout/OrderSummary';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [shouldRedirect, setShouldRedirect] = useState(false);

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

//   if (cartItems.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-yellow-800 mb-2">السلة فارغة</h2>
//           <p className="text-yellow-600">سيتم تحويلك إلى صفحة المنتجات...</p>
//         </div>
//       </div>
//     );
//   }

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
