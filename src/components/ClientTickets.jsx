// import React from 'react'

// const ClientTickets = ({ myTickets }) => {
//   if (myTickets.length === 0) return <div className="bg-white rounded-xl shadow-md p-6 text-center">No tickets raised yet.</div>
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <h2 className="text-2xl font-bold mb-4">My Support Tickets</h2>
//       {myTickets.map(t => (
//         <div key={t.id} className="border rounded-lg p-4 mb-3 bg-gray-50">
//           <div className="flex justify-between"><h3 className="font-bold">{t.subject}</h3><span className={`px-2 py-1 rounded text-xs ${t.status === 'Open' ? 'bg-yellow-100' : t.status === 'Resolved' ? 'bg-green-100' : 'bg-blue-100'}`}>{t.status}</span></div>
//           <p className="text-sm text-gray-500">{new Date(t.createdAt).toLocaleString()}</p>
//           <p className="mt-2">{t.description}</p>
//           {t.adminResponse && <div className="mt-2 bg-blue-50 p-2 rounded"><span className="font-semibold">Admin:</span> {t.adminResponse}</div>}
//         </div>
//       ))}
//     </div>
//   )
// }

// export default ClientTickets

import React, { useState } from 'react'
import { 
  FiMessageSquare, FiCheckCircle, FiClock, FiAlertCircle, 
  FiChevronDown, FiChevronUp, FiUser, FiCalendar, 
  FiMail, FiPaperclip, FiStar, FiFlag, FiFilter,
  FiSearch, FiThumbsUp, FiRefreshCw
} from 'react-icons/fi'

const ClientTickets = ({ myTickets }) => {
  const [expandedTicket, setExpandedTicket] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const getStatusConfig = (status) => {
    switch(status) {
      case 'Open':
        return { 
          icon: <FiAlertCircle />, 
          color: 'amber', 
          bg: 'bg-amber-50', 
          text: 'text-amber-700', 
          border: 'border-amber-200',
          label: 'Open',
          gradient: 'from-amber-500 to-orange-500'
        }
      case 'In Progress':
        return { 
          icon: <FiClock />, 
          color: 'blue', 
          bg: 'bg-blue-50', 
          text: 'text-blue-700', 
          border: 'border-blue-200',
          label: 'In Progress',
          gradient: 'from-blue-500 to-indigo-500'
        }
      case 'Resolved':
        return { 
          icon: <FiCheckCircle />, 
          color: 'emerald', 
          bg: 'bg-emerald-50', 
          text: 'text-emerald-700', 
          border: 'border-emerald-200',
          label: 'Resolved',
          gradient: 'from-emerald-500 to-green-500'
        }
      default:
        return { 
          icon: <FiMessageSquare />, 
          color: 'gray', 
          bg: 'bg-gray-50', 
          text: 'text-gray-700', 
          border: 'border-gray-200',
          label: status,
          gradient: 'from-gray-500 to-gray-600'
        }
    }
  }

  const getPriorityFromTicket = (ticket) => {
    const text = (ticket.subject + ' ' + ticket.description).toLowerCase()
    if (text.includes('urgent') || text.includes('emergency') || text.includes('critical')) return 'high'
    if (text.includes('delay') || text.includes('pending') || text.includes('issue')) return 'medium'
    return 'low'
  }

  const priorityConfig = {
    high: { color: 'red', label: 'High Priority', icon: <FiFlag className="w-3 h-3" />, bg: 'bg-red-50', text: 'text-red-700' },
    medium: { color: 'orange', label: 'Medium Priority', icon: <FiFlag className="w-3 h-3" />, bg: 'bg-orange-50', text: 'text-orange-700' },
    low: { color: 'green', label: 'Low Priority', icon: <FiFlag className="w-3 h-3" />, bg: 'bg-green-50', text: 'text-green-700' }
  }

  const filteredTickets = myTickets.filter(ticket => {
    if (filterStatus !== 'all' && ticket.status !== filterStatus) return false
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      return ticket.subject?.toLowerCase().includes(term) ||
             ticket.description?.toLowerCase().includes(term)
    }
    return true
  })

  const stats = {
    total: myTickets.length,
    open: myTickets.filter(t => t.status === 'Open').length,
    inProgress: myTickets.filter(t => t.status === 'In Progress').length,
    resolved: myTickets.filter(t => t.status === 'Resolved').length,
    avgResponseTime: '2.4 hrs'
  }

  if (myTickets.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 text-center border border-gray-200">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiMessageSquare className="text-blue-400 text-3xl" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Tickets Yet</h3>
        <p className="text-gray-500 text-sm mb-4">You haven't raised any support tickets.</p>
        <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition">
          Raise a Ticket
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            My Support Tickets
          </h2>
          <p className="text-gray-500 text-sm mt-1">Track and manage your service requests</p>
        </div>
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition flex items-center gap-2">
          <FiRefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-4 border border-blue-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-600 text-xs font-medium">Total</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-800">{stats.total}</p>
            </div>
            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <FiMessageSquare className="text-blue-600 text-sm" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-3 sm:p-4 border border-amber-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-amber-600 text-xs font-medium">Open</p>
              <p className="text-xl sm:text-2xl font-bold text-amber-800">{stats.open}</p>
            </div>
            <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <FiAlertCircle className="text-amber-600 text-sm" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-3 sm:p-4 border border-indigo-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-600 text-xs font-medium">In Progress</p>
              <p className="text-xl sm:text-2xl font-bold text-indigo-800">{stats.inProgress}</p>
            </div>
            <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center">
              <FiClock className="text-indigo-600 text-sm" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-3 sm:p-4 border border-emerald-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-600 text-xs font-medium">Resolved</p>
              <p className="text-xl sm:text-2xl font-bold text-emerald-800">{stats.resolved}</p>
            </div>
            <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <FiCheckCircle className="text-emerald-600 text-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tickets by subject or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
              filterStatus === 'all' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Tickets
          </button>
          <button
            onClick={() => setFilterStatus('Open')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
              filterStatus === 'Open' 
                ? 'bg-amber-600 text-white shadow-sm' 
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Open
          </button>
          <button
            onClick={() => setFilterStatus('In Progress')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
              filterStatus === 'In Progress' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilterStatus('Resolved')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
              filterStatus === 'Resolved' 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Resolved
          </button>
        </div>
      </div>

      {/* Tickets List */}
      {filteredTickets.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200">
          <p className="text-gray-500">No tickets match your search criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTickets.map((ticket) => {
            const statusConfig = getStatusConfig(ticket.status)
            const priority = getPriorityFromTicket(ticket)
            const priorityData = priorityConfig[priority]
            const isExpanded = expandedTicket === ticket.id

            return (
              <div
                key={ticket.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Ticket Header */}
                <div 
                  className="p-4 sm:p-5 cursor-pointer"
                  onClick={() => setExpandedTicket(isExpanded ? null : ticket.id)}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                          {statusConfig.icon}
                          <span>{statusConfig.label}</span>
                        </div>
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${priorityData.bg} ${priorityData.text} border`}>
                          {priorityData.icon}
                          <span>{priorityData.label}</span>
                        </div>
                        <span className="text-xs text-gray-400 font-mono">#{ticket.id?.slice(-8) || 'N/A'}</span>
                      </div>
                      <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-1">{ticket.subject}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-3 h-3" />
                          {new Date(ticket.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition p-1">
                      {isExpanded ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-gray-100 animate-in fade-in duration-200">
                    {/* Ticket Description */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-4 mb-4">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Description</p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{ticket.description}</p>
                    </div>

                    {/* Admin Response */}
                    {ticket.adminResponse && (
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-xl p-4 mb-4 border border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <FiCheckCircle className="text-white text-xs" />
                          </div>
                          <span className="text-sm font-semibold text-blue-800">Admin Response</span>
                        </div>
                        <p className="text-gray-700 text-sm">{ticket.adminResponse}</p>
                        {ticket.status === 'Resolved' && (
                          <div className="mt-3 flex items-center gap-2 text-xs text-emerald-600">
                            <FiThumbsUp className="w-3 h-3" />
                            <span>Ticket resolved on {new Date(ticket.updatedAt || ticket.createdAt).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Ticket Metadata */}
                    <div className="flex flex-wrap gap-4 pt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FiMail className="w-3 h-3" />
                        Ticket ID: {ticket.id}
                      </span>
                      {ticket.status !== 'Resolved' && (
                        <span className="flex items-center gap-1 text-amber-600">
                          <FiClock className="w-3 h-3" />
                          Awaiting response
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Satisfaction Survey (only if there are resolved tickets) */}
      {stats.resolved > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
                <FiStar className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-800">Rate your experience</p>
                <p className="text-xs text-amber-600">Help us improve our support service</p>
              </div>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} className="text-2xl text-gray-300 hover:text-amber-400 transition">
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientTickets