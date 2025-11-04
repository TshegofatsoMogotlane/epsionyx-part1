'use client'

import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Text, Float, Box, Cylinder, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// Comprehensive South African Universities Data
const SA_UNIVERSITIES = [
  {
    name: "University of Cape Town",
    position: [-8, 0, -5],
    color: "#1e40af",
    province: "Western Cape",
    city: "Cape Town",
    established: 1829,
    type: "Traditional University",
    description: "Africa's leading research university",
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
    position: [0, 0, 0],
    color: "#7c3aed",
    province: "Gauteng",
    city: "Johannesburg",
    established: 1922,
    type: "Traditional University",
    description: "Excellence in mining and engineering",
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
    fees: { undergraduate: "R55,000 - R75,000/year", postgraduate: "R40,000 - R180,000/year" },
    accommodation: "Limited on-campus, extensive private options in Johannesburg",
    highlights: [
      "⛏️ World's top mining university",
      "💼 Strong industry connections",
      "🏙️ Heart of economic hub",
      "🎓 Excellent graduate employment rates"
    ],
    bestFor: "Engineering, Mining, Business, Urban experience, Industry connections",
    campusLife: "Dynamic urban campus in Africa's economic capital",
    studentSupport: ["Extensive bursary programs", "Industry partnerships", "Career placement", "Student societies"],
    notableFacts: [
      "Produced 4 Nobel Prize winners",
      "Leading mining research globally",
      "Gateway to African business"
    ]
  },
  {
    name: "Stellenbosch University",
    position: [-6, 0, 3],
    color: "#dc2626", 
    province: "Western Cape",
    city: "Stellenbosch",
    established: 1918,
    type: "Traditional University",
    description: "Innovation and academic excellence",
    specializations: ["Agriculture", "Wine Science", "Engineering", "Medicine", "Business"],
    ranking: "#3 in South Africa, #395 globally (QS 2024)",
    students: "32,000+",
    climate: "Mediterranean",
    avgTemp: { summer: "28°C", winter: "18°C" },
    weather: { temp: "24°C", condition: "Clear", humidity: "55%", wind: "8 km/h" },
    admissionRequirements: {
      undergraduate: "NSC with Bachelor's pass, Afrikaans/English proficiency",
      postgraduate: "Relevant bachelor's degree, language requirements apply",
      applicationDeadline: "30 September (previous year)"
    },
    fees: { undergraduate: "R50,000 - R70,000/year", postgraduate: "R35,000 - R85,000/year" },
    accommodation: "Extensive residence system, private accommodation available",
    highlights: [
      "🍷 World-renowned wine research",
      "🌱 Leading agricultural studies",
      "🏔️ Beautiful mountain setting",
      "🎨 Rich cultural heritage"
    ],
    bestFor: "Agriculture, Wine Science, Afrikaans culture, Scenic beauty, Research",
    campusLife: "Historic town campus surrounded by vineyards and mountains",
    studentSupport: ["Merit-based bursaries", "Language support", "Career services", "Cultural programs"],
    notableFacts: [
      "Global leader in wine science",
      "Most beautiful small town campus",
      "Strong alumni network in agriculture and business"
    ]
  },
  {
    name: "University of Pretoria",
    position: [3, 0, -2],
    color: "#059669",
    province: "Gauteng",
    city: "Pretoria",
    established: 1908,
    type: "Traditional University",
    description: "Leading research institution",
    specializations: ["Veterinary Science", "Law", "Engineering", "Medicine", "Education"],
    ranking: "#4 in South Africa, #561-570 globally (QS 2024)",
    students: "53,000+",
    climate: "Subtropical highland",
    avgTemp: { summer: "25°C", winter: "15°C" },
    weather: { temp: "21°C", condition: "Sunny", humidity: "40%", wind: "10 km/h" },
    admissionRequirements: {
      undergraduate: "NSC with Bachelor's pass, specific requirements per faculty",
      postgraduate: "Relevant bachelor's degree, professional experience for some programs",
      applicationDeadline: "31 August (previous year)"
    },
    fees: { undergraduate: "R45,000 - R65,000/year", postgraduate: "R30,000 - R95,000/year" },
    accommodation: "Multiple campuses with residence options",
    highlights: [
      "🐾 #1 Veterinary school in Africa",
      "⚖️ Top law faculty",
      "🏛️ Capital city advantages",
      "🔬 Strong research focus"
    ],
    bestFor: "Veterinary Science, Law, Government connections, Large program variety",
    campusLife: "Spacious campus in the administrative capital",
    studentSupport: ["Government bursaries", "Professional networks", "Career guidance", "Academic support"],
    notableFacts: [
      "Largest contact university in SA",
      "Top veterinary faculty globally",
      "Strong government and diplomatic connections"
    ]
  },
  {
    name: "Rhodes University",
    position: [6, 0, 4],
    color: "#ea580c",
    province: "Eastern Cape",
    city: "Makhanda (Grahamstown)",
    established: 1904,
    type: "Traditional University",
    description: "Small university, big impact",
    specializations: ["Journalism", "Pharmacy", "Liberal Arts", "Sciences", "Law"],
    ranking: "Top small university in SA",
    students: "8,500+",
    climate: "Temperate oceanic",
    avgTemp: { summer: "24°C", winter: "16°C" },
    weather: { temp: "18°C", condition: "Overcast", humidity: "70%", wind: "14 km/h" },
    admissionRequirements: {
      undergraduate: "NSC with Bachelor's pass, high academic standards",
      postgraduate: "Relevant bachelor's degree, strong academic record",
      applicationDeadline: "31 August (previous year)"
    },
    fees: { undergraduate: "R48,000 - R68,000/year", postgraduate: "R32,000 - R75,000/year" },
    accommodation: "Strong residence system, limited private options",
    highlights: [
      "📰 Premier journalism school in Africa",
      "🎭 Rich cultural life and traditions",
      "👥 Small class sizes and personal attention",
      "🏆 Highest research output per capita"
    ],
    bestFor: "Journalism, Personal attention, Liberal arts, Close community, Research",
    campusLife: "Intimate campus town with strong traditions and close-knit community",
    studentSupport: ["Need-based financial aid", "Academic mentoring", "Career services", "Cultural programs"],
    notableFacts: [
      "Highest research output per student in SA",
      "Famous journalism and media alumni",
      "Strong student traditions and societies"
    ]
  },
  {
    name: "University of KwaZulu-Natal",
    position: [8, 0, -1],
    color: "#0891b2",
    province: "KwaZulu-Natal",
    city: "Durban & Pietermaritzburg",
    established: 2004,
    type: "Traditional University",
    description: "Multicultural academic excellence",
    specializations: ["Medicine", "Engineering", "Agriculture", "Social Sciences", "Law"],
    ranking: "#5 in South Africa",
    students: "47,000+",
    climate: "Subtropical",
    avgTemp: { summer: "28°C", winter: "21°C" },
    weather: { temp: "26°C", condition: "Humid", humidity: "80%", wind: "18 km/h" },
    admissionRequirements: {
      undergraduate: "NSC with Bachelor's pass, English proficiency required",
      postgraduate: "Relevant bachelor's degree, research proposal for PhD",
      applicationDeadline: "30 September (previous year)"
    },
    fees: { undergraduate: "R42,000 - R62,000/year", postgraduate: "R28,000 - R85,000/year" },
    accommodation: "Multiple campus residences, coastal lifestyle options",
    highlights: [
      "🌊 Beautiful coastal campus lifestyle",
      "🌍 Most diverse student body",
      "🏥 Strong medical and health programs",
      "🌴 Tropical climate year-round"
    ],
    bestFor: "Medicine, Diversity, Coastal living, Warm climate, Multicultural experience",
    campusLife: "Multiple campuses from coast to inland, diverse cultural experience",
    studentSupport: ["NSFAS funding", "Diversity programs", "Health services", "Cultural societies"],
    notableFacts: [
      "Most culturally diverse student population",
      "Beautiful coastal location in Durban",
      "Strong programs in African studies and development"
    ]
  }
]

function UniversityBuilding({ university, isActive, onClick, index }: any) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.02
    }
  })

  const buildingColor = hovered || isActive ? university.color : '#8b7355'

  return (
    <group ref={groupRef} position={university.position}>
      <group
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        {/* Foundation */}
        <Box args={[4, 0.3, 3]} position={[0, 0.15, 0]}>
          <meshStandardMaterial color="#6b7280" />
        </Box>

        {/* Main Building */}
        <Box args={[3.5, 3, 2.5]} position={[0, 1.8, 0]}>
          <meshStandardMaterial color={buildingColor} roughness={0.8} />
        </Box>

        {/* Columns */}
        {[-1.2, -0.4, 0.4, 1.2].map((x, i) => (
          <Cylinder key={i} args={[0.15, 0.15, 2.8]} position={[x, 1.7, 1.3]}>
            <meshStandardMaterial color="#f7fafc" />
          </Cylinder>
        ))}

        {/* Roof */}
        <Box args={[4, 0.4, 3]} position={[0, 3.5, 0]}>
          <meshStandardMaterial color="#2d3748" />
        </Box>

        {/* Windows */}
        {[-1, 0, 1].map((x, i) => (
          <Box key={i} args={[0.4, 0.6, 0.05]} position={[x, 2.2, 1.28]}>
            <meshStandardMaterial color="#2b6cb0" transparent opacity={0.7} />
          </Box>
        ))}
      </group>

      {/* Campus Ground */}
      <Cylinder args={[4, 4, 0.1, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#22c55e" />
      </Cylinder>

      {/* Trees */}
      {[[-2, 0, -2], [2, 0, -2], [-2, 0, 2], [2, 0, 2]].map((pos, i) => (
        <group key={i} position={pos}>
          <Cylinder args={[0.1, 0.15, 1.5]} position={[0, 0.75, 0]}>
            <meshStandardMaterial color="#8b4513" />
          </Cylinder>
          <Sphere args={[0.6]} position={[0, 1.8, 0]}>
            <meshStandardMaterial color="#228b22" />
          </Sphere>
        </group>
      ))}

      {/* University Name */}
      <Text
        position={[0, 4.5, 0]}
        fontSize={0.3}
        color={university.color}
        anchorX="center"
        anchorY="middle"
      >
        {university.name.split(' ').slice(0, 2).join(' ')}
      </Text>
    </group>
  )
}

interface SimpleCampusSceneProps {
  onUniversitySelect: (university: any) => void
  className?: string
}

export default function SimpleCampusScene({ onUniversitySelect, className = "" }: SimpleCampusSceneProps) {
  const [activeUniversityIndex, setActiveUniversityIndex] = useState<number | null>(null)

  const handleUniversityClick = (index: number) => {
    setActiveUniversityIndex(index)
    onUniversitySelect(SA_UNIVERSITIES[index])
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas shadows camera={{ position: [0, 10, 20], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Environment preset="sunset" />
          
          {SA_UNIVERSITIES.map((university, index) => (
            <UniversityBuilding
              key={university.name}
              university={university}
              index={index}
              isActive={activeUniversityIndex === index}
              onClick={() => handleUniversityClick(index)}
            />
          ))}
          
          <OrbitControls enablePan enableZoom enableRotate />
        </Suspense>
      </Canvas>

      {/* Comprehensive University Info Panel */}
      {activeUniversityIndex !== null && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl max-w-md border border-gray-200 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center mb-4">
            <div className={`w-4 h-4 rounded-full mr-3`} style={{ backgroundColor: SA_UNIVERSITIES[activeUniversityIndex].color }}></div>
            <div>
              <h3 className="font-bold text-xl text-gray-900">
                {SA_UNIVERSITIES[activeUniversityIndex].name}
              </h3>
              <p className="text-sm text-gray-600">
                📍 {SA_UNIVERSITIES[activeUniversityIndex].city}, {SA_UNIVERSITIES[activeUniversityIndex].province}
              </p>
              <p className="text-xs text-purple-600 font-medium">
                {SA_UNIVERSITIES[activeUniversityIndex].type} • Est. {SA_UNIVERSITIES[activeUniversityIndex].established}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs text-blue-600 font-medium">RANKING</p>
              <p className="text-sm font-bold text-blue-800">{SA_UNIVERSITIES[activeUniversityIndex].ranking}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-xs text-green-600 font-medium">STUDENTS</p>
              <p className="text-sm font-bold text-green-800">{SA_UNIVERSITIES[activeUniversityIndex].students}</p>
            </div>
          </div>

          {/* Weather Widget */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Current Weather</p>
                <p className="text-2xl font-bold">{SA_UNIVERSITIES[activeUniversityIndex].weather.temp}</p>
                <p className="text-sm">{SA_UNIVERSITIES[activeUniversityIndex].weather.condition}</p>
              </div>
              <div className="text-right text-sm">
                <p>💧 {SA_UNIVERSITIES[activeUniversityIndex].weather.humidity}</p>
                <p>💨 {SA_UNIVERSITIES[activeUniversityIndex].weather.wind}</p>
                <p>🌡️ {SA_UNIVERSITIES[activeUniversityIndex].climate}</p>
              </div>
            </div>
          </div>

          {/* Admission Requirements */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">📋 Admission Requirements</p>
            <div className="bg-yellow-50 rounded-lg p-3 text-sm">
              <p className="mb-1"><strong>Undergraduate:</strong> {SA_UNIVERSITIES[activeUniversityIndex].admissionRequirements?.undergraduate}</p>
              <p className="mb-1"><strong>Postgraduate:</strong> {SA_UNIVERSITIES[activeUniversityIndex].admissionRequirements?.postgraduate}</p>
              <p className="text-red-600"><strong>Deadline:</strong> {SA_UNIVERSITIES[activeUniversityIndex].admissionRequirements?.applicationDeadline}</p>
            </div>
          </div>

          {/* Fees */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">💰 Tuition Fees (Annual)</p>
            <div className="bg-green-50 rounded-lg p-3 text-sm">
              <p className="mb-1"><strong>Undergraduate:</strong> {SA_UNIVERSITIES[activeUniversityIndex].fees?.undergraduate}</p>
              <p><strong>Postgraduate:</strong> {SA_UNIVERSITIES[activeUniversityIndex].fees?.postgraduate}</p>
            </div>
          </div>

          {/* Specializations */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">🎓 Top Specializations</p>
            <div className="flex flex-wrap gap-2">
              {SA_UNIVERSITIES[activeUniversityIndex].specializations.map((spec, i) => (
                <span key={i} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Best For */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">✨ Best For</p>
            <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">
              {SA_UNIVERSITIES[activeUniversityIndex].bestFor}
            </p>
          </div>

          {/* Highlights */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">🌟 Highlights</p>
            <div className="space-y-1">
              {SA_UNIVERSITIES[activeUniversityIndex].highlights.map((highlight, i) => (
                <p key={i} className="text-sm text-gray-600">{highlight}</p>
              ))}
            </div>
          </div>

          {/* Accommodation */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">🏠 Accommodation</p>
            <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              {SA_UNIVERSITIES[activeUniversityIndex].accommodation}
            </p>
          </div>

          {/* Campus Life */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">🏫 Campus Life</p>
            <p className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
              {SA_UNIVERSITIES[activeUniversityIndex].campusLife}
            </p>
          </div>

          {/* Student Support */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">🤝 Student Support</p>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="grid grid-cols-1 gap-1 text-xs">
                {SA_UNIVERSITIES[activeUniversityIndex].studentSupport.map((support, i) => (
                  <p key={i} className="text-purple-700">• {support}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Climate */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">🌡️ Climate</p>
            <div className="bg-orange-50 rounded-lg p-3 text-sm">
              <p className="mb-1"><strong>Climate:</strong> {SA_UNIVERSITIES[activeUniversityIndex].climate}</p>
              <p><strong>Summer:</strong> {SA_UNIVERSITIES[activeUniversityIndex].avgTemp.summer} <strong>Winter:</strong> {SA_UNIVERSITIES[activeUniversityIndex].avgTemp.winter}</p>
            </div>
          </div>

          {/* Notable Facts */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm font-semibold text-gray-700 mb-2">💡 Notable Facts</p>
            <div className="space-y-1">
              {SA_UNIVERSITIES[activeUniversityIndex].notableFacts.map((fact, i) => (
                <p key={i} className="text-xs text-gray-600">• {fact}</p>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}