import Hero from '../components/sections/Hero';
import Benefits from '../components/sections/Benefits';
import BeforeAfter from '../components/sections/BeforeAfter';
import Testimonials from '../components/sections/Testimonials';
import Trust from '../components/sections/Trust';
import CTASection from '../components/sections/CTASection';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import { HiStar } from 'react-icons/hi';

const ProductsShowcase = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => { API.get('/products').then(r => setProducts(r.data)).catch(() => {}); }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-warm-white" id="products">
      <div className="section-container">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary-500 mb-3">Our Products</span>
          <h2 className="section-title">Shop the <span className="gradient-text">Collection</span></h2>
          <p className="section-subtitle">Curated Vitamin C products for every step of your skincare routine.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link to={`/product/${p._id}`} key={p._id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 product-card-hover">
              <div className="aspect-square bg-gradient-to-br from-primary-50 to-amber-50 flex items-center justify-center p-8 relative overflow-hidden">
                <div className="w-24 h-36 bg-gradient-to-b from-orange-100 to-orange-50 rounded-xl border border-orange-200/50 shadow-lg flex items-center justify-center relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-6 bg-gray-700 rounded-t-md" />
                  <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-9 h-2.5 bg-gray-600 rounded-full" />
                  <div className="text-center mt-2 px-1">
                    <div className="text-[6px] uppercase tracking-widest text-primary-500 font-medium">GlowVit C</div>
                    <div className="text-[8px] font-bold text-gray-700 mt-0.5 leading-tight">{p.name.split(' ').slice(-1)[0]}</div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-primary-300/30 to-transparent rounded-b-xl" />
                </div>
                {p.originalPrice && <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{Math.round((1 - p.price / p.originalPrice) * 100)}% OFF</span>}
              </div>
              <div className="p-5">
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">{p.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => <HiStar key={i} className={`w-3 h-3 ${i < Math.round(p.rating) ? 'text-amber-400' : 'text-gray-200'}`} />)}
                  <span className="text-xs text-gray-400 ml-1">({p.reviewCount})</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-lg font-bold text-gray-900">₹{p.price}</span>
                  {p.originalPrice && <span className="text-sm text-gray-400 line-through">₹{p.originalPrice}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => (
  <>
    <Hero />
    <Benefits />
    <ProductsShowcase />
    <BeforeAfter />
    <Testimonials />
    <Trust />
    <CTASection />
  </>
);

export default Home;
