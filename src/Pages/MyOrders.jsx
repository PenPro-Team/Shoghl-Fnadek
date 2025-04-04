import React, { useState, useEffect } from 'react';
import { AxiosOrdersInstance, AxiosAttachmentsInstance } from '../Network/Remote/AxiosInstance';
import { getFromLocalStorage } from '../Network/local/localstorage';
import defaultOrderImage from '../assets/defaultOrder.jpg';

const getStatusStyle = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'confirmed':
      return 'bg-blue-100 text-blue-800';
    case 'canceled':
      return 'bg-red-100 text-red-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'pending':
      return 'قيد الانتظار';
    case 'confirmed':
      return 'تم التأكيد';
    case 'canceled':
      return 'ملغي';
    case 'completed':
      return 'مكتمل';
    default:
      return status;
  }
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = getFromLocalStorage('auth');

  useEffect(() => {
    const fetchOrders = async () => {
      console.log('Fetching orders with token:', currentUser?.access);
      try {
        const response = await AxiosOrdersInstance.get('/my_orders/'); // Note: Changed from my-orders to my_orders
        console.log('Raw API Response:', response);
        console.log('Orders data:', response.data);
        
        if (response.data.results) {
          setOrders(response.data.results);
          console.log('Set orders:', response.data.results);
        } else {
          console.warn('No results array in response:', response.data);
          setOrders([]);
        }
      } catch (err) {
        console.error('Error details:', {
          message: err.message,
          response: err.response,
          request: err.request
        });
        setError(err.response?.data?.error || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.access) {
      fetchOrders();
    } else {
      console.warn('No auth token found');
      setError('Please login to view orders');
    }
  }, [currentUser?.access]);

  const getImageUrl = (imagePath) => {
    console.log('Original image path:', imagePath);
    if (!imagePath) {
      console.log('No image path, using default:', defaultOrderImage);
      return defaultOrderImage;
    }
    if (imagePath.startsWith('http')) {
      console.log('Using full URL:', imagePath);
      return imagePath;
    }
    const fullPath = `${AxiosAttachmentsInstance.defaults.baseURL}${imagePath}`;
    console.log('Constructed full path:', fullPath);
    return fullPath;
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center py-8 text-red-600">{error}</div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">طلباتي</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          لا يوجد طلبات حتى الآن
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.order_id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-gray-600">رقم الطلب:</span>
                  <span className="font-bold ml-2">#{order.order_id}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(order.status)}`}>
                  {getStatusText(order.status)}
                </div>
              </div>
              
              <div className="space-y-4">
                {order.items.map((item, index) => {
                  console.log(`Item ${index} image path:`, item.image);
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={getImageUrl(item.image)} 
                          alt={item.name} 
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultOrderImage;
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-gray-600">الكمية: {item.quantity}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="font-bold">${order.total_amount}</span>
                  <span className="text-gray-600">المجموع</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
