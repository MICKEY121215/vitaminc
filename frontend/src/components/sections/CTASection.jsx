import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineLightningBolt, HiOutlineClock } from 'react-icons/hi';

const CTASection = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 47, s: 33 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" id="cta">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-amber-500" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="glow-blob w-[400px] h-[400px] bg-white/10 top-0 right-0" />
      <div className="glow-blob w-[300px] h-[300px] bg-yellow-300/20 bottom-0 left-0" />

      <div className="section-container relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
          <HiOutlineLightningBolt className="w-4 h-4 text-yellow-200" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Limited Time Offer</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Get Your Glow Today — <span className="text-yellow-200">54% OFF</span>
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
          Don't miss out on our bestselling Vitamin C Serum at the lowest price ever. Limited stock available.
        </p>

        {/* Price */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-2xl text-white/50 line-through">₹1,299</span>
          <span className="text-5xl font-bold text-white">₹599</span>
          <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase">Save ₹700</span>
        </div>

        {/* Countdown */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <HiOutlineClock className="w-5 h-5 text-yellow-200" />
          <span className="text-sm text-white/70 mr-2">Offer ends in:</span>
          {[{ v: timeLeft.h, l: 'HRS' }, { v: timeLeft.m, l: 'MIN' }, { v: timeLeft.s, l: 'SEC' }].map((t, i) => (
            <span key={i} className="flex flex-col items-center">
              <span className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white font-bold text-lg font-mono min-w-[48px]">
                {pad(t.v)}
              </span>
              <span className="text-[9px] text-white/50 mt-1 uppercase">{t.l}</span>
            </span>
          ))}
        </div>

        <Link to="/product/featured" className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold px-10 py-4 rounded-full text-lg shadow-2xl shadow-black/20 hover:bg-yellow-50 hover:scale-105 active:scale-100 transition-all duration-300 uppercase tracking-wide" id="cta-buy-btn">
          Buy Now — ₹599
        </Link>

        <p className="text-xs text-white/50 mt-6">Free shipping on all orders • 30-day money-back guarantee</p>
      </div>
    </section>
  );
};

export default CTASection;
