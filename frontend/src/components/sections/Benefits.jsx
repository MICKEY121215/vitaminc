import { useEffect, useRef, useState } from 'react';
import { HiOutlineSparkles, HiOutlineSun, HiOutlineEye, HiOutlineHeart } from 'react-icons/hi';

const benefits = [
  {
    icon: HiOutlineSparkles,
    title: 'Brighter, Glowing Skin',
    description: 'Potent 20% L-Ascorbic Acid penetrates deep to brighten dull skin and restore your natural radiance within 14 days.',
    color: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50',
  },
  {
    icon: HiOutlineSun,
    title: 'Reduces Dark Spots',
    description: 'Clinically proven to fade hyperpigmentation, sun spots, and acne scars for a clearer, more uniform complexion.',
    color: 'from-orange-400 to-red-400',
    bgColor: 'bg-orange-50',
  },
  {
    icon: HiOutlineEye,
    title: 'Even Skin Tone',
    description: 'Niacinamide and Ferulic Acid work in synergy with Vitamin C to balance uneven skin tone and reduce redness.',
    color: 'from-primary-400 to-primary-600',
    bgColor: 'bg-primary-50',
  },
  {
    icon: HiOutlineHeart,
    title: 'Boosts Confidence',
    description: 'When your skin glows, you glow. Feel confident in your bare skin — no filters, no makeup needed.',
    color: 'from-rose-400 to-pink-500',
    bgColor: 'bg-rose-50',
  },
];

const Benefits = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-warm-white relative" id="benefits" ref={sectionRef}>
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary-500 mb-3">
            Why Vitamin C?
          </span>
          <h2 className="section-title">
            The Benefits Your Skin{' '}
            <span className="gradient-text">Deserves</span>
          </h2>
          <p className="section-subtitle">
            Backed by science, loved by thousands. Here's what our Vitamin C serum does for your skin.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className={`group relative bg-white rounded-2xl p-7 border border-gray-100 
                  product-card-hover cursor-default
                  transition-all duration-500 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${benefit.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 bg-gradient-to-br ${benefit.color} bg-clip-text text-primary-500`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{benefit.description}</p>

                {/* Hover accent */}
                <div className={`absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r ${benefit.color} rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
