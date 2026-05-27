

import React, { useContext, useState } from 'react'
import { AppContext } from '../../App'
import { 
  FiMessageSquare, FiCheckCircle, FiClock, FiAlertCircle, 
  FiSend, FiFlag, FiUser, FiCalendar, FiPaperclip,
  FiChevronDown, FiChevronUp, FiMail, FiArchive
} from 'react-icons/fi'

const AdminTickets = () => {
  const { tickets, updateTicket } = useContext(AppContext)
  const [responseText, setResponseText] = useState({})
  const [expandedTicket, setExpandedTicket] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const handleRespond = async (ticketId) => {
    const response = responseText[ticketId]
    if (response && response.trim()) {
      await updateTicket(ticketId, {
        status: 'Resolved',
        adminResponse: response
      })
      setResponseText({ ...responseText, [ticketId]: '' })
    }
  }

  const markInProgress = async (ticketId) => {
    await updateTicket(ticketId, { status: 'In Progress' })
  }

  const getStatusConfig = (status) => {
    switch(status) {
      case 'Open':
        return { icon: <FiAlertCircle />, color: 'amber', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'Open' }
      case 'In Progress':
        return { icon: <FiClock />, color: 'blue', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'In Progress' }
      case 'Resolved':
        return { icon: <FiCheckCircle />, color: 'emerald', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Resolved' }
      default:
        return { icon: <FiMessageSquare />, color: 'gray', bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', label: status }
    }
  }

  const getPriorityColor = (ticket) => {
    // Simple priority detection based on subject/description
    const text = (ticket.subject + ' ' + ticket.description).toLowerCase()
    if (text.includes('urgent') || text.includes('emergency')) return 'high'
    if (text.includes('delay') || text.includes('pending')) return 'medium'
    return 'low'
  }

  const filteredTickets = tickets.filter(ticket => {
    if (filterStatus === 'all') return true
    return ticket.status === filterStatus
  })

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'Open').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length
  }

  return (
    <div className="space-y-6">
      {/* Premium Header with Stats */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Support Tickets
            </h2>
            <p className="text-gray-500 text-sm mt-1">Manage and respond to client service requests</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition flex items-center gap-2">
              <FiMail className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 border border-blue-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Tickets</p>
                <p className="text-2xl font-bold text-blue-800 mt-1">{stats.total}</p>
              </div>
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <FiMessageSquare className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-4 border border-amber-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-amber-600 text-sm font-medium">Open</p>
                <p className="text-2xl font-bold text-amber-800 mt-1">{stats.open}</p>
              </div>
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
                <FiAlertCircle className="text-amber-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100/50 rounded-2xl p-4 border border-blue-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-indigo-600 text-sm font-medium">In Progress</p>
                <p className="text-2xl font-bold text-indigo-800 mt-1">{stats.inProgress}</p>
              </div>
              <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                <FiClock className="text-indigo-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-4 border border-emerald-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Resolved</p>
                <p className="text-2xl font-bold text-emerald-800 mt-1">{stats.resolved}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                <FiCheckCircle className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-gray-200 mb-6">
          {['all', 'Open', 'In Progress', 'Resolved'].map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterStatus(filter)}
              className={`px-5 py-2.5 text-sm font-medium transition-all rounded-t-xl ${
                filterStatus === filter
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {filter === 'all' ? 'All Tickets' : filter}
              {filter !== 'all' && filter === 'Open' && stats.open > 0 && (
                <span className="ml-2 px-1.5 py-0.5 bg-amber-100 text-amber-600 text-xs rounded-full">
                  {stats.open}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets List */}
      {filteredTickets.length === 0 && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 text-center border border-gray-200">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiMessageSquare className="text-gray-400 text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Tickets Found</h3>
          <p className="text-gray-500 text-sm">All tickets have been resolved or no tickets have been raised yet.</p>
        </div>
      )}

      <div className="space-y-4">
        {filteredTickets.map((ticket) => {
          const statusConfig = getStatusConfig(ticket.status)
          const priority = getPriorityColor(ticket)
          const isExpanded = expandedTicket === ticket.id
          const priorityConfig = {
            high: { color: 'red', label: 'High Priority', icon: <FiFlag className="w-3 h-3" /> },
            medium: { color: 'orange', label: 'Medium Priority', icon: <FiFlag className="w-3 h-3" /> },
            low: { color: 'green', label: 'Low Priority', icon: <FiFlag className="w-3 h-3" /> }
          }[priority]

          return (
            <div
              key={ticket.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Ticket Header */}
              <div className="p-5 cursor-pointer" onClick={() => setExpandedTicket(isExpanded ? null : ticket.id)}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                        {statusConfig.icon}
                        <span>{statusConfig.label}</span>
                      </div>
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-${priorityConfig.color}-50 text-${priorityConfig.color}-700 border border-${priorityConfig.color}-200`}>
                        {priorityConfig.icon}
                        <span>{priorityConfig.label}</span>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">#{ticket.id?.slice(-6) || 'N/A'}</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{ticket.subject}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FiUser className="w-3 h-3" />
                        {ticket.clientName}
                      </span>
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
                <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                  {/* Ticket Description */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-4 mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">Description</p>
                    <p className="text-gray-700 leading-relaxed">{ticket.description}</p>
                    {ticket.attachment && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-blue-600">
                        <FiPaperclip className="w-4 h-4" />
                        <span className="hover:underline cursor-pointer">attachment.pdf</span>
                      </div>
                    )}
                  </div>

                  {/* Admin Response History */}
                  {ticket.adminResponse && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-xl p-4 mb-4 border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <FiCheckCircle className="text-white text-xs" />
                        </div>
                        <span className="text-sm font-semibold text-blue-800">Your Response</span>
                      </div>
                      <p className="text-gray-700 text-sm">{ticket.adminResponse}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        Resolved on {new Date(ticket.updatedAt || ticket.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons - Only for non-resolved tickets */}
                  {ticket.status !== 'Resolved' && (
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Type your response here..."
                            value={responseText[ticket.id] || ''}
                            onChange={(e) =>
                              setResponseText({ ...responseText, [ticket.id]: e.target.value })
                            }
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50/50"
                          />
                        </div>
                        <button
                          onClick={() => handleRespond(ticket.id)}
                          className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <FiSend className="w-4 h-4" />
                          Respond & Resolve
                        </button>
                        <button
                          onClick={() => markInProgress(ticket.id)}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <FiClock className="w-4 h-4" />
                          Mark In Progress
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <FiAlertCircle className="w-3 h-3" />
                        Response will resolve the ticket and notify the client
                      </p>
                    </div>
                  )}

                  {/* Resolved Ticket Actions */}
                  {ticket.status === 'Resolved' && (
                    <div className="flex gap-3 pt-2">
                      <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1 transition">
                        <FiArchive className="w-4 h-4" />
                        Archive
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AdminTickets