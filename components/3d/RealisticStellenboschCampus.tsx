'use client'

import React, { useRef, useEffect, useState, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  useGLTF, 
  Html, 
  Box, 
  Cylinder,
  Environment, 
  Sky,
  ContactShadows,
  Text,
  Float,
  Plane
} from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STELLENBOSCH_REAL_BUILDINGS, CAMPUS_ZONES, type RealBuildingData } from '@/lib/stellenboschRealData'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Professional loading component
function ProfessionalLoader() {
  return (
    <Html center>
      <div className="bg-gradient-to-br from-yellow-600 to-red-600 text-white p-8 rounded-2xl backdrop-blur-sm border border-white/20 max-w-md text-center">
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-white border-t-transparent mx-auto mb-6"></div>
        <h3 className="text-2xl font-bold mb-3">Loading Stellenbosch University</h3>
        <p className="text-yellow-100 mb-4">Rendering authentic campus buildings...</p>
        <div className="bg-white/20 rounded-lg p-3">
          <p className="text-sm">🏛️ {STELLENBOSCH_REAL_BUILDINGS.length} Real Buildings</p>
          <p className="text-sm">📍 GPS-Accurate Positioning</p>
          <p className="text-sm">🎨 Architectural Details</p>
        </div>
      </div>
    </Html>
  )
}

// Realistic building component with actual architectural details
function AuthenticStellenboschBuilding({ building, isActive, onClick }: { 
  building: RealBuildingData
  isActive: boolean
  onClick: () => void 
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  // Convert real dimensions to 3D scale
  const scale = useMemo(() => ({
    width: building.features.footprint.width / 8,
    height: building.features.height / 2,
    depth: building.features.footprint.depth / 8
  }), [building])

  // Create realistic materials based on building materials
  const materials = useMemo(() => {
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: building.features.color,
      roughness: building.features.materials.includes('glass') ? 0.1 : 0.8,
      metalness: building.features.materials.includes('steel') ? 0.7 : 0.1
    })

    const windowMaterial = new THREE.MeshStandardMaterial({
      color: '#4682b4',
      transparent: true,
      opacity: 0.7,
      emissive: new THREE.Color(0x001122),
      emissiveIntensity: 0.2
    })

    const roofMaterial = new THREE.MeshStandardMaterial({
      color: building.features.roofType.includes('slate') ? '#2f4f4f' : 
             building.features.roofType.includes('clay') ? '#8b4513' : '#4a5568',
      roughness: 0.9
    })

    return { base: baseMaterial, window: windowMaterial, roof: roofMaterial }
  }, [building])

  // Animation effects
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = building.position3D[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      
      // Glow effect when active
      if (isActive || hovered) {
        const intensity = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
        materials.base.emissive.setHex(0x222222)
        materials.base.emissiveIntensity = intensity
      } else {
        materials.base.emissive.setHex(0x000000)
        materials.base.emissiveIntensity = 0
      }
    }
  })

  // Generate windows based on floors and building width
  const windows = useMemo(() => {
    const windowsPerFloor = Math.floor(scale.width / 1.2)
    const windowList = []
    
    for (let floor = 0; floor < building.floors; floor++) {
      for (let window = 0; window < windowsPerFloor; window++) {
        const x = -scale.width/2 + 0.6 + window * 1.2
        const y = scale.height/building.floors * (floor + 0.5)
        const z = scale.depth/2 + 0.05
        
        windowList.push({ position: [x, y, z] as [number, number, number] })
      }
    }
    return windowList
  }, [scale, building.floors])

  return (
    <group 
      ref={groupRef} 
      position={building.position3D}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Foundation */}
      <Box args={[scale.width + 1, 0.3, scale.depth + 1]} position={[0, 0.15, 0]}>
        <meshStandardMaterial color="#4a5568" />
      </Box>

      {/* Main building structure */}
      <Box args={[scale.width, scale.height, scale.depth]} position={[0, scale.height/2 + 0.3, 0]}>
        <primitive object={materials.base} />
      </Box>

      {/* Roof based on architectural style */}
      {building.features.roofType.includes('gabled') ? (
        // Cape Dutch gabled roof
        <>
          <Box 
            args={[scale.width + 0.3, 0.2, scale.depth + 0.3]} 
            position={[0, scale.height + 0.4, 0]}
          >
            <primitive object={materials.roof} />
          </Box>
          {/* Gables */}
          <Box args={[0.2, scale.height * 0.3, scale.depth + 0.5]} position={[0, scale.height + 0.6, 0]}>
            <primitive object={materials.roof} />
          </Box>
        </>
      ) : building.features.roofType.includes('spire') ? (
        // Gothic spire
        <Cylinder 
          args={[0.5, 1, scale.height * 0.8]} 
          position={[0, scale.height + scale.height * 0.4 + 0.3, 0]}
        >
          <primitive object={materials.roof} />
        </Cylinder>
      ) : (
        // Standard roof
        <Box 
          args={[scale.width + 0.2, 0.3, scale.depth + 0.2]} 
          position={[0, scale.height + 0.45, 0]}
        >
          <primitive object={materials.roof} />
        </Box>
      )}

      {/* Windows */}
      {windows.map((window, i) => (
        <Box key={i} args={[0.8, 1, 0.05]} position={window.position}>
          <primitive object={materials.window} />
        </Box>
      ))}

      {/* Architectural features */}
      {building.style.includes('Classical') && (
        // Classical columns
        Array.from({ length: 4 }, (_, i) => (
          <Cylinder 
            key={i}
            args={[0.15, 0.15, scale.height * 0.8]} 
            position={[-scale.width/3 + i * scale.width/4, scale.height * 0.4 + 0.3, scale.depth/2 + 0.1]}
          >
            <meshStandardMaterial color="#f5f5dc" />
          </Cylinder>
        ))
      )}

      {/* Building name and info */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <Text
          position={[0, scale.height + 1.5, 0]}
          fontSize={0.4}
          color={building.features.color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#ffffff"
        >
          {building.name.split(' ')[0]}
        </Text>
      </Float>

      {/* Info popup when hovered */}
      {(hovered || isActive) && (
        <Html position={[0, scale.height + 2.5, 0]} center>
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-gray-200 min-w-[280px] max-w-[320px]">
            <h4 className="font-bold text-lg text-gray-900 mb-2">{building.name}</h4>
            <div className="space-y-1 text-sm text-gray-700">
              <p><strong>Built:</strong> {building.yearBuilt}</p>
              <p><strong>Style:</strong> {building.style}</p>
              <p><strong>Faculty:</strong> {building.faculty || 'General'}</p>
              <p><strong>Floors:</strong> {building.floors}</p>
              <p><strong>Capacity:</strong> {building.capacity?.toLocaleString()}</p>
            </div>
            {building.architect && (
              <p className="text-xs text-blue-600 mt-2">
                <strong>Architect:</strong> {building.architect}
              </p>
            )}
          </div>
        </Html>
      )}
    </group>
  )
}

// Professional campus tour camera
function CampusTourCamera() {
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
          const buildingCount = STELLENBOSCH_REAL_BUILDINGS.length
          
          // Calculate current building focus
          const buildingIndex = Math.floor(progress * buildingCount)
          const localProgress = (progress * buildingCount) % 1
          
          if (buildingIndex < buildingCount) {
            const building = STELLENBOSCH_REAL_BUILDINGS[buildingIndex]
            const [bx, by, bz] = building.position3D
            
            // Professional camera movement
            const radius = 25 + building.features.footprint.width / 10
            const height = 15 + building.features.height / 4
            const angle = localProgress * Math.PI * 1.5
            
            camera.position.x = bx + Math.sin(angle) * radius
            camera.position.z = bz + Math.cos(angle) * radius
            camera.position.y = by + height + Math.sin(localProgress * Math.PI) * 5
            
            // Look at building center with slight upward angle
            camera.lookAt(bx, by + building.features.height / 4, bz)
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

// Authentic South African campus environment
function StellenboschCampusEnvironment() {
  return (
    <>
      {/* Realistic terrain */}
      <Plane args={[400, 400]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#2d5016" roughness={0.9} />
      </Plane>

      {/* Campus pathways */}
      {[
        { from: [0, 0, 0], to: [15, 0, 8], width: 4 },
        { from: [15, 0, 8], to: [-20, 0, 15], width: 3 },
        { from: [0, 0, 0], to: [10, 0, -25], width: 3 }
      ].map((path, i) => (
        <Box 
          key={i}
          args={[path.width, 0.1, Math.sqrt(Math.pow(path.to[0] - path.from[0], 2) + Math.pow(path.to[2] - path.from[2], 2))]}
          position={[(path.from[0] + path.to[0])/2, 0.05, (path.from[2] + path.to[2])/2]}
        >
          <meshStandardMaterial color="#8b7355" />
        </Box>
      ))}

      {/* South African trees */}
      {Array.from({ length: 40 }, (_, i) => {
        const angle = (i / 40) * Math.PI * 2
        const radius = 50 + Math.random() * 30
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius
        const isJacaranda = i % 4 === 0
        
        return (
          <group key={i} position={[x, 0, z]}>
            {/* Trunk */}
            <Cylinder args={[0.4, 0.6, 8]} position={[0, 4, 0]}>
              <meshStandardMaterial color="#8b4513" />
            </Cylinder>
            {/* Canopy */}
            <Box args={[6, 6, 6]} position={[0, 9, 0]}>
              <meshStandardMaterial 
                color={isJacaranda ? "#9370db" : "#228b22"} 
                roughness={0.8} 
              />
            </Box>
          </group>
        )
      })}

      {/* Professional lighting */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight 
        position={[100, 100, 50]} 
        intensity={1.2}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
      />
      <pointLight position={[0, 20, 0]} intensity={0.3} color="#ffd700" />

      {/* South African sky */}
      <Sky 
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />

      <ContactShadows position={[0, 0, 0]} opacity={0.2} scale={300} blur={2} />
      <Environment preset="city" />
    </>
  )
}

interface RealisticStellenboschCampusProps {
  onBuildingSelect?: (building: RealBuildingData) => void
  className?: string
}

export default function RealisticStellenboschCampus({ 
  onBuildingSelect, 
  className = "" 
}: RealisticStellenboschCampusProps) {
  const [activeBuilding, setActiveBuilding] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleBuildingClick = (building: RealBuildingData) => {
    setActiveBuilding(building.id)
    if (onBuildingSelect) {
      onBuildingSelect(building)
    }
  }

  if (!isMounted) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-yellow-600 to-red-600 flex items-center justify-center">
        <ProfessionalLoader />
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Fixed 3D Canvas */}
      <div className="fixed inset-0 w-full h-screen">
        <Canvas 
          camera={{ position: [30, 25, 30], fov: 60 }}
          shadows
          gl={{ 
            antialias: true,
            powerPreference: "high-performance"
          }}
        >
          <Suspense fallback={<ProfessionalLoader />}>
            <StellenboschCampusEnvironment />
            
            {/* Render all authentic Stellenbosch buildings */}
            {STELLENBOSCH_REAL_BUILDINGS.map((building) => (
              <AuthenticStellenboschBuilding
                key={building.id}
                building={building}
                isActive={activeBuilding === building.id}
                onClick={() => handleBuildingClick(building)}
              />
            ))}
            
            <CampusTourCamera />
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              maxPolarAngle={Math.PI / 2}
              minDistance={10}
              maxDistance={200}
            />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Scrollable content for each building */}
      <div className="relative z-10 bg-transparent">
        {STELLENBOSCH_REAL_BUILDINGS.map((building, i) => (
          <div key={building.id} className="h-screen flex items-center justify-center px-4">
            <div className="bg-black/90 text-white p-8 rounded-2xl max-w-4xl backdrop-blur-sm border border-yellow-400/30">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-6 h-6 rounded-full mr-4"
                      style={{ backgroundColor: building.features.color }}
                    ></div>
                    <h2 className="text-3xl font-bold text-yellow-400">{building.name}</h2>
                  </div>
                  
                  <p className="text-lg mb-6 text-gray-200">{building.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Built:</span>
                      <span>{building.yearBuilt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Architect:</span>
                      <span>{building.architect || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Style:</span>
                      <span>{building.style}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Floors:</span>
                      <span>{building.floors}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Capacity:</span>
                      <span>{building.capacity?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-yellow-300">Building Details</h3>
                  <div className="bg-white/10 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold mb-2">Dimensions</h4>
                    <p className="text-sm">
                      {building.features.footprint.width}m × {building.features.footprint.depth}m × {building.features.height}m
                    </p>
                  </div>
                  
                  <div className="bg-white/10 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold mb-2">Materials</h4>
                    <div className="flex flex-wrap gap-2">
                      {building.features.materials.map((material, i) => (
                        <span key={i} className="bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded text-xs">
                          {material.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {building.departments && (
                    <div className="bg-white/10 rounded-xl p-4">
                      <h4 className="font-semibold mb-2">Departments</h4>
                      <ul className="text-sm space-y-1">
                        {building.departments.map((dept, i) => (
                          <li key={i}>• {dept}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <div className="text-xs text-gray-400">
                  Building {i + 1} of {STELLENBOSCH_REAL_BUILDINGS.length} • GPS Coordinates: {building.coordinates.lat.toFixed(4)}, {building.coordinates.lng.toFixed(4)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Professional status overlay */}
      <div className="fixed top-4 left-4 bg-black/90 text-white p-6 rounded-2xl z-20 backdrop-blur-sm border border-yellow-400/30 max-w-sm">
        <h3 className="font-bold mb-3 text-lg text-yellow-400">Stellenbosch University Campus</h3>
        <div className="space-y-2 text-sm">
          <p>🏛️ {STELLENBOSCH_REAL_BUILDINGS.length} Authentic Buildings</p>
          <p>📍 GPS-Accurate Positioning</p>
          <p>🎨 Real Architectural Data</p>
          <p>📜 Scroll for Campus Tour</p>
        </div>
      </div>
    </div>
  )
}