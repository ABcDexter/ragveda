import React from 'react'

function StatusBar({ status }) {
  const getStatusClass = () => {
    if (status.status === 'healthy' && status.ready) return 'healthy'
    if (status.status === 'error') return 'error'
    return 'not-ready'
  }

  const getDotClass = () => {
    if (status.status === 'healthy' && status.ready) return 'green'
    if (status.status === 'error') return 'red'
    return 'yellow'
  }

  return (
    <div className={`status-bar ${getStatusClass()}`}>
      <div className="status-indicator">
        <div className={`status-dot ${getDotClass()}`}></div>
        <span>{status.message || 'Checking API status...'}</span>
      </div>
      <span>{status.status}</span>
    </div>
  )
}

export default StatusBar
