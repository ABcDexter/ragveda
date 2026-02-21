import React, { useState, useRef, useEffect, useImperativeHandle } from 'react'
import axios from 'axios'
import API_BASE_URL from '../config'
import Badge from './ui/badge'
import Button from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import Input from './ui/input'

const ChatInterface = React.forwardRef(({ apiReady }, ref) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const suggestions = [
    'What is dharma according to Krishna?',
    'How should I act without attachment?',
    'Explain the three gunas in simple terms.'
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useImperativeHandle(ref, () => ({
    resetChat() {
      setMessages([])
      setInput('')
      setLoading(false)
    }
  }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || !apiReady || loading) return

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/ask`, {
        question: input,
        context_limit: 3
      })

      const assistantMessage = {
        role: 'assistant',
        content: response.data.answer,
        sources: response.data.sources,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: `Error: ${error.response?.data?.detail || error.message || 'Failed to get response'}`,
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestion = (prompt) => {
    setInput(prompt)
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return ''
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-border bg-muted/40">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-2xl">Conversation</CardTitle>
            <CardDescription>Explore the Gita with curated, grounded answers.</CardDescription>
          </div>
          <Badge variant={apiReady ? 'default' : 'outline'}>
            {apiReady ? 'API ready' : 'API warming up'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[520px] min-h-[360px] space-y-6 overflow-y-auto px-6 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Welcome to Ragveda</h3>
                <p className="text-sm text-muted-foreground">
                  Ask questions about the Bhagavad Gita and Indian philosophy.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestions.map((prompt) => (
                  <Button
                    key={prompt}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestion(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
              {!apiReady && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-900">
                  Please add `gita.txt` to the data directory and restart the backend.
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] space-y-2 rounded-2xl px-4 py-3 text-sm shadow-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </div>
                    <div className="text-xs opacity-70">{formatTime(message.timestamp)}</div>
                    {message.sources && message.sources.length > 0 && (
                      <details className="rounded-xl border border-border/50 bg-background/60 px-3 py-2 text-xs text-muted-foreground">
                        <summary className="cursor-pointer font-medium text-foreground">
                          Sources
                        </summary>
                        <div className="mt-2 space-y-2">
                          {message.sources.map((source, idx) => (
                            <div key={idx} className="rounded-lg bg-muted/60 px-2 py-1">
                              {source}
                            </div>
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                  Thinking…
                </div>
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t border-border bg-card px-6 py-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={apiReady ? 'Ask a question about the Bhagavad Gita...' : 'Waiting for API to be ready...'}
              disabled={!apiReady || loading}
            />
            <Button
              type="submit"
              className="sm:w-32"
              disabled={!apiReady || loading || !input.trim()}
            >
              {loading ? 'Sending…' : 'Send'}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
})

ChatInterface.displayName = 'ChatInterface'

export default ChatInterface
