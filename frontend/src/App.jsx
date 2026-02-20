import { useState, useEffect } from 'react'
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
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40">
      <div className="container py-10">
        <div className="space-y-6">
          <Header />
          <StatusBar status={apiStatus} />
          <ChatInterface apiReady={apiStatus.ready} />
        </div>
        <footer className="mt-10 text-center text-sm text-muted-foreground">
          Built with ❤️ · Powered by FastAPI & React · Inspired by the Bhagavad Gita...
        </footer>
      </div>
    </div>
  )
}

export default App
