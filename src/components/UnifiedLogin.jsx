import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'

const UnifiedLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AppContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await login(username, password)
    setLoading(false)
    if (result.error) {
      setError(result.error)
    } else if (result.role === 'admin') {
      navigate('/admin/dashboard')
    } else if (result.role === 'client') {
      navigate('/client/dashboard')
    }
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary-800">Janaseva e-Seva</h1>
          <p className="text-gray-600">Digital Services Portal</p>
          <div className="h-1 w-20 bg-primary-600 mx-auto mt-3 rounded"></div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username / Admin ID</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>}
          <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white py-2 rounded-lg">
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 text-center text-xs text-gray-400">
          Demo Admin: admin@janaseva.gov / Admin@123<br/>
          Demo Clients: (will be added via admin panel)
        </div>
      </div>
    </div>
  )
}

export default UnifiedLogin