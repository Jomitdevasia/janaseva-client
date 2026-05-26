import React, { useContext, useState } from 'react'
import { AppContext } from '../../App'

const ClientsList = () => {
  // Get clients array and the update function from context
  const { clients, updateClientStatus } = useContext(AppContext)

  // Local state for filtering (show All, Active, or Deactive)
  const [filter, setFilter] = useState('all')

  // Filter the clients based on selection
  const filteredClients =
    filter === 'all'
      ? clients
      : clients.filter(c => c.status === filter)

  // When status dropdown changes, call Firebase update
  const handleStatusChange = async (clientId, newStatus) => {
    await updateClientStatus(clientId, newStatus)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Client Records</h2>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('Active')}
          className={`px-3 py-1 rounded ${filter === 'Active' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('Deactive')}
          className={`px-3 py-1 rounded ${filter === 'Deactive' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
        >
          Deactive
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name / Business</th>
              <th className="p-2 text-left">Username</th>
              <th className="p-2 text-left">Mobile</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr key={client.id} className="border-t">
                <td className="p-2">
                  {client.fullName}
                  <br />
                  <span className="text-xs text-gray-500">{client.businessName}</span>
                </td>
                <td className="p-2">{client.username}</td>
                <td className="p-2">{client.mobile}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      client.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {client.status}
                  </span>
                </td>
                <td className="p-2">
                  <select
                    value={client.status}
                    onChange={(e) => handleStatusChange(client.id, e.target.value)}
                    className="border p-1 rounded text-sm"
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
  )
}

export default ClientsList