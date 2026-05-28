// import React, { useState, useEffect, createContext } from 'react'
// import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
// import { db } from './firebase'
// import { collection, getDocs, doc, getDoc, setDoc, updateDoc, query, where } from 'firebase/firestore'
// import ClientDashboard from './components/ClientDashboard'
// import AdminDashboard from './components/Admin/AdminDashboard'
// import UnifiedLogin from './components/UnifiedLogin'

// export const AppContext = createContext()

// const STORAGE_KEYS = {
//   CLIENT_SESSION: 'client_session',
//   ADMIN_SESSION: 'admin_session'
// }

// function App() {
//   const [clientLoggedIn, setClientLoggedIn] = useState(false)
//   const [adminLoggedIn, setAdminLoggedIn] = useState(false)
//   const [currentClient, setCurrentClient] = useState(null)
//   const [clients, setClients] = useState([])
//   const [tickets, setTickets] = useState([])
//   const [loading, setLoading] = useState(true)

//   // Load data from Firestore on startup
//   useEffect(() => {
//     loadAllData()
//     checkSessions()
//   }, [])

//   const loadAllData = async () => {
//     setLoading(true)
//     try {
//       // Load clients
//       const clientsSnapshot = await getDocs(collection(db, 'clients'))
//       const clientsList = clientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
//       setClients(clientsList)

//       // Load tickets
//       const ticketsSnapshot = await getDocs(collection(db, 'tickets'))
//       const ticketsList = ticketsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
//       setTickets(ticketsList)
//     } catch (error) {
//       console.error("Error loading data:", error)
//     }
//     setLoading(false)
//   }

//   const checkSessions = () => {
//     const clientSession = sessionStorage.getItem(STORAGE_KEYS.CLIENT_SESSION)
//     if (clientSession) {
//       const clientData = JSON.parse(clientSession)
//       setCurrentClient(clientData)
//       setClientLoggedIn(true)
//     }
//     const adminSession = sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION)
//     if (adminSession === 'true') {
//       setAdminLoggedIn(true)
//     }
//   }

//   const refreshData = () => {
//     loadAllData()
//   }

//   // Login function – determines if admin or client
//   const login = async (username, password) => {
//     // Check if admin (hardcoded)
//     if (username === 'admin@janaseva.gov' && password === 'Admin@123') {
//       setAdminLoggedIn(true)
//       sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true')
//       return { role: 'admin' }
//     }

//     // Check if client
//     const clientsRef = collection(db, 'clients')
//     const q = query(clientsRef, where('username', '==', username), where('password', '==', password))
//     const querySnapshot = await getDocs(q)
    
//     if (!querySnapshot.empty) {
//       const clientData = querySnapshot.docs[0].data()
//       if (clientData.status === 'Active') {
//         const clientWithId = { id: querySnapshot.docs[0].id, ...clientData }
//         setCurrentClient(clientWithId)
//         setClientLoggedIn(true)
//         sessionStorage.setItem(STORAGE_KEYS.CLIENT_SESSION, JSON.stringify(clientWithId))
//         return { role: 'client', client: clientWithId }
//       } else {
//         return { error: 'Your account is deactivated. Contact admin.' }
//       }
//     }
//     return { error: 'Invalid credentials' }
//   }

//   const logout = (role) => {
//     if (role === 'admin') {
//       setAdminLoggedIn(false)
//       sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION)
//     } else {
//       setClientLoggedIn(false)
//       setCurrentClient(null)
//       sessionStorage.removeItem(STORAGE_KEYS.CLIENT_SESSION)
//     }
//   }

//   // Function to add a new client (used by admin)
//   const addClient = async (clientData) => {
//     try {
//       const docRef = doc(collection(db, 'clients'))
//       await setDoc(docRef, { ...clientData, id: docRef.id, createdAt: new Date().toISOString() })
//       await refreshData()
//       return { success: true }
//     } catch (error) {
//       return { error: error.message }
//     }
//   }

//   // Update client status
//   const updateClientStatus = async (clientId, newStatus) => {
//     try {
//       const clientRef = doc(db, 'clients', clientId)
//       await updateDoc(clientRef, { status: newStatus })
//       await refreshData()
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   // Add a new ticket (by client)
//   const addTicket = async (ticketData) => {
//     try {
//       const docRef = doc(collection(db, 'tickets'))
//       await setDoc(docRef, { ...ticketData, id: docRef.id, createdAt: new Date().toISOString() })
//       await refreshData()
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   // Update ticket (by admin)
//   const updateTicket = async (ticketId, updates) => {
//     try {
//       const ticketRef = doc(db, 'tickets', ticketId)
//       await updateDoc(ticketRef, updates)
//       await refreshData()
//     } catch (error) {
//       console.error(error)
//     }
//   }


//   // Delete client function
// const deleteClient = async (clientId) => {
//   try {
//     const clientRef = doc(db, 'clients', clientId)
//     await deleteDoc(clientRef)
//     await refreshData()
//     return { success: true }
//   } catch (error) {
//     console.error(error)
//     return { error: error.message }
//   }
// }

// // Update client function
// const updateClient = async (clientId, updatedData) => {
//   try {
//     const clientRef = doc(db, 'clients', clientId)
//     await updateDoc(clientRef, updatedData)
//     await refreshData()
//     return { success: true }
//   } catch (error) {
//     console.error(error)
//     return { error: error.message }
//   }
// }

//   return (
//     <AppContext.Provider value={{
//       clients, tickets, loading,
//       login, logout,
//       clientLoggedIn, adminLoggedIn, currentClient,
//       addClient, updateClientStatus, addTicket, updateTicket,
//       refreshData
//     }}>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<UnifiedLogin />} />
//         <Route path="/client/dashboard" element={clientLoggedIn ? <ClientDashboard /> : <Navigate to="/login" />} />
//         <Route path="/admin/dashboard" element={adminLoggedIn ? <AdminDashboard /> : <Navigate to="/login" />} />
//       </Routes>
//     </AppContext.Provider>
//   )
// }

// export default App

import React, { useState, useEffect, createContext } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { db } from './firebase'
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore'
import ClientDashboard from './components/ClientDashboard'
import AdminDashboard from './components/Admin/AdminDashboard'
import UnifiedLogin from './components/UnifiedLogin'

export const AppContext = createContext()

const STORAGE_KEYS = {
  CLIENT_SESSION: 'client_session',
  ADMIN_SESSION: 'admin_session'
}

function App() {
  const [clientLoggedIn, setClientLoggedIn] = useState(false)
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)
  const [currentClient, setCurrentClient] = useState(null)
  const [clients, setClients] = useState([])
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Load data from Firestore on startup
  useEffect(() => {
    loadAllData()
    checkSessions()
  }, [])

  const loadAllData = async () => {
    setLoading(true)
    try {
      // Load clients
      const clientsSnapshot = await getDocs(collection(db, 'clients'))
      const clientsList = clientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setClients(clientsList)

      // Load tickets
      const ticketsSnapshot = await getDocs(collection(db, 'tickets'))
      const ticketsList = ticketsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setTickets(ticketsList)
    } catch (error) {
      console.error("Error loading data:", error)
    }
    setLoading(false)
  }

  const checkSessions = () => {
    const clientSession = sessionStorage.getItem(STORAGE_KEYS.CLIENT_SESSION)
    if (clientSession) {
      const clientData = JSON.parse(clientSession)
      setCurrentClient(clientData)
      setClientLoggedIn(true)
    }
    const adminSession = sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION)
    if (adminSession === 'true') {
      setAdminLoggedIn(true)
    }
  }

  const refreshData = () => {
    loadAllData()
  }

  // Login function – determines if admin or client
  const login = async (username, password) => {
    // Check if admin (hardcoded)
    if (username === 'admin@janaseva.gov' && password === 'Admin@123') {
      setAdminLoggedIn(true)
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true')
      return { role: 'admin' }
    }

    // Check if client
    const clientsRef = collection(db, 'clients')
    const q = query(clientsRef, where('username', '==', username), where('password', '==', password))
    const querySnapshot = await getDocs(q)
    
    if (!querySnapshot.empty) {
      const clientData = querySnapshot.docs[0].data()
      if (clientData.status === 'Active') {
        const clientWithId = { id: querySnapshot.docs[0].id, ...clientData }
        setCurrentClient(clientWithId)
        setClientLoggedIn(true)
        sessionStorage.setItem(STORAGE_KEYS.CLIENT_SESSION, JSON.stringify(clientWithId))
        return { role: 'client', client: clientWithId }
      } else {
        return { error: 'Your account is deactivated. Contact admin.' }
      }
    }
    return { error: 'Invalid credentials' }
  }

  const logout = (role) => {
    if (role === 'admin') {
      setAdminLoggedIn(false)
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION)
    } else {
      setClientLoggedIn(false)
      setCurrentClient(null)
      sessionStorage.removeItem(STORAGE_KEYS.CLIENT_SESSION)
    }
    navigate('/login')
  }

  // Function to add a new client (used by admin)
  const addClient = async (clientData) => {
    try {
      const docRef = doc(collection(db, 'clients'))
      await setDoc(docRef, { ...clientData, id: docRef.id, createdAt: new Date().toISOString() })
      await refreshData()
      return { success: true }
    } catch (error) {
      return { error: error.message }
    }
  }

  // Update client status
  const updateClientStatus = async (clientId, newStatus) => {
    try {
      const clientRef = doc(db, 'clients', clientId)
      await updateDoc(clientRef, { status: newStatus })
      await refreshData()
      return { success: true }
    } catch (error) {
      console.error(error)
      return { error: error.message }
    }
  }

  // Add a new ticket (by client)
  const addTicket = async (ticketData) => {
    try {
      const docRef = doc(collection(db, 'tickets'))
      await setDoc(docRef, { ...ticketData, id: docRef.id, createdAt: new Date().toISOString() })
      await refreshData()
      return { success: true }
    } catch (error) {
      console.error(error)
      return { error: error.message }
    }
  }

  // Update ticket (by admin)
  const updateTicket = async (ticketId, updates) => {
    try {
      const ticketRef = doc(db, 'tickets', ticketId)
      await updateDoc(ticketRef, updates)
      await refreshData()
      return { success: true }
    } catch (error) {
      console.error(error)
      return { error: error.message }
    }
  }

  // Delete client function
  const deleteClient = async (clientId) => {
    try {
      const clientRef = doc(db, 'clients', clientId)
      await deleteDoc(clientRef)
      await refreshData()
      return { success: true }
    } catch (error) {
      console.error(error)
      return { error: error.message }
    }
  }

  // Update client function (full update)
  const updateClient = async (clientId, updatedData) => {
    try {
      const clientRef = doc(db, 'clients', clientId)
      await updateDoc(clientRef, updatedData)
      await refreshData()
      return { success: true }
    } catch (error) {
      console.error(error)
      return { error: error.message }
    }
  }

  return (
    <AppContext.Provider value={{
      clients, 
      tickets, 
      loading,
      login, 
      logout,
      clientLoggedIn, 
      adminLoggedIn, 
      currentClient,
      addClient, 
      updateClientStatus, 
      addTicket, 
      updateTicket,
      refreshData,
      deleteClient,    // ✅ ADDED - Now available in context
      updateClient     // ✅ ADDED - Now available in context
    }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<UnifiedLogin />} />
        <Route path="/client/dashboard" element={clientLoggedIn ? <ClientDashboard /> : <Navigate to="/login" />} />
        <Route path="/admin/dashboard" element={adminLoggedIn ? <AdminDashboard /> : <Navigate to="/login" />} />
      </Routes>
    </AppContext.Provider>
  )
}

export default App
