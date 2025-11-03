'use client'

import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment, 
  Text, 
  Float, 
  Sparkles, 
  Cloud,
  Sky,
  ContactShadows,
  Box,
  Sphere,
  Cylinder
} from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// South African University Campus Data
const SA_UNIVERSITIES = [
  {
    name: "University of Cape Town",
    position: [-8, 0, -5],
    color: "#1e40af",
    province: "Western Cape",
    established: 1829,
    description: "Africa's leading research university"
  },
  {
    name: "University of the Witwatersrand", 
    position: [0, 0, 0],
    color: "#7c3aed",
    province: "Gauteng",
    established: 1922,
    description: "Excellence in mining and engineering"
  },
  {
    name: "Stellenbosch University",
    position: [-6, 0, 3],
    color: "#dc2626", 
    province: "Western Cape",
    established: 1918,
    description: "Innovation and academic excellence"
  },
  {
    name: "University of Pretoria",
    position: [3, 0, -2],
    color: "#059669",
    province: "Gauteng",
    established: 1908,
    description: "Leading research institution"
  },
  {
    name: "Rhodes University",
    position: [6, 0, 4],
    color: "#ea580c",
    province: "Eastern Cape", 
    established: 1904,
    description: "Small university, big impact"
  },
  {
    name: "University of KwaZulu-Natal",
    position: [8, 0, -1],
    color: "#0891b2",
    province: "KwaZulu-Natal",
    established: 2004,
    description: "Multicultural academic excellence"
  },
  {
    name: "North-West University",
    position: [-3, 0, -8],
    color: "#be185d",
    province: "North West",
    established: 2004,
    description: "Innovation through diversity"
  },
  {
    name: "University of the Free State",
    position: [2, 0, 6],
    color: "#9333ea",
    province: "Free State",
    established: 1904,
    description: "Academic excellence in the heart of SA"
  }
]

// Individual University Building Component
function UniversityBuilding({ university, isActive, onClick, index }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + index) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2 + index) * 0.2
    }
  })

  return (
    <group position={university.position}>
      {/* Main Building */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Box
          ref={meshRef}
          args={[2, 3, 2]}
          position={[0, 1.5, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
        >
          <meshStandardMaterial 
            color={hovered || isActive ? university.color : '#64748b'} 
            emissive={hovered || isActive ? university.color : '#000000'}
            emissiveIntensity={hovered || isActive ? 0.2 : 0}
          />
        </Box>
      </Float>

      {/* University Name */}
      <Text
        position={[-1, 4, 0]}
        fontSize={0.3}
        color={university.color}
        anchorX="center"
        anchorY="middle"
      >
        {university.name}
      </Text>

      {/* Sparkles around active university */}
      {isActive && (
        <Sparkles
          count={50}
          scale={[4, 6, 4]}
          size={3}
          speed={0.5}
          color={university.color}
        />
      )}

      {/* Campus Grounds */}
      <Cylinder args={[3, 3, 0.1, 8]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#22c55e" />
      </Cylinder>

      {/* Additional Buildings */}
      <Box args={[1, 2, 1]} position={[-2, 1, -1]}>
        <meshStandardMaterial color="#6b7280" />
      </Box>
      <Box args={[1.5, 1.5, 1.5]} position={[2, 0.75, 1]}>
        <meshStandardMaterial color="#6b7280" />
      </Box>

      {/* Flag Pole */}
      <Cylinder args={[0.05, 0.05, 4]} position={[0, 2, 2]}>
        <meshStandardMaterial color="#8b5cf6" />
      </Cylinder>
      
      {/* South African Flag */}
      <Box args={[1, 0.6, 0.01]} position={[0.5, 3.5, 2]}>
        <meshStandardMaterial color="#ff6b35" />
      </Box>
    </group>
  )
}

// Camera Controller for smooth transitions
function CameraController({ activeUniversity }: any) {
  const { camera } = useThree()
  
  useFrame(() => {
    if (activeUniversity) {
      const targetPosition = new THREE.Vector3(
        activeUniversity.position[0] + 5,
        activeUniversity.position[1] + 3,
        activeUniversity.position[2] + 5
      )
      camera.position.lerp(targetPosition, 0.02)
      camera.lookAt(
        activeUniversity.position[0],
        activeUniversity.position[1] + 1,
        activeUniversity.position[2]
      )
    }
  })

  return null
}

// Main Scene Component
function Scene({ activeUniversityIndex, onUniversityClick }: any) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} color="#7c3aed" intensity={0.5} />

      {/* Environment */}
      <Sky sunPosition={[100, 20, 100]} />
      <Environment preset="sunset" />

      {/* Universities */}
      {SA_UNIVERSITIES.map((university, index) => (
        <UniversityBuilding
          key={university.name}
          university={university}
          index={index}
          isActive={activeUniversityIndex === index}
          onClick={() => onUniversityClick(index)}
        />
      ))}

      {/* Ground */}
      <ContactShadows
        position={[0, -0.5, 0]}
        opacity={0.4}
        scale={50}
        blur={2}
        far={4}
      />

      {/* Floating Clouds */}
      <Cloud position={[-20, 10, -20]} speed={0.2} opacity={0.3} />
      <Cloud position={[20, 8, -15]} speed={0.3} opacity={0.4} />
      <Cloud position={[0, 12, 20]} speed={0.1} opacity={0.2} />

      {/* Camera Controller */}
      <CameraController 
        activeUniversity={activeUniversityIndex !== null ? SA_UNIVERSITIES[activeUniversityIndex] : null} 
      />

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={50}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  )
}

// Loading Component
function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <h3 className="text-xl font-semibold mb-2">Loading South African Universities</h3>
        <p className="text-blue-200">Preparing your immersive campus experience...</p>
      </div>
    </div>
  )
}

// Main Component
interface UniversityCampusSceneProps {
  onUniversitySelect: (university: any) => void
  className?: string
}

export default function UniversityCampusScene({ onUniversitySelect, className = "" }: UniversityCampusSceneProps) {
  const [activeUniversityIndex, setActiveUniversityIndex] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for dramatic effect
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleUniversityClick = (index: number) => {
    setActiveUniversityIndex(index)
    onUniversitySelect(SA_UNIVERSITIES[index])
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        shadows
        camera={{ position: [0, 10, 20], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene
            activeUniversityIndex={activeUniversityIndex}
            onUniversityClick={handleUniversityClick}
          />
          <EffectComposer>
            <Bloom intensity={0.5} luminanceThreshold={0.9} />
            <ChromaticAberration offset={[0.001, 0.001]} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      {/* University Info Overlay */}
      {activeUniversityIndex !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-xl max-w-sm"
        >
          <h3 className="font-bold text-lg text-gray-900">
            {SA_UNIVERSITIES[activeUniversityIndex].name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {SA_UNIVERSITIES[activeUniversityIndex].province} • Est. {SA_UNIVERSITIES[activeUniversityIndex].established}
          </p>
          <p className="text-sm text-gray-700">
            {SA_UNIVERSITIES[activeUniversityIndex].description}
          </p>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-lg text-sm">
        <p>🖱️ Click universities to explore</p>
        <p>🔄 Drag to rotate • 🔍 Scroll to zoom</p>
      </div>
    </div>
  )
}