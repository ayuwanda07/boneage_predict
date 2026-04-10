'use client';

import { useState } from 'react';
import { Cloud, Upload } from 'lucide-react';
import ResultsDisplay from './ResultsDisplay';
import { predictBoneAge } from '@/lib/api';

interface Prediction {
  rank: 1 | 2 | 3;
  age: number;
  confidence: number;
}

export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<Prediction[] | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    setError(null);
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Check file size
    if (file.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setFileName(file.name);
      setResults(null);
      setSelectedFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await predictBoneAge(selectedFile);
      setResults(response.predictions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
      console.error('Error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setFileName('');
    setResults(null);
    setError(null);
    setSelectedFile(null);
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">
          Upload X-Ray Image
        </h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Upload a clear X-ray image of the hand to analyze bone age
        </p>

        {!image ? (
          <div className="max-w-2xl mx-auto">
            <label
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`block p-8 md:p-12 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-blue-200 bg-white hover:border-blue-300'
              }`}
            >
              <Cloud className={`mx-auto mb-4 ${dragActive ? 'text-blue-600' : 'text-blue-400'}`} size={48} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Drag and drop your image here
              </h3>
              <p className="text-slate-600 mb-4">or</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                id="file-input"
              />
              <button
                onClick={() => document.getElementById('file-input')?.click()}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                <Upload size={20} />
                Choose File
              </button>
              <p className="text-sm text-slate-500 mt-4">
                Supported formats: JPG, PNG
              </p>
            </label>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                {error}
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 p-6 mb-6">
              <h3 className="text-sm font-semibold text-slate-600 mb-4">
                File: {fileName}
              </h3>
              <div className="relative bg-slate-100 rounded-lg overflow-hidden mb-6">
                <img
                  src={image}
                  alt="Uploaded X-ray"
                  className="w-full h-auto max-h-96 object-cover"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Bone Age'}
                </button>
                <button
                  onClick={handleReset}
                  disabled={isAnalyzing}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 disabled:bg-slate-100 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Upload Different Image
                </button>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  {error}
                </div>
              )}
            </div>

            {results && <ResultsDisplay image={image} predictions={results} />}
          </div>
        )}
      </div>
    </section>
  );
}