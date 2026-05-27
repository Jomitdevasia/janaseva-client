// import React, { useState, useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../App'

// const ClientLogin = () => {
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const { clientLogin } = useContext(AppContext)
//   const navigate = useNavigate()

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (clientLogin(username, password)) {
//       navigate('/dashboard')
//     } else {
//       setError('Invalid username/password or account inactive. Try: rajesh123 / rajesh123')
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
//         <div className="text-center mb-6">
//           <div className="text-4xl mb-2">🇮🇳</div>
//           <h2 className="text-2xl font-bold text-gray-800">Janaseva Client Portal</h2>
//           <p className="text-gray-500">Access your digital vault & services</p>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Username</label>
//             <input 
//               type="text" 
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
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
//               className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
//               placeholder="Enter password"
//               required
//             />
//           </div>
//           {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>}
//           <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition">
//             Sign In
//           </button>
//         </form>
//         <div className="mt-6 text-center text-xs text-gray-400">
//           Demo accounts: <br />
//           rajesh123 / rajesh123 &nbsp;|&nbsp; sunita456 / sunita456
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ClientLogin
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import { 
  FiUser, FiLock, FiArrowRight, FiShield, FiCheckCircle, 
  FiEye, FiEyeOff, FiBriefcase, FiMapPin, FiClock,
  FiStar, FiAward, FiUsers, FiTrendingUp
} from 'react-icons/fi'

const ClientLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { clientLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    // Simulate slight delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800))
    
    if (clientLogin(username, password)) {
      navigate('/dashboard')
    } else {
      setError('Invalid username/password or account inactive. Please check your credentials.')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5"></div>
        {/* Animated particles effect */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Premium Brand Banner */}
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-12 py-12 text-white">
          <div className="max-w-xl mx-auto lg:mx-0">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-8 animate-in fade-in slide-in-from-left-5 duration-700">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-xs sm:text-sm font-medium tracking-wide uppercase">Government Certified • Secure Portal</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-in fade-in slide-in-from-left-5 duration-700 delay-100">
              <span className="bg-gradient-to-r from-amber-300 via-emerald-200 to-amber-300 bg-clip-text text-transparent">
                Janaseva
              </span>
              <br />
              <span className="text-white">Client Portal</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/80 mb-8 leading-relaxed animate-in fade-in slide-in-from-left-5 duration-700 delay-200">
              Secure access to your digital vault, government services, and personalized assistance — all in one premium platform.
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 animate-in fade-in slide-in-from-left-5 duration-700 delay-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <FiShield className="text-emerald-300 text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-white">Secure Access</p>
                  <p className="text-xs text-white/60">256-bit SSL Encryption</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <FiClock className="text-blue-300 text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-white">24/7 Support</p>
                  <p className="text-xs text-white/60">Round-the-clock assistance</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <FiBriefcase className="text-amber-300 text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-white">100+ Services</p>
                  <p className="text-xs text-white/60">Government & private</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <FiMapPin className="text-purple-300 text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-white">Pan-India Coverage</p>
                  <p className="text-xs text-white/60">All states & UTs</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-white/40 text-xs animate-in fade-in duration-700 delay-400">
              <span className="flex items-center gap-1">🔒 ISO 27001 Certified</span>
              <span className="flex items-center gap-1">✓ Digital India Initiative</span>
              <span className="flex items-center gap-1">⭐ 4.9/5 Client Rating</span>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-white/10 animate-in fade-in duration-700 delay-500">
              <div>
                <p className="text-2xl font-bold text-white">10L+</p>
                <p className="text-xs text-white/50">Active Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">98%</p>
                <p className="text-xs text-white/50">Satisfaction Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-xs text-white/50">Support Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Card */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
          <div className="w-full max-w-md animate-in fade-in slide-in-from-right-5 duration-700 delay-300">
            {/* Glassmorphic Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/30">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                  <span className="text-white text-2xl">🇮🇳</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                <p className="text-gray-500 text-sm mt-1">Sign in to access your dashboard</p>
                <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto mt-3 rounded-full"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white/80"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white/80"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <a href="#" className="text-xs text-blue-600 hover:text-blue-700 transition">
                    Forgot password?
                  </a>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl border border-red-200 animate-in fade-in duration-300">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
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
                      <FiArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Demo Credentials - Premium Style */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-emerald-50/30 rounded-xl border border-blue-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <FiStar className="w-3 h-3 text-amber-500" />
                  Demo Accounts
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-gray-600">
                    <p className="font-mono"><span className="font-semibold">Username:</span> rajesh123</p>
                    <p className="font-mono"><span className="font-semibold">Password:</span> rajesh123</p>
                  </div>
                  <div className="text-gray-600">
                    <p className="font-mono"><span className="font-semibold">Username:</span> sunita456</p>
                    <p className="font-mono"><span className="font-semibold">Password:</span> sunita456</p>
                  </div>
                </div>
              </div>

              {/* Footer Links */}
              <div className="mt-6 text-center text-xs text-gray-400">
                <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-blue-600 transition">Terms of Service</a>
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-blue-600 transition">Need Help?</a>
              </div>
            </div>

            {/* Footer Text */}
            <p className="text-center text-white/40 text-xs mt-6">
              © 2025 Janaseva e-Seva. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientLogin