import { Link } from 'react-router-dom';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { FaInstagram, FaTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="font-display font-bold text-xl">
                GlowVit <span className="text-primary-400">C</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium Vitamin C skincare formulated to bring out your natural glow.
              Dermatologist tested, cruelty-free, and suitable for all skin types.
            </p>
            <div className="flex gap-3 pt-2">
              {[FaInstagram, FaTwitter, FaFacebookF, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-400">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', to: '/' },
                { label: 'Products', to: '/' },
                { label: 'My Cart', to: '/cart' },
                { label: 'My Orders', to: '/orders' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-400">Policies</h4>
            <ul className="space-y-2.5">
              {['Shipping Policy', 'Return Policy', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-400">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <HiOutlineMail className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">support@glowvitc.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <HiOutlinePhone className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2.5">
                <HiOutlineLocationMarker className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {currentYear} GlowVit C. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <img src="https://img.icons8.com/color/32/visa.png" alt="Visa" className="h-6 opacity-60" />
            <img src="https://img.icons8.com/color/32/mastercard.png" alt="Mastercard" className="h-6 opacity-60" />
            <img src="https://img.icons8.com/color/32/rupay.png" alt="RuPay" className="h-6 opacity-60" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
