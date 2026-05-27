import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../App'
import { useNavigate } from 'react-router-dom'
import { FiLogOut, FiPhone, FiMapPin, FiFlag, FiMessageSquare, FiList, FiHome, FiArrowLeft } from 'react-icons/fi'
import RaiseTicket from './RaiseTicket'
import ClientTickets from './ClientTickets'

const ClientDashboard = () => {
  const { currentClient, logout, tickets, refreshData } = useContext(AppContext)
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('services')
  const [showSevaGrid, setShowSevaGrid] = useState(false)

  useEffect(() => {
    refreshData()
  }, [refreshData])

  const handleLogout = () => {
    logout('client')
    navigate('/login')
  }

  if (!currentClient) return <div className="p-10 text-center">Loading...</div>

  const myTickets = tickets.filter(t => t.clientId === currentClient.id)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar – now dark gray (same as admin) */}
      <aside className="w-72 bg-gray-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Janaseva e-Seva</h2>
          <p className="text-gray-300 text-sm mt-1">Client Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <SidebarItem
            icon={<FiHome />}
            label="Services & Updates"
            active={activeSection === 'services'}
            onClick={() => { setActiveSection('services'); setShowSevaGrid(false); }}
          />
          <SidebarItem
            icon={<FiMessageSquare />}
            label="Raise Ticket"
            active={activeSection === 'raiseTicket'}
            onClick={() => { setActiveSection('raiseTicket'); setShowSevaGrid(false); }}
          />
          <SidebarItem
            icon={<FiList />}
            label="My Tickets"
            active={activeSection === 'myTickets'}
            onClick={() => { setActiveSection('myTickets'); setShowSevaGrid(false); }}
          />
        </nav>
        <div className="p-4 border-t border-gray-700">
          <SidebarItem
            icon={<FiLogOut />}
            label="Logout"
            onClick={handleLogout}
            className="text-gray-300 hover:bg-gray-700"
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome, {currentClient.fullName.split(' ')[0]}
          </h1>
          <div className="text-sm text-gray-500">Client ID: JAN-{currentClient.id?.slice(-6) || '000000'}</div>
        </header>

        <div className="p-8">
          {/* Profile Card – now blue border instead of emerald */}
          <div className="bg-white rounded-xl shadow-md p-5 mb-6 border-l-8 border-blue-600">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-gray-700 mb-2">📋 Account Details</h3>
                <p><span className="font-semibold">Name:</span> {currentClient.fullName}</p>
                <p><span className="font-semibold">Business:</span> {currentClient.businessName || '—'}</p>
                <p><span className="font-semibold">Locality:</span> {currentClient.locality}</p>
                <p><span className="font-semibold">Address:</span> {currentClient.address}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-700 mb-2">📞 Contact & Status</h3>
                <p><FiPhone className="inline mr-2" /> {currentClient.mobile}</p>
                <p><FiFlag className="inline mr-2" /> Status:
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs ${currentClient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {currentClient.status}
                  </span>
                </p>
                <p><FiMapPin className="inline mr-2" /> Jurisdiction: Nodal IT Office, New Delhi</p>
              </div>
            </div>
          </div>

          {activeSection === 'services' && (
            <>
              {!showSevaGrid ? (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">e - Services</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ServiceTile
                      title="PAN Card"
                      description="Apply for new PAN or update existing"
                      icon="🆔"
                      onClick={() => alert('PAN Card service – demo. Real application form would open.')}
                    />
                    <ServiceTile
                      title="Aadhaar"
                      description="Enrolment, update, or download"
                      icon="👤"
                      onClick={() => alert('Aadhaar service – demo.')}
                    />
                    <ServiceTile
                      title="Passport"
                      description="Apply for fresh passport or renewal"
                      icon="📘"
                      onClick={() => alert('Passport service – demo.')}
                    />
                    <ServiceTile
                      title="e-Seva Services"
                      description="Explore all Kerala Government services"
                      icon="📋"
                      onClick={() => setShowSevaGrid(true)}
                      highlight
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => setShowSevaGrid(false)}
                    className="flex items-center gap-2 text-blue-600 mb-4 hover:underline"
                  >
                    <FiArrowLeft /> Back to main services
                  </button>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">All e-Seva Services</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {sevaServicesList.map((service, idx) => (
                      <button
                        key={idx}
                        onClick={() => alert(`Service: ${service.name}\n(Demo – real application form would open.)`)}
                        className="bg-white hover:bg-blue-50 border rounded-xl p-4 text-center transition shadow-sm"
                      >
                        <div className="text-3xl mb-2">{service.icon || '📄'}</div>
                        <div className="text-sm font-medium text-gray-800">{service.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{service.dept}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {activeSection === 'raiseTicket' && <RaiseTicket />}
          {activeSection === 'myTickets' && <ClientTickets myTickets={myTickets} />}
        </div>
      </main>
    </div>
  )
}

// SidebarItem – identical to admin component (blue active, gray hover)
const SidebarItem = ({ icon, label, active, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-left
      ${active
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }
      ${className}`}
  >
    <span className="text-xl">{icon}</span>
    <span>{label}</span>
  </button>
)

// ServiceTile – highlight uses blue instead of emerald
const ServiceTile = ({ title, description, icon, onClick, highlight }) => (
  <button
    onClick={onClick}
    className={`bg-white rounded-xl shadow-md p-6 text-center transition transform hover:-translate-y-1 hover:shadow-lg ${
      highlight ? 'border-2 border-blue-500 bg-blue-50' : ''
    }`}
  >
    <div className="text-5xl mb-3">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    <p className="text-gray-500 text-sm mt-2">{description}</p>
  </button>
)

// Complete list of e-Seva services (unchanged)
const sevaServicesList = [
  { name: "Udyam Registration", dept: "MSME", icon: "🏭" },
  { name: "National Employment Service (Kerala)", dept: "Employment", icon: "💼" },
  { name: "Kerala Police", dept: "Police", icon: "👮" },
  { name: "EPFO", dept: "Employees' Provident Fund", icon: "💰" },
  { name: "KSEB", dept: "Kerala State Electricity Board", icon: "⚡" },
  { name: "KNMC", dept: "Kerala Nurses & Midwives Council", icon: "🩺" },
  { name: "SLLC REVALUATION", dept: "Education", icon: "📚" },
  { name: "Food Safety Compliance System", dept: "Health", icon: "🍽️" },
  { name: "Citizen LSG Kerala", dept: "Local Self Govt", icon: "🏘️" },
  { name: "KMTWWFB", dept: "Motor Transport Welfare", icon: "🚛" },
  { name: "PM Kisan Samman Nidhi", dept: "Agriculture", icon: "🌾" },
  { name: "DCE SCHOLARSHIP", dept: "Education", icon: "🎓" },
  { name: "Civil Supplies Kerala", dept: "Civil Supplies", icon: "🛒" },
  { name: "Pravasi Welfare", dept: "Welfare", icon: "✈️" },
  { name: "e-grantz", dept: "Scholarship", icon: "📖" },
  { name: "ILGMS (Panchayat Services)", dept: "Panchayat", icon: "🏛️" },
  { name: "eChallan", dept: "Traffic Enforcement", icon: "🚔" },
  { name: "GST Enrollment", dept: "Tax", icon: "📊" },
  { name: "LPG HP Gas Connection", dept: "Utilities", icon: "🔥" },
  { name: "Income Tax Filing", dept: "Tax", icon: "📑" },
  { name: "Birth & Death Certificate", dept: "Registration", icon: "👶" },
  { name: "Parivahan", dept: "Transport", icon: "🚗" },
  { name: "LIC Insurance Premium", dept: "Insurance", icon: "🛡️" },
  { name: "e-Shram Registration", dept: "Labour", icon: "👷" },
  { name: "Sanchaya", dept: "Govt. Services", icon: "📁" },
  { name: "Election ID Card", dept: "Election", icon: "🗳️" },
  { name: "Chief Minister's Office", dept: "Grievance", icon: "🏢" },
  { name: "IDMS", dept: "Document Management", icon: "📄" },
  { name: "Kerala PCB Online", dept: "Pollution Control", icon: "🌳" },
  { name: "Kerala PSC", dept: "Recruitment", icon: "📝" },
  { name: "Ksmart", dept: "Smart City", icon: "🏙️" },
  { name: "Welfare Pension", dept: "Social Welfare", icon: "👵" },
  { name: "Sevana Pension", dept: "Pension", icon: "💰" },
  { name: "NEET (UG)", dept: "Education", icon: "📖" },
  { name: "IBPS", dept: "Banking", icon: "🏦" },
  { name: "SSC", dept: "Staff Selection", icon: "📋" },
  { name: "Revenue Department", dept: "Revenue", icon: "🏛️" },
  { name: "LSGD Kerala", dept: "Local Self Govt", icon: "🏘️" },
  { name: "Encumbrance Certificate", dept: "Registration", icon: "📜" },
  { name: "KEAM PORTAL", dept: "Engineering", icon: "⚙️" },
  { name: "e-District", dept: "Land Revenue", icon: "🗺️" },
  { name: "IRCTC", dept: "Railways", icon: "🚆" },
  { name: "Location Certificate", dept: "Village Office", icon: "📍" },
  { name: "Income Certificate", dept: "Village Office", icon: "📋" },
  { name: "Scholarship (NSP)", dept: "Education", icon: "🎓" },
]

export default ClientDashboard