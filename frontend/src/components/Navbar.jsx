import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineUser, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/#benefits', label: 'Benefits', isHash: true },
    { to: '/#testimonials', label: 'Reviews', isHash: true },
  ];

  const handleHashLink = (hash) => {
    if (location.pathname === '/') {
      const el = document.querySelector(hash.replace('/#', '#'));
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-primary-100/30 py-2'
          : 'bg-transparent py-4'
        }`}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" id="nav-logo">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-md group-hover:shadow-primary-400/50 transition-shadow duration-300">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-tight text-gray-900">
                GlowVit <span className="text-primary-500">C</span>
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] leading-none">Skincare</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isHash ? (
                <button
                  key={link.label}
                  onClick={() => handleHashLink(link.to)}
                  className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
                </button>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors duration-200 relative group
                    ${location.pathname === link.to ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all duration-300
                    ${location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              )
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl hover:bg-primary-50 transition-colors duration-200"
              id="nav-cart-btn"
            >
              <HiOutlineShoppingBag className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/orders"
                  className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors px-3 py-2"
                  id="nav-orders-btn"
                >
                  Orders
                </Link>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[80px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="text-xs font-medium text-gray-400 hover:text-red-500 transition-colors px-2 py-1"
                  id="nav-logout-btn"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="hidden md:flex items-center gap-1.5 btn-primary !py-2.5 !px-5 !text-xs"
                id="nav-login-btn"
              >
                <HiOutlineUser className="w-4 h-4" />
                Login
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-primary-50 transition-colors"
              id="nav-mobile-toggle"
            >
              {mobileOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slide-down">
            <div className="flex flex-col gap-2 bg-white rounded-2xl p-4 shadow-xl border border-primary-50">
              {navLinks.map((link) => (
                link.isHash ? (
                  <button
                    key={link.label}
                    onClick={() => { handleHashLink(link.to); setMobileOpen(false); }}
                    className="text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-3 rounded-xl transition-colors font-medium
                      ${location.pathname === link.to ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-primary-50'}`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <hr className="my-1 border-gray-100" />
              {isAuthenticated ? (
                <>
                  <Link to="/orders" className="px-4 py-3 rounded-xl text-gray-700 hover:bg-primary-50 font-medium">
                    My Orders
                  </Link>
                  <button onClick={logout} className="px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-medium text-left">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/auth" className="btn-primary text-center !py-3 mt-1">
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
