// import React, { useState, useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../App'

// const UnifiedLogin = () => {
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const { login } = useContext(AppContext)
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')
//     const result = await login(username, password)
//     setLoading(false)
//     if (result.error) {
//       setError(result.error)
//     } else if (result.role === 'admin') {
//       navigate('/admin/dashboard')
//     } else if (result.role === 'client') {
//       navigate('/client/dashboard')
//     }
//   }

//   return (
//     <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-primary-800">Janaseva e-Seva</h1>
//           <p className="text-gray-600">Digital Services Portal</p>
//           <div className="h-1 w-20 bg-primary-600 mx-auto mt-3 rounded"></div>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Username / Admin ID</label>
//             <input 
//               type="text" 
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg"
//               placeholder="Enter your username"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input 
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg"
//               required
//             />
//           </div>
//           {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>}
//           <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white py-2 rounded-lg">
//             {loading ? 'Authenticating...' : 'Sign In'}
//           </button>
//         </form>
//         <div className="mt-6 text-center text-xs text-gray-400">
//           Demo Admin: admin@janaseva.gov / Admin@123<br/>
//           Demo Clients: (will be added via admin panel)
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UnifiedLogin

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

const UnifiedLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(username, password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else if (result.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (result.role === 'client') {
      navigate('/client/dashboard');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Premium Background with Gradient & Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a1a] via-[#1a2a1f] to-[#2a2418]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        {/* Animated grain texture */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 25% 40%, rgba(255,215,140,0.08) 0%, transparent 50%)' }}></div>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* LEFT SIDE - Premium Banner Section */}
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-12 py-12 text-white">
          <div className="max-w-xl mx-auto lg:mx-0">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium tracking-wide">GOVERNMENT CERTIFIED • SECURE PORTAL</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-amber-300 via-emerald-200 to-amber-300 bg-clip-text text-transparent">
                Janaseva
              </span>
              <br />
              <span className="text-white">e-Seva Portal</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-lg">
              Empowering citizens with seamless digital governance. Access services, track applications, and connect with officials — all in one premium platform.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-white/90 text-sm">SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-white/90 text-sm">24/7 Support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <span className="text-white/90 text-sm">Multi-Language</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-white/90 text-sm">Paperless</span>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 text-white/50 text-xs">
              <span>🔒 Government Authorized</span>
              <span>✓ ISO 27001 Certified</span>
              <span>🇮🇳 Digital India Initiative</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Login Card */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Glassmorphic Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl shadow-lg mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
                <div className="w-20 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto mt-3 rounded-full"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Username / Admin ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none bg-white/80"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none bg-white/80"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl border border-red-200">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Demo credentials - Premium styled */}
              <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-emerald-50/30 rounded-xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="mt-6 text-center text-xs text-gray-400">
                <a href="#" className="hover:text-emerald-600 transition">Forgot Password?</a>
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-emerald-600 transition">Need Help?</a>
              </div>
            </div>

            {/* Footer text */}
            <p className="text-center text-white/50 text-xs mt-6">
              © 2025 Janaseva e-Seva. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedLogin;