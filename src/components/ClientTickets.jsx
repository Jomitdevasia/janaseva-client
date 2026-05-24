import React, { useContext } from 'react'
import { AppContext } from '../App'

const ClientTickets = () => {
  const { currentClient, tickets } = useContext(AppContext)
  const myTickets = tickets.filter(t => t.clientId === currentClient.id)

  if (myTickets.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-500">
        No tickets raised yet. Go to "Raise Ticket" to ask a question.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">My Support Tickets</h2>
      <div className="space-y-4">
        {myTickets.map(ticket => (
          <div key={ticket.id} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{ticket.subject}</h3>
                <p className="text-sm text-gray-600">Raised on: {new Date(ticket.createdAt).toLocaleString()}</p>
                <p className="mt-2">{ticket.description}</p>
                {ticket.adminResponse && (
                  <div className="mt-3 bg-blue-50 p-3 rounded">
                    <span className="font-semibold">📩 Admin Response:</span> {ticket.adminResponse}
                  </div>
                )}
              </div>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-700' : 
                ticket.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {ticket.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClientTickets