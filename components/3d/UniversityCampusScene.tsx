'use client'

import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Text, Box, Cylinder } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { SA_UNIVERSITIES } from '@/lib/universityData'
import { useUniversitiesWeather } from '@/hooks/useWeather'

function UniversityBuilding({ university, isActive, onClick, index }: any) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.02
    }
  })

  const buildingColor = hovered || isActive ? university.color : '#8b7355'

  return (
    <group ref={groupRef} position={university.position}>
      <group
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <Box args={[3.5, 3, 2.5]} position={[0, 1.8, 0]}>
          <meshStandardMaterial color={buildingColor} roughness={0.8} />
        </Box>
        <Cylinder args={[4, 4, 0.1, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#22c55e" />
        </Cylinder>
      </group>
      <Text
        position={[0, 4.5, 0]}
        fontSize={0.3}
        color={university.color}
        anchorX="center"
        anchorY="middle"
      >
        {university.name.split(' ').slice(0, 2).join(' ')}
      </Text>
    </group>
  )
}

interface UniversityCampusSceneProps {
  onUniversitySelect: (university: any) => void
  className?: string
}

export default function UniversityCampusScene({ onUniversitySelect, className = "" }: UniversityCampusSceneProps) {
  const [activeUniversityIndex, setActiveUniversityIndex] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  
  // REAL-TIME WEATHER DATA - NO MORE HARDCODED VALUES!
  const { weatherData, loading: weatherLoading, error: weatherError, refresh: refreshWeather } = useUniversitiesWeather(SA_UNIVERSITIES)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  const handleUniversityClick = (index: number) => {
    setActiveUniversityIndex(index)
    onUniversitySelect(SA_UNIVERSITIES[index])
  }

  if (!isMounted) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h3 className="text-xl font-bold mb-2">Loading 3D Campus Experience</h3>
          <p className="text-blue-200">Preparing real-time weather data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas shadows camera={{ position: [0, 10, 20], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Environment preset="sunset" />
          
          {SA_UNIVERSITIES.map((university, index) => (
            <UniversityBuilding
              key={university.name}
              university={university}
              index={index}
              isActive={activeUniversityIndex === index}
              onClick={() => handleUniversityClick(index)}
            />
          ))}
          
          <OrbitControls enablePan enableZoom enableRotate />
        </Suspense>
      </Canvas>      
{/* University Info Panel with REAL-TIME WEATHER */}
      {activeUniversityIndex !== null && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl max-w-md border border-gray-200 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center mb-4">
            <div className={`w-4 h-4 rounded-full mr-3`} style={{ backgroundColor: SA_UNIVERSITIES[activeUniversityIndex].color }}></div>
            <div>
              <h3 className="font-bold text-xl text-gray-900">
                {SA_UNIVERSITIES[activeUniversityIndex].name}
              </h3>
              <p className="text-sm text-gray-600">
                📍 {SA_UNIVERSITIES[activeUniversityIndex].city}, {SA_UNIVERSITIES[activeUniversityIndex].province}
              </p>
            </div>
          </div>

          {/* REAL-TIME WEATHER - NO MORE HARDCODED DATA! */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm opacity-90">🌤️ Live Weather</p>
                  {weatherLoading && <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>}
                  <button 
                    onClick={refreshWeather}
                    className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition-colors"
                  >
                    🔄
                  </button>
                </div>
                <p className="text-2xl font-bold">
                  {weatherData[activeUniversityIndex]?.temp || "Loading..."}
                </p>
                <p className="text-sm">
                  {weatherData[activeUniversityIndex]?.condition || "Fetching..."}
                </p>
              </div>
              <div className="text-right text-sm">
                <p>💧 {weatherData[activeUniversityIndex]?.humidity || "-%"}</p>
                <p>💨 {weatherData[activeUniversityIndex]?.wind || "- km/h"}</p>
                <p>🌡️ {SA_UNIVERSITIES[activeUniversityIndex].climate}</p>
                {weatherError && (
                  <p className="text-xs text-yellow-200 mt-1">
                    ⚠️ {weatherError.includes('401') ? 'API key needed' : 'Using fallback'}
                  </p>
                )}
                {!weatherLoading && !weatherError && weatherData[activeUniversityIndex] && (
                  <p className="text-xs text-green-200 mt-1">✅ Live data</p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">🎓 Specializations</p>
            <div className="flex flex-wrap gap-2">
              {SA_UNIVERSITIES[activeUniversityIndex].specializations.map((spec, i) => (
                <span key={i} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">💰 Fees</p>
            <div className="bg-green-50 rounded-lg p-3 text-sm">
              <p><strong>Undergraduate:</strong> {SA_UNIVERSITIES[activeUniversityIndex].fees?.undergraduate}</p>
              <p><strong>Postgraduate:</strong> {SA_UNIVERSITIES[activeUniversityIndex].fees?.postgraduate}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm font-semibold text-gray-700 mb-2">🌟 Highlights</p>
            <div className="space-y-1">
              {SA_UNIVERSITIES[activeUniversityIndex].highlights.map((highlight, i) => (
                <p key={i} className="text-sm text-gray-600">{highlight}</p>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Status Panel */}
      <div className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-lg text-sm">
        <p>🖱️ Click universities to explore</p>
        <p className="text-yellow-300 font-bold">🏛️ {SA_UNIVERSITIES.length} Universities</p>
        <div className="mt-2 pt-2 border-t border-gray-600">
          <p className="flex items-center gap-2">
            🌤️ Weather: 
            {weatherLoading ? (
              <span className="text-blue-300">Loading...</span>
            ) : weatherError ? (
              <span className="text-red-300">Fallback</span>
            ) : (
              <span className="text-green-300">Live API</span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}