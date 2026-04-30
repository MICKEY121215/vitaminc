import { HiOutlineShieldCheck, HiOutlineBeaker, HiOutlineUserGroup } from 'react-icons/hi';

const trustPoints = [
  { icon: HiOutlineShieldCheck, title: 'Dermatologist Tested', desc: 'Clinically tested and approved by board-certified dermatologists for safety and efficacy.', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { icon: HiOutlineBeaker, title: 'No Harmful Chemicals', desc: 'Free from parabens, sulfates, mineral oil, and artificial fragrances. 100% clean beauty.', color: 'text-primary-500', bg: 'bg-primary-50' },
  { icon: HiOutlineUserGroup, title: 'All Skin Types', desc: 'Gentle yet effective formula designed for oily, dry, combination, and sensitive skin types.', color: 'text-violet-500', bg: 'bg-violet-50' },
];

const Trust = () => (
  <section className="py-20 lg:py-24 bg-gradient-to-b from-cream to-warm-white" id="trust">
    <div className="section-container">
      <div className="text-center mb-14">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary-500 mb-3">Why Trust Us</span>
        <h2 className="section-title">Quality You Can <span className="gradient-text">Trust</span></h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {trustPoints.map((t) => {
          const Icon = t.icon;
          return (
            <div key={t.title} className="text-center group">
              <div className={`w-20 h-20 ${t.bg} rounded-3xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                <Icon className={`w-9 h-9 ${t.color}`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{t.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Trust;
