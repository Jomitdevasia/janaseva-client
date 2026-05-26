import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import OnboardClient from './OnboardClient'
import ClientsList from './ClientsList'
import AdminTickets from './AdminTickets'
import {
  FiHome, FiUsers, FiUserPlus, FiMessageSquare,
  FiLogOut, FiFileText, FiClock
} from 'react-icons/fi'

const AdminDashboard = () => {
  const { logout, clients, tickets } = useContext(AppContext)
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState('dashboard')

  const handleLogout = () => {
    logout('admin')
    navigate('/login')
  }

  // Dashboard stats
  const totalClients = clients.length
  const pendingAadhaar = 154 // mock
  const pendingPAN = 89       // mock
  const activeTickets = tickets.filter(t => t.status !== 'Resolved').length

  // Mock service requests (first 3 clients)
  const recentRequests = clients.slice(0, 3).map((client, idx) => ({
    id: `REQ-${8291 + idx}`,
    name: client.fullName,
    service: idx === 0 ? 'Aadhaar Address Update' : (idx === 1 ? 'New PAN Application' : 'Income Certificate'),
    status: idx === 0 ? 'Pending' : (idx === 1 ? 'Approved' : 'Rejected'),
    date: idx === 0 ? 'Oct 24, 2024' : (idx === 1 ? 'Oct 23, 2024' : 'Oct 22, 2024')
  }))

  // Mock recent activities
  const recentActivities = [
    { text: 'Admin updated client #8291', time: '2 mins ago' },
    { text: 'Document Vault entry: PAN_Vikram_Final.pdf', time: '1 hour ago' },
    { text: `New client registered: ${clients[clients.length-1]?.fullName || 'S. Mehra'}`, time: '5 hours ago' },
    { text: 'System audit completed', time: 'Yesterday at 11:45 PM' }
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - dark background with visible inactive buttons */}
      <aside className="w-72 bg-gray-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Janaseva e-Seva</h2>
          <p className="text-gray-300 text-sm mt-1">Administrator Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <SidebarItem
            icon={<FiHome />}
            label="Dashboard"
            active={activePage === 'dashboard'}
            onClick={() => setActivePage('dashboard')}
          />
          <SidebarItem
            icon={<FiUsers />}
            label="Client Records"
            active={activePage === 'clients'}
            onClick={() => setActivePage('clients')}
          />
          <SidebarItem
            icon={<FiUserPlus />}
            label="Onboard Client"
            active={activePage === 'onboard'}
            onClick={() => setActivePage('onboard')}
          />
          <SidebarItem
            icon={<FiMessageSquare />}
            label="Service Tickets"
            active={activePage === 'tickets'}
            onClick={() => setActivePage('tickets')}
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
            {activePage === 'dashboard' && 'Dashboard'}
            {activePage === 'clients' && 'Client Records'}
            {activePage === 'onboard' && 'Onboard New Client'}
            {activePage === 'tickets' && 'Service Tickets'}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Administrator</span>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-8">
          {activePage === 'dashboard' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                  title="Total Registered Clients"
                  value={totalClients}
                  change="+12% from last month"
                  icon={<FiUsers className="text-3xl text-blue-600" />}
                  bg="bg-blue-50"
                />
                <StatCard
                  title="Pending Aadhaar"
                  value={pendingAadhaar}
                  sub="24 Urgent"
                  icon={<FiFileText className="text-3xl text-orange-600" />}
                  bg="bg-orange-50"
                />
                <StatCard
                  title="Pending PAN"
                  value={pendingPAN}
                  sub="Avg. wait: 2 days"
                  icon={<FiClock className="text-3xl text-green-600" />}
                  bg="bg-green-50"
                />
              </div>

              {/* Active Service Requests Table */}
              <div className="bg-white rounded-xl shadow-sm border mb-8">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Active Service Requests</h2>
                  <button className="text-blue-600 text-sm hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {recentRequests.map(req => (
                        <tr key={req.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium">{req.name}</div>
                            <div className="text-xs text-gray-500">{req.id}</div>
                          </td>
                          <td className="px-6 py-4">{req.service}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium
                              ${req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                req.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                'bg-red-100 text-red-700'}`}>
                              {req.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">{req.date}</td>
                          <td className="px-6 py-4">
                            <button className="text-blue-600 hover:underline text-sm">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold">Recent Activities</h2>
                </div>
                <div className="divide-y">
                  {recentActivities.map((activity, idx) => (
                    <div key={idx} className="px-6 py-3 flex justify-between items-center">
                      <span className="text-gray-700">{activity.text}</span>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activePage === 'clients' && <ClientsList />}
          {activePage === 'onboard' && <OnboardClient />}
          {activePage === 'tickets' && <AdminTickets />}
        </div>
      </main>
    </div>
  )
}

// SidebarItem component – clearly visible inactive state
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

// StatCard component – unchanged but uses explicit colors
const StatCard = ({ title, value, change, sub, icon, bg }) => (
  <div className={`${bg} rounded-xl p-5 shadow-sm border flex justify-between items-start`}>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
      {change && <p className="text-green-600 text-xs mt-1">{change}</p>}
      {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
    </div>
    <div className="opacity-80">{icon}</div>
  </div>
)

export default AdminDashboard