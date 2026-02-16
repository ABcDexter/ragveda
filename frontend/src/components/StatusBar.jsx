import React from 'react'
import Badge from './ui/badge'

function StatusBar({ status }) {
  const message = status.message || (status.ready ? 'RAG engine is ready' : 'Checking API status...')

  const getStatusClass = () => {
    if (status.status === 'healthy' && status.ready) {
      return 'bg-emerald-50 text-emerald-900 border-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-200 dark:border-emerald-500/30'
    }
    if (status.status === 'error') {
      return 'bg-rose-50 text-rose-900 border-rose-100 dark:bg-rose-500/15 dark:text-rose-200 dark:border-rose-500/30'
    }
    return 'bg-amber-50 text-amber-900 border-amber-100 dark:bg-amber-500/15 dark:text-amber-200 dark:border-amber-500/30'
  }

  const getDotClass = () => {
    if (status.status === 'healthy' && status.ready) return 'bg-emerald-500 dark:bg-emerald-400'
    if (status.status === 'error') return 'bg-rose-500 dark:bg-rose-400'
    return 'bg-amber-500 dark:bg-amber-400'
  }

  const getBadgeClass = () => {
    if (status.status === 'healthy' && status.ready) {
      return 'border-emerald-200 text-emerald-700 dark:border-emerald-500/40 dark:text-emerald-200'
    }
    if (status.status === 'error') {
      return 'border-rose-200 text-rose-700 dark:border-rose-500/40 dark:text-rose-200'
    }
    return 'border-amber-200 text-amber-700 dark:border-amber-500/40 dark:text-amber-200'
  }

  const getMessageClass = () => {
    if (status.status === 'error') {
      return 'text-black-400 dark:text-rose-200'
    }
    if (status.status === 'healthy' && status.ready) {
      return 'text-black-400 dark:text-emerald-200'
    }
    return 'text-black dark:text-amber-200'
  }

  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-6 py-4 ${getStatusClass()}`}>
      <div className="flex items-center gap-3">
        <span className={`h-3 w-3 rounded-full ${getDotClass()}`}></span>
        <div className={`text-sm font-medium ${getMessageClass()}`}>
          {message}
        </div>
      </div>
      <Badge variant="outline" className={getBadgeClass()}>
        {status.status}
      </Badge>
    </div>
  )
}

export default StatusBar
