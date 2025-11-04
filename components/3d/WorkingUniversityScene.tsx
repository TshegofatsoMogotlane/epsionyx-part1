'use client'

import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Text, Box, Cylinder, Sphere, Sky, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { SA_UNIVERSITIES } from '@/lib/universityData'
import { useUniversitiesWeather } from '@/hooks/useWeather'

function EnhancedUniversityBuilding({ university, isActive, onClick, index }: any) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1
      
      // Gentle rotation when active
      if (isActive) {
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1) * 0.03
      }
    }
  })

  // Dynamic building height based on student population
  const studentCount = parseInt(university.students.replace(/[^0-9]/g, ''))
  const buildingHeight = Math.max(3, Math.min(7, studentCount / 8000))
  
  const buildingColor = hovered || isActive ? university.color : '#8b7355'
  const glowColor = isActive ? university.color : '#ffffff'

  return (
    <group ref={groupRef} position={university.position}>
      <group
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        {/* Foundation Platform */}
        <Box args={[6, 0.3, 4]} position={[0, 0.15, 0]}>
          <meshStandardMaterial color="#4a5568" roughness={0.8} />
        </Box>

        {/* Main Academic Building */}
        <Box args={[4, buildingHeight, 3]} position={[0, buildingHeight/2 + 0.3, 0]}>
          <meshStandardMaterial 
            color={buildingColor} 
            roughness={0.7} 
            metalness={0.1}
            emissive={isActive ? new THREE.Color(university.color).multiplyScalar(0.1) : new THREE.Color(0x000000)}
          />
        </Box>

        {/* Secondary Building Wing */}
        <Box args={[2.5, buildingHeight * 0.8, 2]} position={[3.5, (buildingHeight * 0.8)/2 + 0.3, 1]}>
          <meshStandardMaterial color={buildingColor} roughness={0.7} metalness={0.1} />
        </Box>

        {/* Glass Entrance Atrium */}
        <Box args={[1.8, buildingHeight * 0.9, 0.3]} position={[0, (buildingHeight * 0.9)/2 + 0.3, 1.65]}>
          <meshPhysicalMaterial 
            color="#87ceeb" 
            transparent 
            opacity={0.4} 
            roughness={0.1} 
            metalness={0.9}
            clearcoat={1.0}
          />
        </Box>

        {/* Classical Columns */}
        {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
          <Cylinder key={i} args={[0.18, 0.18, buildingHeight * 0.85]} position={[x, (buildingHeight * 0.85)/2 + 0.3, 1.8]}>
            <meshStandardMaterial color="#f7fafc" roughness={0.3} metalness={0.2} />
          </Cylinder>
        ))}

        {/* Detailed Roof Structure */}
        <Box args={[4.3, 0.4, 3.3]} position={[0, buildingHeight + 0.5, 0]}>
          <meshStandardMaterial color="#2d3748" roughness={0.8} />
        </Box>

        {/* Window Grid - Multiple Floors */}
        {Array.from({ length: Math.floor(buildingHeight) }, (_, floor) =>
          Array.from({ length: 4 }, (_, window) => (
            <Box 
              key={`${floor}-${window}`} 
              args={[0.5, 0.7, 0.08]} 
              position={[-1.5 + window * 1, 1.5 + floor * 1.2, 1.55]}
            >
              <meshPhysicalMaterial 
                color="#2b6cb0" 
                transparent 
                opacity={0.6} 
                roughness={0.1}
                metalness={0.8}
              />
            </Box>
          ))
        )}

        {/* Campus Grounds with Texture */}
        <Cylinder args={[6, 6, 0.15, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#22c55e" roughness={0.9} />
        </Cylinder>

        {/* Enhanced Landscaping */}
        {[[-4, 0, -3], [4, 0, -3], [-4, 0, 4], [4, 0, 4], [0, 0, -5], [-2, 0, 5], [2, 0, 5]].map((pos, i) => (
          <group key={i} position={pos}>
            {/* Tree Trunk with Texture */}
            <Cylinder args={[0.15, 0.2, 2.2]} position={[0, 1.1, 0]}>
              <meshStandardMaterial color="#8b4513" roughness={0.9} />
            </Cylinder>
            {/* Tree Canopy - Varied Sizes */}
            <Sphere args={[0.8 + Math.random() * 0.4]} position={[0, 2.8, 0]}>
              <meshStandardMaterial color="#228b22" roughness={0.8} />
            </Sphere>
            {/* Small bushes */}
            <Sphere args={[0.3]} position={[0.5, 0.3, 0.5]}>
              <meshStandardMaterial color="#32cd32" roughness={0.9} />
            </Sphere>
          </group>
        ))}

        {/* Pathways and Walkways */}
        <Box args={[1.2, 0.08, 10]} position={[0, 0.08, 0]}>
          <meshStandardMaterial color="#6b7280" roughness={0.7} />
        </Box>
        <Box args={[10, 0.08, 1.2]} position={[0, 0.08, 0]}>
          <meshStandardMaterial color="#6b7280" roughness={0.7} />
        </Box>

        {/* University Name - Simplified */}
        <Text
          position={[0, buildingHeight + 1.8, 0]}
          fontSize={0.5}
          color={university.color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#ffffff"
        >
          {university.shortName}
        </Text>

        {/* Floating University Badge */}
        {(hovered || isActive) && (
          <Text
            position={[0, buildingHeight + 2.5, 0]}
            fontSize={0.25}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#000000"
          >
            {university.students} • {university.type.split(' ')[0]}
          </Text>
        )}
      </group>
    </group>
  )
}

interface WorkingUniversitySceneProps {
  onUniversitySelect: (university: any) => void
  className?: string
}

export default function WorkingUniversityScene({ onUniversitySelect, className = "" }: WorkingUniversitySceneProps) {
  const [activeUniversityIndex, setActiveUniversityIndex] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  
  // Real-time weather data
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
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-white mx-auto mb-6"></div>
          <h3 className="text-2xl font-bold mb-3">Loading Enhanced 3D Campus Experience</h3>
          <p className="text-blue-200">Rendering {SA_UNIVERSITIES.length} realistic university buildings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas 
        shadows 
        camera={{ position: [0, 15, 25], fov: 60 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          {/* Enhanced Lighting Setup */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 15, 5]} 
            intensity={1.2} 
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-10, 10, -10]} intensity={0.6} color="#4f46e5" />
          <spotLight position={[0, 20, 0]} angle={0.3} intensity={0.8} />
          
          {/* Beautiful Sky */}
          <Sky distance={450000} sunPosition={[0, 1, 0]} />
          
          {/* Ground Shadows */}
          <ContactShadows position={[0, -0.1, 0]} opacity={0.4} scale={80} blur={2} />
          
          {/* Environment */}
          <Environment preset="city" />
          
          {/* Render All 26 Universities */}
          {SA_UNIVERSITIES.map((university, index) => (
            <EnhancedUniversityBuilding
              key={university.name}
              university={university}
              index={index}
              isActive={activeUniversityIndex === index}
              onClick={() => handleUniversityClick(index)}
            />
          ))}
          
          <OrbitControls 
            enablePan 
            enableZoom 
            enableRotate 
            maxPolarAngle={Math.PI / 2}
            minDistance={8}
            maxDistance={80}
          />
        </Suspense>
      </Canvas>

      {/* Enhanced University Info Panel with Real-Time Weather */}
      {activeUniversityIndex !== null && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 left-4 bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl max-w-md border border-gray-200 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center mb-4">
            <div 
              className={`w-5 h-5 rounded-full mr-3 shadow-lg`} 
              style={{ backgroundColor: SA_UNIVERSITIES[activeUniversityIndex].color }}
            ></div>
            <div>
              <h3 className="font-bold text-xl text-gray-900">
                {SA_UNIVERSITIES[activeUniversityIndex].name}
              </h3>
              <p className="text-sm text-gray-600">
                📍 {SA_UNIVERSITIES[activeUniversityIndex].city}, {SA_UNIVERSITIES[activeUniversityIndex].province}
              </p>
            </div>
          </div>

          {/* REAL-TIME WEATHER - NO HARDCODED VALUES */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🌤️</span>
                  <p className="text-sm font-medium">Live Weather</p>
                  {weatherLoading && <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>}
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
                <button 
                  onClick={refreshWeather}
                  className="mt-2 bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-xs transition-colors"
                >
                  🔄 Refresh
                </button>
              </div>
            </div>
            {weatherError && (
              <p className="text-xs text-yellow-200 mt-2">⚠️ API Error - Check your key</p>
            )}
            {!weatherLoading && !weatherError && weatherData[activeUniversityIndex] && (
              <p className="text-xs text-green-200 mt-2">✅ Live weather data</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs text-blue-600 font-medium">RANKING</p>
              <p className="text-sm font-bold text-blue-800">{SA_UNIVERSITIES[activeUniversityIndex].ranking}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-xs text-green-600 font-medium">STUDENTS</p>
              <p className="text-sm font-bold text-green-800">{SA_UNIVERSITIES[activeUniversityIndex].students}</p>
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
            <p className="text-sm font-semibold text-gray-700 mb-2">💰 Annual Fees</p>
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
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-xl text-white p-4 rounded-xl text-sm">
        <p>🖱️ Click universities to explore</p>
        <p>🔄 Drag to rotate • 🔍 Scroll to zoom</p>
        <p className="text-yellow-300 font-bold">🏛️ {SA_UNIVERSITIES.length} Universities</p>
        <div className="mt-3 pt-2 border-t border-white/20">
          <p className="flex items-center gap-2">
            🌤️ Weather: 
            {weatherLoading ? (
              <span className="text-blue-300">Loading...</span>
            ) : weatherError ? (
              <span className="text-red-300">Check API Key</span>
            ) : (
              <span className="text-green-300">Live Data</span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}