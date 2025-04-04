import React from 'react';
import { useCart } from '../../context/CartContext';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Cart = ({ onClose }) => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  
  if (!cartItems) return null;

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out z-40"
        onClick={onClose}
      />
      
      <div className="fixed top-0 right-0 h-full w-[32rem] bg-white shadow-lg z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out animate-slide-in">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">سلة التسوق</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          
          {(!cartItems || cartItems.length === 0) ? (
            <div className="text-center py-8">
              <p className="text-gray-500">السلة فارغة</p>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="group flex items-center gap-4 border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-200 bg-white"
                  >
                    <div className="relative min-w-[100px] h-[100px]">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain rounded-lg" 
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-800 group-hover:text-black transition-colors text-lg mb-1">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">${item.price}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                          <button
                            className="p-2 hover:bg-gray-200 rounded-md transition-colors text-gray-600 hover:text-black"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <FiMinus size={14} className="stroke-current" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            className="p-2 hover:bg-gray-200 rounded-md transition-colors text-gray-600 hover:text-black"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <FiPlus size={14} className="stroke-current" />
                          </button>
                        </div>
                        
                        <button
                          className="text-red-500 hover:text-red-600 transition-colors p-2 rounded-md hover:bg-red-50"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-right min-w-[80px]">
                      <p className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-gray-800">المجموع:</span>
                  <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  اتمام الطلب
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
