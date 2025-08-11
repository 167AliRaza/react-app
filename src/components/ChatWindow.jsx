import React, { useRef, useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChatWindow({ apiBase, sessionId, messages, setMessages, loading, setLoading }) {
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const listRef = useRef(null)

  const sendQuestion = async () => {
    setError('')
    if (!sessionId) return setError('Upload a PDF first')
    if (!query.trim()) return

    const q = query.trim()
    setMessages((m) => [...m, { role: 'user', text: q }])
    setQuery('')
    setLoading(true)

    try {
      const res = await axios.get(`${apiBase}/chat/`, {
        params: { session_id: sessionId, query: q }
      })

      const botText = res.data.response
      setMessages((m) => [...m, { role: 'bot', text: botText }])

      // scroll
      setTimeout(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
      }, 50)
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-3 text-sm text-gray-600">Session: <span className="font-mono">{sessionId || '—'}</span></div>

      <div ref={listRef} className="h-72 overflow-y-auto border rounded-lg p-3 bg-gray-50">
        <AnimatePresence initial={false} mode="popLayout">
          {messages.length === 0 && <div className="text-gray-400">No messages yet</div>}

          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-3/4 px-4 py-2 rounded-xl ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
                <pre className="whitespace-pre-wrap">{m.text}</pre>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && <div className="text-sm text-gray-500">Processing...</div>}
      </div>

      <div className="mt-3 flex gap-3">
        <input
          className="flex-1 px-4 py-2 border rounded-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') sendQuestion() }}
          placeholder={sessionId ? 'Ask about the document...' : 'Upload a PDF first'}
          disabled={!sessionId || loading}
        />
        <button onClick={sendQuestion} disabled={!sessionId || loading} className="px-4 py-2 bg-green-600 text-white rounded-lg">Ask</button>
      </div>

      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  )
}