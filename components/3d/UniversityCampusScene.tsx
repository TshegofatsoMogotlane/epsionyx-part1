'use client'

import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Text, Float, Sparkles, Sky, ContactShadows, Box, Sphere, Cylinder } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// South African Universities Data
const SA_UNIVERSITIES = [
  {
    name: "University of Cape Town",
    position: [-8, 0, -5] as [number, number, number],
    color: "#1e40af",
    province: "Western Cape",
    city: "Cape Town",
    established: 1829,
    type: "Traditional University",
    description: "Africa's leading research university",
    architecture: "colonial",
    landmark: "Jameson Hall with iconic columns",
    specializations: ["Medicine", "Engineering", "Business", "Law", "Research"],
    ranking: "#1 in Africa, #136 globally (QS 2024)",
    students: "29,000+",
    climate: "Mediterranean",
    avgTemp: { summer: "26°C", winter: "15°C" },
    weather: { temp: "22°C", condition: "Sunny", humidity: "65%", wind: "15 km/h" },
    admissionRequirements: {
      undergraduate: "NSC with Bachelor's pass, specific subject requirements vary",
      postgraduate: "Relevant bachelor's degree, may require GMAT/GRE for some programs",
      applicationDeadline: "30 September (previous year)"
    },
    fees: { undergraduate: "R65,000 - R85,000/year", postgraduate: "R45,000 - R120,000/year" },
    accommodation: "On-campus residences, private accommodation available",
    highlights: [
      "🏆 Top-ranked African university",
      "🔬 Leading research output (6 Nobel Prize winners)",
      "🏔️ Table Mountain campus views",
      "🌊 Close to beautiful beaches"
    ],
    bestFor: "Research, Medicine, International recognition, Academic excellence",
    campusLife: "Vibrant city campus with mountain and ocean access, diverse student body",
    studentSupport: ["Financial aid available", "Career services", "Academic support", "Counseling services"],
    notableFacts: [
      "Oldest university in South Africa",
      "Most beautiful campus setting globally",
      "Strong alumni network worldwide"
    ]
  },
  {
    name: "University of the Witwatersrand",
    position: [0, 0, 0] as [number, number, number],
    color: "#7c3aed",
    province: "Gauteng",
    city: "Johannesburg",
    established: 1922,
    type: "Traditional University",
    description: "Excellence in mining and engineering",
    architecture: "art_deco",
    landmark: "Great Hall with mining heritage",
    specializations: ["Mining Engineering", "Medicine", "Commerce", "Engineering", "Law"],
    ranking: "#2 in South Africa, #428 globally (QS 2024)",
    students: "40,000+",
    climate: "Subtropical highland",
    avgTemp: { summer: "26°C", winter: "16°C" },
    weather: { temp: "19°C", condition: "Partly Cloudy", humidity: "45%", wind: "12 km/h" },
    admissionRequirements: {
      undergraduate: "NSC with Bachelor's pass, Mathematics and Physical Sciences for engineering",
      postgraduate: "Relevant bachelor's degree, work experience preferred for MBA",
      applicationDeadline: "30 September (previous year)"
    },
    fees: { undergraduate: "R55,000 - R75,000/year", postgraduate: "R40,000 - R180,00,
    accommodation: "Limited on-campus, extensive,
    highlights: [
      "⛏️ World's top mining university",
      "💼 Strong industr
      "🏙️ Heart of economic hub",
      "🎓 Excellent graduate employment rates"
    ],
    bestFor: "Engineering, M,
    campusLife: "Dynamic urban campus in Africa's economic capital",
    studentSupport: ["Extensive bursary programs", "Industry partnerships", "Career 
    notableFacts: [
      ,
      "Leading mining research globally",
      "Gateway to African business"
    ]
  }
]

export default function UniversityCampusScene( any) {
  cons
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(tr
  }, [])

  const handleUniversityClick = (in
    s
    ndex])
  }

  if (!isMounted) {
    return (
      <div className="absolutite">
        <div className="t
          <div classNa/div>
          <h3 className="text-xl fo
          <p className="text-blue-200">Preparing your 
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full h-full ${cle}`}>
      <Canvas shadows camera={{ position: [0, 10, 20], fov: 60 }}>
        <Suspense fallback={l}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Sky sunPosition={[100, 20, 100]} />
      >
          
          {SA_UNIVERSITIES.map((university, index) => (
            <grou
              <group
                onPointerOver={() => {}}
                onPointerOut={() => {}}
                onClick={() => ha}
      >
                <Box args={[3.5, 3, 2.5]} position={[0, 1.8, 0]}>
                  <meshStandardMaterial color={activeUniversityIndex === inde7355'} />
                </Box>
                <Cy, 0]}>
                  <meshStandardMateria" />
                </Cylinder>
                <Text
     , 4.5, 0]}
     {0.3}
        
                  anchorX="center"
                  anchorY="middle"
                >
                  {univers(' ')}
   
    </group>
            </group>
          ))}
          
          <ContactShadows position={[0, -0.5, 0]} opacity={0.4} scale={50} />
          <OrbitControls enablePan enableZoom enableRotate />
        </Suspense>
      </Canvas>

/}
      {activeUn
        <motion.div
          initia}}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadoto"
        >
          <div className="flex items-center mb-4">
            <div clas>
            <div>
            -900">
             
              </h3>
            
                📍 {SA_UNIVERSITIES[activeUniversityIndex].city}, {SA_UNIVERSITIES[activeUniversityIndex].province}
              </p>
              <p className="text-xs text-purple-600 font-medium">
                {SA_UNIVERSITIES[activeUniversityIndex].type} • Est. {SA_lished}
              </p>
            </div>
          </div>

          <div clas
            <lg p-3">
              <p className="text
              <p
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-xs text-green-600 font-medium">STUDENTS</p>
              <p className="text-sm font-bold text-green-800">{SA_UNIV>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm fots</p>
>
              p>
              <p classN
              <p className="text-red-600"><strong>Dead>
            </div>
          </div>

          <div classN">
            <l)</p>
            <div">
             ate}</p>
              <p><strong>Postgraduate:</strong> {SA_UNIVER/p>
            </div>
          </div>

          <div className="bg-gra
">
        v>
                <p c
          p>
                <p className="text-sm">{SA_UNIVERSITIES[activeUniversityIndex].wion}</p>
              </div>
              <div className="texm">
                <p>💧 {SA_UNIVERSITIES[activeUniversityIndex].weather.humidity}</p
                <p>💨 {SA_UNIVERSI</p>
                <p>🌡️ {SA
       
      
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">🎓 Top Specializatiop>
            <div className="flex fgap-2">
              {SA_UNIVER(
ull">
               {spec}
                </span>
              ))}
         iv>
          </div>

          <div className="mb-4">
            <p className="text-sm font-sem</p>
            <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">
              {SA_UN
            </p>
     

          <div c
            <p clas/p>
            <div className="space-y-1">
              {SA_UNIVERSITIES[activeUniversityIndex].highlights.map => (
                <p key={i} className="text-sm text-gray-600">{highlight}</p>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <p className=>
            <p className="text-sm font-medium text-gray-80>
              🏛️ {SA_UNIVERSITIES[activeUniversityIndex].established} • {SA_UNIVERSITIES[act
            </p>

     iv>
      )}

      <div className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-lg text-sm">
        <p>🖱️ Click universities to explore</p>
        <p>🔄 Drag to rotate • 🔍 Scroll to zoom</p>
      </div>
    </div>

}