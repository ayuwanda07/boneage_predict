'use client'

import { ArrowLeft } from 'lucide-react'
import { Prediction } from '@/lib/api'

interface ResultsDisplayProps {
  image: string | null
  predictions: Prediction[]
  onReset: () => void
}

export default function ResultsDisplay({
  image,
  predictions,
  onReset,
}: ResultsDisplayProps) {
  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return '•'
    }
  }

  // Membuat deskripsi dinamis berdasarkan ranking
  const getDescription = (rank: number) => {
    switch (rank) {
      case 1:
        return 'Most likely age prediction based on skeletal maturity'
      case 2:
        return 'Alternative prediction with high confidence'
      case 3:
        return 'Secondary alternative based on ossification pattern'
      default:
        return undefined
    }
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header with navigation */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Analysis Results</h1>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-foreground hover:bg-slate-50 font-semibold rounded-lg transition-all hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
            New Analysis
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image section */}
          <div className="space-y-4 flex flex-col">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">Your X-Ray Image</h2>
              <p className="text-sm text-slate-600">Successfully processed by AI model</p>
            </div>
            <div className="border-2 border-blue-200 rounded-2xl overflow-hidden bg-white shadow-lg flex-1 flex items-center justify-center min-h-96">
              <div className="relative w-full h-full bg-slate-100 flex items-center justify-center">
                {image && (
                  <img
                    src={image}
                    alt="Analyzed X-ray"
                    className="w-full h-full object-contain p-4"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Results section */}
          <div className="space-y-6 flex flex-col">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">Predicted Age Predictions</h2>
              <p className="text-sm text-slate-600">Based on skeletal maturity patterns</p>
            </div>

            {/* Predictions list */}
            <div className="space-y-3 flex-1">
              {predictions.map((prediction) => (
                <div
                  key={prediction.rank}
                  className={`p-5 rounded-xl border-2 transition-all transform hover:scale-[1.02] ${
                    prediction.rank === 1
                      ? 'border-blue-400 bg-linear-to-r from-blue-50 to-cyan-50 shadow-lg ring-2 ring-blue-200/50'
                      : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-4xl">{getMedalIcon(prediction.rank)}</span>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          {prediction.rank === 1 ? 'Most Likely' : `Prediction ${prediction.rank}`}
                        </p>
                        <p className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-600 mt-0.5">
                          {prediction.age} years
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-slate-600">Confidence</p>
                      <p className={`text-2xl font-black mt-1 ${
                        prediction.confidence >= 50 ? 'text-green-600' : prediction.confidence >= 30 ? 'text-blue-600' : 'text-amber-600'
                      }`}>
                        {prediction.confidence.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mt-3 pt-3 border-t border-slate-200">
                    {getDescription(prediction.rank)}
                  </p>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-4 space-y-2 mt-auto">
              <p className="font-semibold text-amber-900 flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                Clinical Disclaimer
              </p>
              <p className="text-sm text-amber-800">
                This is an AI-assisted analysis tool. Results should be reviewed by a qualified radiologist for clinical decisions. Use as supporting evidence only.
              </p>
            </div>

            {/* Action button */}
            <button
              onClick={() => {
                alert('Report download functionality coming soon!')
              }}
              className="w-full px-6 py-3 bg-linear-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Download Report (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}