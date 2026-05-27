
import React, { useState, useContext, useEffect } from 'react'
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
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [searchService, setSearchService] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    refreshData()
    
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [refreshData])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    logout('client')
    navigate('/login')
  }

  // Direct redirect without popup
  const handleServiceClick = (serviceName, serviceUrl) => {
    if (serviceUrl && serviceUrl !== '#') {
      window.open(serviceUrl, '_blank')
    } else {
      // For demo purposes - show alert only for services without URLs
      alert(`${serviceName} service will be available soon.`)
    }
  }

  if (!currentClient) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  )

  const myTickets = tickets.filter(t => t.clientId === currentClient.id)
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

  // Filter services based on search and category
  const filteredServices = sevaServicesList.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchService.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: 'all', name: 'All Services', icon: '🎯' },
    { id: 'government', name: 'Government', icon: '🏛️' },
    { id: 'finance', name: 'Finance & Tax', icon: '💰' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'utility', name: 'Utilities', icon: '⚡' },
    { id: 'welfare', name: 'Welfare', icon: '🤝' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 z-50 h-full transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="w-80 h-full bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white flex flex-col shadow-2xl overflow-y-auto">
          <div className="p-6 border-b border-gray-700/50 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">JS</span>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Janaseva e-Seva</h2>
                <p className="text-gray-400 text-xs">Client Portal</p>
              </div>
            </div>
            {isMobile && (
              <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-white/10 rounded-xl">
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="p-6 border-b border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {currentClient.fullName?.charAt(0).toUpperCase() || 'C'}
              </div>
              <div className="flex-1">
                <p className="font-bold text-white text-lg">{currentClient.fullName || 'Client'}</p>
                <p className="text-sm text-emerald-400 font-mono">ID: {currentClient.id?.slice(-8) || '000000'}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`w-2 h-2 rounded-full ${currentClient.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                  <span className="text-xs text-gray-400">{currentClient.status || 'Active'}</span>
                </div>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => { setActiveSection('services'); setShowSevaGrid(false); if(isMobile) setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                activeSection === 'services'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FiHome className="text-xl" />
              <span className="font-medium">Services Dashboard</span>
            </button>

            <button
              onClick={() => { setActiveSection('raiseTicket'); setShowSevaGrid(false); if(isMobile) setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                activeSection === 'raiseTicket'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FiMessageSquare className="text-xl" />
              <span className="font-medium">Raise Ticket</span>
            </button>

            <button
              onClick={() => { setActiveSection('myTickets'); setShowSevaGrid(false); if(isMobile) setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${
                activeSection === 'myTickets'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <FiList className="text-xl" />
                <span className="font-medium">My Tickets</span>
              </div>
              {activeTickets > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-500 text-white">
                  {activeTickets}
                </span>
              )}
            </button>
          </nav>

          <div className="p-4 border-t border-gray-700/50">
            <div className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-xl p-4">
              <p className="text-xs text-gray-400 text-center">🔒 Secure Connection</p>
              <p className="text-xs text-gray-500 text-center mt-1">SSL Encrypted • 256-bit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen && !isMobile ? 'lg:ml-80' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-30">
          <div className="px-6 py-4 flex justify-between items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl hover:bg-gray-100 transition"
            >
              <FiMenu className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-center gap-4">
              {/* Business Name - Bold Display */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <FiBriefcase className="text-blue-600" />
                <span className="font-bold text-gray-800">{currentClient.businessName || 'Individual Client'}</span>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-800">{currentClient.fullName?.split(' ')[0]}</p>
                    <p className="text-xs text-gray-500">Client</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-md">
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
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
                    >
                      <FiLogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {activeSection === 'services' && (
            <>
              {/* Image Banner */}
              <div className="mb-8 overflow-hidden rounded-2xl shadow-xl relative">
                <div className="relative h-48 sm:h-56 md:h-72">
                  {bannerSlides.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        currentSlide === index ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                      <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">{slide.title}</h2>
                        <p className="text-white/90 text-sm sm:text-base max-w-lg mb-5">{slide.description}</p>
                        <button
                          onClick={() => handleServiceClick(slide.title, slide.link)}
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-5 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-2 w-fit transition"
                        >
                          {slide.cta} <FiExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {bannerSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all ${currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/50'}`}
                      />
                    ))}
                  </div>
                  
                  <button onClick={() => setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition">
                    ❮
                  </button>
                  <button onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition">
                    ❯
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-8">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <p className="text-gray-500 text-sm">Total Tickets</p>
                  <p className="text-3xl font-bold text-gray-800">{myTickets.length}</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <p className="text-gray-500 text-sm">Active Tickets</p>
                  <p className="text-3xl font-bold text-amber-600">{activeTickets}</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <p className="text-gray-500 text-sm">Resolved</p>
                  <p className="text-3xl font-bold text-emerald-600">{myTickets.filter(t => t.status === 'Resolved').length}</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <p className="text-gray-500 text-sm">Services</p>
                  <p className="text-3xl font-bold text-blue-600">{sevaServicesList.length}+</p>
                </div>
              </div>

              {/* Premium All Services Section */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">All e-Seva Services</h2>
                    <p className="text-gray-500 text-sm mt-1">Access 40+ government services at your fingertips</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
                    <FiAward className="text-amber-500" />
                    <span>Trusted by 10L+ users</span>
                  </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={searchService}
                      onChange={(e) => setSearchService(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                          selectedCategory === cat.id
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span className="mr-1">{cat.icon}</span>
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Premium Services Grid */}
                {filteredServices.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                    <FiSearch className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No services found matching your search.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredServices.map((service, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleServiceClick(service.name, service.url)}
                        className="group bg-white rounded-2xl p-5 text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100 hover:border-blue-200 relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full -mr-8 -mt-8"></div>
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                        <h3 className="font-bold text-gray-800 text-sm mb-1">{service.name}</h3>
                        <p className="text-xs text-gray-400">{service.dept}</p>
                        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs text-blue-600 font-medium flex items-center justify-center gap-1">
                            Apply Now <FiExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                        {service.isPopular && (
                          <div className="absolute top-2 right-2">
                            <FiStar className="text-amber-400 text-sm fill-amber-400" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Premium Features Banner */}
                <div className="mt-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <FiTrendingUp className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Premium Support Available</h3>
                        <p className="text-white/80 text-sm">Need assistance? Our team is here 24/7</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveSection('raiseTicket')}
                      className="bg-white text-blue-600 px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg transition"
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

const sevaServicesList = [
  { name: "Udyam Registration", dept: "MSME", icon: "🏭", url: "https://udyamregistration.gov.in", category: "government", isPopular: true },
  { name: "EPFO", dept: "Employees' Provident Fund", icon: "💰", url: "https://epfindia.gov.in", category: "finance", isPopular: true },
  { name: "KSEB", dept: "Electricity Board", icon: "⚡", url: "https://kseb.in", category: "utility", isPopular: true },
  { name: "PM Kisan", dept: "Agriculture", icon: "🌾", url: "https://pmkisan.gov.in", category: "welfare", isPopular: true },
  { name: "GST", dept: "Goods & Services Tax", icon: "📊", url: "https://gst.gov.in", category: "finance", isPopular: true },
  { name: "Income Tax", dept: "IT Department", icon: "📑", url: "https://incometax.gov.in", category: "finance", isPopular: true },
  { name: "Birth Certificate", dept: "Registration", icon: "👶", url: "https://crsorgi.gov.in", category: "government", isPopular: false },
  { name: "Driving License", dept: "Transport", icon: "🚗", url: "https://parivahan.gov.in", category: "government", isPopular: true },
  { name: "Voter ID", dept: "Election Commission", icon: "🗳️", url: "https://voters.eci.gov.in", category: "government", isPopular: true },
  { name: "IRCTC", dept: "Railways", icon: "🚆", url: "https://irctc.co.in", category: "utility", isPopular: true },
  { name: "Scholarship", dept: "Education Ministry", icon: "🎓", url: "https://scholarships.gov.in", category: "education", isPopular: false },
  { name: "Pension", dept: "Social Welfare", icon: "👵", url: "https://npss.nsdl.com", category: "welfare", isPopular: false },
  { name: "Caste Certificate", dept: "Revenue Dept", icon: "📜", url: "#", category: "government", isPopular: false },
  { name: "Income Certificate", dept: "Revenue Dept", icon: "📋", url: "#", category: "government", isPopular: false },
  { name: "Domicile Certificate", dept: "Revenue Dept", icon: "🏠", url: "#", category: "government", isPopular: false },
  { name: "Trade License", dept: "Municipality", icon: "🏪", url: "#", category: "government", isPopular: false },
  { name: "Property Tax", dept: "Municipality", icon: "🏘️", url: "#", category: "finance", isPopular: false },
  { name: "Water Connection", dept: "Water Authority", icon: "💧", url: "#", category: "utility", isPopular: false },
  { name: "NEET", dept: "Education", icon: "📖", url: "https://neet.nta.nic.in", category: "education", isPopular: true },
  { name: "JEE", dept: "Education", icon: "⚙️", url: "https://jeemain.nta.nic.in", category: "education", isPopular: true },
  { name: "Passport", dept: "External Affairs", icon: "📘", url: "https://passportindia.gov.in", category: "government", isPopular: true },
  { name: "Aadhaar", dept: "UIDAI", icon: "👤", url: "https://uidai.gov.in", category: "government", isPopular: true },
  { name: "PAN Card", dept: "Income Tax", icon: "🆔", url: "https://www.incometax.gov.in", category: "finance", isPopular: true },
]

export default ClientDashboard