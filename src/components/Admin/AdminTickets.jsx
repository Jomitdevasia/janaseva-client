import React, { useContext, useState } from 'react'
import { AppContext } from '../../App'

const AdminTickets = () => {
  // Get tickets array and update function
  const { tickets, updateTicket } = useContext(AppContext)

  // Local state to store the response text for each ticket (key = ticket id)
  const [responseText, setResponseText] = useState({})

  // Handle responding and resolving a ticket
  const handleRespond = async (ticketId) => {
    const response = responseText[ticketId]
    if (response && response.trim()) {
      await updateTicket(ticketId, {
        status: 'Resolved',
        adminResponse: response
      })
      // Clear the input for that ticket
      setResponseText({ ...responseText, [ticketId]: '' })
    }
  }

  // Mark ticket as "In Progress" without a response
  const markInProgress = async (ticketId) => {
    await updateTicket(ticketId, { status: 'In Progress' })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Client Support Tickets</h2>
      {tickets.length === 0 && (
        <p className="text-gray-500">No tickets raised yet.</p>
      )}
      {tickets.map(ticket => (
        <div key={ticket.id} className="border rounded-lg p-4 mb-4 bg-gray-50">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-bold text-lg">{ticket.subject}</h3>
              <p className="text-sm text-gray-600">
                From: {ticket.clientName} | {new Date(ticket.createdAt).toLocaleString()}
              </p>
              <p className="mt-2">{ticket.description}</p>
              {ticket.adminResponse && (
                <div className="mt-3 bg-blue-50 p-3 rounded">
                  <span className="font-semibold">📩 Your Response:</span> {ticket.adminResponse}
                </div>
              )}
            </div>
            <span
              className={`ml-4 px-2 py-1 rounded text-xs font-semibold ${
                ticket.status === 'Open'
                  ? 'bg-yellow-100 text-yellow-700'
                  : ticket.status === 'Resolved'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {ticket.status}
            </span>
          </div>

          {/* Only show response form if ticket is not resolved */}
          {ticket.status !== 'Resolved' && (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="Type admin response..."
                value={responseText[ticket.id] || ''}
                onChange={(e) =>
                  setResponseText({ ...responseText, [ticket.id]: e.target.value })
                }
                className="flex-1 border rounded p-2"
              />
              <button
                onClick={() => handleRespond(ticket.id)}
                className="bg-primary-600 text-white px-4 py-2 rounded"
              >
                Respond & Resolve
              </button>
              <button
                onClick={() => markInProgress(ticket.id)}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Mark In Progress
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default AdminTickets