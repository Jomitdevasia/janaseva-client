import React, { useState, useContext } from 'react'
import { AppContext } from '../App'

const RaiseTicket = () => {
  const { currentClient, addTicket } = useContext(AppContext)
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!subject.trim() || !description.trim()) return
    const newTicket = {
      clientId: currentClient.id,
      clientName: currentClient.fullName,
      subject,
      description,
      status: 'Open',
      adminResponse: ''
    }
    await addTicket(newTicket)
    setSubject('')
    setDescription('')
    setMessage('✅ Ticket raised! Admin will respond.')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Raise a Support Ticket</h2>
      {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} className="w-full border rounded-lg p-2 mb-3" required />
        <textarea rows="4" placeholder="Describe your issue..." value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded-lg p-2 mb-3" required></textarea>
        <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg">Submit Ticket</button>
      </form>
    </div>
  )
}

export default RaiseTicket