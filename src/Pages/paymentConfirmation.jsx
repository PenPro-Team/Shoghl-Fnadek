import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { AxiosOrdersInstance } from '../Network/Remote/AxiosInstance';

const PaymentConfirmation = () => {
  const [screenshot, setScreenshot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();  // Add clearCart to destructuring
  const { orderDetails } = location.state || {};
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 10; // 10 for shipping

  const handleSuccessfulOrder = useCallback(() => {
    setSuccess(true);
    clearCart();
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 5000);
    return () => clearTimeout(timer);
  }, [clearCart, navigate]);

  // Add debug logging
  useEffect(() => {
    console.log('Location state:', location.state);
    console.log('Order details:', orderDetails);
    console.log('Cart items:', cartItems);
  }, [location.state, orderDetails, cartItems]);

  // Check for order details and cart items using useEffect
  useEffect(() => {
    const hasValidData = orderDetails && Object.keys(orderDetails).length > 0 && cartItems.length > 0;
    if (!hasValidData && !shouldRedirect) {
      console.log('Missing data - redirecting to checkout');
      setShouldRedirect(true);
    }
  }, [orderDetails, cartItems.length]); // Add dependencies to check for changes

  useEffect(() => {
    let timer;
    if (shouldRedirect) {
      timer = setTimeout(() => {
        navigate('/checkout');
      }, 3000);
    }
    return () => timer && clearTimeout(timer);
  }, [shouldRedirect, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setScreenshot(file);
    setFileError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!screenshot) {
      setFileError(true);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData();

    formData.append('first_name', orderDetails.firstName);
    formData.append('last_name', orderDetails.lastName);
    formData.append('email', orderDetails.email);
    formData.append('phone', orderDetails.phone);
    formData.append('address', orderDetails.address);
    formData.append('city', orderDetails.city);
    formData.append('notes', orderDetails.notes || '');
    formData.append('total_amount', total.toString());
    formData.append('shipping_cost', '10.00');
    formData.append('payment_method', 'vodafone-cash');
    formData.append('items', JSON.stringify(cartItems.map(item => ({
      product_id: item.id,
      quantity: item.quantity
    }))));
    formData.append('payment_proof', screenshot);

    // Log the form data
    console.log('Form Data Content:');
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await AxiosOrdersInstance.post('/', formData, {  // Changed from '/create/'
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        handleSuccessfulOrder();
      }
    } catch (error) {
      setError(
        error.response?.data?.error || 
        'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.'
      );
      setIsSubmitting(false);
    }
  };

  // Don't render anything if we're redirecting to checkout
//   if (!orderDetails || cartItems.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-yellow-800 mb-2">معلومات الطلب غير متوفرة</h2>
//           <p className="text-yellow-600">سيتم تحويلك إلى صفحة إتمام الطلب...</p>
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {success ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center animate-fade-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-green-800 mb-4">تم إرسال الطلب بنجاح!</h2>
            <p className="text-green-600 text-lg mb-4">شكراً لك على طلبك</p>
            <p className="text-green-500">سيتم تحويلك للصفحة الرئيسية خلال لحظات...</p>
            <div className="mt-8 text-sm text-gray-500">
              رقم الطلب: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-600 text-center">{error}</p>
              </div>
            )}
            
            <h1 className="text-2xl font-bold text-center mb-6">تأكيد الدفع</h1>
          
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">تعليمات الدفع</h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-right">برجاء تحويل المبلغ المطلوب إلى:</p>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-bold text-right">فودافون كاش / انستا باي</p>
                  <p className="text-lg font-mono mt-2 select-all text-center">01013662329</p>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-lg font-bold text-blue-600">${total.toFixed(2)}</p>
                    <p className="font-bold">:المبلغ المطلوب</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 text-right mb-2">
                  إرفاق صورة إيصال الدفع
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={`w-full p-2 border rounded-lg ${fileError ? 'border-red-500' : 'border-gray-300'}`}
                />
                {fileError && (
                  <p className="mt-1 text-red-500 text-sm text-right">
                    يرجى إرفاق صورة إيصال الدفع
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 flex items-center justify-center"
                disabled={!screenshot || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2">جاري الإرسال...</span>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </>
                ) : (
                  'تأكيد الدفع'
                )}
              </button>
            </form>

            <div className="text-sm text-gray-500 text-center">
              سيتم مراجعة طلبك بعد تأكيد الدفع
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmation;
