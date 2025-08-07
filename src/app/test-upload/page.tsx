'use client'

import { useState } from 'react'

export default function TestUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      console.log('File selected:', {
        name: file.name,
        size: file.size,
        type: file.type
      })
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first')
      return
    }

    setUploading(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)

      console.log('Uploading file...')
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      console.log('Upload response:', data)

      if (response.ok) {
        setResult({ success: true, data })
        alert('Upload successful!')
      } else {
        setResult({ success: false, error: data.error })
        alert(`Upload failed: ${data.error}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      setResult({ success: false, error: error instanceof Error ? error.message : 'Unknown error' })
      alert(`Upload failed: ${error}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Test Image Upload</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full text-gray-300"
            />
          </div>

          {selectedFile && (
            <div className="text-sm text-gray-300">
              <p>Selected: {selectedFile.name}</p>
              <p>Size: {Math.round(selectedFile.size / 1024)} KB</p>
              <p>Type: {selectedFile.type}</p>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>

          {result && (
            <div className={`p-4 rounded-lg ${result.success ? 'bg-green-900' : 'bg-red-900'}`}>
              <h3 className={`font-medium ${result.success ? 'text-green-300' : 'text-red-300'}`}>
                {result.success ? 'Success!' : 'Error!'}
              </h3>
              <pre className="text-xs text-gray-300 mt-2 whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          {result?.success && result.data.imageUrl && (
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Uploaded Image:</h3>
              <img
                src={result.data.imageUrl}
                alt="Uploaded"
                className="w-full rounded-lg"
                onError={(e) => {
                  console.error('Failed to load uploaded image')
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
