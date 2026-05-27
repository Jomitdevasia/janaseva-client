
import React, { useContext, useState, useMemo } from 'react'
import { AppContext } from '../../App'
import {
  FiUsers,
  FiSearch,
  FiMoreVertical,
  FiCheckCircle,
  FiXCircle,
  FiUserCheck,
  FiUserX,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiStar,
  FiDownload,
  FiEye,
  FiEdit,
  FiShield,
  FiActivity
} from 'react-icons/fi'

const ClientsList = () => {
  const { clients, updateClientStatus } = useContext(AppContext)

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClient, setSelectedClient] = useState(null)
  const [showActionMenu, setShowActionMenu] = useState(null)

  // Filter clients
  const filteredClients = useMemo(() => {
    let result = clients

    if (filter !== 'all') {
      result = result.filter(c => c.status === filter)
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()

      result = result.filter(c =>
        c.fullName?.toLowerCase().includes(term) ||
        c.businessName?.toLowerCase().includes(term) ||
        c.username?.toLowerCase().includes(term) ||
        c.mobile?.includes(term)
      )
    }

    return result
  }, [clients, filter, searchTerm])

  const handleStatusChange = async (clientId, newStatus) => {
    await updateClientStatus(clientId, newStatus)
    setShowActionMenu(null)
  }

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'Active').length,
    deactive: clients.filter(c => c.status === 'Deactive').length,
    activePercentage: clients.length
      ? Math.round(
          (clients.filter(c => c.status === 'Active').length /
            clients.length) *
            100
        )
      : 0
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Client Records
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Manage and monitor all registered clients
            </p>
          </div>

          <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition flex items-center gap-2">
            <FiDownload className="w-4 h-4" />
            Export Report
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-indigo-600 text-sm font-medium">
                  Total Clients
                </p>

                <p className="text-2xl font-bold text-indigo-800 mt-1">
                  {stats.total}
                </p>
              </div>

              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <FiUsers className="text-indigo-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-emerald-600 text-sm font-medium">
                  Active
                </p>

                <p className="text-2xl font-bold text-emerald-800 mt-1">
                  {stats.active}
                </p>
              </div>

              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <FiUserCheck className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-rose-600 text-sm font-medium">
                  Deactivated
                </p>

                <p className="text-2xl font-bold text-rose-800 mt-1">
                  {stats.deactive}
                </p>
              </div>

              <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                <FiUserX className="text-rose-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-600 text-sm font-medium">
                  Active Rate
                </p>

                <p className="text-2xl font-bold text-blue-800 mt-1">
                  {stats.activePercentage}%
                </p>
              </div>

              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <FiActivity className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2">

          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600'
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter('Active')}
            className={`px-4 py-2 rounded-xl text-sm font-medium ${
              filter === 'Active'
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600'
            }`}
          >
            Active
          </button>

          <button
            onClick={() => setFilter('Deactive')}
            className={`px-4 py-2 rounded-xl text-sm font-medium ${
              filter === 'Deactive'
                ? 'bg-rose-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600'
            }`}
          >
            Deactive
          </button>

        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                  Client
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                  Username
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                  Contact
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredClients.map((client) => (

                <tr
                  key={client.id}
                  className="hover:bg-gray-50 transition"
                >

                  {/* Client */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                        {client.fullName?.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <div className="font-semibold text-gray-800">
                          {client.fullName}
                        </div>

                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <FiBriefcase className="w-3 h-3" />
                          {client.businessName}
                        </div>
                      </div>

                    </div>

                  </td>

                  {/* Username */}
                  <td className="px-6 py-4">

                    <div className="font-mono text-sm text-gray-600">
                      {client.username}
                    </div>

                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <FiShield className="w-3 h-3" />
                      {client.id?.slice(-8)}
                    </div>

                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiPhone className="w-3.5 h-3.5" />
                      {client.mobile}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      <FiMail className="w-3 h-3" />
                      {client.email}
                    </div>

                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">

                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        client.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {client.status}
                    </span>

                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">

                    <div className="relative">

                      <button
                        onClick={() =>
                          setShowActionMenu(
                            showActionMenu === client.id
                              ? null
                              : client.id
                          )
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <FiMoreVertical className="w-5 h-5" />
                      </button>

                      {showActionMenu === client.id && (

                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">

                          <button
                            onClick={() =>
                              handleStatusChange(client.id, 'Active')
                            }
                            className="w-full px-4 py-2 text-left text-sm text-emerald-600 hover:bg-emerald-50 flex items-center gap-2"
                          >
                            <FiCheckCircle className="w-4 h-4" />
                            Activate Client
                          </button>

                          <button
                            onClick={() =>
                              handleStatusChange(client.id, 'Deactive')
                            }
                            className="w-full px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                          >
                            <FiXCircle className="w-4 h-4" />
                            Deactivate Client
                          </button>

                          <div className="border-t border-gray-100 my-1"></div>

                          <button
                            onClick={() => {
                              setSelectedClient(client)
                              setShowActionMenu(null)
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <FiEye className="w-4 h-4" />
                            View Details
                          </button>

                          <button
                            onClick={() => {
                              setSelectedClient(client)
                              setShowActionMenu(null)
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <FiEdit className="w-4 h-4" />
                            Edit Client
                          </button>

                        </div>

                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>

      {/* Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">

            <button
              onClick={() => setSelectedClient(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-6">

              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                {selectedClient.fullName?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedClient.fullName}
                </h2>

                <p className="text-gray-500">
                  {selectedClient.businessName}
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Username</p>
                <p className="font-medium">{selectedClient.username}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Mobile</p>
                <p className="font-medium">{selectedClient.mobile}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 md:col-span-2">
                <p className="text-xs text-gray-400 mb-1">Email</p>
                <p className="font-medium">{selectedClient.email}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Status</p>
                <p className="font-medium">{selectedClient.status}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Client ID</p>
                <p className="font-medium">{selectedClient.id}</p>
              </div>

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setSelectedClient(null)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>

              <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                Save Changes
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default ClientsList