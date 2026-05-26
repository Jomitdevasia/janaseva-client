import React, { useState, useContext } from 'react'
import { AppContext } from '../../App'

const OnboardClient = () => {
  // Get the addClient function from the global context
  const { addClient } = useContext(AppContext)

  // Local state for form fields
  const [form, setForm] = useState({
    fullName: '',
    businessName: '',
    locality: '',
    address: '',
    username: '',
    password: '',
    mobile: '',
    status: 'Active'
  })

  // For showing success/error message
  const [message, setMessage] = useState('')

  // Handle any input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault() // prevent page refresh

    // Call the addClient function from App.jsx
    const result = await addClient(form)

    if (result.success) {
      setMessage({ type: 'success', text: '✅ Client onboarded successfully!' })
      // Clear the form
      setForm({
        fullName: '',
        businessName: '',
        locality: '',
        address: '',
        username: '',
        password: '',
        mobile: '',
        status: 'Active'
      })
    } else {
      setMessage({ type: 'error', text: `❌ Error: ${result.error}` })
    }

    // Hide message after 3 seconds
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Register New Client</h2>
      {message && (
        <div className={`p-3 rounded mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name *"
          value={form.fullName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="businessName"
          placeholder="Business Name"
          value={form.businessName}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="locality"
          placeholder="Locality *"
          value={form.locality}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile *"
          value={form.mobile}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="address"
          placeholder="Complete Address *"
          value={form.address}
          onChange={handleChange}
          className="border p-2 rounded md:col-span-2"
          rows="2"
          required
        ></textarea>
        <input
          type="text"
          name="username"
          placeholder="Username *"
          value={form.username}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password *"
          value={form.password}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Active">Active</option>
          <option value="Deactive">Deactive</option>
        </select>
        <button
          type="submit"
          className="bg-primary-600 text-white px-6 py-2 rounded md:col-span-2"
        >
          Complete Onboarding
        </button>
      </form>
    </div>
  )
}

export default OnboardClient