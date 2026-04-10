'use client';

import { Check } from 'lucide-react';

interface Prediction {
  rank: 1 | 2 | 3;
  age: number;
  confidence: number;
}

interface ResultsDisplayProps {
  image: string;
  predictions: Prediction[];
}

const medalEmojis = {
  1: '🥇',
  2: '🥈',
  3: '🥉'
};

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 90) return 'bg-green-100 border-green-300 text-green-900';
  if (confidence >= 80) return 'bg-blue-100 border-blue-300 text-blue-900';
  return 'bg-yellow-100 border-yellow-300 text-yellow-900';
};

const getConfidenceLabel = (confidence: number) => {
  if (confidence >= 90) return 'Very High';
  if (confidence >= 80) return 'High';
  if (confidence >= 50) return 'Medium';
  return 'Low';
};

export default function ResultsDisplay({ image, predictions }: ResultsDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-blue-100 p-6">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">
        Analysis Results
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left side: Image */}
        <div>
          <h4 className="text-sm font-semibold text-slate-600 mb-3">
            Uploaded Image
          </h4>
          <div className="bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
            <img
              src={image}
              alt="X-ray analysis"
              className="w-full h-auto max-h-80 object-cover"
            />
          </div>
        </div>

        {/* Right side: Results */}
        <div>
          <h4 className="text-sm font-semibold text-slate-600 mb-4">
            Top 3 Age Predictions
          </h4>

          <div className="space-y-3">
            {predictions.map((pred) => (
              <div
                key={pred.rank}
                className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                  pred.rank === 1
                    ? 'bg-linear-to-r from-blue-50 to-cyan-50 border-blue-300'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{medalEmojis[pred.rank]}</span>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Prediction {pred.rank}
                      </p>
                      <p className="text-2xl font-bold text-slate-900">
                        {pred.age} years
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${pred.confidence}%` }}
                    ></div>
                  </div>
                  <span className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold border ${
                    getConfidenceColor(pred.confidence)
                  }`}>
                    {getConfidenceLabel(pred.confidence)}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-2">
                  Confidence: {pred.confidence.toFixed(1)}%
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-sm font-semibold text-green-900">
                  Analysis Complete
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Results are based on advanced AI analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}