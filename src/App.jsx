import React, { useState, useEffect, createContext, useContext } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import ClientLogin from './components/ClientLogin'
import ClientDashboard from './components/ClientDashboard'

// Create a context to share data across components
export const AppContext = createContext()

// Keys for storing data in browser
const STORAGE_KEYS = {
  CLIENTS: 'janaseva_clients',
  TICKETS: 'janaseva_tickets',
  CLIENT_SESSION: 'client_session'
}

// Preload two demo clients (so you can log in immediately)
const getDefaultClients = () => [
  {
    id: 'cli_1',
    fullName: 'Rajesh Kumar Sharma',
    businessName: 'Sharma Enterprises',
    locality: 'Lajpat Nagar',
    address: '42, Main Market, Lajpat Nagar, New Delhi - 110024',
    username: 'rajesh123',
    password: 'rajesh123',
    mobile: '+91 9876543210',
    status: 'Active',
    createdAt: '2024-01-15'
  },
  {
    id: 'cli_2',
    fullName: 'Sunita Patel',
    businessName: 'Patel Traders',
    locality: 'Vastrapur',
    address: '7, Shilp Arcade, Vastrapur, Ahmedabad - 380015',
    username: 'sunita456',
    password: 'sunita456',
    mobile: '+91 9876543211',
    status: 'Active',
    createdAt: '2024-02-10'
  }
]

// Preload demo tickets
const getDefaultTickets = () => [
  {
    id: 'tkt_1',
    clientId: 'cli_1',
    clientName: 'Rajesh Kumar Sharma',
    subject: 'PAN card renewal status',
    description: 'My PAN card renewal application has been pending for 10 days. Please update.',
    status: 'Open',
    createdAt: '2024-05-20T10:30:00Z',
    adminResponse: ''
  }
]

function App() {
  const [clientLoggedIn, setClientLoggedIn] = useState(false)
  const [currentClient, setCurrentClient] = useState(null)
  const [clients, setClients] = useState([])
  const [tickets, setTickets] = useState([])

  // Load data from browser storage when app starts
  useEffect(() => {
    // Initialize default data if nothing exists
    if (!localStorage.getItem(STORAGE_KEYS.CLIENTS)) {
      localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(getDefaultClients()))
    }
    if (!localStorage.getItem(STORAGE_KEYS.TICKETS)) {
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(getDefaultTickets()))
    }
    
    const storedClients = JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS))
    const storedTickets = JSON.parse(localStorage.getItem(STORAGE_KEYS.TICKETS))
    setClients(storedClients)
    setTickets(storedTickets)

    // Check if client was already logged in (session)
    const clientSession = sessionStorage.getItem(STORAGE_KEYS.CLIENT_SESSION)
    if (clientSession) {
      const clientData = JSON.parse(clientSession)
      setCurrentClient(clientData)
      setClientLoggedIn(true)
    }
  }, [])

  // Function called when client submits login form
  const clientLogin = (username, password) => {
    const client = clients.find(c => c.username === username && c.password === password && c.status === 'Active')
    if (client) {
      setCurrentClient(client)
      setClientLoggedIn(true)
      sessionStorage.setItem(STORAGE_KEYS.CLIENT_SESSION, JSON.stringify(client))
      return true
    }
    return false
  }

  const clientLogout = () => {
    setClientLoggedIn(false)
    setCurrentClient(null)
    sessionStorage.removeItem(STORAGE_KEYS.CLIENT_SESSION)
  }

  // Refresh data from storage (used after raising a ticket)
  const refreshData = () => {
    const storedClients = JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS))
    const storedTickets = JSON.parse(localStorage.getItem(STORAGE_KEYS.TICKETS))
    setClients(storedClients)
    setTickets(storedTickets)
  }

  return (
    <AppContext.Provider value={{ 
      clients, tickets, refreshData,
      clientLogin, clientLogout, clientLoggedIn, currentClient,
      setClients, setTickets
    }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<ClientLogin />} />
        <Route path="/dashboard" element={clientLoggedIn ? <ClientDashboard /> : <Navigate to="/login" />} />
      </Routes>
    </AppContext.Provider>
  )
}

export default App