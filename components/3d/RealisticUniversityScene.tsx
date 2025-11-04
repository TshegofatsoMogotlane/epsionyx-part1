'use client'

import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment, 
  Text, 
  Box, 
  Cylinder, 
  Sphere,
  useTexture,
  Sky,
  ContactShadows,
  Float,
  Html,
  PerspectiveCamera,
  Effects
} from '@react-three/drei'
import * as THREE from 'three'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SA_UNIVERSITIES } from '@/lib/universityData'
import { useUniversitiesWeather } from '@/hooks/useWeather'

// Realistic University Building Component
function RealisticUniversityBuilding({ university, isActive, onClick, index }: any) {
  const groupRef = useRef<THREE.Group>(null)
  const buildingRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  // Create realistic materials with fallbacks
  const materials = useMemo(() => {
    // Create procedural textures as fallbacks
    const createBrickTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = 256
      const ctx = canvas.getContext('2d')!
      
      // Create brick pattern
      ctx.fillStyle = university.color
      ctx.fillRect(0, 0, 256, 256)
      ctx.fillStyle = '#8b4513'
      for (let y = 0; y < 256; y += 32) {
        for (let x = 0; x < 256; x += 64) {
          ctx.fillRect(x + (y % 64 === 0 ? 0 : 32), y, 60, 28)
        }
      }
      
      const texture = new THREE.CanvasTexture(canvas)
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(4, 4)
      return texture
    }

    const brickTexture = createBrickTexture()
    
    return {
      brick: new THREE.MeshStandardMaterial({ 
        map: brickTexture,
        roughness: 0.8,
        metalness: 0.1,
        color: university.color,
        emissive: new THREE.Color(0x000000)
      }),
      glass: new THREE.MeshPhysicalMaterial({
        transparent: true,
        opacity: 0.3,
        roughness: 0.1,
        metalness: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        color: '#87ceeb',
        emissive: new THREE.Color(0x000000)
      }),
      roof: new THREE.MeshStandardMaterial({
        roughness: 0.9,
        metalness: 0.1,
        color: '#2d3748',
        emissive: new THREE.Color(0x000000)
      })
    }
  }, [university.color])

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1
      
      // Rotation based on activity
      if (isActive) {
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.05
      }
    }
    
    // Safe material emissive handling
    if (buildingRef.current && buildingRef.current.material) {
      const material = buildingRef.current.material as THREE.MeshStandardMaterial
      if (material.emissive && typeof material.emissive.setHex === 'function') {
        if (hovered || isActive) {
          // Glowing effect when hovered/active
          material.emissive.setHex(0x222222)
        } else {
          material.emissive.setHex(0x000000)
        }
      }
    }
  })

  // Generate building height based on university size
  const buildingHeight = useMemo(() => {
    const studentCount = parseInt(university.students.replace(/[^0-9]/g, ''))
    return Math.max(3, Math.min(8, studentCount / 10000))
  }, [university.students])

  return (
    <group ref={groupRef} position={university.position}>
      <group
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        {/* Foundation Platform */}
        <Box args={[6, 0.2, 4]} position={[0, 0.1, 0]}>
          <meshStandardMaterial color="#4a5568" roughness={0.8} />
        </Box>

        {/* Main Building Complex */}
        <Box ref={buildingRef} args={[4, buildingHeight, 3]} position={[0, buildingHeight/2 + 0.2, 0]}>
          <primitive object={materials.brick} />
        </Box>

        {/* Secondary Building */}
        <Box args={[2.5, buildingHeight * 0.7, 2]} position={[3, (buildingHeight * 0.7)/2 + 0.2, 1]}>
          <primitive object={materials.brick} />
        </Box>

        {/* Glass Entrance */}
        <Box args={[1.5, buildingHeight * 0.8, 0.2]} position={[0, (buildingHeight * 0.8)/2 + 0.2, 1.6]}>
          <primitive object={materials.glass} />
        </Box>

        {/* Roof */}
        <Box args={[4.2, 0.3, 3.2]} position={[0, buildingHeight + 0.35, 0]}>
          <primitive object={materials.roof} />
        </Box>

        {/* Classical Columns */}
        {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
          <Cylinder key={i} args={[0.15, 0.15, buildingHeight * 0.8]} position={[x, (buildingHeight * 0.8)/2 + 0.2, 1.7]}>
            <meshStandardMaterial color="#f7fafc" roughness={0.3} metalness={0.1} />
          </Cylinder>
        ))}

        {/* Windows Grid */}
        {Array.from({ length: 3 }, (_, floor) =>
          Array.from({ length: 4 }, (_, window) => (
            <Box 
              key={`${floor}-${window}`} 
              args={[0.4, 0.6, 0.05]} 
              position={[-1.5 + window * 1, 1 + floor * 1.5, 1.52]}
            >
              <primitive object={materials.glass} />
            </Box>
          ))
        )}

        {/* Campus Grounds */}
        <Cylinder args={[5, 5, 0.1, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#22c55e" roughness={0.9} />
        </Cylinder>

        {/* Landscaping - Trees */}
        {[[-3, 0, -2], [3, 0, -2], [-3, 0, 3], [3, 0, 3], [0, 0, -4]].map((pos, i) => (
          <group key={i} position={pos}>
            {/* Tree Trunk */}
            <Cylinder args={[0.15, 0.2, 2]} position={[0, 1, 0]}>
              <meshStandardMaterial color="#8b4513" roughness={0.9} />
            </Cylinder>
            {/* Tree Canopy */}
            <Sphere args={[1]} position={[0, 2.5, 0]}>
              <meshStandardMaterial color="#228b22" roughness={0.8} />
            </Sphere>
          </group>
        ))}

        {/* Pathways */}
        <Box args={[1, 0.05, 8]} position={[0, 0.05, 0]}>
          <meshStandardMaterial color="#6b7280" roughness={0.7} />
        </Box>
        <Box args={[8, 0.05, 1]} position={[0, 0.05, 0]}>
          <meshStandardMaterial color="#6b7280" roughness={0.7} />
        </Box>

        {/* University Name with 3D Text */}
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          <Text
            position={[0, buildingHeight + 1.5, 0]}
            fontSize={0.4}
            color={university.color}
            anchorX="center"
            anchorY="middle"

            outlineWidth={0.02}
            outlineColor="#ffffff"
          >
            {university.shortName}
          </Text>
        </Float>

        {/* Floating Info Badge */}
        {(hovered || isActive) && (
          <Html position={[0, buildingHeight + 2.5, 0]} center>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-gray-200 min-w-[200px]">
              <h4 className="font-bold text-sm text-gray-900">{university.name}</h4>
              <p className="text-xs text-gray-600">{university.city}, {university.province}</p>
              <p className="text-xs text-blue-600 font-medium">{university.students} students</p>
            </div>
          </Html>
        )}
      </group>
    </group>
  )
}

// Scroll-based Camera Controller
function ScrollCamera() {
  const { camera } = useThree()
  const { scrollY } = useScroll()
  
  useFrame(() => {
    const scrollProgress = scrollY.get() / window.innerHeight
    
    // Camera movement based on scroll
    camera.position.x = Math.sin(scrollProgress * Math.PI * 2) * 20
    camera.position.z = Math.cos(scrollProgress * Math.PI * 2) * 20
    camera.position.y = 10 + scrollProgress * 5
    
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// Environment and Lighting Setup
function SceneEnvironment() {
  return (
    <>
      {/* Advanced Lighting */}
      <ambientLight intensity={0.3} color="#ffffff" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#4f46e5" />
      <spotLight 
        position={[0, 20, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={0.5}
        castShadow
      />
      
      {/* Sky and Environment */}
      <Sky 
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      
      {/* Ground Shadows */}
      <ContactShadows 
        position={[0, -0.1, 0]} 
        opacity={0.4} 
        scale={100} 
        blur={2} 
        far={20}
      />
      
      {/* Environment Map */}
      <Environment preset="city" />
    </>
  )
}

interface RealisticUniversitySceneProps {
  onUniversitySelect: (university: any) => void
  className?: string
}

export default function RealisticUniversityScene({ onUniversitySelect, className = "" }: RealisticUniversitySceneProps) {
  const [activeUniversityIndex, setActiveUniversityIndex] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
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
          <h3 className="text-2xl font-bold mb-3">Loading Realistic 3D Campus Experience</h3>
          <p className="text-blue-200">Preparing photorealistic university buildings...</p>
          <div className="mt-4 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-sm">🏛️ Rendering {SA_UNIVERSITIES.length} universities</p>
            <p className="text-sm">🌤️ Loading real-time weather data</p>
            <p className="text-sm">✨ Applying realistic materials and lighting</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <Canvas 
        shadows 
        camera={{ position: [0, 15, 25], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <SceneEnvironment />
          <ScrollCamera />
          
          {SA_UNIVERSITIES.map((university, index) => (
            <RealisticUniversityBuilding
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
            minDistance={10}
            maxDistance={100}
          />
        </Suspense>
      </Canvas>      
{/* Enhanced University Info Panel */}
      {activeUniversityIndex !== null && (
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="absolute top-4 left-4 bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl max-w-md border border-gray-200/50 max-h-[90vh] overflow-y-auto"
        >
          {/* Header with University Branding */}
          <div className="flex items-center mb-6">
            <div 
              className={`w-6 h-6 rounded-full mr-4 shadow-lg`} 
              style={{ 
                backgroundColor: SA_UNIVERSITIES[activeUniversityIndex].color,
                boxShadow: `0 0 20px ${SA_UNIVERSITIES[activeUniversityIndex].color}40`
              }}
            ></div>
            <div>
              <h3 className="font-bold text-xl text-gray-900 leading-tight">
                {SA_UNIVERSITIES[activeUniversityIndex].name}
              </h3>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                📍 {SA_UNIVERSITIES[activeUniversityIndex].city}, {SA_UNIVERSITIES[activeUniversityIndex].province}
              </p>
              <p className="text-xs text-purple-600 font-medium mt-1">
                {SA_UNIVERSITIES[activeUniversityIndex].type} • Est. {SA_UNIVERSITIES[activeUniversityIndex].established}
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">Global Ranking</p>
              <p className="text-sm font-bold text-blue-900 mt-1">{SA_UNIVERSITIES[activeUniversityIndex].ranking}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <p className="text-xs text-green-600 font-semibold uppercase tracking-wide">Student Body</p>
              <p className="text-sm font-bold text-green-900 mt-1">{SA_UNIVERSITIES[activeUniversityIndex].students}</p>
            </div>
          </div>

          {/* PREMIUM REAL-TIME WEATHER WIDGET */}
          <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-2xl p-6 text-white mb-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🌤️</span>
                    <p className="text-sm font-medium opacity-90">Live Campus Weather</p>
                  </div>
                  {weatherLoading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  <button 
                    onClick={refreshWeather}
                    className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-all duration-200 backdrop-blur-sm"
                    title="Refresh weather data"
                  >
                    🔄 Refresh
                  </button>
                </div>
                
                <div className="flex items-baseline gap-2 mb-2">
                  <p className="text-3xl font-bold">
                    {weatherData[activeUniversityIndex]?.temp || "Loading..."}
                  </p>
                  <p className="text-lg opacity-80">
                    {weatherData[activeUniversityIndex]?.condition || "Fetching..."}
                  </p>
                </div>
                
                {weatherData[activeUniversityIndex]?.description && (
                  <p className="text-sm opacity-75 capitalize mb-3">
                    {weatherData[activeUniversityIndex].description}
                  </p>
                )}
              </div>
              
              <div className="text-right">
                <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                  <p className="text-sm mb-1">💧 {weatherData[activeUniversityIndex]?.humidity || "-%"}</p>
                  <p className="text-sm mb-1">💨 {weatherData[activeUniversityIndex]?.wind || "- km/h"}</p>
                  <p className="text-sm">🌡️ {SA_UNIVERSITIES[activeUniversityIndex].climate}</p>
                </div>
                
                <div className="mt-3">
                  {weatherError && (
                    <p className="text-xs text-yellow-200 bg-yellow-500/20 px-2 py-1 rounded-full">
                      ⚠️ {weatherError.includes('401') ? 'API key needed' : 'Using fallback'}
                    </p>
                  )}
                  {!weatherLoading && !weatherError && weatherData[activeUniversityIndex] && (
                    <p className="text-xs text-green-200 bg-green-500/20 px-2 py-1 rounded-full">
                      ✅ Live data
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Academic Excellence Section */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              🎓 Academic Excellence
            </h4>
            <div className="flex flex-wrap gap-2">
              {SA_UNIVERSITIES[activeUniversityIndex].specializations.map((spec, i) => (
                <span 
                  key={i} 
                  className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 text-xs px-3 py-1.5 rounded-full border border-purple-200 font-medium"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Investment Information */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              💰 Investment in Your Future
            </h4>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold text-green-800">Undergraduate:</span> <span className="text-green-700">{SA_UNIVERSITIES[activeUniversityIndex].fees?.undergraduate}</span></p>
                <p><span className="font-semibold text-green-800">Postgraduate:</span> <span className="text-green-700">{SA_UNIVERSITIES[activeUniversityIndex].fees?.postgraduate}</span></p>
              </div>
            </div>
          </div>

          {/* Why Choose This University */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              ✨ Why Choose {SA_UNIVERSITIES[activeUniversityIndex].shortName}
            </h4>
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
              <p className="text-sm text-gray-700 leading-relaxed">
                {SA_UNIVERSITIES[activeUniversityIndex].bestFor}
              </p>
            </div>
          </div>

          {/* University Highlights */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-200">
            <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              🌟 University Highlights
            </h4>
            <div className="space-y-2">
              {SA_UNIVERSITIES[activeUniversityIndex].highlights.map((highlight, i) => (
                <p key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  {highlight}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Enhanced Status Panel */}
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-xl text-white p-4 rounded-2xl text-sm border border-white/10">
        <div className="space-y-2">
          <p className="flex items-center gap-2">
            🖱️ <span>Click universities to explore</span>
          </p>
          <p className="flex items-center gap-2">
            🔄 <span>Drag to rotate • Scroll to zoom</span>
          </p>
          <p className="text-yellow-300 font-bold flex items-center gap-2">
            🏛️ <span>{SA_UNIVERSITIES.length} Realistic Universities</span>
          </p>
        </div>
        
        <div className="mt-4 pt-3 border-t border-white/20">
          <p className="flex items-center gap-2 text-sm">
            🌤️ <span>Weather Status:</span>
            {weatherLoading ? (
              <span className="text-blue-300 bg-blue-500/20 px-2 py-1 rounded-full text-xs">Loading...</span>
            ) : weatherError ? (
              <span className="text-red-300 bg-red-500/20 px-2 py-1 rounded-full text-xs">Fallback</span>
            ) : (
              <span className="text-green-300 bg-green-500/20 px-2 py-1 rounded-full text-xs">Live API</span>
            )}
          </p>
        </div>
        
        <div className="mt-3 pt-3 border-t border-white/20">
          <p className="text-xs text-gray-300">
            🎨 Photorealistic 3D Experience
          </p>
          <p className="text-xs text-gray-300">
            ⚡ Real-time Weather Integration
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-black/50 backdrop-blur-sm rounded-full p-3 border border-white/20"
        >
          <p className="text-sm mb-2">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto relative">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full absolute left-1/2 top-1 transform -translate-x-1/2"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}