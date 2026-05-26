import React from 'react'

const ClientTickets = ({ myTickets }) => {
  if (myTickets.length === 0) return <div className="bg-white rounded-xl shadow-md p-6 text-center">No tickets raised yet.</div>
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">My Support Tickets</h2>
      {myTickets.map(t => (
        <div key={t.id} className="border rounded-lg p-4 mb-3 bg-gray-50">
          <div className="flex justify-between"><h3 className="font-bold">{t.subject}</h3><span className={`px-2 py-1 rounded text-xs ${t.status === 'Open' ? 'bg-yellow-100' : t.status === 'Resolved' ? 'bg-green-100' : 'bg-blue-100'}`}>{t.status}</span></div>
          <p className="text-sm text-gray-500">{new Date(t.createdAt).toLocaleString()}</p>
          <p className="mt-2">{t.description}</p>
          {t.adminResponse && <div className="mt-2 bg-blue-50 p-2 rounded"><span className="font-semibold">Admin:</span> {t.adminResponse}</div>}
        </div>
      ))}
    </div>
  )
}

export default ClientTickets