'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei'
import * as THREE from 'three'

// Basic rotating test cube
function TestCube() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Box ref={meshRef} args={[2, 2, 2]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#4f46e5" />
    </Box>
  )
}

// Basic lighting setup
function BasicLighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        castShadow
      />
    </>
  )
}

interface Phase1BasicSceneProps {
  className?: string
}

export default function Phase1BasicScene({ className = "" }: Phase1BasicSceneProps) {
  return (
    <div className={`w-full h-screen ${className}`}>
      <Canvas 
        camera={{ position: [5, 5, 5], fov: 60 }}
        shadows
      >
        <BasicLighting />
        <TestCube />
        <OrbitControls 
          enablePan 
          enableZoom 
          enableRotate 
        />
      </Canvas>
      
      {/* Status overlay */}
      <div className="absolute top-4 left-4 bg-black/70 text-white p-4 rounded-lg">
        <h3 className="font-bold mb-2">Phase 1: Basic Structure ✅</h3>
        <ul className="text-sm space-y-1">
          <li>✅ React Three Fiber canvas</li>
          <li>✅ OrbitControls for camera</li>
          <li>✅ Basic lighting (ambient + directional)</li>
          <li>✅ Test cube geometry</li>
          <li>✅ Full screen CSS</li>
        </ul>
        <p className="text-xs mt-3 text-gray-300">
          🖱️ Drag to rotate • Scroll to zoom
        </p>
      </div>
    </div>
  )
}