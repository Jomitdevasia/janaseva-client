import React, { useContext, useState, useMemo } from 'react'
import { AppContext } from '../../App'

const ClientsList = () => {
  const { clients, updateClientStatus, deleteClient, updateClient } = useContext(AppContext)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClient, setSelectedClient] = useState(null)
  const [showPassword, setShowPassword] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({})
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [clientToDelete, setClientToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Debug log to check if functions are available
  console.log("Context functions check:", { 
    hasDeleteClient: !!deleteClient, 
    hasUpdateClient: !!updateClient,
    hasUpdateClientStatus: !!updateClientStatus,
    clientsCount: clients?.length 
  })

  // Filter clients
  const filteredClients = useMemo(() => {
    let result = clients || []

    if (filter !== 'all') {
      result = result.filter(c => c && c.status === filter)
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      result = result.filter(c =>
        (c?.fullName?.toLowerCase() || '').includes(term) ||
        (c?.businessName?.toLowerCase() || '').includes(term) ||
        (c?.username?.toLowerCase() || '').includes(term) ||
        (c?.mobile || '').includes(term)
      )
    }

    return result
  }, [clients, filter, searchTerm])

  const handleStatusChange = async (clientId, newStatus) => {
    console.log("Changing status:", clientId, newStatus)
    if (updateClientStatus) {
      await updateClientStatus(clientId, newStatus)
      alert(`Client ${newStatus === 'Active' ? 'activated' : 'deactivated'} successfully!`)
    } else {
      alert("Update status function not available")
    }
  }

  const togglePassword = (clientId) => {
    setShowPassword(prev => ({ ...prev, [clientId]: !prev[clientId] }))
  }

  // Handle Edit Click
  const handleEditClick = (client) => {
    console.log("Editing client:", client)
    setSelectedClient(client)
    setEditForm({
      fullName: client.fullName || '',
      businessName: client.businessName || '',
      username: client.username || '',
      mobile: client.mobile || '',
      email: client.email || '',
      locality: client.locality || '',
      address: client.address || '',
      status: client.status || 'Active'
    })
    setIsEditing(true)
  }

  // Handle Edit Change
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  // Handle Update Client
  const handleUpdateClient = async () => {
    console.log("Updating client:", selectedClient.id, editForm)
    if (updateClient) {
      try {
        await updateClient(selectedClient.id, editForm)
        alert('Client updated successfully!')
        setIsEditing(false)
        setSelectedClient(null)
        setEditForm({})
      } catch (error) {
        alert('Error updating client: ' + error.message)
      }
    } else {
      alert("Update client function not available")
    }
  }

  // Handle Delete Click
  const handleDeleteClick = (client) => {
    console.log("Deleting client:", client)
    setClientToDelete(client)
    setShowDeleteConfirm(true)
  }

  // Confirm Delete
  const confirmDelete = async () => {
    if (clientToDelete && deleteClient) {
      setIsDeleting(true)
      try {
        await deleteClient(clientToDelete.id)
        alert('Client deleted successfully!')
        setShowDeleteConfirm(false)
        setClientToDelete(null)
        setSelectedClient(null)
      } catch (error) {
        alert('Error deleting client: ' + error.message)
      }
      setIsDeleting(false)
    } else {
      alert("Delete client function not available")
    }
  }

  const stats = {
    total: clients?.length || 0,
    active: clients?.filter(c => c && c.status === 'Active').length || 0,
    deactive: clients?.filter(c => c && c.status === 'Deactive').length || 0,
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Client Records</h2>
        <p className="text-gray-500 text-sm">Manage and monitor all registered clients</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-blue-600 text-sm">Total Clients</p>
          <p className="text-2xl font-bold text-blue-800">{stats.total}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-green-600 text-sm">Active</p>
          <p className="text-2xl font-bold text-green-800">{stats.active}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 text-center">
          <p className="text-red-600 text-sm">Deactivated</p>
          <p className="text-2xl font-bold text-red-800">{stats.deactive}</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>All ({stats.total})</button>
          <button onClick={() => setFilter('Active')} className={`px-4 py-2 rounded-lg ${filter === 'Active' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>Active ({stats.active})</button>
          <button onClick={() => setFilter('Deactive')} className={`px-4 py-2 rounded-lg ${filter === 'Deactive' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}>Deactive ({stats.deactive})</button>
        </div>
      </div>

      {/* Table */}
      {filteredClients.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No clients found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Password</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        {client.fullName?.charAt(0) || 'C'}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{client.fullName}</div>
                        <div className="text-xs text-gray-500">{client.businessName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{client.username}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span>{showPassword[client.id] ? client.password : '••••••••'}</span>
                      <button onClick={() => togglePassword(client.id)} className="text-gray-400 hover:text-gray-600">👁️</button>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{client.mobile}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${client.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2 flex-wrap">
                      {/* VIEW Button */}
                      <button 
                        onClick={() => {
                          setSelectedClient(client)
                          setIsEditing(false)
                        }} 
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                      >
                        View
                      </button>
                      
                      {/* EDIT Button */}
                      <button 
                        onClick={() => handleEditClick(client)} 
                        className="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600"
                      >
                        Edit
                      </button>
                      
                      {/* ACTIVATE/DEACTIVATE Button */}
                      {client.status === 'Active' ? (
                        <button 
                          onClick={() => handleStatusChange(client.id, 'Deactive')} 
                          className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleStatusChange(client.id, 'Active')} 
                          className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                        >
                          Activate
                        </button>
                      )}
                      
                      {/* DELETE Button */}
                      <button 
                        onClick={() => handleDeleteClick(client)} 
                        className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {selectedClient && !isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedClient(null)}>
          <div className="bg-white rounded-xl max-w-md w-full mx-4 p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Client Details</h3>
              <button onClick={() => setSelectedClient(null)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
            </div>
            <div className="space-y-3">
              <div><p className="text-sm text-gray-500">Full Name</p><p className="font-medium">{selectedClient.fullName}</p></div>
              <div><p className="text-sm text-gray-500">Business Name</p><p className="font-medium">{selectedClient.businessName || 'N/A'}</p></div>
              <div><p className="text-sm text-gray-500">Username</p><p className="font-medium">{selectedClient.username}</p></div>
              <div><p className="text-sm text-gray-500">Mobile</p><p className="font-medium">{selectedClient.mobile}</p></div>
              <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{selectedClient.email || 'N/A'}</p></div>
              <div><p className="text-sm text-gray-500">Locality</p><p className="font-medium">{selectedClient.locality || 'N/A'}</p></div>
              <div><p className="text-sm text-gray-500">Address</p><p className="font-medium">{selectedClient.address || 'N/A'}</p></div>
              <div><p className="text-sm text-gray-500">Status</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedClient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {selectedClient.status}
                </span>
              </div>
              <div><p className="text-sm text-gray-500">Client ID</p><p className="font-mono text-sm">{selectedClient.id}</p></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setSelectedClient(null)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Close</button>
              <button onClick={() => handleEditClick(selectedClient)} className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">Edit</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT CLIENT MODAL */}
      {isEditing && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => { setIsEditing(false); setSelectedClient(null); }}>
          <div className="bg-white rounded-xl max-w-md w-full mx-4 p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Edit Client</h3>
              <button onClick={() => { setIsEditing(false); setSelectedClient(null); }} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Full Name *</label>
                <input type="text" name="fullName" value={editForm.fullName} onChange={handleEditChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Business Name</label>
                <input type="text" name="businessName" value={editForm.businessName} onChange={handleEditChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Username *</label>
                <input type="text" name="username" value={editForm.username} onChange={handleEditChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Mobile Number *</label>
                <input type="tel" name="mobile" value={editForm.mobile} onChange={handleEditChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Email Address</label>
                <input type="email" name="email" value={editForm.email} onChange={handleEditChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Locality</label>
                <input type="text" name="locality" value={editForm.locality} onChange={handleEditChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Address</label>
                <textarea name="address" value={editForm.address} onChange={handleEditChange} rows="2" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Status</label>
                <select name="status" value={editForm.status} onChange={handleEditChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="Active">Active</option>
                  <option value="Deactive">Deactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { setIsEditing(false); setSelectedClient(null); }} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Cancel</button>
              <button onClick={handleUpdateClient} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteConfirm && clientToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-white rounded-xl max-w-sm w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🗑️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Client</h3>
              <p className="text-gray-500 mb-4">
                Are you sure you want to delete <span className="font-semibold text-gray-800">{clientToDelete.fullName}</span>?
                This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={confirmDelete} disabled={isDeleting} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientsList