import React from 'react'
import Badge from './ui/badge'
import Button from './ui/button'
import ThemeToggle from './ThemeToggle'

function Header() {
  return (
    <div className="rounded-3xl border border-border bg-card/60 p-8 shadow-soft backdrop-blur">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-4 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Retrieval-Augmented Generation</Badge>
            <Badge variant="outline">Bhagavad Gita</Badge>
            <Badge variant="secondary">FastAPI · React</Badge>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              🕉️ RagVeda
            </h1>
            <p className="text-muted-foreground text-balance">
              Ask thoughtful questions about Indian philosophy and explore guidance
              from the Śrīmad Bhagavadgītā with a focused, calm chat experience.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto">
          <ThemeToggle />
          <Button className="w-full sm:w-auto" variant="default">
            Start afresh
          </Button>
          <Button className="w-full sm:w-auto" variant="outline">
            View API docs
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header
