import { Link } from 'react-router-dom';
import { HiArrowRight, HiStar } from 'react-icons/hi';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-warm-white via-cream to-primary-50 pt-20" id="hero">
      {/* Decorative Blobs */}
      <div className="glow-blob w-[500px] h-[500px] bg-primary-300 top-20 -right-40" />
      <div className="glow-blob w-[400px] h-[400px] bg-orange-200 -bottom-20 left-10" />
      <div className="glow-blob w-[250px] h-[250px] bg-yellow-200 top-40 left-1/3" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary-300/20"
            style={{
              width: `${8 + i * 6}px`,
              height: `${8 + i * 6}px`,
              top: `${15 + i * 14}%`,
              left: `${10 + i * 15}%`,
              animation: `float ${5 + i * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Copy */}
          <div className="text-center lg:text-left animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 border border-primary-100 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Dermatologist Approved
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-gray-900 mb-6">
              Tired of Dull,{' '}
              <span className="relative inline-block">
                <span className="gradient-text">Uneven Skin</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6C50 2 150 2 198 6" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{' '}
              That Won't Glow?
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Discover the power of clinical-grade <strong className="text-gray-700">20% Vitamin C serum</strong> — your secret to brighter, radiant skin in just 14 days.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link to="/#cta" className="btn-primary text-base !px-10 !py-4 group">
                Buy Now
                <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#benefits" className="btn-secondary text-base !px-8 !py-4">
                Learn More
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {['🧑', '👩', '👨', '👩‍🦰', '🧑‍🦱'].map((emoji, i) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 border-2 border-white flex items-center justify-center text-sm shadow-sm">
                    {emoji}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-1 justify-center lg:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className="w-4 h-4 text-amber-400" />
                  ))}
                  <span className="font-semibold ml-1">4.8</span>
                </div>
                <span className="text-gray-400">2,847+ happy customers</span>
              </div>
            </div>
          </div>

          {/* Right — Product Visual */}
          <div className="relative flex items-center justify-center animate-fade-in">
            {/* Glowing ring */}
            <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-br from-primary-200/40 to-orange-200/40 animate-pulse-glow" />
            <div className="absolute w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] rounded-full bg-gradient-to-tr from-primary-100/50 to-yellow-100/50 animate-float-slow" />

            {/* Product Image Container */}
            <div className="relative z-10 w-[280px] h-[380px] sm:w-[340px] sm:h-[460px] flex items-center justify-center animate-float">
              {/* Stylized product illustration using CSS */}
              <div className="relative">
                <div className="w-32 sm:w-40 h-56 sm:h-72 bg-gradient-to-b from-orange-100 to-orange-50 rounded-2xl border border-orange-200/50 shadow-2xl shadow-primary-200/50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                  {/* Glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-2xl" />
                  {/* Dropper cap */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-8 h-10 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-lg" />
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-14 h-4 bg-gradient-to-b from-gray-600 to-gray-700 rounded-full" />

                  {/* Label */}
                  <div className="relative z-10 text-center mt-6">
                    <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.25em] text-primary-600/70 font-medium mb-1">
                      GlowVit C
                    </div>
                    <div className="text-sm sm:text-base font-display font-bold text-gray-800 leading-tight mb-1">
                      Vitamin C
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-500 font-medium">
                      20% Serum
                    </div>
                    <div className="w-8 h-0.5 bg-primary-400 mx-auto my-2 rounded-full" />
                    <div className="text-[7px] sm:text-[8px] text-gray-400 leading-tight">
                      Brightening<br/>Face Serum<br/>30ml
                    </div>
                  </div>

                  {/* Liquid fill */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary-400/30 to-transparent rounded-b-2xl" />
                </div>

                {/* Floating benefit badges */}
                <div className="absolute -right-20 top-8 bg-white rounded-xl px-3 py-2 shadow-lg border border-primary-50 animate-float text-xs font-medium text-gray-700 hidden sm:block">
                  ✨ Brighter Skin
                </div>
                <div className="absolute -left-24 top-24 bg-white rounded-xl px-3 py-2 shadow-lg border border-primary-50 animate-float-slow text-xs font-medium text-gray-700 hidden sm:block" style={{ animationDelay: '1s' }}>
                  🍊 20% Vit C
                </div>
                <div className="absolute -right-16 bottom-16 bg-white rounded-xl px-3 py-2 shadow-lg border border-primary-50 animate-float text-xs font-medium text-gray-700 hidden sm:block" style={{ animationDelay: '2s' }}>
                  💧 Hydrating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full">
          <path d="M0 32L48 37.3C96 43 192 53 288 50.7C384 48 480 32 576 26.7C672 21 768 27 864 34.7C960 43 1056 53 1152 53.3C1248 53 1344 43 1392 37.3L1440 32V80H0V80Z" fill="#FFFBF5" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
