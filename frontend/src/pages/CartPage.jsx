import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMinus, HiPlus, HiOutlineTrash, HiOutlineArrowLeft, HiOutlineShoppingCart } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const CartPage = () => {
  const { cartItems, cartTotal, cartLoading, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [checkingOut, setCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (cartItems.length === 0) { toast.error('Your cart is empty'); return; }
    setCheckingOut(true);
    try {
      const orderProducts = cartItems.map(item => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
      }));

      const { data } = await API.post('/orders', {
        products: orderProducts,
        totalAmount: cartTotal,
        shippingAddress: { street: '123 Main St', city: 'Mumbai', state: 'Maharashtra', zip: '400001' }
      });

      if (data.demoMode) {
        toast.success('Order placed successfully! (Demo Mode)');
        await clearCart();
        navigate('/orders');
        return;
      }

      // Razorpay checkout
      if (window.Razorpay && data.razorpayOrder) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_demo',
          amount: data.razorpayOrder.amount,
          currency: data.razorpayOrder.currency,
          name: 'GlowVit C',
          description: 'Skincare Order',
          order_id: data.razorpayOrder.id,
          handler: async (response) => {
            try {
              await API.post('/orders/verify', response);
              toast.success('Payment successful! 🎉');
              await clearCart();
              navigate('/orders');
            } catch { toast.error('Payment verification failed'); }
          },
          prefill: { name: user?.name, email: user?.email },
          theme: { color: '#f97316' },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Checkout failed');
    } finally {
      setCheckingOut(false);
    }
  };

  if (cartLoading) return <div className="pt-28"><LoadingSpinner size="lg" text="Loading your cart..." /></div>;

  return (
    <div className="pt-24 pb-16 bg-warm-white min-h-screen">
      <div className="section-container max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-900">Your Cart</h1>
            <p className="text-sm text-gray-400 mt-1">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
          </div>
          <Link to="/" className="btn-ghost text-sm gap-1"><HiOutlineArrowLeft className="w-4 h-4" /> Continue Shopping</Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiOutlineShoppingCart className="w-10 h-10 text-primary-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
            <p className="text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
            <Link to="/" className="btn-primary">Shop Now</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const p = item.productId;
                if (!p) return null;
                return (
                  <div key={p._id} className="bg-white rounded-2xl p-5 border border-gray-100 flex gap-5 items-center animate-fade-in">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-50 to-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-14 bg-gradient-to-b from-orange-100 to-orange-50 rounded-md border border-orange-200/50 relative">
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2.5 bg-gray-700 rounded-t-sm" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">{p.name}</h3>
                      <p className="text-primary-600 font-bold mt-1">₹{p.price}</p>
                    </div>
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button onClick={() => updateQuantity(p._id, item.quantity - 1)} className="p-2 hover:bg-gray-50"><HiMinus className="w-3 h-3" /></button>
                      <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(p._id, item.quantity + 1)} className="p-2 hover:bg-gray-50"><HiPlus className="w-3 h-3" /></button>
                    </div>
                    <span className="font-bold text-gray-900 min-w-[60px] text-right">₹{p.price * item.quantity}</span>
                    <button onClick={() => removeFromCart(p._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><HiOutlineTrash className="w-5 h-5" /></button>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-28 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{cartTotal}</span></div>
                  <div className="flex justify-between text-gray-500"><span>Shipping</span><span className="text-green-600 font-medium">Free</span></div>
                  <hr className="border-gray-100" />
                  <div className="flex justify-between font-bold text-gray-900 text-lg"><span>Total</span><span>₹{cartTotal}</span></div>
                </div>
                <button onClick={handleCheckout} disabled={checkingOut} className="btn-primary w-full mt-6 !py-4 disabled:opacity-60" id="checkout-btn">
                  {checkingOut ? (
                    <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</span>
                  ) : 'Proceed to Checkout'}
                </button>
                <p className="text-[10px] text-gray-400 text-center mt-3">Secure checkout with Razorpay 🔒</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
