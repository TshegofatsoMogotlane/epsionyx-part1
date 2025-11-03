'use client'

import React, { useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Sparkles, Target, TrendingUp, BookOpen, Briefcase, MessageSquare, Globe, Zap, Star, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import DocumentList from '@/components/DocumentList'

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

const FloatingUploadInterface = dynamic(() => import('@/components/3d/FloatingUploadInterface'), {
  ssr: false
})

const Uploads = () => {
  const [selectedUniversity, setSelectedUniversity] = useState<any>(null)
  const [showTraditionalView, setShowTraditionalView] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleUniversitySelect = (university: any) => {
    setSelectedUniversity(university)
  }

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    // Here you would typically handle the actual file upload
    console.log('File uploaded:', file.name)
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
            3D Campus View
          </Button>
        </div>

        {/* Traditional Upload Interface */}
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Transform Your Studies Into Career Success
            </h1>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Upload your academic PDFs and get personalized industry projects and interview questions
            </p>
          </div>

          <div className='grid grid-cols-1 xl:grid-cols-2 gap-12'>
            <div className='space-y-6'>
              <Card className='bg-white shadow-2xl'>
                <CardContent className='p-8'>
                  <h3 className='text-2xl font-bold mb-4'>Upload Your Document</h3>
                  {/* Traditional upload component would go here */}
                  <div className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center'>
                    <FileText className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                    <p className='text-gray-600'>Drag & drop your PDF here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className='space-y-6'>
              <DocumentList />
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

      {/* Floating Upload Interface */}
      <Suspense fallback={null}>
        <FloatingUploadInterface
          selectedUniversity={selectedUniversity}
          onFileUpload={handleFileUpload}
        />
      </Suspense>

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
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Traditional View
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
              Welcome to the Future of
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Academic Transformation
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Explore South African university campuses in 3D and transform your studies into industry-ready skills
            </p>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center"
            >
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <span className="text-white text-sm flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                  Click on any university to begin your journey
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature Highlights */}
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
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold">AI Analysis</h4>
                <p className="text-sm text-gray-300">Extract key topics instantly</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
              className="flex items-center space-x-3 text-white"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold">Industry Projects</h4>
                <p className="text-sm text-gray-300">10-15 real-world projects</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.6 }}
              className="flex items-center space-x-3 text-white"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold">Interview Prep</h4>
                <p className="text-sm text-gray-300">50+ targeted questions</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {uploadedFile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <Card className="w-96 bg-green-500/90 backdrop-blur-xl border-green-400/50 text-white">
              <CardContent className="p-8 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                  className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Sparkles className="w-8 h-8" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Upload Successful!</h3>
                <p className="text-green-100 mb-4">
                  {uploadedFile.name} has been uploaded and is being processed.
                </p>
                <p className="text-sm text-green-200">
                  You'll receive your industry projects and interview questions shortly!
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Uploads