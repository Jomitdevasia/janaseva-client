
// import React, { useState, useContext, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../../App'
// import OnboardClient from './OnboardClient'
// import ClientsList from './ClientsList'
// import AdminTickets from './AdminTickets'
// import {
//   FiHome, FiUsers, FiUserPlus, FiMessageSquare,
//   FiLogOut, FiFileText, FiClock, FiTrendingUp,
//   FiActivity, FiCheckCircle, FiAlertCircle, FiCalendar,
//   FiMenu, FiX, FiUser, FiChevronDown, FiEye, FiEyeOff
// } from 'react-icons/fi'

// const AdminDashboard = () => {
//   const { logout, clients, tickets } = useContext(AppContext)
//   // const navigate = useNavigate()
//    const [activePage, setActivePage] = useState('dashboard')
//   const [sidebarOpen, setSidebarOpen] = useState(true)
//   const [showProfileMenu, setShowProfileMenu] = useState(false)
//   const [isMobile, setIsMobile] = useState(false)

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const mobile = window.innerWidth < 1024
//       setIsMobile(mobile)
//       if (mobile) {
//         setSidebarOpen(false)
//       } else {
//         setSidebarOpen(true)
//       }
//     }
//     checkScreenSize()
//     window.addEventListener('resize', checkScreenSize)
//     return () => window.removeEventListener('resize', checkScreenSize)
//   }, [])

//   const handleLogout = () => {
//     logout('admin')
//     navigate('/login')
//   }

//   const totalClients = clients.length
//   const pendingAadhaar = 154
//   const pendingPAN = 89
//   const activeTickets = tickets.filter(t => t.status !== 'Resolved').length
//   const resolvedThisMonth = 47

//   const recentRequests = clients.slice(0, 5).map((client, idx) => ({
//     id: `REQ-${8291 + idx}`,
//     name: client.fullName,
//     service: idx === 0 ? 'Aadhaar Address Update' : (idx === 1 ? 'New PAN Application' : (idx === 2 ? 'Income Certificate' : (idx === 3 ? 'Caste Certificate' : 'Domicile Certificate'))),
//     status: idx === 0 ? 'Pending' : (idx === 1 ? 'Approved' : (idx === 2 ? 'Rejected' : (idx === 3 ? 'In Review' : 'Pending'))),
//     date: idx === 0 ? 'Oct 24, 2024' : (idx === 1 ? 'Oct 23, 2024' : (idx === 2 ? 'Oct 22, 2024' : (idx === 3 ? 'Oct 21, 2024' : 'Oct 20, 2024'))),
//     priority: idx === 0 ? 'High' : (idx === 1 ? 'Medium' : (idx === 2 ? 'Low' : 'High'))
//   }))

//   const recentActivities = [
//     { text: 'Admin updated client #8291 - Document verification completed', time: '2 mins ago', type: 'success' },
//     { text: 'Document Vault: PAN_Vikram_Final.pdf uploaded', time: '1 hour ago', type: 'info' },
//     { text: `New client registered: ${clients[clients.length-1]?.fullName || 'S. Mehra'}`, time: '5 hours ago', type: 'success' },
//     { text: 'System security audit completed - All protocols verified', time: 'Yesterday at 11:45 PM', type: 'info' },
//     { text: 'Monthly report generated - 15% growth in registrations', time: 'Yesterday at 6:30 PM', type: 'warning' }
//   ]

//   return (
//     <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
//       {/* Overlay for mobile */}
//       {isMobile && sidebarOpen && (
//         <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)}></div>
//       )}

//       <div className="flex h-full">
//         {/* Sidebar - Fixed positioning */}
//         <aside className={`fixed lg:relative z-50 h-full transition-all duration-300 ${
//           sidebarOpen ? 'translate-x-0 w-80' : '-translate-x-full lg:translate-x-0 lg:w-20'
//         }`}>
//           <div className={`h-full bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 shadow-2xl flex flex-col overflow-y-auto overflow-x-hidden transition-all duration-300 ${
//             sidebarOpen ? 'w-80' : 'w-20'
//           }`}>
//             <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
//             <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
            
//             {/* Sidebar Header with Toggle */}
//             <div className="relative z-10 p-5 border-b border-gray-700/50 flex justify-between items-center">
//               {sidebarOpen ? (
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
//                     <span className="text-white font-bold text-xl">JS</span>
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Janaseva e-Seva</h2>
//                     <p className="text-gray-400 text-xs tracking-wide">ADMIN PORTAL</p>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="w-10 h-10 mx-auto bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
//                   <span className="text-white font-bold text-lg">JS</span>
//                 </div>
//               )}
//               <button 
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//                 className="p-1.5 hover:bg-white/10 rounded-lg transition"
//               >
//                 {sidebarOpen ? <FiX className="w-4 h-4 text-gray-400" /> : <FiMenu className="w-4 h-4 text-gray-400" />}
//               </button>
//             </div>

//             {sidebarOpen && (
//               <div className="relative z-10 px-5 pt-3 pb-4 border-b border-gray-700/50">
//                 <div className="flex items-center gap-2 text-xs">
//                   <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">v3.0</span>
//                   <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">Secure Access</span>
//                 </div>
//               </div>
//             )}

//             {/* Navigation */}
//             <nav className="flex-1 p-4 space-y-1.5">
//               <SidebarItem
//                 icon={<FiHome />}
//                 label="Dashboard"
//                 active={activePage === 'dashboard'}
//                 onClick={() => setActivePage('dashboard')}
//                 collapsed={!sidebarOpen}
//               />
//               <SidebarItem
//                 icon={<FiUsers />}
//                 label="Client Records"
//                 active={activePage === 'clients'}
//                 onClick={() => setActivePage('clients')}
//                 badge={totalClients}
//                 collapsed={!sidebarOpen}
//               />
//               <SidebarItem
//                 icon={<FiUserPlus />}
//                 label="Onboard Client"
//                 active={activePage === 'onboard'}
//                 onClick={() => setActivePage('onboard')}
//                 collapsed={!sidebarOpen}
//               />
//               <SidebarItem
//                 icon={<FiMessageSquare />}
//                 label="Service Tickets"
//                 active={activePage === 'tickets'}
//                 onClick={() => setActivePage('tickets')}
//                 badge={activeTickets}
//                 collapsed={!sidebarOpen}
//               />
//             </nav>

//             {sidebarOpen && (
//               <div className="relative z-10 p-5 border-t border-gray-700/50">
//                 <div className="bg-gray-800/50 rounded-xl p-3">
//                   <div className="flex items-center gap-2 mb-2">
//                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                     <p className="text-xs text-gray-400">System Online</p>
//                   </div>
//                   <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
//                     <div className="w-3/4 h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </aside>

//         {/* Main Content - Scrollable */}
//         <main className={`flex-1 overflow-y-auto h-full transition-all duration-300 ${sidebarOpen && !isMobile ? 'lg:ml-80' : 'ml-0'}`}>
//           {/* Header with Profile & Logout - Sticky */}
//           <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-20">
//             <div className="px-6 py-4 flex justify-between items-center">
//               <div className="flex items-center gap-3">
//                 <button 
//                   onClick={() => setSidebarOpen(!sidebarOpen)}
//                   className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
//                 >
//                   <FiMenu className="w-5 h-5 text-gray-600" />
//                 </button>
//                 <div>
//                   <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                     {activePage === 'dashboard' && 'Admin Dashboard'}
//                     {activePage === 'clients' && 'Client Management'}
//                     {activePage === 'onboard' && 'New Client Onboarding'}
//                     {activePage === 'tickets' && 'Support Tickets'}
//                   </h1>
//                   <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">
//                     {activePage === 'dashboard' && 'Monitor and manage all platform activities'}
//                     {activePage === 'clients' && 'View and manage registered clients'}
//                     {activePage === 'onboard' && 'Register new clients to the system'}
//                     {activePage === 'tickets' && 'Handle client support tickets'}
//                   </p>
//                 </div>
//               </div>

//               {/* Profile Dropdown with Logout */}
//               <div className="relative">
//                 <button
//                   onClick={() => setShowProfileMenu(!showProfileMenu)}
//                   className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
//                 >
//                   <div className="text-right hidden sm:block">
//                     <p className="text-sm font-semibold text-gray-800">Admin User</p>
//                     <p className="text-xs text-gray-500">Super Administrator</p>
//                   </div>
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-md">
//                     AD
//                   </div>
//                   <FiChevronDown className={`text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
//                 </button>

//                 {showProfileMenu && (
//                   <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
//                     <div className="px-4 py-3 border-b border-gray-100">
//                       <p className="text-sm font-bold text-gray-800">Admin User</p>
//                       <p className="text-xs text-gray-500">admin@janaseva.gov</p>
//                       <p className="text-xs text-emerald-600 mt-1">Super Administrator</p>
//                     </div>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
//                     >
//                       <FiLogOut className="w-4 h-4" />
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </header>

//           <div className="p-6">
//             {activePage === 'dashboard' && (
//               <>
//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
//                   <StatCard
//                     title="Total Clients"
//                     value={totalClients}
//                     change="+12%"
//                     icon={<FiUsers />}
//                     color="blue"
//                   />
//                   <StatCard
//                     title="Pending Aadhaar"
//                     value={pendingAadhaar}
//                     sub="24 urgent"
//                     icon={<FiFileText />}
//                     color="orange"
//                   />
//                   <StatCard
//                     title="Pending PAN"
//                     value={pendingPAN}
//                     sub="Avg wait: 2 days"
//                     icon={<FiClock />}
//                     color="green"
//                   />
//                   <StatCard
//                     title="Active Tickets"
//                     value={activeTickets}
//                     sub={`${resolvedThisMonth} resolved`}
//                     icon={<FiMessageSquare />}
//                     color="purple"
//                   />
//                 </div>

//                 {/* Charts Row */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//                   <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//                     <div className="flex justify-between items-center mb-4">
//                       <h2 className="text-lg font-semibold text-gray-800">Service Request Trends</h2>
//                       <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">+23% this week</span>
//                     </div>
//                     <div className="flex items-end gap-3 h-48">
//                       {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
//                         <div key={day} className="flex-1 flex flex-col items-center gap-2">
//                           <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-lg" 
//                                style={{ height: `${45 + Math.sin(i) * 20 + 10}px` }}></div>
//                           <span className="text-xs text-gray-500">{day}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
//                     <div className="flex justify-between items-start mb-4">
//                       <div>
//                         <p className="text-gray-400 text-sm">Resolution Rate</p>
//                         <p className="text-3xl font-bold mt-1">94<span className="text-lg">%</span></p>
//                       </div>
//                       <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
//                         <FiCheckCircle className="text-emerald-400 text-2xl" />
//                       </div>
//                     </div>
//                     <div className="mt-4">
//                       <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
//                         <div className="w-[94%] h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Service Requests Table */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
//                   <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
//                     <h2 className="text-lg font-semibold text-gray-800">Active Service Requests</h2>
//                     <button className="text-blue-600 text-sm font-medium">View All</button>
//                   </div>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Client</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Service</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Priority</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Date</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Action</th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-gray-100">
//                         {recentRequests.map((req, idx) => (
//                           <tr key={idx} className="hover:bg-gray-50 transition">
//                             <td className="px-6 py-4">
//                               <div className="font-medium text-gray-800">{req.name}</div>
//                               <div className="text-xs text-gray-400">{req.id}</div>
//                             </td>
//                             <td className="px-6 py-4 text-gray-600">{req.service}</td>
//                             <td className="px-6 py-4">
//                               <StatusBadge status={req.status} />
//                             </td>
//                             <td className="px-6 py-4">
//                               <PriorityBadge priority={req.priority} />
//                             </td>
//                             <td className="px-6 py-4 text-gray-500 text-sm">{req.date}</td>
//                             <td className="px-6 py-4">
//                               <button className="text-blue-600 hover:text-blue-800 text-sm">Review →</button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>

//                 {/* Recent Activities */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
//                     <div className="px-6 py-4 border-b border-gray-100">
//                       <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
//                     </div>
//                     <div className="divide-y divide-gray-100">
//                       {recentActivities.map((activity, idx) => (
//                         <div key={idx} className="px-6 py-3 flex justify-between items-center">
//                           <span className="text-gray-700 text-sm">{activity.text}</span>
//                           <span className="text-xs text-gray-400">{activity.time}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
//                     <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
//                     <div className="grid grid-cols-2 gap-3">
//                       <button className="bg-white rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:shadow-md transition border border-gray-200">
//                         Generate Report
//                       </button>
//                       <button className="bg-white rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:shadow-md transition border border-gray-200">
//                         Bulk Upload
//                       </button>
//                       <button className="bg-white rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:shadow-md transition border border-gray-200">
//                         Send Notification
//                       </button>
//                       <button className="bg-white rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:shadow-md transition border border-gray-200">
//                         Export Data
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}

//             {activePage === 'clients' && <ClientsListWithPasswordView />}
//             {activePage === 'onboard' && <OnboardClient />}
//             {activePage === 'tickets' && <AdminTickets />}
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// // Sidebar Item Component with Collapse Support
// const SidebarItem = ({ icon, label, active, onClick, badge, collapsed }) => (
//   <button
//     onClick={onClick}
//     className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-between'} gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
//       ${active 
//         ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
//         : 'text-gray-400 hover:bg-white/10 hover:text-white'
//       }`}
//     title={collapsed ? label : ''}
//   >
//     <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
//       <span className="text-xl">{icon}</span>
//       {!collapsed && <span className="font-medium">{label}</span>}
//     </div>
//     {!collapsed && badge && (
//       <span className={`text-xs px-2 py-0.5 rounded-full ${active ? 'bg-white/20' : 'bg-gray-700'}`}>
//         {badge}
//       </span>
//     )}
//   </button>
// )

// // Stat Card Component
// const StatCard = ({ title, value, change, sub, icon, color }) => {
//   const colors = {
//     blue: 'from-blue-50 to-blue-100 border-blue-200',
//     orange: 'from-orange-50 to-orange-100 border-orange-200',
//     green: 'from-emerald-50 to-emerald-100 border-emerald-200',
//     purple: 'from-purple-50 to-purple-100 border-purple-200'
//   }
//   return (
//     <div className={`bg-gradient-to-br ${colors[color]} rounded-2xl p-5 shadow-sm border`}>
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-gray-600 text-sm">{title}</p>
//           <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
//           {change && <p className="text-green-600 text-xs mt-1">{change}</p>}
//           {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
//         </div>
//         <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center">
//           <div className="text-gray-600 text-xl">{icon}</div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Status Badge
// const StatusBadge = ({ status }) => {
//   const styles = {
//     'Pending': 'bg-amber-100 text-amber-700',
//     'Approved': 'bg-emerald-100 text-emerald-700',
//     'Rejected': 'bg-red-100 text-red-700',
//     'In Review': 'bg-blue-100 text-blue-700'
//   }
//   return (
//     <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.Pending}`}>
//       {status}
//     </span>
//   )
// }

// // Priority Badge
// const PriorityBadge = ({ priority }) => {
//   const styles = {
//     'High': 'bg-red-100 text-red-700',
//     'Medium': 'bg-amber-100 text-amber-700',
//     'Low': 'bg-green-100 text-green-700'
//   }
//   return (
//     <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[priority] || styles.Medium}`}>
//       {priority}
//     </span>
//   )
// }

// // Enhanced Clients List with Password View
// const ClientsListWithPasswordView = () => {
//   const { clients, updateClientStatus } = useContext(AppContext)
//   const [filter, setFilter] = useState('all')
//   const [showPassword, setShowPassword] = useState({})

//   const togglePasswordView = (clientId) => {
//     setShowPassword(prev => ({ ...prev, [clientId]: !prev[clientId] }))
//   }

//   const filteredClients = filter === 'all'
//     ? clients
//     : clients.filter(c => c.status === filter)

//   const handleStatusChange = async (clientId, newStatus) => {
//     await updateClientStatus(clientId, newStatus)
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">Client Records</h2>
//           <p className="text-gray-500 text-sm">Manage and monitor all registered clients</p>
//         </div>
//         <div className="flex gap-2 flex-wrap">
//           <button
//             onClick={() => setFilter('all')}
//             className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
//               filter === 'all' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border text-gray-600'
//             }`}
//           >
//             All ({clients.length})
//           </button>
//           <button
//             onClick={() => setFilter('Active')}
//             className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
//               filter === 'Active' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border text-gray-600'
//             }`}
//           >
//             Active ({clients.filter(c => c.status === 'Active').length})
//           </button>
//           <button
//             onClick={() => setFilter('Deactive')}
//             className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
//               filter === 'Deactive' ? 'bg-red-600 text-white shadow-md' : 'bg-white border text-gray-600'
//             }`}
//           >
//             Deactive ({clients.filter(c => c.status === 'Deactive').length})
//           </button>
//         </div>
//       </div>

//       {filteredClients.length === 0 ? (
//         <div className="bg-white rounded-2xl p-12 text-center border">
//           <p className="text-gray-500">No clients found</p>
//         </div>
//       ) : (
//         <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full">
//               <thead className="bg-gray-50 border-b">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Client</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Username</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Password</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Mobile</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Status</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {filteredClients.map(client => (
//                   <tr key={client.id} className="hover:bg-gray-50 transition">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
//                           {client.fullName?.charAt(0).toUpperCase()}
//                         </div>
//                         <div>
//                           <div className="font-medium text-gray-800">{client.fullName}</div>
//                           <div className="text-xs text-gray-400">{client.businessName}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="font-mono text-sm text-gray-600">{client.username}</span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <span className="font-mono text-sm text-gray-600">
//                           {showPassword[client.id] ? client.password : '••••••••'}
//                         </span>
//                         <button
//                           onClick={() => togglePasswordView(client.id)}
//                           className="p-1 hover:bg-gray-100 rounded-lg transition"
//                         >
//                           {showPassword[client.id] ? <FiEyeOff className="w-4 h-4 text-gray-500" /> : <FiEye className="w-4 h-4 text-gray-500" />}
//                         </button>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-gray-600">{client.mobile}</td>
//                     <td className="px-6 py-4">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         client.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
//                       }`}>
//                         {client.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <select
//                         value={client.status}
//                         onChange={(e) => handleStatusChange(client.id, e.target.value)}
//                         className="border rounded-lg p-1.5 text-sm bg-white"
//                       >
//                         <option value="Active">Activate</option>
//                         <option value="Deactive">Deactivate</option>
//                       </select>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AdminDashboard
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import OnboardClient from './OnboardClient'
import ClientsList from './ClientsList'
import AdminTickets from './AdminTickets'
import {
  FiHome, FiUsers, FiUserPlus, FiMessageSquare,
  FiLogOut, FiFileText, FiClock, FiTrendingUp,
  FiActivity, FiCheckCircle, FiAlertCircle, FiCalendar,
  FiMenu, FiX, FiUser, FiChevronDown, FiEye, FiEyeOff
} from 'react-icons/fi'

const AdminDashboard = () => {
  const { logout, clients, tickets } = useContext(AppContext)
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
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
  }, [])

  const handleLogout = () => {
    logout('admin')
    navigate('/login')
  }

  const totalClients = clients.length
  const pendingAadhaar = 154
  const pendingPAN = 89
  const activeTickets = tickets.filter(t => t.status !== 'Resolved').length
  const resolvedThisMonth = 47

  const recentRequests = clients.slice(0, 5).map((client, idx) => ({
    id: `REQ-${8291 + idx}`,
    name: client.fullName,
    service: idx === 0 ? 'Aadhaar Address Update' : (idx === 1 ? 'New PAN Application' : (idx === 2 ? 'Income Certificate' : (idx === 3 ? 'Caste Certificate' : 'Domicile Certificate'))),
    status: idx === 0 ? 'Pending' : (idx === 1 ? 'Approved' : (idx === 2 ? 'Rejected' : (idx === 3 ? 'In Review' : 'Pending'))),
    date: idx === 0 ? 'Oct 24, 2024' : (idx === 1 ? 'Oct 23, 2024' : (idx === 2 ? 'Oct 22, 2024' : (idx === 3 ? 'Oct 21, 2024' : 'Oct 20, 2024'))),
    priority: idx === 0 ? 'High' : (idx === 1 ? 'Medium' : (idx === 2 ? 'Low' : 'High'))
  }))

  const recentActivities = [
    { text: 'Admin updated client #8291 - Document verification completed', time: '2 mins ago', type: 'success' },
    { text: 'Document Vault: PAN_Vikram_Final.pdf uploaded', time: '1 hour ago', type: 'info' },
    { text: `New client registered: ${clients[clients.length-1]?.fullName || 'S. Mehra'}`, time: '5 hours ago', type: 'success' },
    { text: 'System security audit completed - All protocols verified', time: 'Yesterday at 11:45 PM', type: 'info' },
    { text: 'Monthly report generated - 15% growth in registrations', time: 'Yesterday at 6:30 PM', type: 'warning' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar - using fixed positioning */}
      <div className={`fixed top-0 left-0 z-50 h-full transition-all duration-300 ${
        sidebarOpen ? 'w-80' : 'w-20'
      }`}>
        <div className="h-full bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 shadow-2xl flex flex-col overflow-y-auto overflow-x-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
          
          {/* Sidebar Header with Toggle */}
          <div className="relative z-10 p-5 border-b border-gray-700/50 flex justify-between items-center">
            {sidebarOpen ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">JS</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Janaseva e-Seva</h2>
                  <p className="text-gray-400 text-xs tracking-wide">ADMIN PORTAL</p>
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">JS</span>
              </div>
            )}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 hover:bg-white/10 rounded-lg transition"
            >
              {sidebarOpen ? <FiX className="w-4 h-4 text-gray-400" /> : <FiMenu className="w-4 h-4 text-gray-400" />}
            </button>
          </div>

          {sidebarOpen && (
            <div className="relative z-10 px-5 pt-3 pb-4 border-b border-gray-700/50">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">v3.0</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">Secure Access</span>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1.5">
            <SidebarItem
              icon={<FiHome />}
              label="Dashboard"
              active={activePage === 'dashboard'}
              onClick={() => setActivePage('dashboard')}
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<FiUsers />}
              label="Client Records"
              active={activePage === 'clients'}
              onClick={() => setActivePage('clients')}
              badge={totalClients}
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<FiUserPlus />}
              label="Onboard Client"
              active={activePage === 'onboard'}
              onClick={() => setActivePage('onboard')}
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<FiMessageSquare />}
              label="Service Tickets"
              active={activePage === 'tickets'}
              onClick={() => setActivePage('tickets')}
              badge={activeTickets}
              collapsed={!sidebarOpen}
            />
          </nav>

          {sidebarOpen && (
            <div className="relative z-10 p-5 border-t border-gray-700/50">
              <div className="bg-gray-800/50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-xs text-gray-400">System Online</p>
                </div>
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content - with dynamic margin-left that matches sidebar width */}
      <div className={`transition-all duration-300 min-h-screen ${
        sidebarOpen ? 'ml-80' : 'ml-20'
      }`}>
        {/* Header with Profile & Logout - Sticky */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-20">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition lg:hidden"
              >
                <FiMenu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {activePage === 'dashboard' && 'Admin Dashboard'}
                  {activePage === 'clients' && 'Client Management'}
                  {activePage === 'onboard' && 'New Client Onboarding'}
                  {activePage === 'tickets' && 'Support Tickets'}
                </h1>
                <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">
                  {activePage === 'dashboard' && 'Monitor and manage all platform activities'}
                  {activePage === 'clients' && 'View and manage registered clients'}
                  {activePage === 'onboard' && 'Register new clients to the system'}
                  {activePage === 'tickets' && 'Handle client support tickets'}
                </p>
              </div>
            </div>

            {/* Profile Dropdown with Logout */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-500">Super Administrator</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-md">
                  AD
                </div>
                <FiChevronDown className={`text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-800">Admin User</p>
                    <p className="text-xs text-gray-500">admin@janaseva.gov</p>
                    <p className="text-xs text-emerald-600 mt-1">Super Administrator</p>
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
        </header>

        <div className="p-6">
          {activePage === 'dashboard' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <StatCard
                  title="Total Clients"
                  value={totalClients}
                  change="+12%"
                  icon={<FiUsers />}
                  color="blue"
                />
                <StatCard
                  title="Pending Aadhaar"
                  value={pendingAadhaar}
                  sub="24 urgent"
                  icon={<FiFileText />}
                  color="orange"
                />
                <StatCard
                  title="Pending PAN"
                  value={pendingPAN}
                  sub="Avg wait: 2 days"
                  icon={<FiClock />}
                  color="green"
                />
                <StatCard
                  title="Active Tickets"
                  value={activeTickets}
                  sub={`${resolvedThisMonth} resolved`}
                  icon={<FiMessageSquare />}
                  color="purple"
                />
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Service Request Trends</h2>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">+23% this week</span>
                  </div>
                  <div className="flex items-end gap-3 h-48">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                      <div key={day} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-lg" 
                             style={{ height: `${45 + Math.sin(i) * 20 + 10}px` }}></div>
                        <span className="text-xs text-gray-500">{day}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Resolution Rate</p>
                      <p className="text-3xl font-bold mt-1">94<span className="text-lg">%</span></p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <FiCheckCircle className="text-emerald-400 text-2xl" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-[94%] h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Requests Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Active Service Requests</h2>
                  <button className="text-blue-600 text-sm font-medium">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {recentRequests.map((req, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-800">{req.name}</div>
                            <div className="text-xs text-gray-400">{req.id}</div>
                           </td>
                          <td className="px-6 py-4 text-gray-600">{req.service}</td>
                          <td className="px-6 py-4">
                            <StatusBadge status={req.status} />
                           </td>
                          <td className="px-6 py-4">
                            <PriorityBadge priority={req.priority} />
                           </td>
                          <td className="px-6 py-4 text-gray-500 text-sm">{req.date}</td>
                          <td className="px-6 py-4">
                            <button className="text-blue-600 hover:text-blue-800 text-sm">Review →</button>
                           </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {recentActivities.map((activity, idx) => (
                      <div key={idx} className="px-6 py-3 flex justify-between items-center">
                        <span className="text-gray-700 text-sm">{activity.text}</span>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-white rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:shadow-md transition border border-gray-200">
                      Generate Report
                    </button>
                    <button className="bg-white rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:shadow-md transition border border-gray-200">
                      Bulk Upload
                    </button>
                    <button className="bg-white rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:shadow-md transition border border-gray-200">
                      Send Notification
                    </button>
                    <button className="bg-white rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:shadow-md transition border border-gray-200">
                      Export Data
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* {activePage === 'clients' && <ClientsListWithPasswordView />} */}
          {activePage === 'clients' && <ClientsList />}
          {activePage === 'onboard' && <OnboardClient />}
          {activePage === 'tickets' && <AdminTickets />}
        </div>
      </div>
    </div>
  )
}

// Sidebar Item Component with Collapse Support
const SidebarItem = ({ icon, label, active, onClick, badge, collapsed }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-between'} gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
      ${active 
        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
        : 'text-gray-400 hover:bg-white/10 hover:text-white'
      }`}
    title={collapsed ? label : ''}
  >
    <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
      <span className="text-xl">{icon}</span>
      {!collapsed && <span className="font-medium">{label}</span>}
    </div>
    {!collapsed && badge && (
      <span className={`text-xs px-2 py-0.5 rounded-full ${active ? 'bg-white/20' : 'bg-gray-700'}`}>
        {badge}
      </span>
    )}
  </button>
)

// Stat Card Component
const StatCard = ({ title, value, change, sub, icon, color }) => {
  const colors = {
    blue: 'from-blue-50 to-blue-100 border-blue-200',
    orange: 'from-orange-50 to-orange-100 border-orange-200',
    green: 'from-emerald-50 to-emerald-100 border-emerald-200',
    purple: 'from-purple-50 to-purple-100 border-purple-200'
  }
  return (
    <div className={`bg-gradient-to-br ${colors[color]} rounded-2xl p-5 shadow-sm border`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          {change && <p className="text-green-600 text-xs mt-1">{change}</p>}
          {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
        </div>
        <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center">
          <div className="text-gray-600 text-xl">{icon}</div>
        </div>
      </div>
    </div>
  )
}

// Status Badge
const StatusBadge = ({ status }) => {
  const styles = {
    'Pending': 'bg-amber-100 text-amber-700',
    'Approved': 'bg-emerald-100 text-emerald-700',
    'Rejected': 'bg-red-100 text-red-700',
    'In Review': 'bg-blue-100 text-blue-700'
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  )
}

// Priority Badge
const PriorityBadge = ({ priority }) => {
  const styles = {
    'High': 'bg-red-100 text-red-700',
    'Medium': 'bg-amber-100 text-amber-700',
    'Low': 'bg-green-100 text-green-700'
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[priority] || styles.Medium}`}>
      {priority}
    </span>
  )
}

// Enhanced Clients List with Password View
const ClientsListWithPasswordView = () => {
  const { clients, updateClientStatus } = useContext(AppContext)
  const [filter, setFilter] = useState('all')
  const [showPassword, setShowPassword] = useState({})

  const togglePasswordView = (clientId) => {
    setShowPassword(prev => ({ ...prev, [clientId]: !prev[clientId] }))
  }

  const filteredClients = filter === 'all'
    ? clients
    : clients.filter(c => c.status === filter)

  const handleStatusChange = async (clientId, newStatus) => {
    await updateClientStatus(clientId, newStatus)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Client Records</h2>
          <p className="text-gray-500 text-sm">Manage and monitor all registered clients</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === 'all' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border text-gray-600'
            }`}
          >
            All ({clients.length})
          </button>
          <button
            onClick={() => setFilter('Active')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === 'Active' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border text-gray-600'
            }`}
          >
            Active ({clients.filter(c => c.status === 'Active').length})
          </button>
          <button
            onClick={() => setFilter('Deactive')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === 'Deactive' ? 'bg-red-600 text-white shadow-md' : 'bg-white border text-gray-600'
            }`}
          >
            Deactive ({clients.filter(c => c.status === 'Deactive').length})
          </button>
        </div>
      </div>

      {filteredClients.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border">
          <p className="text-gray-500">No clients found</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Client</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Username</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Password</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Mobile</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredClients.map(client => (
                  <tr key={client.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                          {client.fullName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{client.fullName}</div>
                          <div className="text-xs text-gray-400">{client.businessName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-gray-600">{client.username}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-gray-600">
                          {showPassword[client.id] ? client.password : '••••••••'}
                        </span>
                        <button
                          onClick={() => togglePasswordView(client.id)}
                          className="p-1 hover:bg-gray-100 rounded-lg transition"
                        >
                          {showPassword[client.id] ? <FiEyeOff className="w-4 h-4 text-gray-500" /> : <FiEye className="w-4 h-4 text-gray-500" />}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{client.mobile}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        client.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={client.status}
                        onChange={(e) => handleStatusChange(client.id, e.target.value)}
                        className="border rounded-lg p-1.5 text-sm bg-white"
                      >
                        <option value="Active">Activate</option>
                        <option value="Deactive">Deactivate</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard