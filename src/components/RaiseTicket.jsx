// import React, { useState, useContext } from 'react'
// import { AppContext } from '../App'

// const RaiseTicket = () => {
//   const { currentClient, addTicket } = useContext(AppContext)
//   const [subject, setSubject] = useState('')
//   const [description, setDescription] = useState('')
//   const [message, setMessage] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!subject.trim() || !description.trim()) return
//     const newTicket = {
//       clientId: currentClient.id,
//       clientName: currentClient.fullName,
//       subject,
//       description,
//       status: 'Open',
//       adminResponse: ''
//     }
//     await addTicket(newTicket)
//     setSubject('')
//     setDescription('')
//     setMessage('✅ Ticket raised! Admin will respond.')
//     setTimeout(() => setMessage(''), 3000)
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <h2 className="text-2xl font-bold mb-2">Raise a Support Ticket</h2>
//       {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</div>}
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} className="w-full border rounded-lg p-2 mb-3" required />
//         <textarea rows="4" placeholder="Describe your issue..." value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded-lg p-2 mb-3" required></textarea>
//         <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg">Submit Ticket</button>
//       </form>
//     </div>
//   )
// }

// export default RaiseTicket

import React, { useState, useContext } from 'react'
import { AppContext } from '../App'
import { 
  FiMessageSquare, FiSend, FiHelpCircle, FiAlertCircle,
  FiCheckCircle, FiPaperclip, FiUser, FiClock,
  FiTrendingUp, FiShield, FiStar, FiArrowRight
} from 'react-icons/fi'

const RaiseTicket = () => {
  const { currentClient, addTicket } = useContext(AppContext)
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('general')
  const [priority, setPriority] = useState('medium')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!subject.trim() || !description.trim()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const newTicket = {
      clientId: currentClient.id,
      clientName: currentClient.fullName,
      subject,
      description,
      category,
      priority,
      status: 'Open',
      adminResponse: ''
    }
    await addTicket(newTicket)
    setSubject('')
    setDescription('')
    setCategory('general')
    setPriority('medium')
    setMessage('✅ Ticket raised successfully! Our support team will respond shortly.')
    setIsSubmitting(false)
    
    setTimeout(() => setMessage(''), 4000)
  }

  const categories = [
    { value: 'general', label: 'General Inquiry', icon: '📋', color: 'blue' },
    { value: 'technical', label: 'Technical Issue', icon: '🔧', color: 'purple' },
    { value: 'billing', label: 'Billing & Payment', icon: '💰', color: 'emerald' },
    { value: 'service', label: 'Service Request', icon: '⭐', color: 'amber' },
    { value: 'complaint', label: 'Complaint', icon: '⚠️', color: 'red' },
    { value: 'feedback', label: 'Feedback', icon: '💡', color: 'indigo' }
  ]

  const priorities = [
    { value: 'low', label: 'Low', icon: '🟢', color: 'green', description: 'Non-urgent, general query' },
    { value: 'medium', label: 'Medium', icon: '🟡', color: 'yellow', description: 'Important, needs attention' },
    { value: 'high', label: 'High', icon: '🔴', color: 'red', description: 'Urgent, critical issue' }
  ]

  const getCategoryColor = (catValue) => {
    const cat = categories.find(c => c.value === catValue)
    return cat?.color || 'blue'
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FiMessageSquare className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Raise a Support Ticket
            </h2>
            <p className="text-gray-500 text-sm">Get help from our support team</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {message && (
        <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <FiCheckCircle className="text-emerald-600 text-xl" />
          <span className="text-emerald-700 flex-1">{message}</span>
        </div>
      )}

      {/* Quick Tips Card */}
      <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <FiHelpCircle className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-800">Before you raise a ticket</p>
              <p className="text-xs text-blue-600">Check our FAQ or knowledge base for quick solutions</p>
            </div>
          </div>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition flex items-center gap-1">
            View FAQ <FiArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6 md:p-8">
            {/* Subject Field */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Brief summary of your issue"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50/50"
                required
              />
              <p className="text-xs text-gray-400 mt-1">Be specific and concise for faster resolution</p>
            </div>

            {/* Category Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={`p-3 rounded-xl text-center transition-all duration-200 ${
                      category === cat.value
                        ? `bg-${cat.color}-50 border-2 border-${cat.color}-500 shadow-md`
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className={`text-xs font-medium ${
                      category === cat.value ? `text-${cat.color}-700` : 'text-gray-600'
                    }`}>
                      {cat.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Priority Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {priorities.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPriority(p.value)}
                    className={`p-3 rounded-xl text-left transition-all duration-200 ${
                      priority === p.value
                        ? `bg-${p.color}-50 border-2 border-${p.color}-500 shadow-md`
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{p.icon}</span>
                      <span className={`font-semibold text-sm ${
                        priority === p.value ? `text-${p.color}-700` : 'text-gray-700'
                      }`}>
                        {p.label}
                      </span>
                    </div>
                    <p className={`text-xs ${
                      priority === p.value ? `text-${p.color}-600` : 'text-gray-500'
                    }`}>
                      {p.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Description Field */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="5"
                placeholder="Please describe your issue in detail. Include any error messages or steps to reproduce."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50/50 resize-none"
                required
              ></textarea>
              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <FiAlertCircle className="w-3 h-3" />
                Provide as much detail as possible for faster resolution
              </p>
            </div>

            {/* Attachment Option (UI only) */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Attachments (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-400 transition cursor-pointer">
                <FiPaperclip className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">Max file size: 5MB (Images, PDF, Documents)</p>
              </div>
            </div>

            {/* Client Info Card */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <FiUser className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Logged in as</p>
                    <p className="text-sm font-medium text-gray-800">{currentClient?.fullName}</p>
                  </div>
                </div>
                <div className="w-px h-8 bg-gray-300 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <FiClock className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Expected response</p>
                    <p className="text-sm font-medium text-gray-800">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="px-6 md:px-8 py-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FiShield className="w-3 h-3" />
              <span>Your ticket is securely encrypted</span>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <FiSend className="w-4 h-4" />
                  Submit Ticket
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Support Info Footer */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <FiClock className="text-blue-600 text-sm" />
          </div>
          <p className="text-xs font-medium text-gray-700">24/7 Support</p>
          <p className="text-xs text-gray-400">Round the clock assistance</p>
        </div>
        <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <FiTrendingUp className="text-emerald-600 text-sm" />
          </div>
          <p className="text-xs font-medium text-gray-700">98% Satisfaction</p>
          <p className="text-xs text-gray-400">From 10,000+ customers</p>
        </div>
        <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <FiStar className="text-amber-600 text-sm" />
          </div>
          <p className="text-xs font-medium text-gray-700">Priority Support</p>
          <p className="text-xs text-gray-400">For urgent tickets</p>
        </div>
      </div>
    </div>
  )
}

export default RaiseTicket