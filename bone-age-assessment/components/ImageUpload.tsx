'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, X } from 'lucide-react'
import ResultsDisplay from './ResultsDisplay'
import { predictBoneAge, Prediction } from '@/lib/api'

export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<Prediction[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const processFile = (file: File) => {
    setError(null)
    
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    if (file.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target?.result as string)
      setSelectedFile(file)
      setResults(null)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFile(files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return
    setIsLoading(true)
    setError(null)
    setProgress(0)
    
    // Start progress animation
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev
        if (prev < 30) return prev + Math.random() * 8
        if (prev < 70) return prev + Math.random() * 5
        return prev + Math.random() * 2
      })
    }, 200)
    
    try {
      // Call actual backend API
      const response = await predictBoneAge(selectedFile)
      
      // Force progress to 100% on success
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      setProgress(100)
      
      // Small delay for smooth UX
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setResults(response.predictions)
    } catch (err) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
      setProgress(0)
      // ===== INI BAGIAN YANG DIRUBAH/DITAMBAHKAN =====
      const errMsg = err instanceof Error ? err.message : 'Failed to analyze image'
      
      if (errMsg === 'Failed to fetch') {
        setError('Server dissconected, please try again later!')
      } else {
        setError(errMsg) // Ini bakal nampilin error 500 atau 400 dari backend kamu
      }
      // ===============================================
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setImage(null)
    setSelectedFile(null)
    setResults(null)
    setError(null)
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  // Jika hasil prediksi sudah ada, render ResultsDisplay
  if (results) {
    return <ResultsDisplay image={image} predictions={results} onReset={handleClear} />
  }

  return (
    <section id="upload-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-blue-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-12">
          {/* Section header */}
          <div className="space-y-4 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">Upload Your X-Ray Image</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Upload a clear hand X-ray image for AI-powered bone age analysis
            </p>
          </div>

          {/* Educational cards */}
          {!image && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📸</span>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground mb-1">What to Upload</h3>
                    <p className="text-sm text-slate-600">Hand X-ray images (PA or AP view)</p>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚙️</span>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground mb-1">How It Works</h3>
                    <p className="text-sm text-slate-600">AI analyzes bone structure patterns instantly</p>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-white rounded-xl border border-blue-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✨</span>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground mb-1">Get Results</h3>
                    <p className="text-sm text-slate-600">Top 3 age predictions with confidence scores</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message Display */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 flex items-center justify-center">
              <span className="mr-2">⚠️</span> {error}
            </div>
          )}

          {/* Upload area */}
          <div className="space-y-6">
            {!image ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                  isDragging
                    ? 'border-blue-500 bg-blue-100/50 shadow-lg'
                    : 'border-blue-300 bg-blue-50/30 hover:border-blue-500 hover:bg-blue-100/30'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="space-y-5">
                  <div className="flex justify-center">
                    <div className="p-4 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">
                      Drag & drop your X-ray here
                    </p>
                    <p className="text-slate-600 mt-2">
                      or click to browse your computer
                    </p>
                  </div>
                  <div className="pt-2 border-t border-blue-200">
                    <p className="text-sm text-slate-500">
                      JPG, PNG up to 50MB • Clear hand X-rays work best
                    </p>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label="Upload X-ray image"
                />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Preview */}
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  <div className="relative w-full aspect-video bg-gray-100 flex items-center justify-center">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Progress bar */}
                {isLoading && (
                  <div className="space-y-4 bg-linear-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 shadow-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          Analyzing your X-ray...
                        </p>
                        <p className="text-xs text-slate-600 mt-1">
                          Running neural network inference
                        </p>
                      </div>
                      <p className="text-3xl font-black bg-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                        {Math.round(progress)}%
                      </p>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden shadow-inner">
                      <div
                        className="bg-linear-to-r from-blue-500 via-cyan-500 to-blue-500 h-full rounded-full transition-all duration-300 ease-out shadow-lg"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3 justify-center flex-wrap pt-2">
                  <button
                    onClick={handleClear}
                    disabled={isLoading}
                    className="px-6 py-3 border-2 border-slate-300 text-foreground font-semibold rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-5 h-5" />
                    Clear
                  </button>
                  <button
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="px-8 py-3 bg-linear-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin inline-block">◐</span>
                        Analyzing...
                      </span>
                    ) : (
                      'Analyze Image'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}