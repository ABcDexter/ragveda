import React, { useEffect, useMemo, useState } from 'react'
import Button from './ui/button'

const THEME_KEY = 'ragveda-theme'

function getPreferredTheme() {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function ThemeToggle() {
  const [theme, setTheme] = useState(getPreferredTheme)
  const isDark = theme === 'dark'

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    window.localStorage.setItem(THEME_KEY, theme)
  }, [isDark, theme])

  const label = useMemo(() => (isDark ? 'Dark' : 'Light'), [isDark])

  return (
    <Button
      type="button"
      variant="ghost"
      className="justify-between border border-border bg-background/80"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <span className="text-sm font-medium">{isDark ? '🌙' : '☀️'}</span>
      <span className="text-xs text-muted-foreground">Theme</span>
    </Button>
  )
}

export default ThemeToggle
