import React, { useEffect, useState, useRef } from 'react'
import FileUploader from './components/FileUploader'
import ChatWindow from './components/ChatWindow'
// src/config.js or directly in App.jsx
export const API_BASE = import.meta.env.VITE_API_BASE || "https://167aliraza-rag-application.hf.space";

const STORAGE_KEY = 'pdf_chat_session_id'

export default function App() {
  const [sessionId, setSessionId] = useState(localStorage.getItem(STORAGE_KEY) || '')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (sessionId) localStorage.setItem(STORAGE_KEY, sessionId)
    else localStorage.removeItem(STORAGE_KEY)
  }, [sessionId])

  // Keep messages per-session (optional)
  useEffect(() => {
    if (!sessionId) return
    const saved = localStorage.getItem('pdf_chat_messages_' + sessionId)
    if (saved) setMessages(JSON.parse(saved))
  }, [sessionId])

  useEffect(() => {
    if (sessionId) localStorage.setItem('pdf_chat_messages_' + sessionId, JSON.stringify(messages))
  }, [messages, sessionId])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">PDF Chat</h1>

        <FileUploader apiBase={API_BASE} onSession={(id) => { setSessionId(id); setMessages([]); }} />

        <div className="mt-6">
          <ChatWindow
            apiBase={API_BASE}
            sessionId={sessionId}
            messages={messages}
            setMessages={setMessages}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>
    </div>
  )
}