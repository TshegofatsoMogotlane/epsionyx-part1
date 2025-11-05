'use client'

import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment, 
  Text, 
  Box, 
  Cylinder, 
  Sphere,
  Sky,
  ContactShadows,
  Float,
  Html,
  PerspectiveCamera,
  Plane,
  useTexture
} from '@react-three/drei'
import * as THREE from 'three'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useUniversitiesWeather } from '@/hooks/useWeather'

// Stellenbosch University Campus Areas
const CAMPUS_AREAS = [
  {
    name: "Main Campus - Administration",
    position: [0, 0, 0],
    buildings: [
      { name: "Administration Building", type: "admin", position: [0, 0, 0], height: 4, color: "#8B4513" },
      { name: "Ou Hoofgebou", type: "historic", position: [-3, 0, 2], height: 3.5, color: "#CD853F" },
      { name: "Student Centre", type: "modern", position: [3, 0, -2], height: 2.5, color: "#A0522D" }
    ]
  },
  {
    name: "Engineering Faculty",
    position: [15, 0, 0],
    buildings: [
      { name: "Engineering Building A", type: "modern", position: [0, 0, 0], height: 5, color: "#4682B4" },
      { name: "Engineering Building B", type: "modern", position: [4, 0, 0], height: 4.5, color: "#5F9EA0" },
      { name: "Mechanical Workshop", type: "industrial", position: [-3, 0, 3], height: 3, color: "#708090" }
    ]
  },
  {
    name: "Medical School",
    position: [30, 0, 0],
    buildings: [
      { name: "Medical School", type: "modern", position: [0, 0, 0], height: 6, color: "#DC143C" },
      { name: "Anatomy Building", type: "academic", position: [-4, 0, 2], height: 4, color: "#B22222" },
      { name: "Research Labs", type: "modern", position: [3, 0, -3], height: 3.5, color: "#CD5C5C" }
    ]
  },
  {
    name: "Business School",
    position: [45, 0, 0],
    buildings: [
      { name: "Business School", type: "modern", position: [0, 0, 0], height: 5.5, color: "#228B22" },
      { name: "MBA Centre", type: "executive", position: [4, 0, 1], height: 4, color: "#32CD32" },
      { name: "Conference Centre", type: "modern", position: [-2, 0, -3], height: 3, color: "#90EE90" }
    ]
  },
  {
    name: "Sports Complex",
    position: [60, 0, 0],
    buildings: [
      { name: "Sports Centre", type: "sports", position: [0, 0, 0], height: 4, color: "#FF6347" },
      { name: "Swimming Pool", type: "sports", position: [-5, 0, 2], height: 2, color: "#4169E1" },
      { name: "Rugby Stadium", type: "stadium", position: [3, 0, -4], height: 6, color: "#FF4500" }
    ]
  }
]

// Weather-based cloud system
function WeatherClouds({ weatherData }: { weatherData: any }) {
  const cloudsRef = useRef<THREE.Group>(null)
  
  const cloudCount = useMemo(() => {
    if (!weatherData) return 8
    const condition = weatherData.condition?.toLowerCase() || ''
    if (condition.includes('clear') || condition.includes('sunny')) return 3
    if (condition.includes('cloud')) return 12
    if (condition.includes('rain') || condition.includes('storm')) return 20
    return 8
  }, [weatherData])

  const cloudOpacity = useMemo(() => {
    if (!weatherData) return 0.6
    const condition = weatherData.condition?.toLowerCase() || ''
    if (condition.includes('clear')) return 0.3
    if (condition.includes('cloud')) return 0.7
    if (condition.includes('rain')) return 0.9
    return 0.6
  }, [weatherData])

  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0005
      cloudsRef.current.children.forEach((cloud, i) => {
        cloud.position.x += Math.sin(state.clock.elapsedTime * 0.1 + i) * 0.01
        cloud.position.z += Math.cos(state.clock.elapsedTime * 0.1 + i) * 0.01
      })
    }
  })

  return (
    <group ref={cloudsRef}>
      {Array.from(
}p>
  )
    </grou      ))}Sphere>
   </      />
 1}
        ={oughness       rity}
     accloudOp opacity={         rent 
  spa        tran  " 
  ff#ffff="       color     terial 
hStandardMa    <mes         >
 
    }  ]0
        5) * 200.andom() - ath.r         (M* 10,
   random()  + Math.   15
         0,* 20.5)  0h.random() -  (Mat
          n={[itioos        p]}
   6om() * 3, 8,and.r Math args={[2 +}
             key={i     <Sphere
 
         ( i) =>, (_,oudCount }gth: cl{ len