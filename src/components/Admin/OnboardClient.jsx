import React, { useState, useContext } from 'react'
import { AppContext } from '../../App'
import { 
  FiUserPlus, FiCheckCircle, FiAlertCircle, FiArrowRight, 
  FiArrowLeft, FiUser, FiBriefcase, FiMapPin, FiHome,
  FiSmartphone, FiLock, FiUserCheck, FiShield, FiMail,
  FiSave, FiRefreshCw, FiEye, FiEyeOff
} from 'react-icons/fi'

const OnboardClient = () => {
  const { addClient } = useContext(AppContext)
  const [currentStep, setCurrentStep] = useState(1)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [form, setForm] = useState({
    fullName: '',
    businessName: '',
    locality: '',
    address: '',
    username: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    email: '',
    status: 'Active'
  })

  const [errors, setErrors] = useState({})

  // Handle input change with validation
  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Special handling for mobile number - only digits
    if (name === 'mobile') {
      const onlyDigits = value.replace(/\D/g, '')
      const limitedDigits = onlyDigits.slice(0, 10)
      setForm({ ...form, [name]: limitedDigits })
    } else {
      setForm({ ...form, [name]: value })
    }
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validate mobile number (exactly 10 digits)
  const isValidMobile = (mobile) => {
    return /^\d{10}$/.test(mobile)
  }

  const validateStep1 = () => {
    const newErrors = {}
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!form.businessName.trim()) newErrors.businessName = 'Business name is required'
    if (!form.locality.trim()) newErrors.locality = 'Locality is required'
    if (!form.address.trim()) newErrors.address = 'Complete address is required'
    if (!form.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!isValidMobile(form.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number'
    }
    return newErrors
  }

  const validateStep2 = () => {
    const newErrors = {}
    
    // Mobile validation
    if (!form.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!isValidMobile(form.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number'
    }
    
    // Email validation (optional but must be valid if provided)
    if (form.email.trim() && !isValidEmail(form.email)) {
      newErrors.email = 'Enter a valid email address (e.g., name@example.com)'
    }
    
    // Username validation
    if (!form.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (form.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters'
    } else if (form.username.length > 20) {
      newErrors.username = 'Username must be less than 20 characters'
    }
    
    // Password validation
    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    } else if (form.password.length > 30) {
      newErrors.password = 'Password must be less than 30 characters'
    }
    
    // Confirm password validation
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    return newErrors
  }

  const handleNext = () => {
    const stepErrors = currentStep === 1 ? validateStep1() : validateStep2()
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
    setErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Final validation before submit
    const step1Errors = validateStep1()
    const step2Errors = validateStep2()
    const allErrors = { ...step1Errors, ...step2Errors }
    
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors)
      setCurrentStep(1)
      return
    }
    
    setIsSubmitting(true)
    
    const { confirmPassword, ...clientData } = form
    const result = await addClient(clientData)

    if (result.success) {
      setMessage({ type: 'success', text: '✨ Client onboarded successfully! Welcome to Janaseva.' })
      setForm({
        fullName: '',
        businessName: '',
        locality: '',
        address: '',
        username: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        email: '',
        status: 'Active'
      })
      setCurrentStep(1)
      setTimeout(() => setMessage(''), 4000)
    } else {
      setMessage({ type: 'error', text: `❌ Onboarding failed: ${result.error}` })
      setTimeout(() => setMessage(''), 4000)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FiUserPlus className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Register New Client
            </h2>
            <p className="text-gray-500 text-sm">Complete the form below to onboard a new client</p>
          </div>
        </div>
      </div>

      {/* Message Toast */}
      {message && (
        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
          message.type === 'success' 
            ? 'bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 text-emerald-700' 
            : 'bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 text-rose-700'
        }`}>
          {message.type === 'success' ? <FiCheckCircle className="w-5 h-5" /> : <FiAlertCircle className="w-5 h-5" />}
          <span className="flex-1">{message.text}</span>
        </div>
      )}

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {[
            { step: 1, label: 'Business Info', icon: <FiBriefcase className="w-4 h-4" /> },
            { step: 2, label: 'Account Setup', icon: <FiUserCheck className="w-4 h-4" /> },
            { step: 3, label: 'Confirmation', icon: <FiShield className="w-4 h-4" /> }
          ].map((item) => (
            <div key={item.step} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep >= item.step
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {currentStep > item.step ? <FiCheckCircle className="w-5 h-5" /> : item.icon}
              </div>
              <span className={`text-xs mt-2 font-medium ${
                currentStep >= item.step ? 'text-emerald-600' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2 max-w-md mx-auto">
          <div className="absolute top-0 left-0 h-1 bg-gray-200 rounded-full w-full"></div>
          <div 
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6 md:p-8">
            {/* Step 1: Business Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FiUser className="inline mr-2 text-emerald-500" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter client's full name"
                      value={form.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${
                        errors.fullName ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50/50'
                      }`}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FiBriefcase className="inline mr-2 text-emerald-500" />
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      placeholder="Business or organization name"
                      value={form.businessName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${
                        errors.businessName ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50/50'
                      }`}
                    />
                    {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FiMapPin className="inline mr-2 text-emerald-500" />
                      Locality *
                    </label>
                    <input
                      type="text"
                      name="locality"
                      placeholder="Area, colony, or sector"
                      value={form.locality}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${
                        errors.locality ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50/50'
                      }`}
                    />
                    {errors.locality && <p className="text-red-500 text-xs mt-1">{errors.locality}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FiSmartphone className="inline mr-2 text-emerald-500" />
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="10-digit mobile number"
                      value={form.mobile}
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        // Prevent non-digit characters
                        if (!/[0-9]/.test(e.key) && 
                            e.key !== 'Backspace' && 
                            e.key !== 'Delete' && 
                            e.key !== 'Tab' && 
                            e.key !== 'ArrowLeft' && 
                            e.key !== 'ArrowRight' && 
                            e.key !== 'Home' && 
                            e.key !== 'End') {
                          e.preventDefault();
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${
                        errors.mobile ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50/50'
                      }`}
                      maxLength={10}
                      inputMode="numeric"
                    />
                    {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                    <p className="text-xs text-gray-400 mt-1">Enter 10-digit mobile number (digits only)</p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FiHome className="inline mr-2 text-emerald-500" />
                      Complete Address *
                    </label>
                    <textarea
                      name="address"
                      placeholder="Street address, landmark, city, PIN code"
                      value={form.address}
                      onChange={handleChange}
                      rows="3"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none ${
                        errors.address ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50/50'
                      }`}
                    ></textarea>
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Account Setup */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl mb-4">
                  <p className="text-sm text-blue-700 flex items-center gap-2">
                    <FiShield className="w-4 h-4" />
                    Client credentials will be securely stored and encrypted
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FiSmartphone className="inline mr-2 text-emerald-500" />
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        if (!/[0-9]/.test(e.key) && 
                            e.key !== 'Backspace' && 
                            e.key !== 'Delete' && 
                            e.key !== 'Tab' && 
                            e.key !== 'ArrowLeft' && 
                            e.key !== 'ArrowRight') {
                          e.preventDefault();
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${
                        errors.mobile ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50/50'
                      }`}
                      placeholder="Enter 10-digit mobile"
                      maxLength={10}
                      inputMode="numeric"
                    />
                    {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FiMail className="inline mr-2 text-emerald-500" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="client@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${
                        errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50/50'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    <p className="text-xs text-gray-400 mt-1">Optional but must be valid format (e.g., name@example.com)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FiUserCheck className="inline mr-2 text-emerald-500" />
                      Username *
                    </label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Choose a unique username"
                      value={form.username}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${
                        errors.username ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50/50'
                      }`}
                    />
                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                    <p className="text-xs text-gray-400 mt-1">4-20 characters, letters and numbers only</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FiLock className="inline mr-2 text-emerald-500" />
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create a strong password"
                        value={form.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${
                          errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50/50'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    <p className="text-xs text-gray-400 mt-1">Minimum 6 characters, maximum 30 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FiLock className="inline mr-2 text-emerald-500" />
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${
                          errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50/50'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Account Status
                    </label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition bg-gray-50/50"
                    >
                      <option value="Active">Active - Full Access</option>
                      <option value="Deactive">Deactive - Suspended Access</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation & Review */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-5 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-2 mb-3">
                    <FiCheckCircle className="text-emerald-600 text-xl" />
                    <h3 className="font-semibold text-emerald-800">Review Client Information</h3>
                  </div>
                  <p className="text-sm text-emerald-700">Please verify all details before submitting</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Personal Details</p>
                    <p className="text-sm"><span className="font-medium">Name:</span> {form.fullName || '—'}</p>
                    <p className="text-sm mt-1"><span className="font-medium">Business:</span> {form.businessName || '—'}</p>
                    <p className="text-sm mt-1"><span className="font-medium">Mobile:</span> {form.mobile || '—'}</p>
                    <p className="text-sm mt-1"><span className="font-medium">Email:</span> {form.email || '—'}</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Address Information</p>
                    <p className="text-sm"><span className="font-medium">Locality:</span> {form.locality || '—'}</p>
                    <p className="text-sm mt-1"><span className="font-medium">Address:</span> {form.address || '—'}</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Account Details</p>
                    <p className="text-sm"><span className="font-medium">Username:</span> {form.username || '—'}</p>
                    <p className="text-sm mt-1"><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                        form.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>{form.status}</span>
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <p className="text-xs text-amber-700 flex items-center gap-2">
                    <FiAlertCircle className="w-4 h-4" />
                    By submitting, you confirm that all information provided is accurate and complete.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="px-6 md:px-8 py-5 bg-gray-50 border-t border-gray-100 flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition flex items-center gap-2"
              >
                <FiArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium hover:shadow-lg transition flex items-center gap-2 ml-auto"
              >
                Continue
                <FiArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium hover:shadow-lg transition flex items-center gap-2 ml-auto disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <FiRefreshCw className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FiSave className="w-4 h-4" />
                    Complete Onboarding
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Help Text */}
      <p className="text-center text-xs text-gray-400 mt-6">
        All client data is protected under Janaseva's privacy policy and security protocols
      </p>
    </div>
  )
}

export default OnboardClient