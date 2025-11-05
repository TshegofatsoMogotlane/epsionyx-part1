'use client'

import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Sky, Html } from '@react-three/drei'
import { STELLENBOSCH_BUILDINGS } from '@/lib/stellenboschBuildings'

// Simple loading component
function SimpleLoader() {
  return (
    <Html center>
      <div className="bg-black/70 text-white p-4 rounded-lg">
        <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
        <p>Loading Campus...</p>
      </div>
    </Html>
  )
}

// Simplified Stellenbosch building for document upload page
function SimpleStellenboschBuilding({ buildingKey }: { buildingKey: string }) {
  const building = STELLENBOSCH_BUILDINGS[buildingKey as keyof typeof STELLENBOSCH_BUILDINGS]
  const { dimensions, features, position } = building
  
  const scale = {
    width: dimensions.width / 15,
    height: dimensions.height / 3,
    depth: dimensions.depth / 15
  }

  return (
    <group position={position}>
      {/* Main building */}
      <mesh position={[0, scale.height/2, 0]}>
        <boxGeometry args={[scale.width, scale.height, scale.depth]} />
        <meshStandardMaterial color={features.color} />
      </mesh>
      
      {/* Simple roof */}
      <mesh position={[0, scale.height + 0.1, 0]}>
        <boxGeometry args={[scale.width + 0.2, 0.2, scale.depth + 0.2]} />
        <meshStandardMaterial color="#2f4f4f" />
      </mesh>
    </group>
  )
}

interface StellenboschDocumentUploadProps {
  onBuildingSelect?: (building: string) => void
  className?: string
}

export default function StellenboschDocumentUpload({ 
  onBuildingSelect, 
  className = "" 
}: StellenboschDocumentUploadProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null)

  const handleBuildingClick = (buildingKey: string) => {
    setSelectedBuilding(buildingKey)
    if (onBuildingSelect) {
      onBuildingSelect(buildingKey)
    }
  }

  return (
    <div className={`relative w-full h-96 ${className}`}>
      <Canvas camera={{ position: [20, 15, 20], fov: 50 }}>
        <Suspense fallback={<SimpleLoader />}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          {/* Environment */}
          <Sky />
          <Environment preset="city" />
          
          {/* Ground */}
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[100, 1, 100]} />
            <meshStandardMaterial color="#2d5016" />
          </mesh>
          
          {/* Stellenbosch Buildings */}
          {Object.keys(STELLENBOSCH_BUILDINGS).slice(0, 5).map((buildingKey) => (
            <SimpleStellenboschBuilding key={buildingKey} buildingKey={buildingKey} />
          ))}
          
          <OrbitControls 
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minDistance={15}
            maxDistance={50}
          />
        </Suspense>
      </Canvas>
      
      {/* Overlay info */}
      <div className="absolute top-4 left-4 bg-black/70 text-white p-3 rounded-lg">
        <h3 className="font-bold text-sm mb-1">Stellenbosch University</h3>
        <p className="text-xs">Upload your documents to explore campus buildings</p>
      </div>
    </div>
  )
}