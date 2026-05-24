import React, { useState, useContext } from 'react'
import { AppContext } from '../App'

const RaiseTicket = () => {
  const { currentClient, tickets, setTickets } = useContext(AppContext)
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!subject.trim() || !description.trim()) return
    const newTicket = {
      id: 'tkt_' + Date.now(),
      clientId: currentClient.id,
      clientName: currentClient.fullName,
      subject,
      description,
      status: 'Open',
      createdAt: new Date().toISOString(),
      adminResponse: ''
    }
    const updated = [...tickets, newTicket]
    localStorage.setItem('janaseva_tickets', JSON.stringify(updated))
    setTickets(updated)
    setSubject('')
    setDescription('')
    setMessage('✅ Ticket raised successfully! Admin will respond soon.')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Raise a Support Ticket</h2>
      <p className="text-gray-500 mb-5">Have a question about your services or documents? Submit a ticket.</p>
      {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1">Subject</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full border rounded-lg p-2" required placeholder="e.g., PAN card status delay" />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Description</label>
          <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded-lg p-2" required placeholder="Explain your issue in detail..."></textarea>
        </div>
        <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg">Submit Ticket</button>
      </form>
    </div>
  )
}

export default RaiseTicket