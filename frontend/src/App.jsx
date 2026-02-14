import { useState, useEffect } from 'react'
import './App.css'
import ChatInterface from './components/ChatInterface'
import Header from './components/Header'
import StatusBar from './components/StatusBar'
import API_BASE_URL from './config'

function App() {
  const [apiStatus, setApiStatus] = useState({ status: 'checking', ready: false })

  useEffect(() => {
    // Check API health on mount
    checkApiHealth()
    // Check every 30 seconds
    const interval = setInterval(checkApiHealth, 30000)
    return () => clearInterval(interval)
  }, [])

  const checkApiHealth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`)
      const data = await response.json()
      setApiStatus(data)
    } catch (error) {
      setApiStatus({ status: 'error', ready: false, message: 'Cannot connect to API' })
    }
  }

  return (
    <div className="App">
      <Header />
      <StatusBar status={apiStatus} />
      <ChatInterface apiReady={apiStatus.ready} />
    </div>
  )
}

export default App
