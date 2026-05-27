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

  // Generate random CAPTCHA
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
    // Trigger entrance animation
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

  // Animated background particles
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background with Particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a1a] via-[#1a2a1f] to-[#2a2418]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay animate-slow-zoom"></div>
        
        {/* Animated Particles */}
        {particles.map((i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5 animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl animate-spin-slow"></div>

      {/* Main Content with Entrance Animation */}
      <div className={`relative z-10 flex flex-col lg:flex-row min-h-screen transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        
        {/* LEFT SIDE - Premium Banner Section */}
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-12 py-12 text-white animate-slide-in-left">
          <div className="max-w-xl mx-auto lg:mx-0">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-8 animate-bounce-in">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium tracking-wide">GOVERNMENT CERTIFIED • SECURE PORTAL</span>
            </div>

            {/* Main Heading with Stagger Animation */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-amber-300 via-emerald-200 to-amber-300 bg-clip-text text-transparent animate-gradient">
                Janaseva
              </span>
              <br />
              <span className="text-white animate-fade-in-up">e-Seva Portal</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/80 mb-8 leading-relaxed max-w-lg animate-fade-in-up animation-delay-200">
              Empowering citizens with seamless digital governance. Access services, track applications, and connect with officials — all in one premium platform.
            </p>

            {/* Feature Highlights with Stagger */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: '🔒', text: 'SSL Encrypted', delay: 300 },
                { icon: '🕒', text: '24/7 Support', delay: 350 },
                { icon: '🌐', text: 'Multi-Language', delay: 400 },
                { icon: '📄', text: 'Paperless', delay: 450 },
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 animate-fade-in-up"
                  style={{ animationDelay: `${feature.delay}ms` }}
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110">
                    <span className="text-lg">{feature.icon}</span>
                  </div>
                  <span className="text-white/90 text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/50 text-xs animate-fade-in-up animation-delay-500">
              <span className="flex items-center gap-1">🔒 Government Authorized</span>
              <span className="flex items-center gap-1">✓ ISO 27001 Certified</span>
              <span className="flex items-center gap-1">🇮🇳 Digital India Initiative</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Login Card */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 animate-slide-in-right">
          <div className="w-full max-w-md">
            {/* Glassmorphic Card with Hover Animation */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/30 transform transition-all duration-500 hover:shadow-3xl animate-scale-in">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl shadow-lg mb-4 animate-rotate-in">
                  <svg className="w-8 h-8 text-white animate-pulse-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 animate-fade-in-up">Welcome Back</h2>
                <p className="text-gray-500 text-sm mt-1 animate-fade-in-up animation-delay-100">Sign in to your account</p>
                <div className="w-20 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto mt-3 rounded-full animate-slide-in"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username Field */}
                <div className="animate-fade-in-up animation-delay-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Username / Admin ID
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300 group-hover:scale-110">
                      <svg className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setFocusedField('username')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-300 outline-none bg-white/80 ${
                        focusedField === 'username' 
                          ? 'border-emerald-500 ring-2 ring-emerald-500/20 transform scale-[1.02]' 
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                {/* Password Field with Eye Icon */}
                <div className="animate-fade-in-up animation-delay-300">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300 group-hover:scale-110">
                      <svg className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-12 py-3 border rounded-xl transition-all duration-300 outline-none bg-white/80 ${
                        focusedField === 'password' 
                          ? 'border-emerald-500 ring-2 ring-emerald-500/20 transform scale-[1.02]' 
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center transition-all duration-300 hover:scale-110"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5 text-gray-400 hover:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-gray-400 hover:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* CAPTCHA Field */}
                <div className="animate-fade-in-up animation-delay-400">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Security Verification
                  </label>
                  <div className="flex gap-3 items-center">
                    <div className="flex-1">
                      <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-3 text-center transform transition-all duration-300 hover:scale-105">
                        <span className="text-xl sm:text-2xl font-bold tracking-wider text-gray-700 select-none">
                          {captchaValue}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-300 hover:rotate-180 hover:scale-110"
                      title="Refresh CAPTCHA"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="w-full mt-3 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 outline-none bg-white/80 hover:border-emerald-300"
                    placeholder="Enter the code shown above"
                    required
                  />
                  {captchaError && (
                    <p className="text-red-500 text-xs mt-1 animate-shake">{captchaError}</p>
                  )}
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl border border-red-200 animate-shake">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 animate-fade-in-up animation-delay-500 group"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      Sign In
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Demo credentials */}
              <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-emerald-50/30 rounded-xl border border-gray-100 transform transition-all duration-300 hover:scale-[1.02] animate-fade-in-up animation-delay-600">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <svg className="w-3 h-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  DEMO ACCESS
                </p>
                <div className="text-xs text-gray-600 space-y-1">
                  <p className="font-mono"><span className="font-semibold">Admin:</span> admin@janaseva.gov / Admin@123</p>
                  <p className="font-mono text-emerald-600"><span className="font-semibold">Clients:</span> Create via admin panel</p>
                </div>
              </div>

              {/* Footer links */}
              <div className="mt-6 text-center text-xs text-gray-400 animate-fade-in-up animation-delay-700">
                <a href="#" className="hover:text-emerald-600 transition-all duration-300 hover:scale-105 inline-block">Forgot Password?</a>
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-emerald-600 transition-all duration-300 hover:scale-105 inline-block">Need Help?</a>
              </div>
            </div>

            <p className="text-center text-white/40 text-xs mt-6 animate-fade-in-up animation-delay-800">
              © 2025 Janaseva e-Seva. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          75% { transform: translateY(20px) translateX(-10px); }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slide-in {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 5rem;
            opacity: 1;
          }
        }
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes rotate-in {
          from {
            opacity: 0;
            transform: rotate(-180deg) scale(0.5);
          }
          to {
            opacity: 1;
            transform: rotate(0) scale(1);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
        
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite alternate;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }
        .animate-slide-in {
          animation: slide-in 0.8s ease-out forwards;
        }
        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        .animate-rotate-in {
          animation: rotate-in 0.6s ease-out forwards;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animation-delay-100 { animation-delay: 100ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-500 { animation-delay: 500ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        .animation-delay-700 { animation-delay: 700ms; }
        .animation-delay-800 { animation-delay: 800ms; }
        
        @media (max-width: 1024px) {
          .animate-fade-in-left, .animate-fade-in-right {
            animation-duration: 0.5s;
          }
        }
      `}</style>
    </div>
  );
};

export default UnifiedLogin;