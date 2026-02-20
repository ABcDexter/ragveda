import React from 'react'
import { Moon, Sun } from 'lucide-react'
import Switch from './ui/switch'
import { useTheme } from './theme-provider'

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-background/80 px-3 py-2 sm:w-auto">
      <div className="flex items-center gap-2 text-sm font-medium">
        {isDark ? <Moon size={16} /> : <Sun size={16} />}
        <span>{isDark ? 'Dark' : 'Light'}</span>
      </div>
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        aria-label="Toggle theme"
      />
    </div>
  )
}

export default ThemeToggle
