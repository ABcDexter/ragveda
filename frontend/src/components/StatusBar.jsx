import React from 'react'
import Badge from './ui/badge'

function StatusBar({ status }) {
  const getStatusClass = () => {
    if (status.status === 'healthy' && status.ready) return 'bg-emerald-50 text-emerald-900'
    if (status.status === 'error') return 'bg-rose-50 text-rose-900'
    return 'bg-amber-50 text-amber-900'
  }

  const getDotClass = () => {
    if (status.status === 'healthy' && status.ready) return 'bg-emerald-500'
    if (status.status === 'error') return 'bg-rose-500'
    return 'bg-amber-500'
  }

  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border px-6 py-4 ${getStatusClass()}`}>
      <div className="flex items-center gap-3">
        <span className={`h-3 w-3 rounded-full ${getDotClass()}`}></span>
        <div className="text-sm font-medium">
          {status.message || 'Checking API status...'}
        </div>
      </div>
      <Badge variant="outline">{status.status}</Badge>
    </div>
  )
}

export default StatusBar
