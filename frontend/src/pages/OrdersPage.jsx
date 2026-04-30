import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineCheckCircle, HiOutlineClock, HiOutlineXCircle } from 'react-icons/hi';
import API from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const statusConfig = {
  completed: { icon: HiOutlineCheckCircle, color: 'text-green-500', bg: 'bg-green-50', label: 'Completed' },
  pending: { icon: HiOutlineClock, color: 'text-amber-500', bg: 'bg-amber-50', label: 'Pending' },
  failed: { icon: HiOutlineXCircle, color: 'text-red-500', bg: 'bg-red-50', label: 'Failed' },
  refunded: { icon: HiOutlineXCircle, color: 'text-gray-500', bg: 'bg-gray-50', label: 'Refunded' },
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/orders/user')
      .then(r => setOrders(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="pt-28"><LoadingSpinner size="lg" text="Loading orders..." /></div>;

  return (
    <div className="pt-24 pb-16 bg-warm-white min-h-screen">
      <div className="section-container max-w-4xl">
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-sm text-gray-400 mb-8">{orders.length} order{orders.length !== 1 ? 's' : ''}</p>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiOutlineShoppingBag className="w-10 h-10 text-primary-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h3>
            <p className="text-gray-400 mb-6">Start shopping to see your orders here.</p>
            <Link to="/" className="btn-primary">Shop Now</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const s = statusConfig[order.paymentStatus] || statusConfig.pending;
              const StatusIcon = s.icon;
              return (
                <div key={order._id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-400">Order ID</p>
                      <p className="text-sm font-mono font-semibold text-gray-700">{order._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Date</p>
                      <p className="text-sm font-medium text-gray-700">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Total</p>
                      <p className="text-lg font-bold text-gray-900">₹{order.totalAmount}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 ${s.bg} ${s.color} px-3 py-1.5 rounded-full`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-xs font-semibold">{s.label}</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-50 pt-4 space-y-2">
                    {order.products.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{item.name || 'Product'} × {item.quantity}</span>
                        <span className="font-medium text-gray-800">₹{(item.price || 0) * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
