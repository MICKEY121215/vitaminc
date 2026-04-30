import { useEffect, useRef, useState } from 'react';

const transformations = [
  {
    id: 1, duration: '4 Weeks',
    beforeDesc: 'Dull complexion with visible dark spots',
    afterDesc: 'Visibly brighter skin with reduced dark spots',
    beforeEmoji: '😔', afterEmoji: '✨',
  },
  {
    id: 2, duration: '6 Weeks',
    beforeDesc: 'Rough texture with acne scars and redness',
    afterDesc: 'Smoother texture, faded scars, less redness',
    beforeEmoji: '😟', afterEmoji: '🤩',
  },
  {
    id: 3, duration: '8 Weeks',
    beforeDesc: 'Sun damage with age spots and dull skin',
    afterDesc: 'Youthful radiance with faded spots',
    beforeEmoji: '😩', afterEmoji: '🌟',
  },
];

const BeforeAfter = () => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-cream relative overflow-hidden" id="before-after" ref={ref}>
      <div className="glow-blob w-[400px] h-[400px] bg-primary-200 -top-40 -right-40" />
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary-500 mb-3">Real Results</span>
          <h2 className="section-title">See the <span className="gradient-text">Transformation</span></h2>
          <p className="section-subtitle">Real users, real results. Watch how Vitamin C transformed their skin.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {transformations.map((item, i) => (
            <div key={item.id} className={`bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 product-card-hover ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 150}ms`, transition: 'all 0.6s ease-out' }}>
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center py-2 text-xs font-bold uppercase tracking-wider">{item.duration} Transformation</div>
              <div className="grid grid-cols-2">
                <div className="bg-gray-100 p-6 border-r border-gray-200 text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-3xl shadow-inner">{item.beforeEmoji}</div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-200 px-2.5 py-0.5 rounded-full mb-2">Before</span>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.beforeDesc}</p>
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-amber-50 p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary-200 to-amber-200 flex items-center justify-center text-3xl shadow-lg shadow-primary-200/50">{item.afterEmoji}</div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary-600 bg-primary-100 px-2.5 py-0.5 rounded-full mb-2">After</span>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.afterDesc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-8 italic">* Results may vary. Individual results depend on skin type, usage consistency, and other factors.</p>
      </div>
    </section>
  );
};

export default BeforeAfter;
