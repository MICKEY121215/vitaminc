import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiStar, HiOutlineShieldCheck, HiOutlineTruck, HiOutlineRefresh, HiMinus, HiPlus, HiOutlineShoppingCart } from 'react-icons/hi';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FullPageLoader } from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [activeTab, setActiveTab] = useState('benefits');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (id === 'featured') {
          const { data } = await API.get('/products?featured=true');
          if (data.length > 0) setProduct(data[0]);
        } else {
          const { data } = await API.get(`/products/${id}`);
          setProduct(data);
        }
      } catch (err) {
        toast.error('Product not found');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) { navigate('/auth'); return; }
    setAdding(true);
    await addToCart(product._id, quantity);
    setAdding(false);
  };

  if (loading) return <FullPageLoader />;
  if (!product) return <div className="min-h-[60vh] flex items-center justify-center text-gray-500">Product not found</div>;

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <div className="pt-24 pb-16 bg-warm-white min-h-screen">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="sticky top-28">
            <div className="bg-gradient-to-br from-primary-50 via-cream to-amber-50 rounded-3xl p-12 flex items-center justify-center min-h-[400px] lg:min-h-[500px] relative overflow-hidden">
              <div className="glow-blob w-[300px] h-[300px] bg-primary-200/50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 animate-float">
                <div className="w-40 h-64 bg-gradient-to-b from-orange-100 to-orange-50 rounded-2xl border border-orange-200/50 shadow-2xl shadow-primary-200/50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-2xl" />
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-8 h-10 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-lg" />
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-14 h-4 bg-gradient-to-b from-gray-600 to-gray-700 rounded-full" />
                  <div className="relative z-10 text-center mt-6">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-primary-600/70 font-medium mb-1">GlowVit C</div>
                    <div className="text-base font-display font-bold text-gray-800 leading-tight mb-1">Vitamin C</div>
                    <div className="text-xs text-gray-500 font-medium">20% Serum</div>
                    <div className="w-8 h-0.5 bg-primary-400 mx-auto my-2 rounded-full" />
                    <div className="text-[8px] text-gray-400 leading-tight">Brightening<br/>Face Serum<br/>30ml</div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary-400/30 to-transparent rounded-b-2xl" />
                </div>
              </div>
              {discount > 0 && <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">{discount}% OFF</span>}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 animate-slide-up">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-500 mb-2 block">{product.category}</span>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <HiStar key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-amber-400' : 'text-gray-200'}`} />)}
                </div>
                <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
              {product.originalPrice && <span className="text-xl text-gray-400 line-through mb-1">₹{product.originalPrice}</span>}
              {discount > 0 && <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full mb-1">You save ₹{product.originalPrice - product.price}</span>}
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-gray-50 transition-colors" id="qty-minus"><HiMinus className="w-4 h-4" /></button>
                <span className="px-6 py-3 font-semibold text-gray-800 min-w-[60px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-gray-50 transition-colors" id="qty-plus"><HiPlus className="w-4 h-4" /></button>
              </div>
              <button onClick={handleAddToCart} disabled={adding} className="btn-primary flex-1 !py-4 disabled:opacity-60" id="add-to-cart-btn">
                {adding ? (
                  <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Adding...</span>
                ) : (
                  <span className="flex items-center gap-2"><HiOutlineShoppingCart className="w-5 h-5" /> Add to Cart — ₹{product.price * quantity}</span>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { icon: HiOutlineTruck, label: 'Free Shipping' },
                { icon: HiOutlineRefresh, label: '30-Day Returns' },
                { icon: HiOutlineShieldCheck, label: 'Secure Payment' },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-xl">
                  <b.icon className="w-5 h-5 text-primary-500" />
                  <span className="text-[10px] font-semibold text-gray-500 text-center">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="pt-6 border-t border-gray-100">
              <div className="flex gap-6 mb-4">
                {['benefits', 'ingredients'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`text-sm font-semibold capitalize pb-2 border-b-2 transition-colors ${activeTab === tab ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>{tab}</button>
                ))}
              </div>
              <ul className="space-y-2">
                {(activeTab === 'benefits' ? product.benefits : product.ingredients)?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
