import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

const UnifiedLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaValue(result);
    setCaptchaInput('');
    setCaptchaError('');
  };

  useEffect(() => {
    generateCaptcha();
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCaptchaError('');
    
    if (captchaInput !== captchaValue) {
      setCaptchaError('Invalid CAPTCHA. Please try again.');
      generateCaptcha();
      return;
    }
    
    setLoading(true);
    const result = await login(username, password);
    setLoading(false);
    
    if (result.error) {
      setError(result.error);
      generateCaptcha();
    } else if (result.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (result.role === 'client') {
      navigate('/client/dashboard');
    }
  };

  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a1a] via-[#1a2a1f] to-[#2a2418] overflow-y-auto overflow-x-hidden">
      {/* Background with Particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        
        {/* Animated Particles */}
        {particles.map((i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative floating elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000 pointer-events-none"></div>

      {/* Main Content */}
      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          
          {/* LEFT SIDE - Premium Banner Section */}
          <div className="flex-1 text-center lg:text-left animate-fade-in-left">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 mb-6 sm:mb-8 animate-bounce-in mx-auto lg:mx-0 w-fit">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-[10px] sm:text-xs font-medium tracking-wide">GOVERNMENT CERTIFIED • SECURE PORTAL</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-amber-300 via-emerald-200 to-amber-300 bg-clip-text text-transparent animate-gradient">
                Janaseva
              </span>
              <br />
              <span className="text-white">e-Seva Portal</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-white/80 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Empowering citizens with seamless digital governance. Access services, track applications, and connect with officials — all in one premium platform.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0">
              {[
                { icon: '🔒', text: 'SSL Encrypted' },
                { icon: '🕒', text: '24/7 Support' },
                { icon: '🌐', text: 'Multi-Language' },
                { icon: '📄', text: 'Paperless' },
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 sm:gap-3 animate-fade-in-up"
                  style={{ animationDelay: `${300 + idx * 50}ms` }}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110">
                    <span className="text-sm sm:text-lg">{feature.icon}</span>
                  </div>
                  <span className="text-white/90 text-xs sm:text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-white/40 text-[10px] sm:text-xs animate-fade-in-up animation-delay-500">
              <span className="flex items-center gap-1">🔒 Government Authorized</span>
              <span className="flex items-center gap-1">✓ ISO 27001 Certified</span>
              <span className="flex items-center gap-1">🇮🇳 Digital India Initiative</span>
            </div>
          </div>

          {/* RIGHT SIDE - Login Card */}
          <div className="flex-1 flex items-center justify-center animate-fade-in-right">
            <div className="w-full max-w-md">
              {/* Glassmorphic Card */}
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/30 transform transition-all duration-500 hover:shadow-3xl animate-scale-in">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl shadow-lg mb-3 sm:mb-4 animate-rotate-in">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Welcome Back</h2>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">Sign in to your account</p>
                  <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto mt-2 sm:mt-3 rounded-full"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Username Field */}
                  <div className="animate-fade-in-up animation-delay-200">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                      Username / Admin ID
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setFocusedField('username')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-xl transition-all duration-300 outline-none bg-white/80 ${
                          focusedField === 'username' 
                            ? 'border-emerald-500 ring-2 ring-emerald-500/20 transform scale-[1.01]' 
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                        placeholder="Enter your username"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="animate-fade-in-up animation-delay-300">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border rounded-xl transition-all duration-300 outline-none bg-white/80 ${
                          focusedField === 'password' 
                            ? 'border-emerald-500 ring-2 ring-emerald-500/20 transform scale-[1.01]' 
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* CAPTCHA Field */}
                  <div className="animate-fade-in-up animation-delay-400">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                      Security Verification
                    </label>
                    <div className="flex gap-2 sm:gap-3 items-center">
                      <div className="flex-1">
                        <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-2.5 sm:p-3 text-center">
                          <span className="text-base sm:text-xl font-bold tracking-wider text-gray-700 select-none">
                            {captchaValue}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={generateCaptcha}
                        className="p-2.5 sm:p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-300 hover:rotate-180 hover:scale-110"
                        title="Refresh CAPTCHA"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      className="w-full mt-2 sm:mt-3 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 outline-none bg-white/80"
                      placeholder="Enter the code shown above"
                      required
                    />
                    {captchaError && (
                      <p className="text-red-500 text-xs mt-1 animate-shake">{captchaError}</p>
                    )}
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-600 text-xs sm:text-sm bg-red-50 p-2.5 sm:p-3 rounded-xl border border-red-200 animate-shake">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Authenticating...
                      </>
                    ) : (
                      <>
                        Sign In
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>

                {/* Footer links */}
                <div className="mt-4 sm:mt-6 text-center text-[10px] sm:text-xs text-gray-400">
                  <a href="#" className="hover:text-emerald-600 transition">Forgot Password?</a>
                  <span className="mx-2">•</span>
                  <a href="#" className="hover:text-emerald-600 transition">Need Help?</a>
                </div>
              </div>

              <p className="text-center text-white/40 text-[10px] sm:text-xs mt-4 sm:mt-6">
                © 2025 Janaseva e-Seva. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          75% { transform: translateY(20px) translateX(-10px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes rotate-in {
          from { opacity: 0; transform: rotate(-180deg) scale(0.5); }
          to { opacity: 1; transform: rotate(0) scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
        
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; opacity: 0; }
        .animate-fade-in-left { animation: fade-in-left 0.6s ease-out forwards; }
        .animate-fade-in-right { animation: fade-in-right 0.6s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.4s ease-out forwards; }
        .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        .animate-rotate-in { animation: rotate-in 0.5s ease-out forwards; }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        
        .animation-delay-100 { animation-delay: 100ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-500 { animation-delay: 500ms; }
        
        @media (max-width: 640px) {
          .animate-fade-in-left, .animate-fade-in-right {
            animation-duration: 0.4s;
          }
        }
      `}</style>
    </div>
  );
};

export default UnifiedLogin;