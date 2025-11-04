'use client'

import React, { useState, Suspense, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Sparkles, Target, TrendingUp, BookOpen, Briefcase, MessageSquare, Globe, Zap, Star, FileText, Upload } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import DocumentList from '@/components/DocumentList'
import PDFDropzone from '@/components/PDFDropzone'

// Dynamic imports for 3D components to avoid SSR issues
const UniversityCampusScene = dynamic(() => import('@/components/3d/UniversityCampusScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <p>Loading 3D Campus Experience...</p>
      </div>
    </div>
  )
})

const Uploads = () => {
  const [selectedUniversity, setSelectedUniversity] = useState<any>(null)
  const [showTraditionalView, setShowTraditionalView] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleUniversitySelect = (university: any) => {
    setSelectedUniversity(university)
  }

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    console.log('File uploaded:', file.name)
  }

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center'>
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">Loading Revolutionary Experience</h3>
          <p className="text-blue-200">Preparing 3D campus environment...</p>
        </div>
      </div>
    )
  }

  if (showTraditionalView) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
        {/* Traditional View Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={() => setShowTraditionalView(false)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Globe className="w-4 h-4 mr-2" />
            3D University Explorer
          </Button>
        </div>

        {/* Hero Section */}
        <div className='relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600'>
          <div className='absolute inset-0 bg-black/20'></div>
          <div className='relative container mx-auto px-4 sm:px-6 lg:px-8 py-16'>
            <div className='text-center text-white'>
              <div className='flex justify-center mb-6'>
                <div className='p-4 bg-white/20 rounded-full backdrop-blur-sm'>
                  <GraduationCap className='h-12 w-12' />
                </div>
              </div>
              <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'>
                Transform Your Studies Into
                <span className='block text-yellow-300'>Career Success</span>
              </h1>
              <p className='text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed'>
                Upload your academic PDFs and get personalized industry projects, interview questions, and portfolio-ready skills
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-12 items-start'>
            {/* Upload Section */}
            <div className='space-y-6'>
              <div className='text-center xl:text-left'>
                <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                  🚀 Transform Your Studies Into Career Success
                </h2>
                <p className='text-lg text-gray-600 mb-4'>
                  Upload your academic PDFs and get <strong>10-15 industry projects</strong> and <strong>50+ interview questions</strong> per document.
                </p>
                <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6'>
                  <h3 className='font-semibold text-gray-800 mb-2'>💰 This is how you get job-ready:</h3>
                  <ul className='text-sm text-gray-700 space-y-1'>
                    <li>✅ <strong>Industry Projects</strong> - Build a portfolio employers love</li>
                    <li>✅ <strong>Interview Questions</strong> - Practice with AI coach</li>
                    <li>✅ <strong>Skills Mapping</strong> - Bridge academic knowledge to industry needs</li>
                    <li>✅ <strong>Career Preparation</strong> - Get hired faster with practical experience</li>
                  </ul>
                </div>
              </div>
              
              <div className='bg-white rounded-2xl shadow-2xl p-8 border border-gray-100'>
                <div className='text-center mb-6'>
                  <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                    📚 Upload Your Academic PDF
                  </h3>
                  <p className='text-gray-600'>
                    Start your transformation journey - upload any study material, textbook chapter, or course notes
                  </p>
                </div>
                <PDFDropzone />
              </div>
            </div>

            {/* Documents Section */}
            <div className='space-y-6'>
              <div className='text-center xl:text-left'>
                <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                  Your Learning Journey
                </h2>
                <p className='text-lg text-gray-600 mb-8'>
                  Track your uploaded documents and access your personalized materials.
                </p>
              </div>
              
              <div className='bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden'>
                <DocumentList />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Revolutionary 3D Campus Experience */}
      <div className="absolute inset-0">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Loading Revolutionary 3D Experience</h3>
              <p className="text-blue-200">Preparing South African university campuses...</p>
            </div>
          </div>
        }>
          <UniversityCampusScene
            onUniversitySelect={handleUniversitySelect}
            className="w-full h-full"
          />
        </Suspense>
      </div>

      {/* Top Navigation Bar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-xl border-b border-white/10"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-8 h-8 text-white" />
                <span className="text-xl font-bold text-white">Epsionyx</span>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-300">
                <Sparkles className="w-4 h-4" />
                <span>Revolutionary 3D Campus Experience</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowTraditionalView(true)}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-6 py-2 shadow-lg"
              >
                <Upload className="w-4 h-4 mr-2" />
                💰 Start Earning Skills - Upload Documents
              </Button>
              
              {selectedUniversity && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full"
                >
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-white text-sm">{selectedUniversity.name}</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Welcome Message */}
      <AnimatePresence>
        {!selectedUniversity && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-30 pointer-events-none"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Explore South African
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Universities in 3D
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Discover where to study with real-time weather, specializations, rankings, and campus insights
            </p>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center"
            >
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <span className="text-white text-sm flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                  Click universities to explore detailed information
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* University Explorer Features */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/50 to-transparent p-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex items-center space-x-3 text-white"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold">University Rankings</h4>
                <p className="text-sm text-gray-300">Compare top SA universities</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
              className="flex items-center space-x-3 text-white"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold">Live Weather</h4>
                <p className="text-sm text-gray-300">Real-time campus conditions</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.6 }}
              className="flex items-center space-x-3 text-white"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold">Specializations</h4>
                <p className="text-sm text-gray-300">Find your perfect program</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Uploads