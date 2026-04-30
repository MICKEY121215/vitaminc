import { useEffect, useRef, useState } from 'react';
import { HiStar } from 'react-icons/hi';

const reviews = [
  { name: 'Priya Sharma', location: 'Mumbai', rating: 5, quote: 'My dark spots have faded so much in just 3 weeks! This serum is absolutely magical. My friends keep asking what changed.', initials: 'PS', color: 'from-pink-400 to-rose-500' },
  { name: 'Ankit Verma', location: 'Delhi', rating: 5, quote: 'I was skeptical at first, but the results speak for themselves. My skin has never looked this bright and healthy.', initials: 'AV', color: 'from-blue-400 to-indigo-500' },
  { name: 'Sneha Patel', location: 'Bangalore', rating: 5, quote: 'Best skincare investment I have ever made. The glow is real and I get compliments every single day now!', initials: 'SP', color: 'from-primary-400 to-amber-500' },
  { name: 'Rohit Gupta', location: 'Pune', rating: 4, quote: 'Great texture, absorbs quickly, and my acne scars are visibly lighter after 6 weeks. Highly recommend to everyone.', initials: 'RG', color: 'from-green-400 to-emerald-500' },
  { name: 'Meera Joshi', location: 'Hyderabad', rating: 5, quote: 'I have tried many Vitamin C serums but GlowVit C is on another level. The packaging is premium and results are amazing.', initials: 'MJ', color: 'from-purple-400 to-violet-500' },
];

const Testimonials = () => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-warm-white relative" id="testimonials" ref={ref}>
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary-500 mb-3">Testimonials</span>
          <h2 className="section-title">Loved by <span className="gradient-text">Thousands</span></h2>
          <p className="section-subtitle">Join 2,847+ happy customers who transformed their skin with GlowVit C.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 5).map((r, i) => (
            <div key={r.name} className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${i >= 3 ? 'sm:col-span-1 lg:col-span-1' : ''} ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <HiStar key={j} className={`w-4 h-4 ${j < r.rating ? 'text-amber-400' : 'text-gray-200'}`} />
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-5 italic">"{r.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center shadow-sm`}>
                  <span className="text-white text-xs font-bold">{r.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
