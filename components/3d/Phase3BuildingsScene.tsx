'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Box, Cylinder } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface BuildingConfig {
  position: [number, number, number]
  size: [number, number, number]
  color: string
  name: string
  floors: number
  style: 'modern' | 'classic' | 'industrial'
}

// University Building Generator
function UniversityBuilding({ config }: { config: BuildingConfig }) {
  const groupRef = useRef<THREE.Group>(null)
  const { position, size, color, floors, style } = config
  
  // Generate windows based on building size and floors
  const windows = useMemo(() => {
    const windowsPerFloor = Math.floor(size[0] / 1.5) // Windows based on width
    const floorHeight = size[1] / floors
    const windowList = []
    
    for (let floor = 0; floor < floors; floor++) {
      for (let window = 0; window < windowsPerFloor; window++) {
        const x = -size[0]/2 + 0.75 + window * 1.5
        const y = -size[1]/2 + floorHeight/2 + floor * floorHeight
        const z = size[2]/2 + 0.05
        
        windowList.push({ position: [x, y, z], floor, window })
      }
    }
    return windowList
  }, [size, floors])

  // Building materials based on style
  const materials = useMemo(() => {
    switch (style) {
      case 'modern':
        return {
          wall: new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.1 }),
          window: new THREE.MeshStandardMaterial({ 
            color: '#87ceeb', 
            transparent: true, 
            opacity: 0.7,
            emissive: new THREE.Color(0x001122),
            emissiveIntensity: 0.2
          }),
          roof: new THREE.MeshStandardMaterial({ color: '#2d3748', roughness: 0.8 })
        }
      case 'classic':
        return {
          wall: new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0.0 }),
          window: new THREE.MeshStandardMaterial({ 
            color: '#4a5568', 
            transparent: true, 
            opacity: 0.8,
            emissive: new THREE.Color(0x221100),
            emissiveIntensity: 0.1
          }),
          roof: new THREE.MeshStandardMaterial({ color: '#8b4513', roughness: 0.9 })
        }
      case 'industrial':
        return {
          wall: new THREE.MeshStandardMaterial({ color, roughness: 0.9, metalness: 0.3 }),
          window: new THREE.MeshStandardMaterial({ 
            color: '#2d3748', 
            transparent: true, 
            opacity: 0.6,
            emissive: new THREE.Color(0x000000)
          }),
          roof: new THREE.MeshStandardMaterial({ color: '#4a5568', roughness: 0.7, metalness: 0.4 })
        }
    }
  }, [style, color])

  return (
    <group ref={groupRef} position={position}>
      {/* Main Building Structure */}
      <Box args={size}>
        <primitive object={materials.wall} />
      </Box>
      
      {/* Roof */}
      <Box 
        args={[size[0] + 0.2, 0.3, size[2] + 0.2]} 
        position={[0, size[1]/2 + 0.15, 0]}
      >
        <primitive object={materials.roof} />
      </Box>
      
      {/* Windows */}
      {windows.map((window, i) => (
        <Box 
          key={i}
          args={[0.8, 1.2, 0.1]} 
          position={window.position as [number, number, number]}
        >
          <primitive object={materials.window} />
        </Box>
      ))}
      
      {/* Entrance (for classic buildings) */}
      {style === 'classic' && (
        <>
          <Box 
            args={[2, 3, 0.2]} 
            position={[0, -size[1]/2 + 1.5, size[2]/2 + 0.1]}
          >
            <meshStandardMaterial color="#8b4513" />
          </Box>
          {/* Columns */}
          {[-0.8, 0.8].map((x, i) => (
            <Cylinder 
              key={i}
              args={[0.15, 0.15, 2.8]} 
              position={[x, -size[1]/2 + 1.4, size[2]/2 + 0.2]}
            >
              <meshStandardMaterial color="#f7fafc" />
            </Cylinder>
          ))}
        </>
      )}
      
      {/* Foundation */}
      <Box 
        args={[size[0] + 1, 0.5, size[2] + 1]} 
        position={[0, -size[1]/2 - 0.25, 0]}
      >
        <meshStandardMaterial color="#4a5568" />
      </Box>
    </group>
  )
}

// Campus layout with multiple buildings
const CAMPUS_BUILDINGS: BuildingConfig[] = [
  {
    name: "Administration Building",
    position: [0, 2, 0],
    size: [6, 4, 4],
    color: "#d2b48c",
    floors: 3,
    style: 'classic'
  },
  {
    name: "Engineering Building",
    position: [15, 3, 0],
    size: [8, 6, 5],
    color: "#4682b4",
    floors: 4,
    style: 'modern'
  },
  {
    name: "Library",
    position: [-12, 2.5, 8],
    size: [7, 5, 6],
    color: "#8fbc8f",
    floors: 3,
    style: 'modern'
  },
  {
    name: "Student Center",
    position: [8, 1.5, -15],
    size: [10, 3, 4],
    color: "#cd853f",
    floors: 2,
    style: 'modern'
  },
  {
    name: "Science Building",
    position: [-8, 3, -10],
    size: [6, 6, 5],
    color: "#708090",
    floors: 4,
    style: 'industrial'
  },
  {
    name: "Arts Building",
    position: [20, 2, 12],
    size: [5, 4, 4],
    color: "#dda0dd",
    floors: 3,
    style: 'classic'
  }
]

// Scroll-controlled camera for campus tour
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
          
          // Tour different buildings
          const buildingIndex = Math.floor(progress * CAMPUS_BUILDINGS.length)
          const localProgress = (progress * CAMPUS_BUILDINGS.length) % 1
          
          if (buildingIndex < CAMPUS_BUILDINGS.length) {
            const building = CAMPUS_BUILDINGS[buildingIndex]
            const [bx, by, bz] = building.position
            
            // Orbit around current building
            const radius = 15
            const angle = localProgress * Math.PI * 2
            
            camera.position.x = bx + Math.sin(angle) * radius
            camera.position.z = bz + Math.cos(angle) * radius
            camera.position.y = by + 8 + Math.sin(localProgress * Math.PI) * 5
            
            camera.lookAt(bx, by, bz)
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

// Campus ground and landscaping
function CampusGround() {
  return (
    <>
      {/* Main ground */}
      <Box args={[100, 0.2, 100]} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#228b22" roughness={0.9} />
      </Box>
      
      {/* Pathways */}
      <Box args={[2, 0.05, 100]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="#696969" />
      </Box>
      <Box args={[100, 0.05, 2]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="#696969" />
      </Box>
      
      {/* Trees */}
      {Array.from({ length: 20 }, (_, i) => {
        const angle = (i / 20) * Math.PI * 2
        const radius = 25 + Math.random() * 15
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius
        
        return (
          <group key={i} position={[x, 0, z]}>
            {/* Trunk */}
            <Cylinder args={[0.3, 0.4, 4]} position={[0, 2, 0]}>
              <meshStandardMaterial color="#8b4513" />
            </Cylinder>
            {/* Canopy */}
            <Box args={[3, 3, 3]} position={[0, 4.5, 0]}>
              <meshStandardMaterial color="#228b22" />
            </Box>
          </group>
        )
      })}
    </>
  )
}

// Enhanced lighting
function CampusLighting() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[20, 20, 10]} 
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" />
      <spotLight 
        position={[10, 15, 10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={0.8}
        castShadow
      />
    </>
  )
}

interface Phase3BuildingsSceneProps {
  className?: string
}

export default function Phase3BuildingsScene({ className = "" }: Phase3BuildingsSceneProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Fixed 3D Canvas */}
      <div className="fixed inset-0 w-full h-screen">
        <Canvas 
          camera={{ position: [15, 10, 15], fov: 60 }}
          shadows
        >
          <CampusLighting />
          <CampusGround />
          
          {/* Render all campus buildings */}
          {CAMPUS_BUILDINGS.map((building, i) => (
            <UniversityBuilding key={i} config={building} />
          ))}
          
          <CampusTourCamera />
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
      
      {/* Scrollable content */}
      <div className="relative z-10 bg-transparent">
        {CAMPUS_BUILDINGS.map((building, i) => (
          <div key={i} className="h-screen flex items-center justify-center">
            <div className="bg-black/80 text-white p-8 rounded-lg max-w-md backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">{building.name}</h2>
              <div className="space-y-2 text-sm">
                <p><strong>Style:</strong> {building.style}</p>
                <p><strong>Floors:</strong> {building.floors}</p>
                <p><strong>Architecture:</strong> {
                  building.style === 'classic' ? 'Traditional with columns' :
                  building.style === 'modern' ? 'Contemporary glass and steel' :
                  'Industrial concrete and metal'
                }</p>
              </div>
              <div className="mt-4 text-xs text-gray-300">
                Building {i + 1} of {CAMPUS_BUILDINGS.length}
              </div>
            </div>
          </div>
        ))}
        
        {/* Final section */}
        <div className="h-screen flex items-center justify-center">
          <div className="bg-green-900/80 text-white p-8 rounded-lg max-w-md backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Phase 3 Complete! ✅</h2>
            <ul className="space-y-2">
              <li>✅ Building generator function</li>
              <li>✅ Multiple building sections</li>
              <li>✅ Window generation system</li>
              <li>✅ Different architectural styles</li>
              <li>✅ Campus tour camera</li>
            </ul>
            <p className="text-sm mt-4">Ready for Phase 4: GLTF Model Integration!</p>
          </div>
        </div>
      </div>
      
      {/* Status overlay */}
      <div className="fixed top-4 left-4 bg-black/70 text-white p-4 rounded-lg z-20">
        <h3 className="font-bold mb-2">Phase 3: Multiple Buildings ✅</h3>
        <ul className="text-sm space-y-1">
          <li>✅ Building generator function</li>
          <li>✅ Multiple building sections</li>
          <li>✅ Procedural windows</li>
          <li>✅ Architectural styles</li>
          <li>✅ Campus landscaping</li>
        </ul>
        <p className="text-xs mt-3 text-gray-300">
          📜 Scroll for campus tour
        </p>
      </div>
    </div>
  )
}