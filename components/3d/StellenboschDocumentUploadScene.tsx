'use client'

import React, { useState, Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Sky, Html, Box, Text, Float } from '@react-three/drei'
import * as THREE from 'three'
import { STELLENBOSCH_REAL_BUILDINGS, type RealBuildingData } from '@/lib/stellenboschRealData'

// Compact loading for document upload page
function CompactLoader() {
  return (
    <Html center>
      <div className="bg-yellow-600/90 text-white p-4 rounded-xl backdrop-blur-sm">
        <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
        <p className="text-sm font-semibold">Loading Stellenbosch Campus</p>
      </div>
    </Html>
  )
}

// Simplified building for document upload context
function CompactStellenboschBuilding({ 
  building, 
  isSelected, 
  onSelect 
}: { 
  building: RealBuildingData
  isSelected: boolean
  onSelect: () => void 
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  // Simplified scale for compact view
  const scale = {
    width: building.features.footprint.width / 12,
    height: building.features.height / 3,
    depth: building.features.footprint.depth / 12
  }

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = building.position3D[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1
      
      // Highlight when selected or hovered
      if (isSelected || hovered) {
        groupRef.current.scale.setScalar(1.05 + Math.sin(state.clock.elapsedTime * 3) * 0.02)
      } else {
        groupRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <group 
      ref={groupRef}
      position={building.position3D}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onSelect}
    >
      {/* Main building */}
      <Box args={[scale.width, scale.height, scale.depth]} position={[0, scale.height/2, 0]}>
        <meshStandardMaterial 
          color={building.features.color}
          emissive={isSelected || hovered ? new THREE.Color(0x222222) : new THREE.Color(0x000000)}
          emissiveIntensity={isSelected || hovered ? 0.2 : 0}
        />
      </Box>
      
      {/* Roof */}
      <Box 
        args={[scale.width + 0.1, 0.1, scale.depth + 0.1]} 
        position={[0, scale.height + 0.05, 0]}
      >
        <meshStandardMaterial color="#2f4f4f" />
      </Box>
      
      {/* Building label */}
      {(isSelected || hovered) && (
        <Float speed={2} rotationIntensity={0.1}>
          <Text
            position={[0, scale.height + 0.8, 0]}
            fontSize={0.3}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            {building.name.split(' ')[0]}
          </Text>
        </Float>
      )}
    </group>
  )
}

// Compact campus environment
function CompactCampusEnvironment() {
  return (
    <>
      {/* Simple ground */}
      <Box args={[200, 0.5, 200]} position={[0, -0.25, 0]}>
        <meshStandardMaterial color="#2d5016" />
      </Box>
      
      {/* Lighting optimized for document upload */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[30, 30, 20]} intensity={0.8} />
      
      {/* Simple sky */}
      <Sky distance={450000} sunPosition={[0, 1, 0]} />
      <Environment preset="city" />
    </>
  )
}

interface StellenboschDocumentUploadSceneProps {
  onBuildingSelect?: (building: RealBuildingData) => void
  selectedBuildingId?: string
  className?: string
  height?: string
}

export default function StellenboschDocumentUploadScene({ 
  onBuildingSelect,
  selectedBuildingId,
  className = "",
  height = "h-96"
}: StellenboschDocumentUploadSceneProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(selectedBuildingId || null)

  const handleBuildingSelect = (building: RealBuildingData) => {
    setSelectedBuilding(building.id)
    if (onBuildingSelect) {
      onBuildingSelect(building)
    }
  }

  // Get selected building data
  const selectedBuildingData = selectedBuilding 
    ? STELLENBOSCH_REAL_BUILDINGS.find(b => b.id === selectedBuilding)
    : null

  return (
    <div className={`relative w-full ${height} ${className}`}>
      <Canvas camera={{ position: [25, 20, 25], fov: 50 }}>
        <Suspense fallback={<CompactLoader />}>
          <CompactCampusEnvironment />
          
          {/* Render key Stellenbosch buildings */}
          {STELLENBOSCH_REAL_BUILDINGS.slice(0, 8).map((building) => (
            <CompactStellenboschBuilding
              key={building.id}
              building={building}
              isSelected={selectedBuilding === building.id}
              onSelect={() => handleBuildingSelect(building)}
            />
          ))}
          
          <OrbitControls 
            enablePan={false}
            maxPolarAngle={Math.PI / 2.2}
            minDistance={20}
            maxDistance={60}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      
      {/* Campus info overlay */}
      <div className="absolute top-4 left-4 bg-yellow-600/90 text-white p-3 rounded-lg backdrop-blur-sm">
        <h3 className="font-bold text-sm mb-1">🏛️ Stellenbosch University</h3>
        <p className="text-xs">Click buildings to explore • Upload documents to begin</p>
      </div>
      
      {/* Selected building info */}
      {selectedBuildingData && (
        <div className="absolute bottom-4 left-4 right-4 bg-black/90 text-white p-4 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: selectedBuildingData.features.color }}
            ></div>
            <div className="flex-1">
              <h4 className="font-bold text-lg">{selectedBuildingData.name}</h4>
              <p className="text-sm text-gray-300">{selectedBuildingData.description}</p>
              <div className="flex gap-4 mt-2 text-xs text-gray-400">
                <span>Built: {selectedBuildingData.yearBuilt}</span>
                <span>Style: {selectedBuildingData.style}</span>
                <span>Floors: {selectedBuildingData.floors}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Building selection hint */}
      {!selectedBuilding && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
          👆 Click a building to select your faculty
        </div>
      )}
    </div>
  )
}