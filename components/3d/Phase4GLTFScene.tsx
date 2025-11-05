'use client'

import React, { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Html, Box, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Loading component
function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        <p className="text-white mt-2">Loading 3D Model...</p>
      </div>
    </Html>
  )
}

// Error fallback component
function ErrorFallback({ error }: { error: string }) {
  return (
    <Html center>
      <div className="bg-red-900/80 text-white p-4 rounded-lg max-w-sm text-center">
        <h3 className="font-bold mb-2">Model Loading Error</h3>
        <p className="text-sm">{error}</p>
        <p className="text-xs mt-2 text-gray-300">Using fallback geometry</p>
      </div>
    </Html>
  )
}

// GLTF Model Component with error handling
interface GLTFModelProps {
  url: string
  position?: [number, number, number]
  scale?: [number, number, number] | number
  rotation?: [number, number, number]
  name: string
}

function GLTFModel({ url, position = [0, 0, 0], scale = 1, rotation = [0, 0, 0], name }: GLTFModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [error, setError] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  // Try to load GLTF model with error handling
  let gltf
  try {
    gltf = useGLTF(url)
    if (!loaded) setLoaded(true)
  } catch (err) {
    if (!error) {
      setError(`Failed to load model: ${url}`)
    }
  }

  // Animate model on load
  useEffect(() => {
    if (groupRef.current && loaded) {
      gsap.fromTo(groupRef.current.scale, 
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 1, ease: "back.out(1.7)" }
      )
    }
  }, [loaded])

  // If error, show fallback
  if (error) {
    return (
      <group ref={groupRef} position={position} rotation={rotation}>
        <ErrorFallback error={error} />
        {/* Fallback building */}
        <Box args={[4, 6, 3]} position={[0, 3, 0]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
      </group>
    )
  }

  // If loaded successfully, render GLTF
  if (gltf && gltf.scene) {
    return (
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        <primitive object={gltf.scene.clone()} />
      </group>
    )
  }

  // Loading state
  return (
    <group position={position}>
      <LoadingSpinner />
    </group>
  )
}

// Stellenbosch Buildings with GLTF URLs (these would be real model files)
const STELLENBOSCH_GLTF_BUILDINGS = [
  {
    name: "Ou Hoofgebou",
    url: "/models/stellenbosch/ou-hoofgebou.glb", // This would be a real file
    position: [0, 0, 0] as [number, number, number],
    scale: 1,
    description: "Historic main building designed by Herbert Baker"
  },
  {
    name: "Administration Building", 
    url: "/models/stellenbosch/admin-building.glb",
    position: [15, 0, 5] as [number, number, number],
    scale: 1.2,
    description: "Neoclassical administrative center"
  },
  {
    name: "Engineering Building",
    url: "/models/stellenbosch/engineering.glb", 
    position: [30, 0, -10] as [number, number, number],
    scale: 1.5,
    description: "Modern engineering faculty complex"
  },
  {
    name: "JS Gericke Library",
    url: "/models/stellenbosch/library.glb",
    position: [-20, 0, 15] as [number, number, number], 
    scale: 1.1,
    description: "Art Deco library with modern additions"
  },
  {
    name: "Neelsie Student Centre",
    url: "/models/stellenbosch/neelsie.glb",
    position: [10, 0, -25] as [number, number, number],
    scale: 1.3,
    description: "Central student hub and dining facilities"
  }
]

// Optimized GLTF loader with memoization
const MemoizedGLTFModel = React.memo(GLTFModel)

// Scroll-based camera for GLTF tour
function GLTFTourCamera() {
  const { camera } = useThree()
  
  useEffect(() => {
    if (typeof window === 'undefined') return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top", 
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const buildingCount = STELLENBOSCH_GLTF_BUILDINGS.length
          
          // Calculate which building to focus on
          const buildingIndex = Math.floor(progress * buildingCount)
          const localProgress = (progress * buildingCount) % 1
          
          if (buildingIndex < buildingCount) {
            const building = STELLENBOSCH_GLTF_BUILDINGS[buildingIndex]
            const [bx, by, bz] = building.position
            
            // Smooth camera movement around building
            const radius = 20
            const height = 8
            const angle = localProgress * Math.PI * 1.5 // 3/4 circle
            
            camera.position.x = bx + Math.sin(angle) * radius
            camera.position.z = bz + Math.cos(angle) * radius  
            camera.position.y = by + height + Math.sin(localProgress * Math.PI) * 3
            
            // Look at building center
            camera.lookAt(bx, by + 3, bz)
          }
        }
      }
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [camera])

  return null
}

// Campus environment
function CampusEnvironment() {
  return (
    <>
      {/* Ground */}
      <Box args={[200, 0.5, 200]} position={[0, -0.25, 0]}>
        <meshStandardMaterial color="#2d5016" roughness={0.9} />
      </Box>
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[50, 50, 25]} 
        intensity={1.2}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={200}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      
      {/* Environment map for reflections */}
      <Environment preset="city" />
    </>
  )
}

interface Phase4GLTFSceneProps {
  className?: string
}

export default function Phase4GLTFScene({ className = "" }: Phase4GLTFSceneProps) {
  const [currentBuilding, setCurrentBuilding] = useState(0)

  return (
    <div className={`relative ${className}`}>
      {/* Fixed 3D Canvas */}
      <div className="fixed inset-0 w-full h-screen">
        <Canvas 
          camera={{ position: [20, 15, 20], fov: 60 }}
          shadows
          gl={{ 
            antialias: true,
            powerPreference: "high-performance"
          }}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <CampusEnvironment />
            
            {/* Load all GLTF buildings */}
            {STELLENBOSCH_GLTF_BUILDINGS.map((building, i) => (
              <MemoizedGLTFModel
                key={building.name}
                url={building.url}
                position={building.position}
                scale={building.scale}
                name={building.name}
              />
            ))}
            
            <GLTFTourCamera />
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              maxPolarAngle={Math.PI / 2}
              minDistance={5}
              maxDistance={100}
            />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Scrollable content */}
      <div className="relative z-10 bg-transparent">
        {STELLENBOSCH_GLTF_BUILDINGS.map((building, i) => (
          <div key={i} className="h-screen flex items-center justify-center">
            <div className="bg-black/85 text-white p-8 rounded-xl max-w-lg backdrop-blur-sm border border-white/10">
              <h2 className="text-3xl font-bold mb-4 text-yellow-400">{building.name}</h2>
              <p className="text-lg mb-6">{building.description}</p>
              
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <h3 className="font-semibold mb-2">3D Model Details:</h3>
                <ul className="text-sm space-y-1">
                  <li>📁 Model: {building.url.split('/').pop()}</li>
                  <li>📍 Position: [{building.position.join(', ')}]</li>
                  <li>📏 Scale: {building.scale}x</li>
                  <li>🎨 Format: GLB/GLTF</li>
                </ul>
              </div>
              
              <div className="text-xs text-gray-300">
                Building {i + 1} of {STELLENBOSCH_GLTF_BUILDINGS.length} • Scroll to continue tour
              </div>
            </div>
          </div>
        ))}
        
        {/* Final section */}
        <div className="h-screen flex items-center justify-center">
          <div className="bg-green-900/85 text-white p-8 rounded-xl max-w-lg backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-4">Phase 4 Complete! ✅</h2>
            <ul className="space-y-3 text-lg">
              <li>✅ GLTF model loading system</li>
              <li>✅ Error handling & fallbacks</li>
              <li>✅ Performance optimization</li>
              <li>✅ Scroll-based animations</li>
              <li>✅ Memoized components</li>
            </ul>
            <p className="text-lg mt-6 text-green-300">
              Ready for Phase 5: Complete Integration with real Stellenbosch models!
            </p>
          </div>
        </div>
      </div>
      
      {/* Enhanced status overlay */}
      <div className="fixed top-4 left-4 bg-black/80 text-white p-6 rounded-xl z-20 backdrop-blur-sm border border-white/10">
        <h3 className="font-bold mb-3 text-lg">Phase 4: GLTF Integration ✅</h3>
        <ul className="text-sm space-y-2">
          <li>✅ useGLTF from @react-three/drei</li>
          <li>✅ Loading states & error handling</li>
          <li>✅ Position, scale, rotation props</li>
          <li>✅ Performance memoization</li>
          <li>✅ Scroll animation compatibility</li>
        </ul>
        
        <div className="mt-4 pt-3 border-t border-white/20">
          <p className="text-xs text-yellow-300 mb-2">⚠️ Model Status:</p>
          <p className="text-xs">Models will show fallback boxes until real GLB files are added to /public/models/</p>
        </div>
        
        <div className="mt-3 pt-3 border-t border-white/20">
          <p className="text-xs text-gray-300">
            📜 Scroll for building tour • 🖱️ Drag to explore
          </p>
        </div>
      </div>
    </div>
  )
}