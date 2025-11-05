'use client'

import React, { useState } from 'react'
import Phase1BasicScene from '@/components/3d/Phase1BasicScene'
import Phase2ScrollScene from '@/components/3d/Phase2ScrollScene'
import Phase3BuildingsScene from '@/components/3d/Phase3BuildingsScene'
import Phase4GLTFScene from '@/components/3d/Phase4GLTFScene'
import Phase5CompleteScene from '@/components/3d/Phase5CompleteScene'
import RealisticStellenboschCampus from '@/components/3d/RealisticStellenboschCampus'

const PHASES = [
  {
    id: 1,
    name: "Basic Structure",
    description: "React Three Fiber setup with basic lighting and controls",
    component: Phase1BasicScene
  },
  {
    id: 2,
    name: "Scroll Animation", 
    description: "GSAP ScrollTrigger integration with smooth camera movement",
    component: Phase2ScrollScene
  },
  {
    id: 3,
    name: "Multiple Buildings",
    description: "Procedural building generator with different architectural styles",
    component: Phase3BuildingsScene
  },
  {
    id: 4,
    name: "GLTF Integration",
    description: "3D model loading system with error handling and optimization",
    component: Phase4GLTFScene
  },
  {
    id: 5,
    name: "Complete Integration",
    description: "Full Stellenbosch campus with realistic buildings and responsive design",
    component: Phase5CompleteScene
  },
  {
    id: 6,
    name: "🎯 REALISTIC STELLENBOSCH",
    description: "Professional-grade authentic Stellenbosch University campus with real building data",
    component: RealisticStellenboschCampus
  }
]

export default function ThreeDDemoPage() {
  const [currentPhase, setCurrentPhase] = useState(1)
  const CurrentComponent = PHASES.find(p => p.id === currentPhase)?.component || Phase1BasicScene

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Phase Navigation */}
      <div className="fixed top-4 right-4 z-30 bg-black/80 backdrop-blur-sm rounded-xl p-4 max-w-sm">
        <h2 className="text-white font-bold mb-4 text-lg">3D Campus Development Phases</h2>
        
        <div className="space-y-2">
          {PHASES.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setCurrentPhase(phase.id)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                currentPhase === phase.id
                  ? 'bg-yellow-400 text-black font-semibold'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentPhase === phase.id ? 'bg-black text-yellow-400' : 'bg-yellow-400 text-black'
                }`}>
                  {phase.id}
                </span>
                <div>
                  <p className="font-semibold">{phase.name}</p>
                  <p className="text-xs opacity-80">{phase.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-white/20">
          <p className="text-xs text-gray-300">
            🎯 Goal: Realistic Stellenbosch University buildings for document upload page
          </p>
        </div>
      </div>

      {/* Current Phase Component */}
      <CurrentComponent className="w-full h-full" />
      
      {/* Phase Info Overlay */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30 bg-black/80 backdrop-blur-sm rounded-xl p-4 text-center text-white">
        <h3 className="font-bold text-lg text-yellow-400 mb-2">
          Phase {currentPhase}: {PHASES.find(p => p.id === currentPhase)?.name}
        </h3>
        <p className="text-sm text-gray-300 max-w-md">
          {PHASES.find(p => p.id === currentPhase)?.description}
        </p>
      </div>
    </div>
  )
}