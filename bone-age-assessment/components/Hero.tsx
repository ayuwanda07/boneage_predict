'use client'

import { ArrowDown, Zap, Target, Lock, Brain } from 'lucide-react'

export default function Hero() {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload-section')
    uploadSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative w-full min-h-screen bg-linear-to-br from-blue-900 via-slate-900 to-blue-800 overflow-hidden pt-10">
      {/* Animated background blobs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-sky-400 rounded-full blur-3xl opacity-10"></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto w-full text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/50 rounded-full backdrop-blur-sm hover:bg-blue-500/30 transition-all">
            <Brain className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-semibold text-blue-200">AI-Powered Medical Diagnostics</span>
          </div>

          {/* Main heading */}
          <div className="space-y-6">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-tight text-balance">
              Bone Age
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-400 to-blue-500 mt-2">
                Assessment
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 font-light leading-relaxed max-w-3xl mx-auto">
              Instantly analyze hand X-rays using advanced deep learning to predict skeletal maturity with medical precision
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <div className="p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
                  <Zap className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-white">Instant Results</h3>
              </div>
              <p className="text-sm text-blue-200">Analysis in seconds</p>
            </div>

            <div className="p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white">Clinical Accuracy</h3>
              </div>
              <p className="text-sm text-blue-200">±0.7 years precision</p>
            </div>

            <div className="p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
                  <Lock className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="font-semibold text-white">Data Secure</h3>
              </div>
              <p className="text-sm text-blue-200">Never stored</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <button
              onClick={scrollToUpload}
              className="px-8 py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 duration-200 flex items-center gap-2 group text-lg mx-auto"
            >
              Begin Analysis
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="pt-12">
            <button
              onClick={scrollToUpload}
              className="animate-bounce text-blue-300 hover:text-blue-200 transition-colors mx-auto"
              aria-label="Scroll to upload section"
            >
              <ArrowDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
