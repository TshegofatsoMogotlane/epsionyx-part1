'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ScrollBasedLayoutProps {
  children: React.ReactNode
}

export default function ScrollBasedLayout({ children }: ScrollBasedLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Transform values based on scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section with Parallax */}
      <motion.div
        style={{ y, opacity, scale }}
        className="sticky top-0 h-screen overflow-hidden"
      >
        {children}
      </motion.div>

      {/* Content Sections */}
      <div className="relative z-10 bg-white">
        {/* University Statistics Section */}
        <section className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Explore South Africa's Premier Universities
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover comprehensive information about all 26 major universities, 
                complete with real-time weather data, admission requirements, and detailed campus insights.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl"
              >
                <div className="text-4xl font-bold text-blue-600 mb-4">26</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Universities</h3>
                <p className="text-gray-600">Complete coverage of all major South African institutions</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl"
              >
                <div className="text-4xl font-bold text-green-600 mb-4">9</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Provinces</h3>
                <p className="text-gray-600">Every province represented with detailed climate data</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center p-8 bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl"
              >
                <div className="text-4xl font-bold text-purple-600 mb-4">Live</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Weather Data</h3>
                <p className="text-gray-600">Real-time weather conditions for informed decisions</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Professional-Grade University Research
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Make informed decisions with comprehensive data, realistic 3D visualizations, 
                and real-time information about every aspect of university life.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Immersive 3D Campus Experience
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 text-xl">🏛️</span>
                    <div>
                      <strong>Photorealistic Buildings</strong>
                      <p className="text-gray-600">Detailed 3D models with realistic materials and lighting</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">🌤️</span>
                    <div>
                      <strong>Live Weather Integration</strong>
                      <p className="text-gray-600">Real-time weather data for every campus location</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 text-xl">📊</span>
                    <div>
                      <strong>Comprehensive Data</strong>
                      <p className="text-gray-600">Rankings, fees, admission requirements, and more</p>
                    </div>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  What Students Get:
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Real-time campus weather conditions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Detailed admission requirements</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Comprehensive fee structures</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">University rankings and specializations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Campus life and accommodation details</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ready to Explore Your Future?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Start your university research journey with our comprehensive 3D explorer
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Explore Universities Above ↑
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}