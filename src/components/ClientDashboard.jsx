import React, { useState, useContext } from 'react'
import { AppContext } from '../App'
import { useNavigate } from 'react-router-dom'
import { FiLogOut, FiPhone, FiMapPin, FiFlag, FiMessageSquare, FiList, FiHome } from 'react-icons/fi'
import RaiseTicket from './RaiseTicket'
import ClientTickets from './ClientTickets'

const ClientDashboard = () => {
  const { currentClient, clientLogout } = useContext(AppContext)
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('services')

  const handleLogout = () => {
    clientLogout()
    navigate('/login')
  }

  if (!currentClient) return <div className="p-10 text-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-800 text-white flex flex-col shadow-lg">
        <div className="p-5 border-b border-emerald-700">
          <h2 className="text-xl font-bold">Janaseva Portal</h2>
          <p className="text-emerald-200 text-sm mt-1">Client Dashboard</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveSection('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeSection === 'services' 
                ? 'bg-emerald-700 text-white' 
                : 'text-emerald-100 hover:bg-emerald-700/50'
            }`}
          >
            <FiHome className="text-lg" />
            <span>Services & Updates</span>
          </button>
          
          <button
            onClick={() => setActiveSection('raiseTicket')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeSection === 'raiseTicket' 
                ? 'bg-emerald-700 text-white' 
                : 'text-emerald-100 hover:bg-emerald-700/50'
            }`}
          >
            <FiMessageSquare className="text-lg" />
            <span>Raise Ticket</span>
          </button>
          
          <button
            onClick={() => setActiveSection('myTickets')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeSection === 'myTickets' 
                ? 'bg-emerald-700 text-white' 
                : 'text-emerald-100 hover:bg-emerald-700/50'
            }`}
          >
            <FiList className="text-lg" />
            <span>My Tickets</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-emerald-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-emerald-100 hover:bg-emerald-700/50 transition"
          >
            <FiLogOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Welcome, {currentClient.fullName.split(' ')[0]}</h1>
            <div className="text-sm text-gray-500">Client ID: JAN-{currentClient.id.slice(-6)}</div>
          </div>
        </header>

        <div className="p-6">
          {/* Profile Summary Card */}
          <div className="bg-white rounded-xl shadow-md p-5 mb-6 border-l-8 border-emerald-600">
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
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                    currentClient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {currentClient.status}
                  </span>
                </p>
                <p><FiMapPin className="inline mr-2" /> Jurisdiction: Nodal IT Office, New Delhi</p>
              </div>
            </div>
          </div>

          {/* Dynamic Content based on active section */}
          {activeSection === 'services' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-5">
                <h3 className="text-lg font-bold flex items-center gap-2">📄 Government Services</h3>
                <div className="mt-4 space-y-3">
                  <ServiceLink title="PAN Card Registration / Renewal" description="Apply for new PAN or update existing" icon="🆔" />
                  <ServiceLink title="Aadhaar Enrollment" description="Biometric identity registration & update" icon="👤" />
                  <ServiceLink title="Voter ID Card" description="New registration or address change" icon="🗳️" />
                  <ServiceLink title="Driving License" description="Renewal & address change services" icon="🚗" />
                  <ServiceLink title="Health Card (ABHA)" description="Digital health ID creation" icon="🏥" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-5">
                <h3 className="text-lg font-bold">📄 Recent Activity</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="border-l-4 border-emerald-500 pl-3">✅ Document vault updated - Voter ID proof added (Yesterday)</div>
                  <div className="border-l-4 border-blue-500 pl-3">🔄 PAN application status: In Progress (Oct 01, 2023)</div>
                  <div className="border-l-4 border-gray-300 pl-3">📎 Passport.jpg submitted to vault</div>
                </div>
                <div className="mt-6 p-3 bg-gray-50 rounded">
                  <p className="font-semibold">📌 Document Vault (Demo)</p>
                  <p className="text-xs text-gray-600">Ashishar_Card_2023.pdf • Passport_Front.jpg • Water_JD_Corp.pdf</p>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'raiseTicket' && <RaiseTicket />}
          {activeSection === 'myTickets' && <ClientTickets />}
        </div>
      </main>
    </div>
  )
}

// Service button component (same as before)
const ServiceLink = ({ title, description, icon }) => {
  const handleClick = () => {
    alert(`🚀 Service: ${title}\n(This is a demo. In the real website, you would fill an application form.)`)
  }
  return (
    <button onClick={handleClick} className="w-full text-left p-3 border rounded-lg hover:bg-emerald-50 transition flex items-start gap-3">
      <div className="text-2xl">{icon}</div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </button>
  )
}

export default ClientDashboard