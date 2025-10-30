// components/animated-colorful-logo.tsx
'use client'

import React from 'react'

const AnimatedColorfulLogo = () => {
  return (
    <h1 className="font-sans text-2xl font-bold tracking-wide relative">
      <span className='text-red-500 hover:scale-125 hover:-rotate-12 transition-all duration-300 inline-block cursor-pointer hover:drop-shadow-lg'>e</span>
      <span className='text-orange-500 hover:scale-125 hover:rotate-12 transition-all duration-300 inline-block cursor-pointer hover:drop-shadow-lg'>p</span>
      <span className='text-yellow-500 hover:scale-125 hover:-rotate-6 transition-all duration-300 inline-block cursor-pointer hover:drop-shadow-lg'>s</span>
      <span className='text-green-500 hover:scale-125 hover:rotate-6 transition-all duration-300 inline-block cursor-pointer hover:drop-shadow-lg'>i</span>
      <span className='text-blue-500 hover:scale-125 hover:-rotate-12 transition-all duration-300 inline-block cursor-pointer hover:drop-shadow-lg'>o</span>
      <span className='text-indigo-500 hover:scale-125 hover:rotate-12 transition-all duration-300 inline-block cursor-pointer hover:drop-shadow-lg'>n</span>
      <span className='text-purple-500 hover:scale-125 hover:-rotate-6 transition-all duration-300 inline-block cursor-pointer hover:drop-shadow-lg'>y</span>
      <span className='text-pink-500 hover:scale-125 hover:rotate-6 transition-all duration-300 inline-block cursor-pointer hover:drop-shadow-lg'>x</span>
    </h1>
  )
}

export default AnimatedColorfulLogo