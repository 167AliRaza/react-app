import React, { useState, useRef } from 'react'
import axios from 'axios'

export default function FileUploader({ apiBase, onSession }) {
  const [file, setFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState('')
  const fileRef = useRef()

  const handleUpload = async () => {
    setError('')
    if (!file) {
      setError('Choose a PDF file first')
      return
    }

    const form = new FormData()
    form.append('file', file)

    try {
      const res = await axios.post(`${apiBase}/upload-pdf/`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          if (e.lengthComputable) setUploadProgress(Math.round((e.loaded / e.total) * 100))
        }
      })

      if (res.data.session_id) {
        onSession(res.data.session_id)
      } else {
        setError('Server did not return a session id')
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Upload failed')
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <input
          ref={fileRef}
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="flex-1"
        />
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Upload
        </button>
      </div>

      {uploadProgress > 0 && (
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div style={{ width: `${uploadProgress}%` }} className="h-2 bg-blue-500" />
        </div>
      )}

      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}