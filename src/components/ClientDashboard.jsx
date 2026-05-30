// import React, { useState, useContext, useEffect } from 'react'
// import { AppContext } from '../App'
// import { useNavigate } from 'react-router-dom'
// import { 
//   FiLogOut, FiMessageSquare, FiList, FiHome, FiUser, 
//   FiCheckCircle, FiClock, FiBell, FiGrid, FiShield, 
//   FiMenu, FiX, FiChevronRight, FiExternalLink, FiSearch,
//   FiTrendingUp, FiAward, FiStar, FiBriefcase
// } from 'react-icons/fi'
// import RaiseTicket from './RaiseTicket'
// import ClientTickets from './ClientTickets'

// const ClientDashboard = () => {
//   const { currentClient, logout, tickets, refreshData } = useContext(AppContext)
//   const navigate = useNavigate()
//   const [activeSection, setActiveSection] = useState('services')
//   const [showSevaGrid, setShowSevaGrid] = useState(false)
//   const [showProfileMenu, setShowProfileMenu] = useState(false)
//   // Load sidebar state from localStorage, default to false (closed) on mobile, true on desktop
//   const [sidebarOpen, setSidebarOpen] = useState(() => {
//     const saved = localStorage.getItem('client_sidebar_open')
//     if (saved !== null) {
//       return saved === 'true'
//     }
//     // Default: closed on mobile, open on desktop
//     return window.innerWidth >= 1024
//   })
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
//   const [searchService, setSearchService] = useState('')
//   const [selectedCategory, setSelectedCategory] = useState('all')

//   useEffect(() => {
//     if (refreshData) refreshData()
//   }, [refreshData])

//   // Save sidebar state to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('client_sidebar_open', sidebarOpen)
//   }, [sidebarOpen])

//   // Handle window resize - only update isMobile state, not sidebarOpen
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const mobile = window.innerWidth < 1024
//       setIsMobile(mobile)
//     }
//     checkScreenSize()
//     window.addEventListener('resize', checkScreenSize)
//     return () => window.removeEventListener('resize', checkScreenSize)
//   }, [])

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % 4)
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   const handleLogout = () => {
//     if (logout) logout('client')
//     navigate('/login')
//   }

//   const handleServiceClick = (serviceName, serviceUrl) => {
//     if (serviceUrl && serviceUrl !== '#') {
//       window.open(serviceUrl, '_blank')
//     } else {
//       alert(`${serviceName} service will be available soon.`)
//     }
//   }

//   // Toggle sidebar function
//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen)
//   }

//   if (!currentClient) return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//       <div className="text-center">
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//         <p className="text-gray-600">Loading your dashboard...</p>
//       </div>
//     </div>
//   )

//   const myTickets = tickets ? tickets.filter(t => t.clientId === currentClient.id) : []
//   const activeTickets = myTickets.filter(t => t.status !== 'Resolved').length

//   const bannerSlides = [
//     {
//       title: "Digital India Initiative",
//       description: "Empowering citizens with seamless government services",
//       image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop",
//       cta: "Explore Services",
//       link: "https://www.digitalindia.gov.in"
//     },
//     {
//       title: "PAN Card Services",
//       description: "Apply for new PAN, update details, or download e-PAN instantly",
//       image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=400&fit=crop",
//       cta: "Apply Now",
//       link: "https://www.incometax.gov.in"
//     },
//     {
//       title: "Aadhaar Services",
//       description: "Enrolment, address update, biometric locking, and more",
//       image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=400&fit=crop",
//       cta: "Check Status",
//       link: "https://uidai.gov.in"
//     },
//     {
//       title: "Passport Services",
//       description: "Fresh passport, renewal, or police verification status",
//       image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=400&fit=crop",
//       cta: "Apply Online",
//       link: "https://passportindia.gov.in"
//     }
//   ]

//   const categories = [
//     { id: 'all', name: 'All Services', icon: '🎯' },
//     { id: 'government', name: 'Government', icon: '🏛️' },
//     { id: 'finance', name: 'Finance & Tax', icon: '💰' },
//     { id: 'education', name: 'Education', icon: '📚' },
//     { id: 'utility', name: 'Utilities', icon: '⚡' },
//     { id: 'welfare', name: 'Welfare', icon: '🤝' },
//     { id: 'travel', name: 'Travel', icon: '✈️' },
//     { id: 'health', name: 'Health', icon: '🏥' }
//   ]

//   // Complete Services List
//   const completeServicesList = [
//     { name: "eSevanam Govt. of Kerala", dept: "Kerala Govt", icon: "🏛️", url: "https://services.kerala.gov.in", category: "government", isPopular: true },
//     { name: "Encumbrance Certificate", dept: "Registration Dept", icon: "📜", url: "https://pearl.registration.kerala.gov.in", category: "government", isPopular: true },
//     { name: "ILGMS - Panchayat Services", dept: "Panchayat Dept", icon: "🏘️", url: "https://ilgms.lsgkerala.gov.in", category: "government", isPopular: true },
//     { name: "KEAM PORTAL", dept: "Engineering Admission", icon: "⚙️", url: "https://cee.kerala.gov.in/keam2025", category: "education", isPopular: true },
//     { name: "e-District", dept: "Land Revenue", icon: "🗺️", url: "https://edistrict.kerala.gov.in", category: "government", isPopular: true },
//     { name: "Location Certificate", dept: "Village Office", icon: "📍", url: "https://janparichay.meripehchaan.gov.in", category: "government", isPopular: true },
//     { name: "Income Certificate", dept: "Village Office", icon: "📋", url: "https://janparichay.meripehchaan.gov.in", category: "government", isPopular: true },
//     { name: "Scholarship (NSP)", dept: "Education", icon: "🎓", url: "https://scholarships.gov.in", category: "education", isPopular: true },
//     { name: "GST Enrollment", dept: "Tax", icon: "📊", url: "https://gst.gov.in", category: "finance", isPopular: true },
//     { name: "LPG HP Gas Connection", dept: "Utilities", icon: "🔥", url: "https://myhpgas.in", category: "utility", isPopular: true },
//     { name: "Income Tax Filing", dept: "IT Dept", icon: "📑", url: "https://www.incometax.gov.in", category: "finance", isPopular: true },
//     { name: "Birth & Death Certificate", dept: "Registration", icon: "👶", url: "https://crsorgi.gov.in", category: "government", isPopular: true },
//     { name: "Parivahan Seva", dept: "Transport", icon: "🚗", url: "https://parivahan.gov.in", category: "government", isPopular: true },
//     { name: "LIC Insurance Premium", dept: "Insurance", icon: "🛡️", url: "https://licindia.in", category: "finance", isPopular: true },
//     { name: "e-Shram Registration", dept: "Labour", icon: "👷", url: "https://register.eshram.gov.in/", category: "welfare", isPopular: false },
//     { name: "Sanchaya", dept: "Govt Services", icon: "📁", url: "#", category: "government", isPopular: false },
//     { name: "Election ID Card", dept: "Election", icon: "🗳️", url: "https://voters.eci.gov.in", category: "government", isPopular: true },
//     { name: "services.india.gov.in", dept: "National Portal", icon: "🇮🇳", url: "https://services.india.gov.in", category: "government", isPopular: true },
//     { name: "Chief Minister's Office", dept: "Grievance", icon: "🏢", url: "https://cm.kerala.gov.in", category: "government", isPopular: false },
//     { name: "National Employment Services", dept: "Employment", icon: "💼", url: "https://eemployment.kerala.gov.in", category: "government", isPopular: false },
//     { name: "IDMS", dept: "Document Management", icon: "📄", url: "https://idms.fabkerala.gov.in/fabnet/UserLogin.do", category: "government", isPopular: false },
//     { name: "Kerala PCB Online", dept: "Pollution Control", icon: "🌳", url: "https://keralapcbonline.com/pcb/welcome", category: "health", isPopular: false },
//     { name: "Kerala PSC", dept: "Recruitment", icon: "📝", url: "https://www.keralapsc.gov.in", category: "education", isPopular: true },
//     { name: "Ksmart", dept: "Smart City", icon: "🏙️", url: "https://ksmart.lsgkerala.gov.in/ui/web-portal", category: "government", isPopular: false },
//     { name: "Welfare Pension", dept: "Social Welfare", icon: "👵", url: "https://welfarepension.lsgkerala.gov.in/", category: "welfare", isPopular: true },
//     { name: "Sevana Pension", dept: "Pension", icon: "💰", url: "https://welfarepension.lsgkerala.gov.in/DBTPensionersSearch.aspx", category: "welfare", isPopular: false },
//     { name: "NEET", dept: "Medical Admission", icon: "📖", url: "https://neet.nta.nic.in", category: "education", isPopular: true },
//     { name: "IBPS", dept: "Banking Recruitment", icon: "🏦", url: "https://www.ibps.in", category: "education", isPopular: true },
//     { name: "SSC", dept: "Staff Selection", icon: "📋", url: "https://ssc.gov.in", category: "education", isPopular: true },
//     { name: "Revenue Department", dept: "Revenue", icon: "🏛️", url: "https://www.revenue.kerala.gov.in", category: "government", isPopular: false },
//     { name: "LSGD Kerala", dept: "Local Self Govt", icon: "🏘️", url: "https://lsgkerala.gov.in/", category: "government", isPopular: false },
//     { name: "Udyam Registration", dept: "MSME", icon: "🏭", url: "https://udyamregistration.gov.in", category: "government", isPopular: true },
//     { name: "Kerala Police", dept: "Police", icon: "👮", url: "https://thuna.keralapolice.gov.in", category: "government", isPopular: false },
//     { name: "Food Safety Compliance", dept: "Health", icon: "🍽️", url: "https://foscos.fssai.gov.in", category: "health", isPopular: false },
//     { name: "Civil Supplies Kerala", dept: "Civil Supplies", icon: "🛒", url: "https://civilsupplieskerala.gov.in", category: "government", isPopular: false },
//     { name: "EPFO", dept: "Provident Fund", icon: "💰", url: "https://unifiedportal-mem.epfindia.gov.in/memberinterface/", category: "finance", isPopular: true },
//     { name: "Citizen LSG Kerala", dept: "Local Self Govt", icon: "🏘️", url: "https://citizen.lsgkerala.gov.in", category: "government", isPopular: false },
//     { name: "Pravasi Welfare", dept: "Welfare", icon: "✈️", url: "https://register.pravasikerala.org/public/index.php/online/PublicLogin", category: "welfare", isPopular: false },
//     { name: "KMTWWFB", dept: "Motor Transport Welfare", icon: "🚛", url: "https://www.tailorwelfare.in/", category: "welfare", isPopular: false },
//     { name: "KSEB", dept: "Electricity Board", icon: "⚡", url: "https://kseb.in", category: "utility", isPopular: true },
//     { name: "KSEB Quick Pay", dept: "Electricity", icon: "⚡", url: "https://quickpay.kseb.in", category: "utility", isPopular: true },
//     { name: "e-grantz", dept: "Scholarship", icon: "📖", url: "https://egrantz.kerala.gov.in", category: "education", isPopular: false },
//     { name: "e Treasury", dept: "Finance", icon: "💰", url: "https://etreasury.kerala.gov.in", category: "finance", isPopular: false },
//     { name: "KNMC", dept: "Nurses Council", icon: "🩺", url: "https://www.knmc.org/", category: "health", isPopular: false },
//     { name: "PM Kisan Samman Nidhi", dept: "Agriculture", icon: "🌾", url: "https://pmkisan.gov.in", category: "welfare", isPopular: true },
//     { name: "SSLC REVALUATION", dept: "Education", icon: "📚", url: "https://keralapareekshabhavan.in", category: "education", isPopular: true },
//     { name: "DCE SCHOLARSHIP", dept: "Education", icon: "🎓", url: "https://dcescholarship.kerala.gov.in", category: "education", isPopular: false },
//     { name: "eChallan", dept: "Traffic", icon: "🚔", url: "https://echallan.parivahan.gov.in/index/accused-challan", category: "government", isPopular: true },
//     { name: "PANCARD SERVICE PORTAL", dept: "Income Tax", icon: "🆔", url: "https://www.incometax.gov.in", category: "finance", isPopular: true },
//     { name: "Sports Admission", dept: "Sports", icon: "⚽", url: "#", category: "education", isPopular: false },
//     { name: "MGU ADMISSION", dept: "University", icon: "🎓", url: "https://mgu.ac.in", category: "education", isPopular: false },
//     { name: "CALICUT UNIVERSITY ADMISSION", dept: "University", icon: "🎓", url: "https://uoc.ac.in", category: "education", isPopular: false },
//     { name: "LBS Centre", dept: "Science & Technology", icon: "🔬", url: "https://lbscentre.in", category: "education", isPopular: false },
//     { name: "Christian Nursing Colleges", dept: "Medical", icon: "🏥", url: "#", category: "health", isPopular: false },
//     { name: "IG Co-operative Hospital", dept: "Health", icon: "🏥", url: "https://www.igconkochi.com", category: "health", isPopular: false },
//     { name: "IRCTC", dept: "Railways", icon: "🚆", url: "https://www.irctc.co.in/nget/train-search", category: "travel", isPopular: true },
//     { name: "Bus Booking", dept: "Transport", icon: "🚌", url: "https://www.redbus.in", category: "travel", isPopular: true },
//     { name: "Flight Booking", dept: "Aviation", icon: "✈️", url: "https://www.makemytrip.com", category: "travel", isPopular: true },
//     { name: "Hotel Booking", dept: "Hospitality", icon: "🏨", url: "https://www.booking.com", category: "travel", isPopular: true },
//     { name: "PAN Card", dept: "Income Tax", icon: "🆔", url: "https://www.incometax.gov.in", category: "finance", isPopular: true },
//     { name: "Aadhaar", dept: "UIDAI", icon: "👤", url: "https://myaadhaar.uidai.gov.in", category: "government", isPopular: true },
//     { name: "Passport", dept: "External Affairs", icon: "📘", url: "https://passportindia.gov.in", category: "government", isPopular: true },
//     { name: "Driving License", dept: "Transport", icon: "🚗", url: "https://parivahan.gov.in", category: "government", isPopular: true },
//     { name: "Voter ID", dept: "Election", icon: "🗳️", url: "https://voters.eci.gov.in", category: "government", isPopular: true }
//   ]

//   // Update category counts
//   categories.forEach(cat => {
//     if (cat.id === 'all') {
//       cat.count = completeServicesList.length
//     } else {
//       cat.count = completeServicesList.filter(s => s.category === cat.id).length
//     }
//   })

//   const filteredServices = completeServicesList.filter(service => {
//     const matchesSearch = service.name.toLowerCase().includes(searchService.toLowerCase()) ||
//                           service.dept.toLowerCase().includes(searchService.toLowerCase())
//     const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory
//     return matchesSearch && matchesCategory
//   })

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Overlay for mobile */}
//       {isMobile && sidebarOpen && (
//         <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleSidebar}></div>
//       )}

//       {/* Sidebar - Fixed */}
//       <div className={`fixed top-0 left-0 z-50 h-full transition-all duration-300 ${
//         sidebarOpen ? 'w-80' : 'w-20'
//       }`}>
//         <div className="h-full bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white flex flex-col shadow-2xl overflow-y-auto">
//           <div className="p-6 border-b border-gray-700/50 flex justify-between items-center">
//             {sidebarOpen ? (
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
//                   <span className="text-white font-bold text-xl">JS</span>
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Janaseva e-Seva</h2>
//                   <p className="text-gray-400 text-xs">Client Portal</p>
//                 </div>
//               </div>
//             ) : (
//               <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
//                 <span className="text-white font-bold text-xl">JS</span>
//               </div>
//             )}
//             {/* Toggle button - ONLY way to open/close sidebar */}
//             <button 
//               onClick={toggleSidebar}
//               className="p-1.5 hover:bg-white/10 rounded-lg transition"
//             >
//               {sidebarOpen ? <FiX className="w-4 h-4 text-gray-400" /> : <FiMenu className="w-4 h-4 text-gray-400" />}
//             </button>
//           </div>

//           {sidebarOpen && (
//             <div className="p-6 border-b border-gray-700/50">
//               <div className="flex items-center gap-4">
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
//                   {currentClient.fullName?.charAt(0).toUpperCase() || 'C'}
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-bold text-white text-lg">{currentClient.fullName || 'Client'}</p>
//                   <p className="text-sm text-emerald-400 font-mono">ID: {currentClient.id?.slice(-8) || '000000'}</p>
//                   <div className="flex items-center gap-2 mt-2">
//                     <span className={`w-2 h-2 rounded-full ${currentClient.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
//                     <span className="text-xs text-gray-400">{currentClient.status || 'Active'}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <nav className="flex-1 p-4 space-y-2">
//             <button
//               onClick={() => { setActiveSection('services'); setShowSevaGrid(false); if(isMobile) toggleSidebar(); }}
//               className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
//                 activeSection === 'services'
//                   ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
//                   : 'text-gray-400 hover:bg-white/10 hover:text-white'
//               } ${!sidebarOpen && 'justify-center'}`}
//               title={!sidebarOpen ? "Services Dashboard" : ""}
//             >
//               <FiHome className="text-xl" />
//               {sidebarOpen && <span className="font-medium">Services Dashboard</span>}
//             </button>

//             <button
//               onClick={() => { setActiveSection('raiseTicket'); setShowSevaGrid(false); if(isMobile) toggleSidebar(); }}
//               className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
//                 activeSection === 'raiseTicket'
//                   ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
//                   : 'text-gray-400 hover:bg-white/10 hover:text-white'
//               } ${!sidebarOpen && 'justify-center'}`}
//               title={!sidebarOpen ? "Raise Ticket" : ""}
//             >
//               <FiMessageSquare className="text-xl" />
//               {sidebarOpen && <span className="font-medium">Raise Ticket</span>}
//             </button>

//             <button
//               onClick={() => { setActiveSection('myTickets'); setShowSevaGrid(false); if(isMobile) toggleSidebar(); }}
//               className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${
//                 activeSection === 'myTickets'
//                   ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
//                   : 'text-gray-400 hover:bg-white/10 hover:text-white'
//               } ${!sidebarOpen && 'justify-center'}`}
//               title={!sidebarOpen ? "My Tickets" : ""}
//             >
//               <FiList className="text-xl" />
//               {sidebarOpen && <span className="font-medium">My Tickets</span>}
//               {sidebarOpen && activeTickets > 0 && (
//                 <span className="text-xs px-2 py-0.5 rounded-full bg-red-500 text-white ml-auto">
//                   {activeTickets}
//                 </span>
//               )}
//             </button>
//           </nav>

//           {sidebarOpen && (
//             <div className="p-4 border-t border-gray-700/50">
//               <div className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-xl p-4">
//                 <p className="text-xs text-gray-400 text-center">🔒 Secure Connection</p>
//                 <p className="text-xs text-gray-500 text-center mt-1">SSL Encrypted • 256-bit</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Main Content - Margin changes based on sidebar state */}
//       <div className={`transition-all duration-300 min-h-screen ${
//         sidebarOpen ? 'ml-80' : 'ml-20'
//       }`}>
//         {/* Header */}
//         <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
//           <div className="px-6 py-3 flex justify-between items-center">
//             {/* Mobile menu button */}
//             <button 
//               onClick={toggleSidebar}
//               className="p-2 rounded-lg hover:bg-gray-100 transition lg:hidden"
//             >
//               <FiMenu className="w-5 h-5 text-gray-600" />
//             </button>

//             {/* Desktop spacer to center business name */}
//             <div className="hidden lg:block w-8"></div>

//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
//                 <FiBriefcase className="text-white text-sm" />
//               </div>
//               <span className="font-semibold text-gray-800 text-lg">
//                 {currentClient.businessName || 'Individual Client'}
//               </span>
//             </div>

//             <div className="relative">
//               <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition">
//                 <div className="text-right hidden sm:block">
//                   <p className="text-sm font-semibold text-gray-800">{currentClient.fullName?.split(' ')[0]}</p>
//                   <p className="text-xs text-gray-500">Client</p>
//                 </div>
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-md text-sm">
//                   {currentClient.fullName?.charAt(0).toUpperCase()}
//                 </div>
//               </button>
              
//               {showProfileMenu && (
//                 <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
//                   <div className="px-4 py-3 border-b border-gray-100">
//                     <p className="text-sm font-bold text-gray-800">{currentClient.fullName}</p>
//                     <p className="text-xs text-gray-500">{currentClient.mobile}</p>
//                     <p className="text-xs font-semibold text-blue-600 mt-1">{currentClient.businessName}</p>
//                   </div>
//                   <button onClick={handleLogout} className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition">
//                     <FiLogOut className="w-4 h-4" />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         <div className="p-6">
//           {activeSection === 'services' && (
//             <>
//               {/* Stats Cards */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//                 <div className="bg-white rounded-xl p-4 shadow-sm border">
//                   <p className="text-gray-500 text-sm">Total Tickets</p>
//                   <p className="text-2xl font-bold text-gray-800">{myTickets.length}</p>
//                 </div>
//                 <div className="bg-white rounded-xl p-4 shadow-sm border">
//                   <p className="text-gray-500 text-sm">Active Tickets</p>
//                   <p className="text-2xl font-bold text-amber-600">{activeTickets}</p>
//                 </div>
//                 <div className="bg-white rounded-xl p-4 shadow-sm border">
//                   <p className="text-gray-500 text-sm">Resolved</p>
//                   <p className="text-2xl font-bold text-emerald-600">{myTickets.filter(t => t.status === 'Resolved').length}</p>
//                 </div>
//                 <div className="bg-white rounded-xl p-4 shadow-sm border">
//                   <p className="text-gray-500 text-sm">Services</p>
//                   <p className="text-2xl font-bold text-blue-600">{completeServicesList.length}+</p>
//                 </div>
//               </div>

//               {/* Banner */}
//               <div className="mb-8 overflow-hidden rounded-2xl shadow-lg relative">
//                 <div className="relative h-48 sm:h-56 md:h-64">
//                   {bannerSlides.map((slide, index) => (
//                     <div key={index} className={`absolute inset-0 transition-opacity duration-700 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}>
//                       <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
//                       <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
//                       <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12">
//                         <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">{slide.title}</h2>
//                         <p className="text-white/90 text-sm max-w-lg mb-3">{slide.description}</p>
//                         <button onClick={() => handleServiceClick(slide.title, slide.link)} className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 w-fit transition">
//                           {slide.cta} <FiExternalLink className="w-3 h-3" />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                   <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
//                     {bannerSlides.map((_, index) => (
//                       <button key={index} onClick={() => setCurrentSlide(index)} className={`h-1.5 rounded-full transition-all ${currentSlide === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`} />
//                     ))}
//                   </div>
//                   <button onClick={() => setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full transition text-sm">❮</button>
//                   <button onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full transition text-sm">❯</button>
//                 </div>
//               </div>

//               {/* Services Section */}
//               <div>
//                 <div className="mb-5">
//                   <h2 className="text-xl font-bold text-gray-800">All e-Seva Services</h2>
//                   <p className="text-gray-500 text-sm">Access {completeServicesList.length}+ government services at your fingertips</p>
//                 </div>

//                 {/* Search Bar */}
//                 <div className="mb-5">
//                   <div className="relative w-full">
//                     <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
//                     <input 
//                       type="text" 
//                       placeholder="Search services by name or department..." 
//                       value={searchService} 
//                       onChange={(e) => setSearchService(e.target.value)} 
//                       className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-base shadow-sm" 
//                     />
//                     {searchService && (
//                       <button 
//                         onClick={() => setSearchService('')} 
//                         className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                       >
//                         ✕
//                       </button>
//                     )}
//                   </div>
//                   {searchService && (
//                     <p className="text-xs text-gray-500 mt-2">
//                       Found {filteredServices.length} result{filteredServices.length !== 1 ? 's' : ''} for "{searchService}"
//                     </p>
//                   )}
//                 </div>

//                 {/* Category Filters */}
//                 <div className="flex gap-2 overflow-x-auto pb-3 mb-5">
//                   {categories.map(cat => (
//                     <button 
//                       key={cat.id} 
//                       onClick={() => setSelectedCategory(cat.id)} 
//                       className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
//                         selectedCategory === cat.id 
//                           ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
//                           : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-blue-200'
//                       }`}
//                     >
//                       <span className="mr-1">{cat.icon}</span>
//                       {cat.name}
//                       <span className={`ml-1 text-xs ${selectedCategory === cat.id ? 'text-blue-200' : 'text-gray-400'}`}>
//                         ({cat.count})
//                       </span>
//                     </button>
//                   ))}
//                 </div>

//                 {/* Services Grid */}
//                 {filteredServices.length === 0 ? (
//                   <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
//                     <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                       <FiSearch className="w-8 h-8 text-gray-400" />
//                     </div>
//                     <p className="text-gray-500 font-medium">No services found</p>
//                     <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter criteria</p>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                     {filteredServices.map((service, idx) => (
//                       <div 
//                         key={idx} 
//                         onClick={() => handleServiceClick(service.name, service.url)} 
//                         className="group bg-white rounded-xl p-4 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-gray-100 hover:border-blue-200 relative overflow-hidden"
//                       >
//                         <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/20 group-hover:to-indigo-50/20 transition-all duration-300"></div>
//                         <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
//                         <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">{service.name}</h3>
//                         <p className="text-xs text-gray-400 line-clamp-1">{service.dept}</p>
//                         {service.isPopular && (
//                           <div className="absolute top-2 right-2">
//                             <FiStar className="text-amber-400 text-sm fill-amber-400" />
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Support Banner */}
//                 <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-5 text-white">
//                   <div className="flex flex-wrap items-center justify-between gap-3">
//                     <div className="flex items-center gap-3">
//                       <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
//                         <FiTrendingUp className="text-2xl" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-lg">Premium Support Available</h3>
//                         <p className="text-white/80 text-sm">Need assistance? Our team is here 24/7</p>
//                       </div>
//                     </div>
//                     <button 
//                       onClick={() => setActiveSection('raiseTicket')} 
//                       className="bg-white text-blue-600 px-5 py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition transform hover:scale-105"
//                     >
//                       Raise a Ticket
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}

//           {activeSection === 'raiseTicket' && <RaiseTicket />}
//           {activeSection === 'myTickets' && <ClientTickets myTickets={myTickets} />}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ClientDashboard

import React, { useState, useContext, useEffect, useRef } from 'react'
import { AppContext } from '../App'
import { useNavigate } from 'react-router-dom'
import { 
  FiLogOut, FiMessageSquare, FiList, FiHome, FiUser, 
  FiCheckCircle, FiClock, FiBell, FiGrid, FiShield, 
  FiMenu, FiX, FiChevronRight, FiExternalLink, FiSearch,
  FiTrendingUp, FiAward, FiStar, FiBriefcase
} from 'react-icons/fi'
import RaiseTicket from './RaiseTicket'
import ClientTickets from './ClientTickets'

const ClientDashboard = () => {
  const { currentClient, logout, tickets, refreshData } = useContext(AppContext)
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('services')
  const [showSevaGrid, setShowSevaGrid] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileMenuRef = useRef(null) // Add this ref for profile menu
  
  // Load sidebar state from localStorage, default to false (closed) on mobile, true on desktop
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('client_sidebar_open')
    if (saved !== null) {
      return saved === 'true'
    }
    // Default: closed on mobile, open on desktop
    return window.innerWidth >= 1024
  })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const [searchService, setSearchService] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    if (refreshData) refreshData()
  }, [refreshData])

  // Save sidebar state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('client_sidebar_open', sidebarOpen)
  }, [sidebarOpen])

  // Handle window resize - only update isMobile state, not sidebarOpen
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
    }
    
    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showProfileMenu])

  const handleLogout = () => {
    if (logout) logout('client')
    navigate('/login')
  }

  const handleServiceClick = (serviceName, serviceUrl) => {
    if (serviceUrl && serviceUrl !== '#') {
      window.open(serviceUrl, '_blank')
    } else {
      alert(`${serviceName} service will be available soon.`)
    }
  }

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  if (!currentClient) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  )

  const myTickets = tickets ? tickets.filter(t => t.clientId === currentClient.id) : []
  const activeTickets = myTickets.filter(t => t.status !== 'Resolved').length

  const bannerSlides = [
    {
      title: "Digital India Initiative",
      description: "Empowering citizens with seamless government services",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop",
      cta: "Explore Services",
      link: "https://www.digitalindia.gov.in"
    },
    {
      title: "PAN Card Services",
      description: "Apply for new PAN, update details, or download e-PAN instantly",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=400&fit=crop",
      cta: "Apply Now",
      link: "https://www.incometax.gov.in"
    },
    {
      title: "Aadhaar Services",
      description: "Enrolment, address update, biometric locking, and more",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=400&fit=crop",
      cta: "Check Status",
      link: "https://uidai.gov.in"
    },
    {
      title: "Passport Services",
      description: "Fresh passport, renewal, or police verification status",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=400&fit=crop",
      cta: "Apply Online",
      link: "https://passportindia.gov.in"
    }
  ]

  const categories = [
    { id: 'all', name: 'All Services', icon: '🎯' },
    { id: 'government', name: 'Government', icon: '🏛️' },
    { id: 'finance', name: 'Finance & Tax', icon: '💰' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'utility', name: 'Utilities', icon: '⚡' },
    { id: 'welfare', name: 'Welfare', icon: '🤝' },
    { id: 'travel', name: 'Travel', icon: '✈️' },
    { id: 'health', name: 'Health', icon: '🏥' }
  ]

  // Complete Services List
  const completeServicesList = [
    { name: "eSevanam Govt. of Kerala", dept: "Kerala Govt", icon: "🏛️", url: "https://services.kerala.gov.in", category: "government", isPopular: true },
    { name: "Encumbrance Certificate", dept: "Registration Dept", icon: "📜", url: "https://pearl.registration.kerala.gov.in", category: "government", isPopular: true },
    { name: "ILGMS - Panchayat Services", dept: "Panchayat Dept", icon: "🏘️", url: "https://ilgms.lsgkerala.gov.in", category: "government", isPopular: true },
    { name: "KEAM PORTAL", dept: "Engineering Admission", icon: "⚙️", url: "https://cee.kerala.gov.in/keam2025", category: "education", isPopular: true },
    { name: "e-District", dept: "Land Revenue", icon: "🗺️", url: "https://edistrict.kerala.gov.in", category: "government", isPopular: true },
    { name: "Location Certificate", dept: "Village Office", icon: "📍", url: "https://janparichay.meripehchaan.gov.in", category: "government", isPopular: true },
    { name: "Income Certificate", dept: "Village Office", icon: "📋", url: "https://janparichay.meripehchaan.gov.in", category: "government", isPopular: true },
    { name: "Scholarship (NSP)", dept: "Education", icon: "🎓", url: "https://scholarships.gov.in", category: "education", isPopular: true },
    { name: "GST Enrollment", dept: "Tax", icon: "📊", url: "https://gst.gov.in", category: "finance", isPopular: true },
    { name: "LPG HP Gas Connection", dept: "Utilities", icon: "🔥", url: "https://myhpgas.in", category: "utility", isPopular: true },
    { name: "Income Tax Filing", dept: "IT Dept", icon: "📑", url: "https://www.incometax.gov.in", category: "finance", isPopular: true },
    { name: "Birth & Death Certificate", dept: "Registration", icon: "👶", url: "https://crsorgi.gov.in", category: "government", isPopular: true },
    { name: "Parivahan Seva", dept: "Transport", icon: "🚗", url: "https://parivahan.gov.in", category: "government", isPopular: true },
    { name: "LIC Insurance Premium", dept: "Insurance", icon: "🛡️", url: "https://licindia.in", category: "finance", isPopular: true },
    { name: "e-Shram Registration", dept: "Labour", icon: "👷", url: "https://register.eshram.gov.in/", category: "welfare", isPopular: false },
    { name: "Sanchaya", dept: "Govt Services", icon: "📁", url: "#", category: "government", isPopular: false },
    { name: "Election ID Card", dept: "Election", icon: "🗳️", url: "https://voters.eci.gov.in", category: "government", isPopular: true },
    { name: "services.india.gov.in", dept: "National Portal", icon: "🇮🇳", url: "https://services.india.gov.in", category: "government", isPopular: true },
    { name: "Chief Minister's Office", dept: "Grievance", icon: "🏢", url: "https://cm.kerala.gov.in", category: "government", isPopular: false },
    { name: "National Employment Services", dept: "Employment", icon: "💼", url: "https://eemployment.kerala.gov.in", category: "government", isPopular: false },
    { name: "IDMS", dept: "Document Management", icon: "📄", url: "https://idms.fabkerala.gov.in/fabnet/UserLogin.do", category: "government", isPopular: false },
    { name: "Kerala PCB Online", dept: "Pollution Control", icon: "🌳", url: "https://keralapcbonline.com/pcb/welcome", category: "health", isPopular: false },
    { name: "Kerala PSC", dept: "Recruitment", icon: "📝", url: "https://www.keralapsc.gov.in", category: "education", isPopular: true },
    { name: "Ksmart", dept: "Smart City", icon: "🏙️", url: "https://ksmart.lsgkerala.gov.in/ui/web-portal", category: "government", isPopular: false },
    { name: "Welfare Pension", dept: "Social Welfare", icon: "👵", url: "https://welfarepension.lsgkerala.gov.in/", category: "welfare", isPopular: true },
    { name: "Sevana Pension", dept: "Pension", icon: "💰", url: "https://welfarepension.lsgkerala.gov.in/DBTPensionersSearch.aspx", category: "welfare", isPopular: false },
    { name: "NEET", dept: "Medical Admission", icon: "📖", url: "https://neet.nta.nic.in", category: "education", isPopular: true },
    { name: "IBPS", dept: "Banking Recruitment", icon: "🏦", url: "https://www.ibps.in", category: "education", isPopular: true },
    { name: "SSC", dept: "Staff Selection", icon: "📋", url: "https://ssc.gov.in", category: "education", isPopular: true },
    { name: "Revenue Department", dept: "Revenue", icon: "🏛️", url: "https://www.revenue.kerala.gov.in", category: "government", isPopular: false },
    { name: "LSGD Kerala", dept: "Local Self Govt", icon: "🏘️", url: "https://lsgkerala.gov.in/", category: "government", isPopular: false },
    { name: "Udyam Registration", dept: "MSME", icon: "🏭", url: "https://udyamregistration.gov.in", category: "government", isPopular: true },
    { name: "Kerala Police", dept: "Police", icon: "👮", url: "https://thuna.keralapolice.gov.in", category: "government", isPopular: false },
    { name: "Food Safety Compliance", dept: "Health", icon: "🍽️", url: "https://foscos.fssai.gov.in", category: "health", isPopular: false },
    { name: "Civil Supplies Kerala", dept: "Civil Supplies", icon: "🛒", url: "https://civilsupplieskerala.gov.in", category: "government", isPopular: false },
    { name: "EPFO", dept: "Provident Fund", icon: "💰", url: "https://unifiedportal-mem.epfindia.gov.in/memberinterface/", category: "finance", isPopular: true },
    { name: "Citizen LSG Kerala", dept: "Local Self Govt", icon: "🏘️", url: "https://citizen.lsgkerala.gov.in", category: "government", isPopular: false },
    { name: "Pravasi Welfare", dept: "Welfare", icon: "✈️", url: "https://register.pravasikerala.org/public/index.php/online/PublicLogin", category: "welfare", isPopular: false },
    { name: "KMTWWFB", dept: "Motor Transport Welfare", icon: "🚛", url: "https://www.tailorwelfare.in/", category: "welfare", isPopular: false },
    { name: "KSEB", dept: "Electricity Board", icon: "⚡", url: "https://kseb.in", category: "utility", isPopular: true },
    { name: "KSEB Quick Pay", dept: "Electricity", icon: "⚡", url: "https://quickpay.kseb.in", category: "utility", isPopular: true },
    { name: "e-grantz", dept: "Scholarship", icon: "📖", url: "https://egrantz.kerala.gov.in", category: "education", isPopular: false },
    { name: "e Treasury", dept: "Finance", icon: "💰", url: "https://etreasury.kerala.gov.in", category: "finance", isPopular: false },
    { name: "KNMC", dept: "Nurses Council", icon: "🩺", url: "https://www.knmc.org/", category: "health", isPopular: false },
    { name: "PM Kisan Samman Nidhi", dept: "Agriculture", icon: "🌾", url: "https://pmkisan.gov.in", category: "welfare", isPopular: true },
    { name: "SSLC REVALUATION", dept: "Education", icon: "📚", url: "https://keralapareekshabhavan.in", category: "education", isPopular: true },
    { name: "DCE SCHOLARSHIP", dept: "Education", icon: "🎓", url: "https://dcescholarship.kerala.gov.in", category: "education", isPopular: false },
    { name: "eChallan", dept: "Traffic", icon: "🚔", url: "https://echallan.parivahan.gov.in/index/accused-challan", category: "government", isPopular: true },
    { name: "PANCARD SERVICE PORTAL", dept: "Income Tax", icon: "🆔", url: "https://www.incometax.gov.in", category: "finance", isPopular: true },
    { name: "Sports Admission", dept: "Sports", icon: "⚽", url: "#", category: "education", isPopular: false },
    { name: "MGU ADMISSION", dept: "University", icon: "🎓", url: "https://mgu.ac.in", category: "education", isPopular: false },
    { name: "CALICUT UNIVERSITY ADMISSION", dept: "University", icon: "🎓", url: "https://uoc.ac.in", category: "education", isPopular: false },
    { name: "LBS Centre", dept: "Science & Technology", icon: "🔬", url: "https://lbscentre.in", category: "education", isPopular: false },
    { name: "Christian Nursing Colleges", dept: "Medical", icon: "🏥", url: "#", category: "health", isPopular: false },
    { name: "IG Co-operative Hospital", dept: "Health", icon: "🏥", url: "https://www.igconkochi.com", category: "health", isPopular: false },
    { name: "IRCTC", dept: "Railways", icon: "🚆", url: "https://www.irctc.co.in/nget/train-search", category: "travel", isPopular: true },
    { name: "Bus Booking", dept: "Transport", icon: "🚌", url: "https://www.redbus.in", category: "travel", isPopular: true },
    { name: "Flight Booking", dept: "Aviation", icon: "✈️", url: "https://www.makemytrip.com", category: "travel", isPopular: true },
    { name: "Hotel Booking", dept: "Hospitality", icon: "🏨", url: "https://www.booking.com", category: "travel", isPopular: true },
    { name: "PAN Card", dept: "Income Tax", icon: "🆔", url: "https://www.incometax.gov.in", category: "finance", isPopular: true },
    { name: "Aadhaar", dept: "UIDAI", icon: "👤", url: "https://myaadhaar.uidai.gov.in", category: "government", isPopular: true },
    { name: "Passport", dept: "External Affairs", icon: "📘", url: "https://passportindia.gov.in", category: "government", isPopular: true },
    { name: "Driving License", dept: "Transport", icon: "🚗", url: "https://parivahan.gov.in", category: "government", isPopular: true },
    { name: "Voter ID", dept: "Election", icon: "🗳️", url: "https://voters.eci.gov.in", category: "government", isPopular: true }
  ]

  // Update category counts
  categories.forEach(cat => {
    if (cat.id === 'all') {
      cat.count = completeServicesList.length
    } else {
      cat.count = completeServicesList.filter(s => s.category === cat.id).length
    }
  })

  const filteredServices = completeServicesList.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchService.toLowerCase()) ||
                          service.dept.toLowerCase().includes(searchService.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar - Fixed */}
      <div className={`fixed top-0 left-0 z-50 h-full transition-all duration-300 ${
        sidebarOpen ? 'w-80' : 'w-20'
      }`}>
        <div className="h-full bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white flex flex-col shadow-2xl overflow-y-auto">
          <div className="p-6 border-b border-gray-700/50 flex justify-between items-center">
            {sidebarOpen ? (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Sevanakendra</h2>
                  {/* <p className="text-gray-400 text-xs">Client Portal</p> */}
                </div>
              </div>
            ) : (
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">S</span>
              </div>
            )}
            {/* Toggle button - ONLY way to open/close sidebar */}
            <button 
              onClick={toggleSidebar}
              className="p-1.5 hover:bg-white/10 rounded-lg transition"
            >
              {sidebarOpen ? <FiX className="w-4 h-4 text-gray-400" /> : <FiMenu className="w-4 h-4 text-gray-400" />}
            </button>
          </div>

          {sidebarOpen && (
            <div className="p-6 border-b border-gray-700/50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {currentClient.fullName?.charAt(0).toUpperCase() || 'C'}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white text-lg">{currentClient.fullName || 'Client'}</p>
                  {/* <p className="text-sm text-emerald-400 font-mono">ID: {currentClient.id?.slice(-8) || '000000'}</p> */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`w-2 h-2 rounded-full ${currentClient.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                    <span className="text-xs text-gray-400">{currentClient.status || 'Active'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => { setActiveSection('services'); setShowSevaGrid(false); if(isMobile) toggleSidebar(); }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                activeSection === 'services'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              } ${!sidebarOpen && 'justify-center'}`}
              title={!sidebarOpen ? "Services Dashboard" : ""}
            >
              <FiHome className="text-xl" />
              {sidebarOpen && <span className="font-medium">Services Dashboard</span>}
            </button>

            <button
              onClick={() => { setActiveSection('raiseTicket'); setShowSevaGrid(false); if(isMobile) toggleSidebar(); }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                activeSection === 'raiseTicket'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              } ${!sidebarOpen && 'justify-center'}`}
              title={!sidebarOpen ? "Raise Ticket" : ""}
            >
              <FiMessageSquare className="text-xl" />
              {sidebarOpen && <span className="font-medium">Raise Ticket</span>}
            </button>

            {/* <button
              onClick={() => { setActiveSection('myTickets'); setShowSevaGrid(false); if(isMobile) toggleSidebar(); }}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${
                activeSection === 'myTickets'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              } ${!sidebarOpen && 'justify-center'}`}
              title={!sidebarOpen ? "My Tickets" : ""}
            >
              <FiList className="text-xl" />
              {sidebarOpen && <span className="font-medium">My Tickets</span>}
              {sidebarOpen && activeTickets > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-500 text-white ml-auto">
                  {activeTickets}
                </span>
              )}
            </button> */}
            <button
  onClick={() => { setActiveSection('myTickets'); setShowSevaGrid(false); if(isMobile) toggleSidebar(); }}
  className={`w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 ${
    activeSection === 'myTickets'
      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
      : 'text-gray-400 hover:bg-white/10 hover:text-white'
  } ${!sidebarOpen ? 'justify-center' : 'justify-between'}`}
  title={!sidebarOpen ? "My Tickets" : ""}
>
  <FiList className="text-xl" />
  {sidebarOpen && <span className="font-medium flex-1 ml-3">My Tickets</span>}
  {sidebarOpen && activeTickets > 0 && (
    <span className="text-xs px-2 py-0.5 rounded-full bg-red-500 text-white">
      {activeTickets}
    </span>
  )}
</button>
          </nav>

          {sidebarOpen && (
            <div className="p-4 border-t border-gray-700/50">
              <div className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-xl p-4">
                <p className="text-xs text-gray-400 text-center">🔒 Secure Connection</p>
                <p className="text-xs text-gray-500 text-center mt-1">SSL Encrypted • 256-bit</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Margin changes based on sidebar state */}
<div className={`transition-all duration-300 min-h-screen w-full ${
  sidebarOpen ? 'md:ml-80' : 'md:ml-20'
}`} style={{
  marginLeft: sidebarOpen ? (window.innerWidth >= 768 ? '20rem' : '0') : (window.innerWidth >= 768 ? '5rem' : '0')
}}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-6 py-3 flex justify-between items-center">
            {/* Mobile menu button */}
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition lg:hidden"
            >
              <FiMenu className="w-5 h-5 text-gray-600" />
            </button>

            {/* Desktop spacer to center business name */}
            <div className="hidden lg:block w-8"></div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <FiBriefcase className="text-white text-sm" />
              </div>
              <span className="font-semibold text-gray-800 text-lg">
                {currentClient.businessName || 'Individual Client'}
              </span>
            </div>

            {/* Profile Menu with ref for click outside */}
            <div className="relative" ref={profileMenuRef}>
              <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800">{currentClient.fullName?.split(' ')[0]}</p>
                  <p className="text-xs text-gray-500">Client</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-md text-sm">
                  {currentClient.fullName?.charAt(0).toUpperCase()}
                </div>
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-800">{currentClient.fullName}</p>
                    <p className="text-xs text-gray-500">{currentClient.mobile}</p>
                    <p className="text-xs font-semibold text-blue-600 mt-1">{currentClient.businessName}</p>
                  </div>
                  <button onClick={handleLogout} className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition">
                    <FiLogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-6">
          {activeSection === 'services' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-sm border">
                  <p className="text-gray-500 text-sm">Total Tickets</p>
                  <p className="text-2xl font-bold text-gray-800">{myTickets.length}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border">
                  <p className="text-gray-500 text-sm">Active Tickets</p>
                  <p className="text-2xl font-bold text-amber-600">{activeTickets}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border">
                  <p className="text-gray-500 text-sm">Resolved</p>
                  <p className="text-2xl font-bold text-emerald-600">{myTickets.filter(t => t.status === 'Resolved').length}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border">
                  <p className="text-gray-500 text-sm">Services</p>
                  <p className="text-2xl font-bold text-blue-600">{completeServicesList.length}+</p>
                </div>
              </div>

              {/* Banner */}
              <div className="mb-8 overflow-hidden rounded-2xl shadow-lg relative">
                <div className="relative h-48 sm:h-56 md:h-64">
                  {bannerSlides.map((slide, index) => (
                    <div key={index} className={`absolute inset-0 transition-opacity duration-700 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}>
                      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
                      <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">{slide.title}</h2>
                        <p className="text-white/90 text-sm max-w-lg mb-3">{slide.description}</p>
                        <button onClick={() => handleServiceClick(slide.title, slide.link)} className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 w-fit transition">
                          {slide.cta} <FiExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {bannerSlides.map((_, index) => (
                      <button key={index} onClick={() => setCurrentSlide(index)} className={`h-1.5 rounded-full transition-all ${currentSlide === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`} />
                    ))}
                  </div>
                  <button onClick={() => setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full transition text-sm">❮</button>
                  <button onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full transition text-sm">❯</button>
                </div>
              </div>

              {/* Services Section */}
              <div>
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-gray-800">All e-Seva Services</h2>
                  <p className="text-gray-500 text-sm">Access {completeServicesList.length}+ government services at your fingertips</p>
                </div>

                {/* Search Bar */}
                <div className="mb-5">
                  <div className="relative w-full">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    <input 
                      type="text" 
                      placeholder="Search services by name or department..." 
                      value={searchService} 
                      onChange={(e) => setSearchService(e.target.value)} 
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-base shadow-sm" 
                    />
                    {searchService && (
                      <button 
                        onClick={() => setSearchService('')} 
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  {searchService && (
                    <p className="text-xs text-gray-500 mt-2">
                      Found {filteredServices.length} result{filteredServices.length !== 1 ? 's' : ''} for "{searchService}"
                    </p>
                  )}
                </div>

                {/* Category Filters */}
                <div className="flex gap-2 overflow-x-auto pb-3 mb-5">
                  {categories.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => setSelectedCategory(cat.id)} 
                      className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                        selectedCategory === cat.id 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-blue-200'
                      }`}
                    >
                      <span className="mr-1">{cat.icon}</span>
                      {cat.name}
                      <span className={`ml-1 text-xs ${selectedCategory === cat.id ? 'text-blue-200' : 'text-gray-400'}`}>
                        ({cat.count})
                      </span>
                    </button>
                  ))}
                </div>

                {/* Services Grid */}
                {filteredServices.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FiSearch className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No services found</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredServices.map((service, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => handleServiceClick(service.name, service.url)} 
                        className="group bg-white rounded-xl p-4 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-gray-100 hover:border-blue-200 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/20 group-hover:to-indigo-50/20 transition-all duration-300"></div>
                        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                        <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">{service.name}</h3>
                        <p className="text-xs text-gray-400 line-clamp-1">{service.dept}</p>
                        {service.isPopular && (
                          <div className="absolute top-2 right-2">
                            <FiStar className="text-amber-400 text-sm fill-amber-400" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Support Banner */}
                <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-5 text-white">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <FiTrendingUp className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Premium Support Available</h3>
                        <p className="text-white/80 text-sm">Need assistance? Our team is here 24/7</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setActiveSection('raiseTicket')} 
                      className="bg-white text-blue-600 px-5 py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition transform hover:scale-105"
                    >
                      Raise a Ticket
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === 'raiseTicket' && <RaiseTicket />}
          {activeSection === 'myTickets' && <ClientTickets myTickets={myTickets} />}
        </div>
      </div>
    </div>
  )
}

export default ClientDashboard