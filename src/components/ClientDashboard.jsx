import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../App'
import { useNavigate } from 'react-router-dom'
import { FiLogOut, FiPhone, FiMapPin, FiFlag, FiMessageSquare, FiList, FiHome } from 'react-icons/fi'
import RaiseTicket from './RaiseTicket'
import ClientTickets from './ClientTickets'

const ClientDashboard = () => {
  const { currentClient, logout, tickets, refreshData } = useContext(AppContext)
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('services')

  useEffect(() => {
    refreshData()
  }, [])

  const handleLogout = () => {
    logout('client')
    navigate('/login')
  }

  if (!currentClient) return <div className="p-10 text-center">Loading...</div>

  // Filter tickets for this client only
  const myTickets = tickets.filter(t => t.clientId === currentClient.id)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar (same as before) */}
      <aside className="w-64 bg-emerald-800 text-white flex flex-col shadow-lg">
        <div className="p-5 border-b border-emerald-700">
          <h2 className="text-xl font-bold">Janaseva Portal</h2>
          <p className="text-emerald-200 text-sm mt-1">Client Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveSection('services')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeSection === 'services' ? 'bg-emerald-700' : 'hover:bg-emerald-700/50'}`}><FiHome /> Services & Updates</button>
          <button onClick={() => setActiveSection('raiseTicket')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeSection === 'raiseTicket' ? 'bg-emerald-700' : 'hover:bg-emerald-700/50'}`}><FiMessageSquare /> Raise Ticket</button>
          <button onClick={() => setActiveSection('myTickets')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeSection === 'myTickets' ? 'bg-emerald-700' : 'hover:bg-emerald-700/50'}`}><FiList /> My Tickets</button>
        </nav>
        <div className="p-4 border-t border-emerald-700">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-700/50"><FiLogOut /> Logout</button>
        </div>
      </aside>

      {/* Main content – same UI but passes myTickets to child components */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm px-6 py-4">
          <h1 className="text-2xl font-bold">Welcome, {currentClient.fullName.split(' ')[0]}</h1>
        </header>
        <div className="p-6">
          {/* Profile card */}
          <div className="bg-white rounded-xl shadow-md p-5 mb-6 border-l-8 border-emerald-600">
            <div className="grid md:grid-cols-2 gap-4">
              <div><h3 className="font-bold">📋 Account Details</h3><p>{currentClient.fullName}</p><p>{currentClient.businessName || '—'}</p><p>{currentClient.locality}</p><p>{currentClient.address}</p></div>
              <div><h3 className="font-bold">📞 Contact</h3><p><FiPhone className="inline mr-2" /> {currentClient.mobile}</p><p><FiFlag className="inline mr-2" /> Status: <span className={`px-2 py-0.5 rounded text-xs ${currentClient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{currentClient.status}</span></p></div>
            </div>
          </div>

          {activeSection === 'services' && <ServicesSection />}
          {activeSection === 'raiseTicket' && <RaiseTicket />}
          {activeSection === 'myTickets' && <ClientTickets myTickets={myTickets} />}
        </div>
      </main>
    </div>
  )
}

const ServicesSection = () => {
  const services = [
    { title: "PAN Card Registration / Renewal", icon: "🆔", desc: "Apply for new PAN or update" },
    { title: "Aadhaar Enrollment", icon: "👤", desc: "Biometric identity registration" },
    { title: "Voter ID Card", icon: "🗳️", desc: "New registration or address change" },
    { title: "Driving License", icon: "🚗", desc: "Renewal & address change" },
    { title: "Health Card (ABHA)", icon: "🏥", desc: "Digital health ID creation" }
  ]
  const handleClick = (title) => alert(`🚀 Service: ${title}\n(Demo – real form would open.)`)
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="text-lg font-bold">📄 Government Services</h3>
        <div className="mt-4 space-y-3">
          {services.map(s => (
            <button key={s.title} onClick={() => handleClick(s.title)} className="w-full text-left p-3 border rounded-lg hover:bg-emerald-50 flex gap-3">
              <div className="text-2xl">{s.icon}</div><div><div className="font-semibold">{s.title}</div><div className="text-xs text-gray-500">{s.desc}</div></div>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="text-lg font-bold">📄 Recent Activity</h3>
        <div className="mt-4 space-y-2 text-sm border-l-4 border-emerald-500 pl-3">✅ Demo activity – document uploads</div>
        <div className="mt-6 p-3 bg-gray-50 rounded"><p className="font-semibold">📌 Document Vault (Demo)</p><p className="text-xs">Sample.pdf, Photo.jpg</p></div>
      </div>
    </div>
  )
}

export default ClientDashboard