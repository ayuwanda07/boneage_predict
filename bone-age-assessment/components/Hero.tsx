'use client'

import { ArrowDown } from 'lucide-react'

export default function Hero() {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload-section')
    uploadSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -ml-48 -mb-48"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8 pt-20">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-200 rounded-full">
            <span className="text-sm font-medium text-primary">🔬 Advanced AI Technology</span>
          </div>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Bone Age
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                Assessment
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 font-light leading-relaxed">
              Harness the power of artificial intelligence to accurately assess skeletal maturity from X-ray images
            </p>
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="p-6 rounded-lg bg-white/60 backdrop-blur border border-blue-100 hover:border-blue-300 transition-colors">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-foreground mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-600">Get results in seconds, not minutes</p>
            </div>
            <div className="p-6 rounded-lg bg-white/60 backdrop-blur border border-blue-100 hover:border-blue-300 transition-colors">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-foreground mb-2">Highly Accurate</h3>
              <p className="text-sm text-gray-600">Powered by medical-grade AI models</p>
            </div>
            <div className="p-6 rounded-lg bg-white/60 backdrop-blur border border-blue-100 hover:border-blue-300 transition-colors">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-semibold text-foreground mb-2">Secure & Private</h3>
              <p className="text-sm text-gray-600">Your data stays completely confidential</p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={scrollToUpload}
            className="mt-12 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
          >
            Get Started Now
          </button>

          {/* Scroll indicator */}
          <button
            onClick={scrollToUpload}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
            aria-label="Scroll to upload section"
          >
            <ArrowDown className="w-6 h-6 text-primary" />
          </button>
        </div>
      </div>
    </section>
  )
}
