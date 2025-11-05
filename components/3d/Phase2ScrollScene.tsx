'use client'

import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Scroll-controlled camera
function ScrollCamera() {
  const { camera } = useThree()
  const cameraRef = useRef(camera)
  
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
        onUpdate: (self) => {
          const progress = self.progress
          
          // Animate camera position based on scroll
          const radius = 10
          const angle = progress * Math.PI * 2
          
          cameraRef.current.position.x = Math.sin(angle) * radius
          cameraRef.current.position.z = Math.cos(angle) * radius
          cameraRef.current.position.y = 5 + progress * 10
          
          // Always look at center
          cameraRef.current.lookAt(0, 0, 0)
        }
      }
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return null
}

// Scroll-animated cube
function ScrollCube() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useEffect(() => {
    if (typeof window === 'undefined' || !meshRef.current) return

    // Animate cube rotation with scroll
    gsap.to(meshRef.current.rotation, {
      x: Math.PI * 4,
      y: Math.PI * 6,
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    })

    // Animate cube scale
    gsap.to(meshRef.current.scale, {
      x: 2,
      y: 2,
      z: 2,
      scrollTrigger: {
        trigger: document.body,
        start: "top center",
        end: "center center",
        scrub: 1
      }
    })

  }, [])

  return (
    <Box ref={meshRef} args={[2, 2, 2]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#4f46e5" />
    </Box>
  )
}

// Basic lighting
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

interface Phase2ScrollSceneProps {
  className?: string
}

export default function Phase2ScrollScene({ className = "" }: Phase2ScrollSceneProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Fixed 3D Canvas */}
      <div className="fixed inset-0 w-full h-screen">
        <Canvas 
          camera={{ position: [5, 5, 5], fov: 60 }}
          shadows
        >
          <BasicLighting />
          <ScrollCube />
          <ScrollCamera />
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
          />
        </Canvas>
      </div>
      
      {/* Scrollable content to trigger animations */}
      <div className="relative z-10 bg-transparent">
        {/* Section 1 */}
        <div className="h-screen flex items-center justify-center">
          <div className="bg-black/70 text-white p-8 rounded-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4">Phase 2: Scroll Animation ✅</h2>
            <ul className="space-y-2">
              <li>✅ GSAP ScrollTrigger integration</li>
              <li>✅ Camera movement synced to scroll</li>
              <li>✅ Object rotation with scroll</li>
              <li>✅ Smooth scrubbing animation</li>
            </ul>
          </div>
        </div>
        
        {/* Section 2 */}
        <div className="h-screen flex items-center justify-center">
          <div className="bg-blue-900/70 text-white p-8 rounded-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4">Scroll Progress: Middle</h2>
            <p>The camera is now orbiting around the cube as you scroll. The cube is also rotating and scaling.</p>
          </div>
        </div>
        
        {/* Section 3 */}
        <div className="h-screen flex items-center justify-center">
          <div className="bg-purple-900/70 text-white p-8 rounded-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4">Scroll Progress: End</h2>
            <p>Perfect! The scroll animation is working smoothly. Ready for Phase 3: Multiple Buildings.</p>
          </div>
        </div>
      </div>
      
      {/* Status overlay */}
      <div className="fixed top-4 left-4 bg-black/70 text-white p-4 rounded-lg z-20">
        <h3 className="font-bold mb-2">Phase 2: Scroll Animation ✅</h3>
        <ul className="text-sm space-y-1">
          <li>✅ GSAP ScrollTrigger setup</li>
          <li>✅ Camera orbit animation</li>
          <li>✅ Object rotation sync</li>
          <li>✅ Smooth scrubbing</li>
        </ul>
        <p className="text-xs mt-3 text-gray-300">
          📜 Scroll to see animations
        </p>
      </div>
    </div>
  )
}