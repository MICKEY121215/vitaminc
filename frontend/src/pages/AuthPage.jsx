import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = isLogin
      ? await login(form.email, form.password)
      : await signup(form.name, form.email, form.password);
    setLoading(false);
    if (result.success) navigate('/');
  };

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-warm-white via-cream to-primary-50 relative overflow-hidden">
      <div className="glow-blob w-[400px] h-[400px] bg-primary-200 -top-20 -right-20" />
      <div className="glow-blob w-[300px] h-[300px] bg-amber-200 bottom-10 -left-20" />

      <div className="section-container relative z-10 max-w-md w-full py-12">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-300/30">
            <span className="text-white font-bold text-xl">G</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-1">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-500 text-sm">
            {isLogin ? 'Sign in to access your cart and orders' : 'Join us for a glowing skincare journey'}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-primary-100/20">
          {/* Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button onClick={() => setIsLogin(true)} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${isLogin ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}>Login</button>
            <button onClick={() => setIsLogin(false)} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${!isLogin ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}>Sign Up</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="animate-slide-down">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" value={form.name} onChange={update('name')} placeholder="John Doe" className="form-input !pl-11" required id="auth-name" />
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Email</label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" className="form-input !pl-11" required id="auth-email" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="password" value={form.password} onChange={update('password')} placeholder="••••••••" className="form-input !pl-11" required minLength={6} id="auth-password" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full !py-3.5 mt-2 disabled:opacity-60" id="auth-submit-btn">
              {loading ? (
                <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {isLogin ? 'Signing in...' : 'Creating account...'}</span>
              ) : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
