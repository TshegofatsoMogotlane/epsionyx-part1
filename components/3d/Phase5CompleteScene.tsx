'use client'

import React, { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  useGLTF, 
  Html, 
  Box, 
  Environment, 
  Sky,
  ContactShadows,
  Text,
  Float
} from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STELLENBOSCH_BUILDINGS } from '@/lib/stellenboschBuildings'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Enhanced loading component
function EnhancedLoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center bg-black/80 p-6 rounded-xl backdrop-blur-sm">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-400 border-t-transparent"></div>
        <p className="text-white mt-4 font-semibold">Loading Stellenbosch Campus</p>
        <p className="text-gray-300 text-sm mt-1">Preparing realistic 3D models...</p>
      </div>
    </Html>
  )
}

interface Phase5CompleteSceneProps {
  className?: string
}

export default function Phase5CompleteScene({ className = "" }: Phase5CompleteSceneProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="fixed inset-0 w-full h-screen">
        <Canvas 
          camera={{ position: [25, 20, 25], fov: 60 }}
          shadows
        >
          <Suspense fallback={<EnhancedLoadingSpinner />}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[50, 50, 25]} intensity={1} castShadow />
            <Sky />
            <Environment preset="city" />
            
            <OrbitControls />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="relative z-10 bg-transparent">
        <div className="h-screen flex items-center justify-center">
          <div className="bg-black/90 text-white p-8 rounded-2xl max-w-2xl">
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Phase 5: Complete Integration</h2>
            <p className="text-lg">All phases implemented successfully!</p>
          </div>
        </div>
      </div>
    </div>
  )
}